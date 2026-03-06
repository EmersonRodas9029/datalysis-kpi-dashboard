#!/bin/bash

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m'

echo -e "${PURPLE}================================${NC}"
echo -e "${PURPLE}Transformando raw -> clean${NC}"
echo -e "${PURPLE}================================${NC}"

DB_CONTAINER="kpi-db"
DB_USER="kpi_user"
DB_NAME="kpi_dashboard"

echo -e "${YELLOW}Verificando conexion a PostgreSQL...${NC}"
if ! docker exec $DB_CONTAINER pg_isready -U $DB_USER > /dev/null 2>&1; then
    echo -e "${RED}Error: PostgreSQL no esta corriendo${NC}"
    exit 1
fi
echo -e "${GREEN}PostgreSQL conectado${NC}\n"

execute_sql() {
    local description=$1
    local sql=$2
    
    echo -e "${YELLOW}$description${NC}"
    docker exec -i $DB_CONTAINER psql -U $DB_USER -d $DB_NAME -c "$sql"
    echo ""
}

echo -e "${BLUE}Transformando customers...${NC}"
execute_sql "Truncando clean.customers" "TRUNCATE TABLE clean.customers CASCADE;"

execute_sql "Insertando datos limpios en clean.customers" "
INSERT INTO clean.customers (
    customer_id,
    customer_unique_id,
    customer_zip_code_prefix,
    customer_city,
    customer_state
)
SELECT DISTINCT
    customer_id,
    customer_unique_id,
    LPAD(TRIM(customer_zip_code_prefix), 5, '0') as customer_zip_code_prefix,
    INITCAP(TRIM(customer_city)) as customer_city,
    UPPER(TRIM(customer_state)) as customer_state
FROM raw.customers
WHERE customer_id IS NOT NULL;
"

echo -e "${BLUE}Transformando sellers...${NC}"
execute_sql "Truncando clean.sellers" "TRUNCATE TABLE clean.sellers CASCADE;"

execute_sql "Insertando datos limpios en clean.sellers" "
INSERT INTO clean.sellers (
    seller_id,
    seller_zip_code_prefix,
    seller_city,
    seller_state
)
SELECT DISTINCT
    seller_id,
    LPAD(TRIM(seller_zip_code_prefix), 5, '0') as seller_zip_code_prefix,
    INITCAP(TRIM(seller_city)) as seller_city,
    UPPER(TRIM(seller_state)) as seller_state
FROM raw.sellers
WHERE seller_id IS NOT NULL;
"

echo -e "${BLUE}Transformando products...${NC}"
execute_sql "Truncando clean.products" "TRUNCATE TABLE clean.products CASCADE;"

execute_sql "Insertando datos limpios en clean.products" "
INSERT INTO clean.products (
    product_id,
    product_category_name,
    product_category_name_english,
    product_name_length,
    product_description_length,
    product_photos_qty,
    product_weight_g,
    product_length_cm,
    product_height_cm,
    product_width_cm
)
SELECT 
    p.product_id,
    p.product_category_name,
    COALESCE(t.product_category_name_english, 'unknown') as product_category_name_english,
    NULLIF(p.product_name_length, 0) as product_name_length,
    NULLIF(p.product_description_length, 0) as product_description_length,
    NULLIF(p.product_photos_qty, 0) as product_photos_qty,
    NULLIF(p.product_weight_g, 0) as product_weight_g,
    NULLIF(p.product_length_cm, 0) as product_length_cm,
    NULLIF(p.product_height_cm, 0) as product_height_cm,
    NULLIF(p.product_width_cm, 0) as product_width_cm
FROM raw.products p
LEFT JOIN raw.product_category_name_translation t ON p.product_category_name = t.product_category_name
WHERE p.product_id IS NOT NULL;
"

echo -e "${BLUE}Transformando orders...${NC}"
execute_sql "Truncando clean.orders" "TRUNCATE TABLE clean.orders CASCADE;"

echo -e "${YELLOW}Diagnosticando valores de fecha en raw.orders...${NC}"
docker exec -i $DB_CONTAINER psql -U $DB_USER -d $DB_NAME -c "
SELECT 
    'order_approved_at' as columna,
    COUNT(*) as total,
    COUNT(*) FILTER (WHERE order_approved_at IS NULL) as nulos,
    COUNT(*) FILTER (WHERE order_approved_at::text = '') as vacios
FROM raw.orders
UNION ALL
SELECT 
    'order_delivered_carrier_date',
    COUNT(*),
    COUNT(*) FILTER (WHERE order_delivered_carrier_date IS NULL),
    COUNT(*) FILTER (WHERE order_delivered_carrier_date::text = '')
FROM raw.orders
UNION ALL
SELECT 
    'order_delivered_customer_date',
    COUNT(*),
    COUNT(*) FILTER (WHERE order_delivered_customer_date IS NULL),
    COUNT(*) FILTER (WHERE order_delivered_customer_date::text = '')
FROM raw.orders;
"

execute_sql "Insertando datos limpios en clean.orders" "
INSERT INTO clean.orders (
    order_id,
    customer_id,
    order_status,
    order_purchase_timestamp,
    order_approved_at,
    order_delivered_carrier_date,
    order_delivered_customer_date,
    order_estimated_delivery_date
)
SELECT 
    order_id,
    customer_id,
    LOWER(TRIM(order_status)) as order_status,
    order_purchase_timestamp,
    NULLIF(order_approved_at, 'epoch')::timestamp as order_approved_at,
    NULLIF(order_delivered_carrier_date, 'epoch')::timestamp as order_delivered_carrier_date,
    NULLIF(order_delivered_customer_date, 'epoch')::timestamp as order_delivered_customer_date,
    order_estimated_delivery_date
FROM raw.orders
WHERE order_id IS NOT NULL;
"

echo -e "${BLUE}Transformando order_items...${NC}"
execute_sql "Truncando clean.order_items" "TRUNCATE TABLE clean.order_items CASCADE;"

execute_sql "Insertando datos limpios en clean.order_items" "
INSERT INTO clean.order_items (
    order_id,
    order_item_id,
    product_id,
    seller_id,
    shipping_limit_date,
    price,
    freight_value
)
SELECT 
    order_id,
    order_item_id,
    product_id,
    seller_id,
    shipping_limit_date,
    COALESCE(price, 0) as price,
    COALESCE(freight_value, 0) as freight_value
FROM raw.order_items
WHERE order_id IS NOT NULL AND order_item_id IS NOT NULL;
"

echo -e "${BLUE}Transformando order_payments...${NC}"
execute_sql "Truncando clean.order_payments" "TRUNCATE TABLE clean.order_payments CASCADE;"

execute_sql "Insertando datos limpios en clean.order_payments" "
INSERT INTO clean.order_payments (
    order_id,
    payment_sequential,
    payment_type,
    payment_installments,
    payment_value
)
SELECT 
    order_id,
    payment_sequential,
    LOWER(TRIM(payment_type)) as payment_type,
    COALESCE(NULLIF(payment_installments, 0), 1) as payment_installments,
    COALESCE(payment_value, 0) as payment_value
FROM raw.order_payments
WHERE order_id IS NOT NULL;
"

echo -e "${PURPLE}================================${NC}"
echo -e "${PURPLE}Resumen de transformaciones${NC}"
echo -e "${PURPLE}================================${NC}"

execute_sql "Clientes limpios" "SELECT COUNT(*) as total_clean_customers FROM clean.customers;"
execute_sql "Vendedores limpios" "SELECT COUNT(*) as total_clean_sellers FROM clean.sellers;"
execute_sql "Productos limpios" "SELECT COUNT(*) as total_clean_products FROM clean.products;"
execute_sql "Ordenes limpias" "SELECT COUNT(*) as total_clean_orders FROM clean.orders;"
execute_sql "Items limpios" "SELECT COUNT(*) as total_clean_order_items FROM clean.order_items;"
execute_sql "Pagos limpios" "SELECT COUNT(*) as total_clean_order_payments FROM clean.order_payments;"

echo -e "${YELLOW}Distribucion de order_status en clean:${NC}"
docker exec -i $DB_CONTAINER psql -U $DB_USER -d $DB_NAME -c "
SELECT 
    order_status,
    COUNT(*) as cantidad,
    ROUND(100.0 * COUNT(*) / SUM(COUNT(*)) OVER(), 2) as porcentaje
FROM clean.orders
GROUP BY order_status
ORDER BY cantidad DESC;
"

echo -e "${PURPLE}================================${NC}"
echo -e "${PURPLE}Verificando integridad en clean${NC}"
echo -e "${PURPLE}================================${NC}"

execute_sql "Ordenes con customer valido" "
SELECT COUNT(*) as orders_with_valid_customer
FROM clean.orders o
JOIN clean.customers c ON o.customer_id = c.customer_id;
"

execute_sql "Items con producto valido" "
SELECT COUNT(*) as items_with_valid_product
FROM clean.order_items oi
JOIN clean.products p ON oi.product_id = p.product_id;
"

execute_sql "Items con vendedor valido" "
SELECT COUNT(*) as items_with_valid_seller
FROM clean.order_items oi
JOIN clean.sellers s ON oi.seller_id = s.seller_id;
"

echo -e "${YELLOW}Verificando fechas nulas en orders:${NC}"
docker exec -i $DB_CONTAINER psql -U $DB_USER -d $DB_NAME -c "
SELECT 
    COUNT(*) as total_orders,
    COUNT(*) FILTER (WHERE order_approved_at IS NULL) as null_approved,
    COUNT(*) FILTER (WHERE order_delivered_carrier_date IS NULL) as null_carrier,
    COUNT(*) FILTER (WHERE order_delivered_customer_date IS NULL) as null_customer
FROM clean.orders;
"

echo -e "${GREEN}================================${NC}"
echo -e "${GREEN}Transformacion raw -> clean completada${NC}"
echo -e "${GREEN}================================${NC}