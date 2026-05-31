// Отображение товаров в чекауте
function displayCheckoutSummary() {
    const summaryItems = document.querySelector('.summary-items');
    const summaryTotals = document.querySelector('.summary-totals');
    
    if (!summaryItems || !summaryTotals) return;
    
    if (cart.length === 0) {
        window.location.href = 'cart.html';
        return;
    }
    
    // Отображаем товары
    summaryItems.innerHTML = cart.map(item => `
        <div class="summary-item">
            <span>${item.name} × ${item.quantity}</span>
            <span class="item-count">${formatPrice(item.price * item.quantity)}</span>
        </div>
    `).join('');
    
    // Итоговая сумма
    const totalPrice = getCartTotal();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    summaryTotals.innerHTML = `
        <div class="summary-row">
            <span>СУММА (${totalItems} товара)</span>
            <span class="summary-value">${formatPrice(totalPrice)}</span>
        </div>
        <div class="summary-row total-row">
            <span>ИТОГО</span>
            <span class="summary-value total-value">${formatPrice(totalPrice)}</span>
        </div>
    `;
}

// Обработка формы заказа
function handleOrderSubmit(event) {
    event.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        address: document.getElementById('address').value,
        items: cart,
        total: getCartTotal(),
        date: new Date().toISOString()
    };
    
    // Сохраняем заказ
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(formData);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // Очищаем корзину
    cart = [];
    saveCart();
    updateCartCount();
    
    // Показываем уведомление
    alert(`Спасибо за заказ, ${formData.name}!\n\nВаш заказ на сумму ${formatPrice(formData.total)} принят в обработку.\nМы свяжемся с вами по телефону ${formData.phone}`);
    
    // Перенаправляем на главную
    window.location.href = 'index.html';
}

// Инициализация страницы оформления
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('checkout.html')) {
        displayCheckoutSummary();
        
        const orderForm = document.getElementById('orderForm');
        if (orderForm) {
            orderForm.addEventListener('submit', handleOrderSubmit);
        }
    }
});
