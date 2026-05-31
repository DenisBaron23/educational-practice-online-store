// База данных товаров
const productsDatabase = [
    {
        id: 1,
        name: "Игровой ноутбук ASUS ROG Strix G15",
        category: "notebooks",
        price: 89990,
        image: "img/notebook1.jpg",
        rating: 5,
        description: "Intel Core i7-12700H, 16GB RAM, RTX 3060, 512GB SSD, 15.6\" 144Hz",
        specs: "Intel i7 | RTX 3060 | 16GB RAM"
    },
    {
        id: 2,
        name: "Ноутбук Lenovo IdeaPad Gaming 3",
        category: "notebooks",
        price: 69990,
        image: "img/notebook2.jpg",
        rating: 4,
        description: "AMD Ryzen 5 5600H, 8GB RAM, GTX 1650, 512GB SSD, 15.6\" 120Hz",
        specs: "Ryzen 5 | GTX 1650 | 8GB RAM"
    },
    {
        id: 3,
        name: "Игровой компьютер PowerPC",
        category: "computers",
        price: 119990,
        image: "img/pc1.jpg",
        rating: 5,
        description: "Intel Core i9-12900K, RTX 4070, 32GB DDR5, 1TB NVMe SSD",
        specs: "Intel i9 | RTX 4070 | 32GB RAM"
    },
    {
        id: 4,
        name: "ПК для работы и учебы OfficeMax",
        category: "computers",
        price: 45990,
        image: "img/pc2.jpg",
        rating: 4,
        description: "Intel Core i5-12400, 16GB RAM, Intel UHD 730, 512GB SSD",
        specs: "Intel i5 | Integrated Graphics | 16GB RAM"
    },
    {
        id: 5,
        name: "Монитор ASUS TUF Gaming 27\"",
        category: "monitors",
        price: 29990,
        image: "img/monitor1.jpg",
        rating: 5,
        description: "27\" IPS, 2560x1440, 165Hz, 1ms, G-Sync Compatible",
        specs: "27\" | QHD | 165Hz"
    },
    {
        id: 6,
        name: "Монитор LG UltraWide 34\"",
        category: "monitors",
        price: 44990,
        image: "img/monitor2.jpg",
        rating: 5,
        description: "34\" IPS, 3440x1440, 144Hz, HDR10, FreeSync Premium",
        specs: "34\" | UltraWide | 144Hz"
    },
    {
        id: 7,
        name: "Клавиатура механическая HyperX Alloy",
        category: "keyboards",
        price: 8990,
        image: "img/keyboard1.jpg",
        rating: 5,
        description: "Механическая, RGB подсветка, Cherry MX Red, USB-C",
        specs: "Mechanical | RGB | Cherry MX"
    },
    {
        id: 8,
        name: "Клавиатура Logitech G Pro X",
        category: "keyboards",
        price: 12990,
        image: "img/keyboard2.jpg",
        rating: 4,
        description: "Механическая, съемные переключатели, TKL, RGB",
        specs: "Mechanical | TKL | Hot-swap"
    },
    {
        id: 9,
        name: "Мышь Logitech G502 HERO",
        category: "mice",
        price: 5990,
        image: "img/mouse1.jpg",
        rating: 5,
        description: "Игровая, 25600 DPI, 11 программируемых кнопок, RGB",
        specs: "25600 DPI | 11 Buttons | RGB"
    },
    {
        id: 10,
        name: "Мышь Razer DeathAdder V3",
        category: "mice",
        price: 6990,
        image: "img/mouse2.jpg",
        rating: 5,
        description: "Беспроводная, 30000 DPI, 8 кнопок, до 90 часов работы",
        specs: "Wireless | 30000 DPI | 90h Battery"
    },
    {
        id: 11,
        name: "Гарнитура SteelSeries Arctis 7",
        category: "headsets",
        price: 14990,
        image: "img/headset1.jpg",
        rating: 5,
        description: "Беспроводная, 7.1 surround, шумоподавление, 24 часа работы",
        specs: "Wireless | 7.1 Surround | 24h"
    },
    {
        id: 12,
        name: "Гарнитура HyperX Cloud II",
        category: "headsets",
        price: 7990,
        image: "img/headset2.jpg",
        rating: 4,
        description: "Проводная, 7.1 surround, съемный микрофон, USB/3.5mm",
        specs: "Wired | 7.1 Surround | Detachable Mic"
    },
    {
        id: 13,
        name: "Геймпад Xbox Wireless Controller",
        category: "gamepads",
        price: 5490,
        image: "img/gamepad1.jpg",
        rating: 5,
        description: "Беспроводной, Bluetooth, USB-C, до 40 часов работы",
        specs: "Wireless | Bluetooth | 40h Battery"
    },
    {
        id: 14,
        name: "Геймпад Sony DualSense",
        category: "gamepads",
        price: 6490,
        image: "img/gamepad2.jpg",
        rating: 5,
        description: "Беспроводной, тактильная отдача, адаптивные триггеры",
        specs: "Wireless | Haptic Feedback | Adaptive Triggers"
    },
    {
        id: 15,
        name: "Веб-камера Logitech C920",
        category: "accessories",
        price: 6990,
        image: "img/webcam1.jpg",
        rating: 4,
        description: "Full HD 1080p, автофокус, стерео микрофон, 78° обзор",
        specs: "1080p | Auto Focus | Stereo Mic"
    },
    {
        id: 16,
        name: "Коврик для мыши SteelSeries QcK",
        category: "accessories",
        price: 1990,
        image: "img/mousepad1.jpg",
        rating: 5,
        description: "Тканевая поверхность, 450x400x2мм, прорезиненное основание",
        specs: "450x400mm | Cloth | Non-slip"
    }
];

// Категории товаров
const categories = {
    computers: "Компьютеры",
    notebooks: "Ноутбуки",
    monitors: "Мониторы",
    keyboards: "Клавиатуры",
    mice: "Компьютерные мыши",
    headsets: "Гарнитура",
    gamepads: "Геймпады",
    accessories: "Аксессуары"
};
