-- Star Schema para análisis de ventas
-- Grano: 1 fila por item de orden

-- Crear schema gold si no existe
CREATE SCHEMA IF NOT EXISTS gold;

-- 1. Dimensión Fecha (calendario)
CREATE TABLE IF NOT EXISTS gold.dim_date (
    date_sk SERIAL PRIMARY KEY,
    full_date DATE NOT NULL UNIQUE,
    year INTEGER,
    quarter INTEGER,
    month INTEGER,
    month_name VARCHAR(20),
    week INTEGER,
    day_of_week INTEGER,
    day_name VARCHAR(20),
    is_weekend BOOLEAN,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Dimensión Cliente
CREATE TABLE IF NOT EXISTS gold.dim_customer (
    customer_sk SERIAL PRIMARY KEY,
    customer_id VARCHAR(50) NOT NULL,
    customer_unique_id VARCHAR(50),
    customer_city VARCHAR(100),
    customer_state VARCHAR(2),
    customer_zip_code_prefix VARCHAR(10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(customer_id)
);

-- 3. Dimensión Producto
CREATE TABLE IF NOT EXISTS gold.dim_product (
    product_sk SERIAL PRIMARY KEY,
    product_id VARCHAR(50) NOT NULL,
    product_category_name VARCHAR(100),
    product_category_name_english VARCHAR(100),
    product_weight_g INTEGER,
    product_length_cm INTEGER,
    product_height_cm INTEGER,
    product_width_cm INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(product_id)
);

-- 4. Dimensión Orden (atributos de la orden)
CREATE TABLE IF NOT EXISTS gold.dim_order (
    order_sk SERIAL PRIMARY KEY,
    order_id VARCHAR(50) NOT NULL,
    order_status VARCHAR(50),
    order_purchase_timestamp TIMESTAMP,
    order_approved_at TIMESTAMP,
    order_delivered_carrier_date TIMESTAMP,
    order_delivered_customer_date TIMESTAMP,
    order_estimated_delivery_date TIMESTAMP,
    purchase_date_sk INTEGER REFERENCES gold.dim_date(date_sk),
    approved_date_sk INTEGER REFERENCES gold.dim_date(date_sk),
    delivered_date_sk INTEGER REFERENCES gold.dim_date(date_sk),
    estimated_delivery_date_sk INTEGER REFERENCES gold.dim_date(date_sk),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(order_id)
);

-- 5. Tabla de Hechos: fact_sales (grano: 1 fila por item de orden)
CREATE TABLE IF NOT EXISTS gold.fact_sales (
    fact_sales_sk SERIAL PRIMARY KEY,
    -- Claves foráneas a dimensiones
    order_sk INTEGER REFERENCES gold.dim_order(order_sk),
    customer_sk INTEGER REFERENCES gold.dim_customer(customer_sk),
    product_sk INTEGER REFERENCES gold.dim_product(product_sk),
    date_sk INTEGER REFERENCES gold.dim_date(date_sk),
    
    -- Grano: identifiers
    order_id VARCHAR(50) NOT NULL,
    order_item_id INTEGER NOT NULL,
    
    -- Medidas a nivel de item
    item_price DECIMAL(10,2) NOT NULL,
    freight_value DECIMAL(10,2) DEFAULT 0,
    
    -- Medidas a nivel de orden (prorrateadas)
    total_order_value DECIMAL(10,2),
    payment_value_allocated DECIMAL(10,2), -- Pago prorrateado
    
    -- Flags para KPIs
    is_canceled BOOLEAN DEFAULT FALSE,
    is_delivered BOOLEAN DEFAULT FALSE,
    is_on_time BOOLEAN DEFAULT FALSE,
    
    -- Metadata
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Unique constraint para evitar duplicados
    UNIQUE(order_id, order_item_item)
);

-- Crear índices para performance en gold
CREATE INDEX IF NOT EXISTS idx_fact_sales_order ON gold.fact_sales(order_sk);
CREATE INDEX IF NOT EXISTS idx_fact_sales_customer ON gold.fact_sales(customer_sk);
CREATE INDEX IF NOT EXISTS idx_fact_sales_product ON gold.fact_sales(product_sk);
CREATE INDEX IF NOT EXISTS idx_fact_sales_date ON gold.fact_sales(date_sk);
CREATE INDEX IF NOT EXISTS idx_fact_sales_status ON gold.fact_sales(is_canceled, is_delivered);
CREATE INDEX IF NOT EXISTS idx_fact_sales_payment ON gold.fact_sales(payment_value_allocated);

-- Crear función para generar dimensión fecha
CREATE OR REPLACE FUNCTION gold.generate_date_dimension(start_date DATE, end_date DATE)
RETURNS VOID AS $$
DECLARE
    current_date DATE := start_date;
BEGIN
    WHILE current_date <= end_date LOOP
        INSERT INTO gold.dim_date (
            full_date,
            year,
            quarter,
            month,
            month_name,
            week,
            day_of_week,
            day_name,
            is_weekend
        ) VALUES (
            current_date,
            EXTRACT(YEAR FROM current_date),
            EXTRACT(QUARTER FROM current_date),
            EXTRACT(MONTH FROM current_date),
            TO_CHAR(current_date, 'Month'),
            EXTRACT(WEEK FROM current_date),
            EXTRACT(DOW FROM current_date),
            TO_CHAR(current_date, 'Day'),
            EXTRACT(DOW FROM current_date) IN (0, 6)
        )
        ON CONFLICT (full_date) DO NOTHING;
        
        current_date := current_date + INTERVAL '1 day';
    END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Mensaje de confirmación
DO $$
BEGIN
    RAISE NOTICE '✅ Star schema (gold) creado correctamente';
END $$;