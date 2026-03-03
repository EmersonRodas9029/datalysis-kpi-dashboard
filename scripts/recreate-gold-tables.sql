-- Eliminar tablas en orden inverso (por las foreign keys)
DROP TABLE IF EXISTS gold.fact_sales CASCADE;
DROP TABLE IF EXISTS gold.dim_order CASCADE;
DROP TABLE IF EXISTS gold.dim_product CASCADE;
DROP TABLE IF EXISTS gold.dim_customer CASCADE;
DROP TABLE IF EXISTS gold.dim_date CASCADE;

-- Recrear dim_date
CREATE TABLE gold.dim_date (
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

-- Recrear dim_customer
CREATE TABLE gold.dim_customer (
    customer_sk SERIAL PRIMARY KEY,
    customer_id VARCHAR(50) NOT NULL UNIQUE,
    customer_unique_id VARCHAR(50),
    customer_city VARCHAR(100),
    customer_state VARCHAR(2),
    customer_zip_code_prefix VARCHAR(10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Recrear dim_product
CREATE TABLE gold.dim_product (
    product_sk SERIAL PRIMARY KEY,
    product_id VARCHAR(50) NOT NULL UNIQUE,
    product_category_name VARCHAR(100),
    product_category_name_english VARCHAR(100),
    product_weight_g INTEGER,
    product_length_cm INTEGER,
    product_height_cm INTEGER,
    product_width_cm INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Recrear dim_order (AHORA CON CUSTOMER_ID)
CREATE TABLE gold.dim_order (
    order_sk SERIAL PRIMARY KEY,
    order_id VARCHAR(50) NOT NULL UNIQUE,
    customer_id VARCHAR(50) NOT NULL,
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
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Recrear fact_sales
CREATE TABLE gold.fact_sales (
    fact_sales_sk SERIAL PRIMARY KEY,
    order_sk INTEGER REFERENCES gold.dim_order(order_sk),
    customer_sk INTEGER REFERENCES gold.dim_customer(customer_sk),
    product_sk INTEGER REFERENCES gold.dim_product(product_sk),
    date_sk INTEGER REFERENCES gold.dim_date(date_sk),
    order_id VARCHAR(50) NOT NULL,
    order_item_id INTEGER NOT NULL,
    item_price DECIMAL(10,2) NOT NULL,
    freight_value DECIMAL(10,2) DEFAULT 0,
    total_order_value DECIMAL(10,2),
    payment_value_allocated DECIMAL(10,2),
    is_canceled BOOLEAN DEFAULT FALSE,
    is_delivered BOOLEAN DEFAULT FALSE,
    is_on_time BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(order_id, order_item_id)
);

-- Crear índices
CREATE INDEX idx_dim_order_customer ON gold.dim_order(customer_id);
CREATE INDEX idx_fact_sales_order ON gold.fact_sales(order_sk);
CREATE INDEX idx_fact_sales_customer ON gold.fact_sales(customer_sk);
CREATE INDEX idx_fact_sales_product ON gold.fact_sales(product_sk);
CREATE INDEX idx_fact_sales_date ON gold.fact_sales(date_sk);
