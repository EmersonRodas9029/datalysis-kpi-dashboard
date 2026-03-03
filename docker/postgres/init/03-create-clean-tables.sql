-- Tablas clean: datos limpios con tipos correctos y normalización

-- Crear schema clean si no existe
CREATE SCHEMA IF NOT EXISTS clean;

-- Crear tabla clean.customers
CREATE TABLE IF NOT EXISTS clean.customers (
    customer_sk SERIAL PRIMARY KEY,
    customer_id VARCHAR(50) NOT NULL,
    customer_unique_id VARCHAR(50),
    customer_zip_code_prefix VARCHAR(10),
    customer_city VARCHAR(100),
    customer_state VARCHAR(2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(customer_id)
);

-- Crear tabla clean.sellers
CREATE TABLE IF NOT EXISTS clean.sellers (
    seller_sk SERIAL PRIMARY KEY,
    seller_id VARCHAR(50) NOT NULL,
    seller_zip_code_prefix VARCHAR(10),
    seller_city VARCHAR(100),
    seller_state VARCHAR(2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(seller_id)
);

-- Crear tabla clean.products
CREATE TABLE IF NOT EXISTS clean.products (
    product_sk SERIAL PRIMARY KEY,
    product_id VARCHAR(50) NOT NULL,
    product_category_name VARCHAR(100),
    product_category_name_english VARCHAR(100),
    product_name_length INTEGER,
    product_description_length INTEGER,
    product_photos_qty INTEGER,
    product_weight_g INTEGER,
    product_length_cm INTEGER,
    product_height_cm INTEGER,
    product_width_cm INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(product_id)
);

-- Crear tabla clean.orders
CREATE TABLE IF NOT EXISTS clean.orders (
    order_sk SERIAL PRIMARY KEY,
    order_id VARCHAR(50) NOT NULL,
    customer_id VARCHAR(50),
    order_status VARCHAR(50),
    order_purchase_timestamp TIMESTAMP,
    order_approved_at TIMESTAMP,
    order_delivered_carrier_date TIMESTAMP,
    order_delivered_customer_date TIMESTAMP,
    order_estimated_delivery_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(order_id)
);

-- Crear tabla clean.order_items
CREATE TABLE IF NOT EXISTS clean.order_items (
    order_item_sk SERIAL PRIMARY KEY,
    order_id VARCHAR(50) NOT NULL,
    order_item_id INTEGER NOT NULL,
    product_id VARCHAR(50),
    seller_id VARCHAR(50),
    shipping_limit_date TIMESTAMP,
    price DECIMAL(10,2),
    freight_value DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(order_id, order_item_id)
);

-- Crear tabla clean.order_payments
CREATE TABLE IF NOT EXISTS clean.order_payments (
    payment_sk SERIAL PRIMARY KEY,
    order_id VARCHAR(50) NOT NULL,
    payment_sequential INTEGER,
    payment_type VARCHAR(50),
    payment_installments INTEGER,
    payment_value DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(order_id, payment_sequential)
);

-- Índices para clean
CREATE INDEX IF NOT EXISTS idx_clean_orders_customer ON clean.orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_clean_orders_status ON clean.orders(order_status);
CREATE INDEX IF NOT EXISTS idx_clean_orders_purchase_date ON clean.orders(order_purchase_timestamp);
CREATE INDEX IF NOT EXISTS idx_clean_order_items_order ON clean.order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_clean_order_items_product ON clean.order_items(product_id);
CREATE INDEX IF NOT EXISTS idx_clean_order_payments_order ON clean.order_payments(order_id);

-- Mensaje de confirmación
DO $$
BEGIN
    RAISE NOTICE '✅ Tablas clean creadas correctamente';
END $$;
