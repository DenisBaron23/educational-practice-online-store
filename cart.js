// Отображение товаров в корзине
function displayCartItems() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const summaryContainer = document.querySelector('.cart-summary');
    
    if (!cartItemsContainer) return;
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div style="text-align: center; padding: 60px 20px;">
                <h2 style="color: #fff; margin-bottom: 20px;">Корзина пуста</h2>
                <p style="color: rgba(255,255,255,0.7); margin-bottom: 30px;">Добавьте товары для оформления заказа</p>
                <a href="index.html" class="checkout-btn">Перейти к покупкам</a>
            </div>
        `;
        
        summaryContainer.innerHTML = `
            <h2 class="summary-title">В ЗАКАЗЕ</h2>
            <div class="summary-row">
                <span>ТОВАРЫ</span>
                <span class="summary-value">0</span>
            </div>
            <div class="summary-row">
                <span>СУММА</span>
                <span class="summary-value">0 ₽</span>
            </div>
            <div class="summary-row summary-total">
                <span>ИТОГО</span>
                <span class="summary-value">0 ₽</span>
            </div>
        `;
        return;
    }
    
    // Отображаем товары
    const itemsHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="item-image" onerror="this.src='img/placeholder.jpg'">
            <div class="item-details">
                <div class="item-name">${item.name}</div>
                <div class="item-specs">${item.specs}</div>
            </div>
            <div class="item-quantity">
                <button class="qty-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                <input type="number" class="qty-input" value="${item.quantity}" min="1" 
                    onchange="updateQuantity(${item.id}, parseInt(this.value))">
                <button class="qty-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
            </div>
            <div class="item-price">${formatPrice(item.price * item.quantity)}</div>
            <button class="remove-btn" onclick="removeFromCart(${item.id})" title="Удалить">×</button>
        </div>
    `).join('');
    
    cartItemsContainer.innerHTML = `
        <h2 class="section-title">Ваши покупки</h2>
        ${itemsHTML}
    `;
    
    // Обновляем итоговую информацию
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = getCartTotal();
    
    summaryContainer.innerHTML = `
        <h2 class="summary-title">В ЗАКАЗЕ</h2>
        <div class="summary-row">
            <span>ТОВАРЫ</span>
            <span class="summary-value">${totalItems}</span>
        </div>
        <div class="summary-row">
            <span>СУММА</span>
            <span class="summary-value">${formatPrice(totalPrice)}</span>
        </div>
        <div class="summary-row summary-total">
            <span>ИТОГО</span>
            <span class="summary-value">${formatPrice(totalPrice)}</span>
        </div>
        <button class="checkout-btn" onclick="window.location.href='checkout.html'">ОФОРМЛЕНИЕ ЗАКАЗА</button>
    `;
}

// Инициализация страницы корзины
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('cart.html')) {
        displayCartItems();
    }
});
