-- ============================================
-- schema.sql — Создание БД интернет-магазина TECHRISE
-- СУБД: PostgreSQL 16
-- ============================================

DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS customers CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS categories CASCADE;

-- ─── Категории ───────────────────────────────
CREATE TABLE categories (
    id    SERIAL PRIMARY KEY,
    code  VARCHAR(50) NOT NULL UNIQUE,   -- computers, notebooks...
    name  VARCHAR(100) NOT NULL          -- Компьютеры, Ноутбуки...
);

-- ─── Товары ──────────────────────────────────
CREATE TABLE products (
    id           SERIAL PRIMARY KEY,
    name         VARCHAR(255) NOT NULL,
    category_id  INTEGER NOT NULL,
    price        INTEGER NOT NULL CHECK (price >= 0),
    image        VARCHAR(255),
    rating       INTEGER DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
    description  TEXT,
    specs        VARCHAR(255),
    in_stock     BOOLEAN DEFAULT TRUE,
    created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_category
        FOREIGN KEY (category_id)
        REFERENCES categories(id)
        ON DELETE RESTRICT
);

-- ─── Покупатели ──────────────────────────────
CREATE TABLE customers (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(100) NOT NULL,
    phone       VARCHAR(20) NOT NULL,
    email       VARCHAR(100) NOT NULL UNIQUE,
    address     TEXT NOT NULL,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ─── Заказы ──────────────────────────────────
CREATE TABLE orders (
    id           SERIAL PRIMARY KEY,
    customer_id  INTEGER NOT NULL,
    total_price  INTEGER NOT NULL CHECK (total_price >= 0),
    status       VARCHAR(20) DEFAULT 'new',  -- new, processing, done, cancelled
    created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_customer
        FOREIGN KEY (customer_id)
        REFERENCES customers(id)
        ON DELETE CASCADE
);

-- ─── Позиции заказа ──────────────────────────
CREATE TABLE order_items (
    id              SERIAL PRIMARY KEY,
    order_id        INTEGER NOT NULL,
    product_id      INTEGER NOT NULL,
    quantity        INTEGER NOT NULL CHECK (quantity > 0),
    price_at_order  INTEGER NOT NULL,  -- цена на момент покупки

    CONSTRAINT fk_order
        FOREIGN KEY (order_id)
        REFERENCES orders(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_product
        FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE RESTRICT
);

-- ─── Индексы для ускорения поиска ────────────
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_orders_customer ON orders(customer_id);
CREATE INDEX idx_order_items_order ON order_items(order_id);
