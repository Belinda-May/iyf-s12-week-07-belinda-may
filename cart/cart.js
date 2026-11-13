
// 1. Centralized application state
const state = {
    products: [
        {
            id: 1,
            name: 'Mandazi (pack of 6)',
            price: 120,
            image: 'https://commons.wikimedia.org/wiki/Special:FilePath/MANDAZI_UGANDAN_BREAKFAST_SNACK.jpg?utm_source=chatgpt.com'
        },
        {
            id: 2,
            name: 'Chapati (pack of 5)',
            price: 150,
            image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Chapati_kenya.jpg?utm_source=chatgpt.com'
        },
        {
            id: 3,
            name: 'Tea leaves 250g',
            price: 180,
            image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Ceylon_tea_Leafs.JPG?utm_source=chatgpt.com'
        }
    ],

    cart: []
};

// 2. Save cart to localStorage
function saveCart() {
    localStorage.setItem('shopping-cart', JSON.stringify(state.cart));
}

// 3. Load previously saved cart
function loadCart() {
    try {
        const savedCart = localStorage.getItem('shopping-cart');

        if (!savedCart) return [];

        const parsedCart = JSON.parse(savedCart);

        if (!Array.isArray(parsedCart)) return [];

        return parsedCart.filter((item) =>
            state.products.some((product) =>
                product.id === item.productId
            ) &&
            Number.isInteger(item.quantity) &&
            item.quantity > 0
        );
    } catch {
        return [];
    }
}

// Restore cart when the page loads
state.cart = loadCart();

// 4. Add a product to the cart
function addToCart(productId) {
    const existing = state.cart.find(
        (item) => item.productId === productId
    );

    if (existing) {
        existing.quantity++;
    } else {
        state.cart.push({
            productId,
            quantity: 1
        });
    }

    saveCart();
    renderCart();
}

// 5. Update product quantity
function updateQuantity(productId, quantity) {
    if (quantity <= 0) {
        removeFromCart(productId);
        return;
    }

    const item = state.cart.find(
        (item) => item.productId === productId
    );

    if (!item) return;

    item.quantity = quantity;

    saveCart();
    renderCart();
}

// 6. Remove a product from the cart
function removeFromCart(productId) {
    state.cart = state.cart.filter(
        (item) => item.productId !== productId
    );

    saveCart();
    renderCart();
}

// 7. Clear the entire cart
function clearCart() {
    state.cart = [];

    saveCart();
    renderCart();
}

// 8. Calculate the total price
function getCartTotal() {
    return state.cart.reduce((total, item) => {
        const product = state.products.find(
            (product) => product.id === item.productId
        );

        return total + product.price * item.quantity;
    }, 0);
}

// 9. Calculate the total number of items
function getCartCount() {
    return state.cart.reduce(
        (count, item) => count + item.quantity,
        0
    );
}

// 10. Display available products
function renderProducts() {
    const productList = document.querySelector('#product-list');

    productList.textContent = '';

    state.products.forEach((product) => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');

        const image = document.createElement('img');
        image.src = product.image;
        image.alt = product.name;
        image.width = 100;

        const name = document.createElement('h3');
        name.textContent = product.name;

        const price = document.createElement('p');
        price.textContent = `KSh ${product.price}`;

        const button = document.createElement('button');
        button.textContent = 'Add to Cart';
        button.dataset.id = product.id;
        button.classList.add('add-btn');

        productDiv.append(image, name, price, button);
        productList.appendChild(productDiv);
    });
}

// 11. Display cart items and update totals
function renderCart() {
    const cartItems = document.querySelector('#cart-items');
    const cartCount = document.querySelector('#cart-count');
    const cartTotal = document.querySelector('#cart-total');

    cartItems.textContent = '';

    if (state.cart.length === 0) {
        cartItems.textContent = 'Your cart is empty.';
    }

    state.cart.forEach((item) => {
        const product = state.products.find(
            (product) => product.id === item.productId
        );

        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');

        const name = document.createElement('h3');
        name.textContent = product.name;

        const subtotal = document.createElement('p');
        subtotal.textContent = `KSh ${product.price * item.quantity}`;

        const quantity = document.createElement('span');
        quantity.textContent = `Quantity: ${item.quantity}`;

        const decreaseButton = document.createElement('button');
        decreaseButton.textContent = '-';
        decreaseButton.classList.add('decrease-btn');
        decreaseButton.dataset.id = product.id;

        const increaseButton = document.createElement('button');
        increaseButton.textContent = '+';
        increaseButton.classList.add('increase-btn');
        increaseButton.dataset.id = product.id;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn');
        removeButton.dataset.id = product.id;

        itemDiv.append(
            name,
            subtotal,
            decreaseButton,
            quantity,
            increaseButton,
            removeButton
        );

        cartItems.appendChild(itemDiv);
    });

    cartCount.textContent = getCartCount();
    cartTotal.textContent = `Total: KSh ${getCartTotal()}`;
}

const productList = document.querySelector('#product-list');
const cartItems = document.querySelector('#cart-items');
const clearCartButton = document.querySelector('#clear-cart');

// Handle Add to Cart
productList.addEventListener('click', (event) => {
    if (!event.target.classList.contains('add-btn')) return;

    const productId = Number(event.target.dataset.id);
    addToCart(productId);
});

// Handle quantity changes and removal
cartItems.addEventListener('click', (event) => {
    const productId = Number(event.target.dataset.id);

    if (event.target.classList.contains('increase-btn')) {
        const item = state.cart.find(
            (item) => item.productId === productId
        );
        updateQuantity(productId, item.quantity + 1);
    }

    if (event.target.classList.contains('decrease-btn')) {
        const item = state.cart.find(
            (item) => item.productId === productId
        );
        updateQuantity(productId, item.quantity - 1);
    }

    if (event.target.classList.contains('remove-btn')) {
        removeFromCart(productId);
    }
});

// Handle clearing the cart
clearCartButton.addEventListener('click', clearCart);

// Initial page rendering
renderProducts();
renderCart();
