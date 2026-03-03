-- Tablas raw: estructura exacta de los CSVs de Olist

-- Crear tabla raw.customers
CREATE TABLE IF NOT EXISTS raw.customers (
    customer_id VARCHAR(50) PRIMARY KEY,
    customer_unique_id VARCHAR(50),
    customer_zip_code_prefix VARCHAR(10),
    customer_city VARCHAR(100),
    customer_state VARCHAR(2)
);

-- Crear tabla raw.geolocation
CREATE TABLE IF NOT EXISTS raw.geolocation (
    geolocation_zip_code_prefix VARCHAR(10),
    geolocation_lat DECIMAL(10,8),
    geolocation_lng DECIMAL(11,8),
    geolocation_city VARCHAR(100),
    geolocation_state VARCHAR(2)
);

-- Crear tabla raw.order_items
CREATE TABLE IF NOT EXISTS raw.order_items (
    order_id VARCHAR(50),
    order_item_id INTEGER,
    product_id VARCHAR(50),
    seller_id VARCHAR(50),
    shipping_limit_date TIMESTAMP,
    price DECIMAL(10,2),
    freight_value DECIMAL(10,2),
    PRIMARY KEY (order_id, order_item_id)
);

-- Crear tabla raw.order_payments
CREATE TABLE IF NOT EXISTS raw.order_payments (
    order_id VARCHAR(50),
    payment_sequential INTEGER,
    payment_type VARCHAR(50),
    payment_installments INTEGER,
    payment_value DECIMAL(10,2),
    PRIMARY KEY (order_id, payment_sequential)
);

-- Crear tabla raw.order_reviews
CREATE TABLE IF NOT EXISTS raw.order_reviews (
    review_id VARCHAR(50),
    order_id VARCHAR(50),
    review_score INTEGER,
    review_comment_title VARCHAR(255),
    review_comment_message TEXT,
    review_creation_date TIMESTAMP,
    review_answer_timestamp TIMESTAMP
);

-- Crear tabla raw.orders
CREATE TABLE IF NOT EXISTS raw.orders (
    order_id VARCHAR(50) PRIMARY KEY,
    customer_id VARCHAR(50),
    order_status VARCHAR(50),
    order_purchase_timestamp TIMESTAMP,
    order_approved_at TIMESTAMP,
    order_delivered_carrier_date TIMESTAMP,
    order_delivered_customer_date TIMESTAMP,
    order_estimated_delivery_date TIMESTAMP
);

-- Crear tabla raw.products
CREATE TABLE IF NOT EXISTS raw.products (
    product_id VARCHAR(50) PRIMARY KEY,
    product_category_name VARCHAR(100),
    product_name_length INTEGER,
    product_description_length INTEGER,
    product_photos_qty INTEGER,
    product_weight_g INTEGER,
    product_length_cm INTEGER,
    product_height_cm INTEGER,
    product_width_cm INTEGER
);

-- Crear tabla raw.sellers
CREATE TABLE IF NOT EXISTS raw.sellers (
    seller_id VARCHAR(50) PRIMARY KEY,
    seller_zip_code_prefix VARCHAR(10),
    seller_city VARCHAR(100),
    seller_state VARCHAR(2)
);

-- Crear tabla raw.product_category_name_translation
CREATE TABLE IF NOT EXISTS raw.product_category_name_translation (
    product_category_name VARCHAR(100),
    product_category_name_english VARCHAR(100)
);

-- Índices para mejorar performance en raw
CREATE INDEX IF NOT EXISTS idx_raw_orders_customer ON raw.orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_raw_orders_status ON raw.orders(order_status);
CREATE INDEX IF NOT EXISTS idx_raw_orders_purchase_date ON raw.orders(order_purchase_timestamp);
CREATE INDEX IF NOT EXISTS idx_raw_order_items_order ON raw.order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_raw_order_items_product ON raw.order_items(product_id);
CREATE INDEX IF NOT EXISTS idx_raw_order_payments_order ON raw.order_payments(order_id);