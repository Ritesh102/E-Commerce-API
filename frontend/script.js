const API_BASE = 'http://localhost:5000';
let token = '';

// ------------------- Auth -------------------

async function register() {
    const body = {
        name: document.getElementById('regName').value,
        email: document.getElementById('regEmail').value,
        password: document.getElementById('regPassword').value,
        role: document.getElementById('regRole').value,
    };

    const res = await fetch(`${API_BASE}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });

    const data = await res.json();
    if (!res.ok) return alert(data.message || '❌ Registration failed');
    alert('✅ Registration successful!');
}

async function login() {
    const body = {
        email: document.getElementById('loginEmail').value,
        password: document.getElementById('loginPassword').value,
    };

    const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });

    const data = await res.json();
    if (!res.ok) return alert(data.message || '❌ Login failed');

    token = data.token;
    document.getElementById('tokenDisplay').textContent = 'JWT Token: ' + token;
    alert('✅ Login successful!');
}

// ------------------- Products -------------------

async function fetchProducts() {
    const res = await fetch(`${API_BASE}/api/products`, {
        headers: { Authorization: 'Bearer ' + token }
    });

    const products = await res.json();
    if (!res.ok) return alert(products.message || '❌ Failed to fetch products');

    const list = document.getElementById('productList');
    list.innerHTML = '';
    products.forEach((p) => {
        const div = document.createElement('div');
        div.className = 'product';
        const addBtn = document.createElement('button');
        addBtn.textContent = 'Add to Cart';
        addBtn.addEventListener('click', () => addToCart(p._id));

        div.innerHTML = `<strong>${p.name}</strong> - ₹${p.price}<br><em>${p.description}</em><br>`;
        div.appendChild(addBtn);
        list.appendChild(div);
    });
}

async function addProduct() {
    const name = prompt("Enter product name:");
    const description = prompt("Enter description:");
    const category = prompt("Enter category:");
    const price = parseFloat(prompt("Enter price:"));

    const res = await fetch(`${API_BASE}/api/products`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify({ name, description, category, price }),
    });

    const data = await res.json();
    if (!res.ok) return alert(data.message || '❌ Failed to add product');
    alert('✅ Product added!');
    fetchProducts();
}

// ------------------- Cart -------------------

async function addToCart(productId) {
    const res = await fetch(`${API_BASE}/api/cart`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify({ productId, quantity: 1 }),
    });

    const data = await res.json();
    if (!res.ok) return alert(data.message || '❌ Failed to add to cart');
    alert('✅ Product added to cart');
}

async function viewCart() {
    const res = await fetch(`${API_BASE}/api/cart`, {
        headers: { Authorization: 'Bearer ' + token }
    });

    const cart = await res.json();
    if (!res.ok) return alert(cart.message || '❌ Failed to fetch cart');

    if (!cart.items || cart.items.length === 0) {
        alert('🛒 Your cart is empty');
        return;
    }

    const itemList = cart.items.map(i => `${i.product.name} x${i.quantity}`).join('\n');
    alert(`🛒 Your Cart:\n\n${itemList}`);
}

// ------------------- Orders -------------------

async function placeOrder() {
    const res = await fetch(`${API_BASE}/api/orders`, {
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + token
        }
    });

    const data = await res.json();
    if (!res.ok) return alert(data.message || '❌ Failed to place order');
    alert('✅ Order placed successfully!');
}

async function viewOrders() {
    const res = await fetch(`${API_BASE}/api/orders`, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    });

    const orders = await res.json();
    if (!res.ok) return alert(orders.message || '❌ Failed to fetch orders');

    if (!orders.length) {
        return alert('📦 No orders yet.');
    }

    let output = '📦 Your Orders:\n\n';
    orders.forEach((order, i) => {
        output += `#${i + 1} - ${order.items.map(it => `${it.product.name} x${it.quantity}`).join(', ')}\n`;
    });

    alert(output);
}

// ------------------- Event Listeners -------------------

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('registerBtn')?.addEventListener('click', register);
    document.getElementById('loginBtn')?.addEventListener('click', login);
    document.getElementById('fetchProductsBtn')?.addEventListener('click', fetchProducts);
    document.getElementById('addProductBtn')?.addEventListener('click', addProduct);
    document.getElementById('viewCartBtn')?.addEventListener('click', viewCart);
    document.getElementById('placeOrderBtn')?.addEventListener('click', placeOrder);
    document.getElementById('viewOrdersBtn')?.addEventListener('click', viewOrders);
});
