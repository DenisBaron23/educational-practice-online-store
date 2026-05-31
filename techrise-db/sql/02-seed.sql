-- ============================================
-- seed.sql — Заполнение БД данными
-- ============================================

-- ─── Категории ───────────────────────────────
INSERT INTO categories (code, name) VALUES
    ('computers',   'Компьютеры'),
    ('notebooks',   'Ноутбуки'),
    ('monitors',    'Мониторы'),
    ('keyboards',   'Клавиатуры'),
    ('mice',        'Компьютерные мыши'),
    ('headsets',    'Гарнитура'),
    ('gamepads',    'Геймпады'),
    ('accessories', 'Аксессуары');

-- ─── Товары (из вашего database.js) ──────────
INSERT INTO products (name, category_id, price, image, rating, description, specs) VALUES
    ('Игровой ноутбук ASUS ROG Strix G15',
        (SELECT id FROM categories WHERE code='notebooks'),
        89990, 'img/notebook1.jpg', 5,
        'Intel Core i7-12700H, 16GB RAM, RTX 3060, 512GB SSD, 15.6" 144Hz',
        'Intel i7 | RTX 3060 | 16GB RAM'),

    ('Ноутбук Lenovo IdeaPad Gaming 3',
        (SELECT id FROM categories WHERE code='notebooks'),
        69990, 'img/notebook2.jpg', 4,
        'AMD Ryzen 5 5600H, 8GB RAM, GTX 1650, 512GB SSD, 15.6" 120Hz',
        'Ryzen 5 | GTX 1650 | 8GB RAM'),

    ('Игровой компьютер PowerPC',
        (SELECT id FROM categories WHERE code='computers'),
        119990, 'img/pc1.jpg', 5,
        'Intel Core i9-12900K, RTX 4070, 32GB DDR5, 1TB NVMe SSD',
        'Intel i9 | RTX 4070 | 32GB RAM'),

    ('ПК для работы и учебы OfficeMax',
        (SELECT id FROM categories WHERE code='computers'),
        45990, 'img/pc2.jpg', 4,
        'Intel Core i5-12400, 16GB RAM, Intel UHD 730, 512GB SSD',
        'Intel i5 | Integrated Graphics | 16GB RAM'),

    ('Монитор ASUS TUF Gaming 27"',
        (SELECT id FROM categories WHERE code='monitors'),
        29990, 'img/monitor1.jpg', 5,
        '27" IPS, 2560x1440, 165Hz, 1ms, G-Sync Compatible',
        '27" | QHD | 165Hz'),

    ('Монитор LG UltraWide 34"',
        (SELECT id FROM categories WHERE code='monitors'),
        44990, 'img/monitor2.jpg', 5,
        '34" IPS, 3440x1440, 144Hz, HDR10, FreeSync Premium',
        '34" | UltraWide | 144Hz'),

    ('Клавиатура механическая HyperX Alloy',
        (SELECT id FROM categories WHERE code='keyboards'),
        8990, 'img/keyboard1.jpg', 5,
        'Механическая, RGB подсветка, Cherry MX Red, USB-C',
        'Mechanical | RGB | Cherry MX'),

    ('Клавиатура Logitech G Pro X',
        (SELECT id FROM categories WHERE code='keyboards'),
        12990, 'img/keyboard2.jpg', 4,
        'Механическая, съемные переключатели, TKL, RGB',
        'Mechanical | TKL | Hot-swap'),

    ('Мышь Logitech G502 HERO',
        (SELECT id FROM categories WHERE code='mice'),
        5990, 'img/mouse1.jpg', 5,
        'Игровая, 25600 DPI, 11 программируемых кнопок, RGB',
        '25600 DPI | 11 Buttons | RGB'),

    ('Мышь Razer DeathAdder V3',
        (SELECT id FROM categories WHERE code='mice'),
        6990, 'img/mouse2.jpg', 5,
        'Беспроводная, 30000 DPI, 8 кнопок, до 90 часов работы',
        'Wireless | 30000 DPI | 90h Battery'),

    ('Гарнитура SteelSeries Arctis 7',
        (SELECT id FROM categories WHERE code='headsets'),
        14990, 'img/headset1.jpg', 5,
        'Беспроводная, 7.1 surround, шумоподавление, 24 часа работы',
        'Wireless | 7.1 Surround | 24h'),

    ('Гарнитура HyperX Cloud II',
        (SELECT id FROM categories WHERE code='headsets'),
        7990, 'img/headset2.jpg', 4,
        'Проводная, 7.1 surround, съемный микрофон, USB/3.5mm',
        'Wired | 7.1 Surround | Detachable Mic'),

    ('Геймпад Xbox Wireless Controller',
        (SELECT id FROM categories WHERE code='gamepads'),
        5490, 'img/gamepad1.jpg', 5,
        'Беспроводной, Bluetooth, USB-C, до 40 часов работы',
        'Wireless | Bluetooth | 40h Battery'),

    ('Геймпад Sony DualSense',
        (SELECT id FROM categories WHERE code='gamepads'),
        6490, 'img/gamepad2.jpg', 5,
        'Беспроводной, тактильная отдача, адаптивные триггеры',
        'Wireless | Haptic Feedback | Adaptive Triggers'),

    ('Веб-камера Logitech C920',
        (SELECT id FROM categories WHERE code='accessories'),
        6990, 'img/webcam1.jpg', 4,
        'Full HD 1080p, автофокус, стерео микрофон, 78° обзор',
        '1080p | Auto Focus | Stereo Mic'),

    ('Коврик для мыши SteelSeries QcK',
        (SELECT id FROM categories WHERE code='accessories'),
        1990, 'img/mousepad1.jpg', 5,
        'Тканевая поверхность, 450x400x2мм, прорезиненное основание',
        '450x400mm | Cloth | Non-slip');

-- ─── Покупатели ──────────────────────────────
INSERT INTO customers (name, phone, email, address) VALUES
    ('Денис Барон',  '+7 (913) 768-18-11', 'denis@example.com',  'г. Новосибирск, ул. Ленина, 10'),
    ('Иван Петров',  '+7 (900) 123-45-67', 'ivan@example.com',   'г. Москва, пр. Мира, 25'),
    ('Анна Смирнова','+7 (911) 222-33-44', 'anna@example.com',   'г. СПб, Невский пр., 5');

-- ─── Заказы ──────────────────────────────────
INSERT INTO orders (customer_id, total_price, status) VALUES
    (1, 95980, 'done'),       -- заказ Дениса
    (2, 119990, 'processing'),-- заказ Ивана
    (3, 14980, 'new');        -- заказ Анны

-- ─── Позиции заказов ─────────────────────────
-- Заказ 1: ноутбук + мышь
INSERT INTO order_items (order_id, product_id, quantity, price_at_order) VALUES
    (1, 1, 1, 89990),
    (1, 9, 1, 5990),
-- Заказ 2: игровой ПК
    (2, 3, 1, 119990),
-- Заказ 3: клавиатура + коврик
    (3, 7, 1, 8990),
    (3, 9, 1, 5990);
