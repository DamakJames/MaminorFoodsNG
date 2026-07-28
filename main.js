const products = [
    {
        id: 1,
        name: 'Kunun Acha',
        category: 'Drinks',
        price: 1500,
        image: './public/hero_bottle_scene_1785239677269.png',
        description: 'Refreshing and nourishing drink made from acha, dates, ginger and other natural ingredients. 100% natural, rich in nutrients, no artificial additives.'
    },
    {
        id: 2,
        name: 'Acha (Fonio)',
        category: 'Grains',
        price: 2000,
        image: './public/bowl_acha_grains_1785239686726.png',
        description: 'Premium quality Acha (Fonio) grains. Extremely healthy, gluten-free, and easy to digest. Perfect for your healthy meals.'
    },
    {
        id: 3,
        name: 'Sesame Seed',
        category: 'Seeds',
        price: 2200,
        image: './public/bowl_sesame_seeds_1785239694675.png',
        description: 'Locally sourced brown sesame seeds, rich in healthy fats, protein, B vitamins, minerals, fiber, and antioxidants.'
    },
    {
        id: 4,
        name: 'Ridi',
        category: 'Grains',
        price: 1800,
        image: './public/bowl_ridi_grains_1785239705262.png',
        description: 'High-quality Ridi grains, carefully processed to preserve its natural taste and nutritional benefits.'
    }
];

let cart = [];

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    
    const productGrid = document.getElementById('product-grid');
    const cartBadge = document.getElementById('cart-badge');
    const productModal = document.getElementById('product-modal');
    const checkoutModal = document.getElementById('checkout-modal');
    
    // Render Products
    if(productGrid) {
        productGrid.innerHTML = products.map(product => `
            <div class="product-card">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <span class="product-category">${product.category}</span>
                    <p class="product-price">₦${product.price.toLocaleString()}</p>
                    <button class="btn btn-primary btn-sm block-btn" onclick="openProductModal(${product.id})">View Details</button>
                </div>
            </div>
        `).join('');
    }

    // Modal Close handlers
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.target.closest('.modal-overlay').classList.remove('active');
        });
    });

    // Cart Button
    document.querySelector('.cart-btn').addEventListener('click', () => {
        if(cart.length > 0) {
            openCheckoutModal();
        } else {
            alert("Your cart is empty!");
        }
    });
});

let currentViewedProduct = null;
let currentQuantity = 1;

function openProductModal(id) {
    currentViewedProduct = products.find(p => p.id === id);
    currentQuantity = 1;
    
    document.getElementById('modal-img').src = currentViewedProduct.image;
    document.getElementById('modal-title').textContent = currentViewedProduct.name;
    document.getElementById('modal-price').textContent = `₦${currentViewedProduct.price.toLocaleString()}`;
    document.getElementById('modal-desc').textContent = currentViewedProduct.description;
    document.getElementById('modal-qty').textContent = currentQuantity;
    
    document.getElementById('product-modal').classList.add('active');
}

function updateQuantity(change) {
    if (currentQuantity + change > 0) {
        currentQuantity += change;
        document.getElementById('modal-qty').textContent = currentQuantity;
    }
}

function addToCart() {
    const existing = cart.find(item => item.product.id === currentViewedProduct.id);
    if(existing) {
        existing.quantity += currentQuantity;
    } else {
        cart.push({ product: currentViewedProduct, quantity: currentQuantity });
    }
    
    updateCartBadge();
    document.getElementById('product-modal').classList.remove('active');
    
    // Optional: Show a quick toast or alert
    alert(`${currentQuantity}x ${currentViewedProduct.name} added to cart!`);
}

function updateCartBadge() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-badge').textContent = totalItems;
}

function openCheckoutModal() {
    const orderItems = document.getElementById('order-items');
    let subtotal = 0;
    
    orderItems.innerHTML = cart.map(item => {
        const itemTotal = item.product.price * item.quantity;
        subtotal += itemTotal;
        return `
            <div class="checkout-item">
                <div class="checkout-item-info">
                    <h4>${item.product.name}</h4>
                    <p>₦${item.product.price.toLocaleString()} x ${item.quantity}</p>
                </div>
                <span>₦${itemTotal.toLocaleString()}</span>
            </div>
        `;
    }).join('');
    
    const deliveryFee = 800; // Fixed delivery for demo
    const total = subtotal + deliveryFee;
    
    document.getElementById('checkout-subtotal').textContent = `₦${subtotal.toLocaleString()}`;
    document.getElementById('checkout-total').textContent = `₦${total.toLocaleString()}`;
    
    document.getElementById('checkout-modal').classList.add('active');
}

async function placeOrder(event) {
    event.preventDefault();
    
    const name = document.getElementById('order-name').value;
    const phone = document.getElementById('order-phone').value;
    const address = document.getElementById('order-address').value;
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    
    const orderData = {
        customer: { name, phone, address },
        items: cart.map(item => ({
            name: item.product.name,
            quantity: item.quantity,
            price: item.product.price,
            total: item.product.price * item.quantity
        })),
        paymentMethod,
        totalAmount: document.getElementById('checkout-total').textContent,
        date: new Date().toISOString()
    };
    
    const btn = document.getElementById('place-order-btn');
    btn.textContent = "Processing...";
    btn.disabled = true;

    try {
        // 1. Webhook / API Call (Formspree or custom Webhook)
        // To receive emails to maminorng@gmai.com, you can create a free form on formspree.io and paste the URL here:
        const webhookUrl = "https://formspree.io/f/placeholder"; 
        
        // We catch errors so the Whatsapp flow still works even if the placeholder webhook fails
        await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        }).catch(err => console.log('Webhook placeholder skipped.'));

        // 2. Format WhatsApp Message
        let waMessage = `*New Order - Maminor Foods*\n\n`;
        waMessage += `*Customer:* ${name}\n`;
        waMessage += `*Phone:* ${phone}\n`;
        waMessage += `*Address:* ${address}\n`;
        waMessage += `*Payment:* ${paymentMethod}\n\n`;
        waMessage += `*Items:*\n`;
        
        cart.forEach(item => {
            waMessage += `- ${item.quantity}x ${item.product.name} (₦${(item.product.price * item.quantity).toLocaleString()})\n`;
        });
        
        waMessage += `\n*Total:* ${orderData.totalAmount}`;
        
        const encodedMessage = encodeURIComponent(waMessage);
        const whatsappNumber = "2348107268823"; // Business WhatsApp Number
        
        // 3. Open WhatsApp
        window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
        
        // 4. Clear cart & close
        cart = [];
        updateCartBadge();
        document.getElementById('checkout-modal').classList.remove('active');
        document.getElementById('checkout-form').reset();
        
        alert("Order submitted successfully! You are being redirected to WhatsApp to confirm.");
        
    } catch (error) {
        console.error("Order error", error);
        alert("There was an issue processing your order. Please try again.");
    } finally {
        btn.textContent = "Place Order";
        btn.disabled = false;
    }
}
