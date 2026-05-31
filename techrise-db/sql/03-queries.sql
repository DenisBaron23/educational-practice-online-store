-- ============================================
-- queries.sql — Демонстрационные запросы
-- ============================================

-- ─── 1) SELECT с условием ────────────────────
-- Все товары дороже 50 000 ₽ с рейтингом 5
SELECT name, price, rating
FROM products
WHERE price > 50000 AND rating = 5
ORDER BY price DESC;


-- ─── 2) INSERT ───────────────────────────────
-- Добавить новый товар
INSERT INTO products (name, category_id, price, image, rating, description, specs)
VALUES (
    'Мышь Logitech MX Master 3S',
    (SELECT id FROM categories WHERE code='mice'),
    8990, 'img/mouse3.jpg', 5,
    'Беспроводная, 8000 DPI, тихие клики, USB-C',
    'Wireless | 8000 DPI | Silent'
);


-- ─── 3) UPDATE ───────────────────────────────
-- Снизить цену на все ноутбуки на 10%
UPDATE products
SET price = ROUND(price * 0.9)
WHERE category_id = (SELECT id FROM categories WHERE code='notebooks');


-- ─── 4) DELETE ───────────────────────────────
-- Удалить товары не в наличии
DELETE FROM products
WHERE in_stock = FALSE;


-- ─── 5) SELECT с JOIN (несколько таблиц) ─────
-- Полная информация о заказах: кто, что, сколько
SELECT
    o.id            AS order_id,
    c.name          AS customer,
    p.name          AS product,
    oi.quantity     AS qty,
    oi.price_at_order AS price,
    (oi.quantity * oi.price_at_order) AS subtotal,
    o.status,
    o.created_at
FROM orders o
JOIN customers c   ON o.customer_id = c.id
JOIN order_items oi ON oi.order_id = o.id
JOIN products p     ON oi.product_id = p.id
ORDER BY o.id, p.name;


-- ─── БОНУС: Агрегация с GROUP BY ─────────────
-- Количество товаров и средняя цена по категориям
SELECT
    cat.name              AS category,
    COUNT(p.id)           AS products_count,
    ROUND(AVG(p.price))   AS avg_price,
    MIN(p.price)          AS min_price,
    MAX(p.price)          AS max_price
FROM categories cat
LEFT JOIN products p ON p.category_id = cat.id
GROUP BY cat.name
ORDER BY products_count DESC;


-- ─── БОНУС: Топ покупателей ──────────────────
-- Кто потратил больше всех
SELECT
    c.name,
    c.email,
    COUNT(o.id)        AS orders_count,
    SUM(o.total_price) AS total_spent
FROM customers c
JOIN orders o ON o.customer_id = c.id
GROUP BY c.id, c.name, c.email
ORDER BY total_spent DESC;
