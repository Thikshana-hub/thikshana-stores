let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

function addToCart(name, price) {
    const existingItem = cartItems.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({ name, price, quantity: 1 });
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartCount();
}

function updateCartCount() {
    document.getElementById('cart-count').innerText = cartItems.reduce((acc, item) => acc + item.quantity, 0);
}

function displayCartItems() {
    const cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = '';
    cartItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.innerText = `${item.name} - $${item.price} x ${item.quantity}`;
        cartContainer.appendChild(itemElement);
    });
}

function sendOrder() {
    const orderMessage = cartItems.map(item => `${item.quantity} x ${item.name}`).join(', ');
    const url = `https://wa.me/0767043019?text=I'd like to place an order for: ${orderMessage}`;
    window.open(url, '_blank');
}

updateCartCount();
displayCartItems();
