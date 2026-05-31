// Инициализация корзины из localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Обновление счетчика корзины
function updateCartCount() {
    const cartCountElements = document.querySelectorAll('#cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElements.forEach(el => {
        if (el) el.textContent = totalItems;
    });
}

// Добавление товара в корзину
function addToCart(productId) {
    const product = productsDatabase.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    saveCart();
    updateCartCount();
    showNotification(`${product.name} добавлен в корзину`);
}

// Удаление товара из корзины
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartCount();
    
    // Если мы на странице корзины, перезагружаем
    if (window.location.pathname.includes('cart.html')) {
        displayCartItems();
    }
}

// Изменение количества товара
function updateQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    if (newQuantity <= 0) {
        removeFromCart(productId);
    } else {
        item.quantity = newQuantity;
        saveCart();
        displayCartItems();
    }
}

// Сохранение корзины в localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Получение общей суммы корзины
function getCartTotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

// Уведомление
function showNotification(message) {
    // Создаем элемент уведомления
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #4CAF50, #45a049);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Удаляем через 3 секунды
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Форматирование цены
function formatPrice(price) {
    return price.toLocaleString('ru-RU') + ' ₽';
}

// Генерация звездного рейтинга
function generateStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        stars += i <= rating ? '★' : '☆';
    }
    return stars;
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    
    // Добавляем стили для анимации
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});
