// Load cart from localStorage or initialize empty array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart count in header on page load
updateCartCount();

// Function to add item to cart
function addToCart(id, name, price) {
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Function to remove item from cart
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    displayCart();
}

// Function to update cart count in header
function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = cartCount;
}

// Function to display cart items
function displayCart() {
    const cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = `
            <p>${item.name} - $${item.price.toFixed(2)} x ${item.quantity}</p>
            <button class="remove-from-cart" data-id="${item.id}">Remove</button>
        `;
        cartItemsDiv.appendChild(itemDiv);
        total += item.price * item.quantity;
    });

    document.getElementById('cart-total').textContent = total.toFixed(2);

    // Add event listeners to remove buttons
    const removeButtons = document.querySelectorAll('.remove-from-cart');
    removeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const id = button.dataset.id;
            removeFromCart(id);
        });
    });
}

// Populate featured products on homepage
if (document.getElementById('featured-products-grid')) {
    const featuredProducts = products.slice(0, 3);
    const grid = document.getElementById('featured-products-grid');
    featuredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.dataset.id = product.id;
        productCard.dataset.name = product.name;
        productCard.dataset.price = product.price;
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button class="add-to-cart">Add to Cart</button>
        `;
        grid.appendChild(productCard);
    });

    // Add event listeners to "Add to Cart" buttons
    const addToCartButtons = grid.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productCard = button.closest('.product-card');
            const id = productCard.dataset.id;
            const name = productCard.dataset.name;
            const price = parseFloat(productCard.dataset.price);
            addToCart(id, name, price);
        });
    });
}

// Populate all products on shop page
if (document.getElementById('shop-products-grid')) {
    const grid = document.getElementById('shop-products-grid');
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.dataset.id = product.id;
        productCard.dataset.name = product.name;
        productCard.dataset.price = product.price;
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button class="add-to-cart">Add to Cart</button>
        `;
        grid.appendChild(productCard);
    });

    // Add event listeners to "Add to Cart" buttons
    const addToCartButtons = grid.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productCard = button.closest('.product-card');
            const id = productCard.dataset.id;
            const name = productCard.dataset.name;
            const price = parseFloat(productCard.dataset.price);
            addToCart(id, name, price);
        });
    });
}

// Display cart on cart page
if (document.getElementById('cart-items')) {
    displayCart();
}

// Handle checkout form submission
if (document.getElementById('checkout-form')) {
    document.getElementById('checkout-form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Order placed successfully!');
        cart = [];
        localStorage.removeItem('cart');
        updateCartCount();
        window.location.href = 'index.html';
    });
}

// Handle contact form submission
if (document.getElementById('contact-form')) {
    document.getElementById('contact-form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Message sent successfully!');
        e.target.reset();
    });
}