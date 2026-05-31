let currentCategory = 'all';
let filteredProducts = [];
let filters = {
    priceMin: 0,
    priceMax: Infinity,
    rating: []
};

// Получение категории из URL
function getCategoryFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('cat') || 'all';
}

// Фильтрация товаров
function filterProducts() {
    let products = currentCategory === 'all' 
        ? productsDatabase 
        : productsDatabase.filter(p => p.category === currentCategory);
    
    // Фильтр по цене
    products = products.filter(p => 
        p.price >= filters.priceMin && p.price <= filters.priceMax
    );
    
    // Фильтр по рейтингу
    if (filters.rating.length > 0) {
        products = products.filter(p => filters.rating.includes(p.rating));
    }
    
    return products;
}

// Сортировка товаров
function sortProducts(products, sortType) {
    const sorted = [...products];
    
    switch(sortType) {
        case 'price-asc':
            return sorted.sort((a, b) => a.price - b.price);
        case 'price-desc':
            return sorted.sort((a, b) => b.price - a.price);
        case 'rating-desc':
            return sorted.sort((a, b) => b.rating - a.rating);
        case 'name-asc':
            return sorted.sort((a, b) => a.name.localeCompare(b.name));
        default:
            return sorted;
    }
}

// Отображение товаров
function displayProducts() {
    filteredProducts = filterProducts();
    const sortType = document.getElementById('sort-select')?.value || 'default';
    const sortedProducts = sortProducts(filteredProducts, sortType);
    
    const productsGrid = document.getElementById('products-grid');
    const resultsCount = document.getElementById('results-count');
    
    if (!productsGrid) return;
    
    // Обновляем счетчик
    if (resultsCount) {
        resultsCount.textContent = sortedProducts.length;
    }
    
    if (sortedProducts.length === 0) {
        productsGrid.innerHTML = `
            <div class="no-products">
                <p>Товары не найдены</p>
                <p>Попробуйте изменить фильтры</p>
            </div>
        `;
        return;
    }
    
    productsGrid.innerHTML = sortedProducts.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image" 
                onerror="this.src='img/placeholder.jpg'">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-rating">
                    <span class="stars">${generateStars(product.rating)}</span>
                    <span class="rating-value">(${product.rating}.0)</span>
                </div>
                <div class="product-price">${formatPrice(product.price)}</div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                    В корзину
                </button>
            </div>
        </div>
    `).join('');
}

// Настройка фильтров
function setupFilters() {
    // Фильтр цены
    const priceMin = document.getElementById('price-min');
    const priceMax = document.getElementById('price-max');
    const priceSlider = document.getElementById('price-slider');
    const maxPriceLabel = document.getElementById('max-price-label');
    
    if (priceSlider) {
        const maxPrice = Math.max(...productsDatabase.map(p => p.price));
        priceSlider.max = maxPrice;
        priceSlider.value = maxPrice;
        maxPriceLabel.textContent = formatPrice(maxPrice);
        filters.priceMax = maxPrice;
        
        priceSlider.addEventListener('input', function() {
            filters.priceMax = parseInt(this.value);
            maxPriceLabel.textContent = formatPrice(filters.priceMax);
            if (priceMax) priceMax.value = filters.priceMax;
            displayProducts();
        });
    }
    
    if (priceMin) {
        priceMin.addEventListener('change', function() {
            filters.priceMin = parseInt(this.value) || 0;
            displayProducts();
        });
    }
    
    if (priceMax) {
        priceMax.addEventListener('change', function() {
            filters.priceMax = parseInt(this.value) || Infinity;
            if (priceSlider) priceSlider.value = filters.priceMax;
            displayProducts();
        });
    }
    
    // Фильтр рейтинга
    const ratingCheckboxes = document.querySelectorAll('.rating-checkbox');
    ratingCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const rating = parseInt(this.value);
            if (this.checked) {
                filters.rating.push(rating);
            } else {
                filters.rating = filters.rating.filter(r => r !== rating);
            }
            displayProducts();
        });
    });
    
    // Сортировка
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', displayProducts);
    }
    
    // Сброс фильтров
    const resetBtn = document.getElementById('reset-filters');
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            filters = {
                priceMin: 0,
                priceMax: Math.max(...productsDatabase.map(p => p.price)),
                rating: []
            };
            
            if (priceMin) priceMin.value = '';
            if (priceMax) priceMax.value = '';
            if (priceSlider) priceSlider.value = filters.priceMax;
            
            ratingCheckboxes.forEach(cb => cb.checked = false);
            
            displayProducts();
        });
    }
}

// Инициализация страницы категории
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('category.html')) {
        currentCategory = getCategoryFromURL();
        
        // Обновляем заголовок
        const categoryTitle = document.getElementById('category-title');
        const currentCategorySpan = document.getElementById('current-category');
        
        if (categoryTitle) {
            categoryTitle.textContent = categories[currentCategory] || 'Все товары';
        }
        
        if (currentCategorySpan) {
            currentCategorySpan.textContent = categories[currentCategory] || 'Все товары';
        }
        
        setupFilters();
        displayProducts();
    }
});
