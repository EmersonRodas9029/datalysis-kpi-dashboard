#!/bin/bash

# Colores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${CYAN}================================${NC}"
echo -e "${CYAN}⭐ Construyendo Star Schema en gold${NC}"
echo -e "${CYAN}================================${NC}"

DB_CONTAINER="kpi-db"
DB_USER="kpi_user"
DB_NAME="kpi_dashboard"

# Verificar conexión
echo -e "${YELLOW}🔍 Verificando conexión a PostgreSQL...${NC}"
if ! docker exec $DB_CONTAINER pg_isready -U $DB_USER > /dev/null 2>&1; then
    echo -e "${RED}❌ Error: PostgreSQL no está corriendo${NC}"
    exit 1
fi
echo -e "${GREEN}✅ PostgreSQL conectado${NC}\n"

# Función para ejecutar SQL y mostrar resultado
execute_sql() {
    local description=$1
    local sql=$2
    
    echo -e "${YELLOW}📌 $description${NC}"
    docker exec -i $DB_CONTAINER psql -U $DB_USER -d $DB_NAME -c "$sql"
    echo ""
}

# 1. Generar dimensión fecha (calendario)
echo -e "${BLUE}📅 Generando dim_date...${NC}"
execute_sql "Truncando gold.dim_date" "TRUNCATE TABLE gold.dim_date CASCADE;"

# Determinar rango de fechas desde los datos
DATE_RANGE=$(docker exec -i $DB_CONTAINER psql -U $DB_USER -d $DB_NAME -t -c "
SELECT 
    MIN(order_purchase_timestamp)::DATE as min_date,
    MAX(order_purchase_timestamp)::DATE + INTERVAL '1 year' as max_date
FROM clean.orders;
")

MIN_DATE=$(echo $DATE_RANGE | cut -d'|' -f1 | xargs)
MAX_DATE=$(echo $DATE_RANGE | cut -d'|' -f2 | xargs)

echo -e "${GREEN}  📆 Rango de fechas: $MIN_DATE a $MAX_DATE${NC}"

# Generar dimensión fecha
execute_sql "Insertando en gold.dim_date" "
INSERT INTO gold.dim_date (full_date, year, quarter, month, month_name, week, day_of_week, day_name, is_weekend)
SELECT 
    generate_series::DATE as full_date,
    EXTRACT(YEAR FROM generate_series)::INT as year,
    EXTRACT(QUARTER FROM generate_series)::INT as quarter,
    EXTRACT(MONTH FROM generate_series)::INT as month,
    TO_CHAR(generate_series, 'Month') as month_name,
    EXTRACT(WEEK FROM generate_series)::INT as week,
    EXTRACT(DOW FROM generate_series)::INT as day_of_week,
    TO_CHAR(generate_series, 'Day') as day_name,
    EXTRACT(DOW FROM generate_series) IN (0, 6) as is_weekend
FROM generate_series('$MIN_DATE'::DATE, '$MAX_DATE'::DATE, '1 day'::INTERVAL) AS generate_series
ON CONFLICT (full_date) DO NOTHING;
"

# 2. Construir dim_customer
echo -e "${BLUE}👤 Construyendo dim_customer...${NC}"
execute_sql "Truncando gold.dim_customer" "TRUNCATE TABLE gold.dim_customer CASCADE;"

execute_sql "Insertando en gold.dim_customer" "
INSERT INTO gold.dim_customer (
    customer_id,
    customer_unique_id,
    customer_city,
    customer_state,
    customer_zip_code_prefix
)
SELECT 
    customer_id,
    customer_unique_id,
    customer_city,
    customer_state,
    customer_zip_code_prefix
FROM clean.customers
WHERE customer_id IS NOT NULL
ON CONFLICT (customer_id) DO NOTHING;
"

# 3. Construir dim_product
echo -e "${BLUE}📦 Construyendo dim_product...${NC}"
execute_sql "Truncando gold.dim_product" "TRUNCATE TABLE gold.dim_product CASCADE;"

execute_sql "Insertando en gold.dim_product" "
INSERT INTO gold.dim_product (
    product_id,
    product_category_name,
    product_category_name_english,
    product_weight_g,
    product_length_cm,
    product_height_cm,
    product_width_cm
)
SELECT 
    product_id,
    product_category_name,
    product_category_name_english,
    product_weight_g,
    product_length_cm,
    product_height_cm,
    product_width_cm
FROM clean.products
WHERE product_id IS NOT NULL
ON CONFLICT (product_id) DO NOTHING;
"

# 4. Construir dim_order (AHORA CON CUSTOMER_ID)
echo -e "${BLUE}📋 Construyendo dim_order...${NC}"
execute_sql "Truncando gold.dim_order" "TRUNCATE TABLE gold.dim_order CASCADE;"

execute_sql "Insertando en gold.dim_order" "
INSERT INTO gold.dim_order (
    order_id,
    customer_id,
    order_status,
    order_purchase_timestamp,
    order_approved_at,
    order_delivered_carrier_date,
    order_delivered_customer_date,
    order_estimated_delivery_date,
    purchase_date_sk,
    approved_date_sk,
    delivered_date_sk,
    estimated_delivery_date_sk
)
SELECT 
    o.order_id,
    o.customer_id,
    o.order_status,
    o.order_purchase_timestamp,
    o.order_approved_at,
    o.order_delivered_carrier_date,
    o.order_delivered_customer_date,
    o.order_estimated_delivery_date,
    dp.date_sk as purchase_date_sk,
    da.date_sk as approved_date_sk,
    dd.date_sk as delivered_date_sk,
    de.date_sk as estimated_delivery_date_sk
FROM clean.orders o
LEFT JOIN gold.dim_date dp ON dp.full_date = o.order_purchase_timestamp::DATE
LEFT JOIN gold.dim_date da ON da.full_date = o.order_approved_at::DATE
LEFT JOIN gold.dim_date dd ON dd.full_date = o.order_delivered_customer_date::DATE
LEFT JOIN gold.dim_date de ON de.full_date = o.order_estimated_delivery_date::DATE
WHERE o.order_id IS NOT NULL
ON CONFLICT (order_id) DO NOTHING;
"

# 5. Construir fact_sales (con payment_value prorrateado)
echo -e "${BLUE}💰 Construyendo fact_sales con payment prorrateado...${NC}"
execute_sql "Truncando gold.fact_sales" "TRUNCATE TABLE gold.fact_sales;"

# Calcular totales por orden para prorrateo
execute_sql "Insertando en gold.fact_sales" "
WITH order_totals AS (
    SELECT 
        order_id,
        SUM(price) as total_item_price,
        SUM(freight_value) as total_freight
    FROM clean.order_items
    GROUP BY order_id
),
order_payment_totals AS (
    SELECT 
        order_id,
        SUM(payment_value) as total_payment
    FROM clean.order_payments
    GROUP BY order_id
),
item_payment_allocation AS (
    SELECT 
        oi.order_id,
        oi.order_item_id,
        oi.product_id,
        oi.price,
        oi.freight_value,
        oi.shipping_limit_date,
        ot.total_item_price,
        ot.total_freight,
        opt.total_payment,
        -- Prorratear payment_value basado en el precio del item
        CASE 
            WHEN ot.total_item_price > 0 
            THEN ROUND((oi.price * (opt.total_payment / ot.total_item_price))::numeric, 2)
            ELSE 0
        END as allocated_payment
    FROM clean.order_items oi
    JOIN order_totals ot ON oi.order_id = ot.order_id
    JOIN order_payment_totals opt ON oi.order_id = opt.order_id
)
INSERT INTO gold.fact_sales (
    order_sk,
    customer_sk,
    product_sk,
    date_sk,
    order_id,
    order_item_id,
    item_price,
    freight_value,
    total_order_value,
    payment_value_allocated,
    is_canceled,
    is_delivered,
    is_on_time
)
SELECT 
    dim_order.order_sk,
    dim_customer.customer_sk,
    dim_product.product_sk,
    dim_date.date_sk,
    ipa.order_id,
    ipa.order_item_id,
    ipa.price as item_price,
    ipa.freight_value,
    ipa.total_payment as total_order_value,
    ipa.allocated_payment as payment_value_allocated,
    -- Flags para KPIs
    CASE WHEN dim_order.order_status IN ('canceled', 'unavailable') THEN TRUE ELSE FALSE END as is_canceled,
    CASE WHEN dim_order.order_delivered_customer_date IS NOT NULL THEN TRUE ELSE FALSE END as is_delivered,
    CASE 
        WHEN dim_order.order_delivered_customer_date IS NOT NULL 
        AND dim_order.order_delivered_customer_date <= dim_order.order_estimated_delivery_date 
        THEN TRUE ELSE FALSE 
    END as is_on_time
FROM item_payment_allocation ipa
JOIN gold.dim_order dim_order ON ipa.order_id = dim_order.order_id
JOIN gold.dim_customer dim_customer ON dim_order.customer_id = dim_customer.customer_id
JOIN gold.dim_product dim_product ON ipa.product_id = dim_product.product_id
LEFT JOIN gold.dim_date dim_date ON dim_date.full_date = ipa.shipping_limit_date::DATE;
"

# Verificar resultados
echo -e "${CYAN}================================${NC}"
echo -e "${CYAN}📊 Verificando Star Schema${NC}"
echo -e "${CYAN}================================${NC}"

execute_sql "Total en dim_date" "SELECT COUNT(*) as total_dates FROM gold.dim_date;"
execute_sql "Total en dim_customer" "SELECT COUNT(*) as total_customers FROM gold.dim_customer;"
execute_sql "Total en dim_product" "SELECT COUNT(*) as total_products FROM gold.dim_product;"
execute_sql "Total en dim_order" "SELECT COUNT(*) as total_orders FROM gold.dim_order;"
execute_sql "Total en fact_sales (items)" "SELECT COUNT(*) as total_fact_rows FROM gold.fact_sales;"

# Mostrar estadísticas de fact_sales
echo -e "${YELLOW}📈 Estadísticas de fact_sales:${NC}"
docker exec -i $DB_CONTAINER psql -U $DB_USER -d $DB_NAME -c "
SELECT 
    COUNT(DISTINCT order_id) as unique_orders,
    ROUND(SUM(item_price)::numeric, 2) as total_gmv,
    ROUND(SUM(payment_value_allocated)::numeric, 2) as total_revenue,
    ROUND(AVG(item_price)::numeric, 2) as avg_item_price,
    SUM(CASE WHEN is_canceled THEN 1 ELSE 0 END) as canceled_items,
    SUM(CASE WHEN is_delivered THEN 1 ELSE 0 END) as delivered_items,
    SUM(CASE WHEN is_on_time THEN 1 ELSE 0 END) as on_time_items
FROM gold.fact_sales;
"

# Verificar que el prorrateo funciona
echo -e "${YELLOW}💰 Verificando prorrateo de pagos:${NC}"
docker exec -i $DB_CONTAINER psql -U $DB_USER -d $DB_NAME -c "
SELECT 
    'Total pagos original' as concepto,
    ROUND(SUM(payment_value)::numeric, 2) as total
FROM clean.order_payments
UNION ALL
SELECT 
    'Total pagos prorrateados',
    ROUND(SUM(payment_value_allocated)::numeric, 2)
FROM gold.fact_sales;
"

echo -e "${GREEN}================================${NC}"
echo -e "${GREEN}✅ Star Schema construido exitosamente${NC}"
echo -e "${GREEN}================================${NC}"
