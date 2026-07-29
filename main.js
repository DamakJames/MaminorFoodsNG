const products = [
    {
        id: 1,
        name: 'Acha Whole Grain',
        category: 'Grains',
        sizes: [
            { label: 'Retail Pack', price: 3500 },
            { label: 'Wholesale (Bulk)', price: 3150 }
        ],
        image: './public/acha-fonio.png',
        description: 'Premium quality Acha (Fonio) whole grains. Extremely healthy, gluten-free, and easy to digest.'
    },
    {
        id: 2,
        name: 'Acha Quick Cook Mix',
        category: 'Grains',
        sizes: [
            { label: 'Retail Pack', price: 3500 },
            { label: 'Wholesale (Bulk)', price: 3150 }
        ],
        image: './public/quick_cook_mix_acha.png',
        description: 'Maminor Acha Quick Cook Mix. A natural gluten-free meal, rich source of Calcium, Iron, and Protein.'
    },
    {
        id: 3,
        name: 'Acha Flour',
        category: 'Flour',
        sizes: [
            { label: 'Retail Pack', price: 3750 },
            { label: 'Wholesale (Bulk)', price: 3375 }
        ],
        image: './public/acha-fonio.png',
        description: 'Finely milled Acha flour, perfect for healthy baking and smooth porridges.'
    },
    {
        id: 4,
        name: 'Special Mix',
        category: 'Grains',
        sizes: [
            { label: 'Retail Pack', price: 4000 },
            { label: 'Wholesale (Bulk)', price: 3600 }
        ],
        image: './public/specil_mix.jpeg',
        description: 'A premium blend of highly nutritious indigenous grains crafted for your everyday vitality.'
    },
    {
        id: 5,
        name: 'Sesame Seed',
        category: 'Seeds',
        sizes: [
            { label: 'Retail Pack', price: 2750 },
            { label: 'Wholesale (Bulk)', price: 2475 }
        ],
        image: './public/sesame.png',
        description: 'Locally sourced brown sesame seeds, rich in healthy fats, protein, and antioxidants.'
    },
    {
        id: 6,
        name: 'Tamba',
        category: 'Grains',
        sizes: [
            { label: 'Retail Pack', price: 2500 },
            { label: 'Wholesale (Bulk)', price: 2250 }
        ],
        image: './public/TAMBA.png',
        description: 'Nutritious Tamba grains carefully processed to preserve natural taste and health benefits.'
    },
    {
        id: 7,
        name: 'Kunu with Dates',
        category: 'Drinks',
        sizes: [
            { label: 'Retail Bottle', price: 1500 },
            { label: 'Wholesale (Bulk)', price: 1300 }
        ],
        image: './public/kunu.png',
        description: 'Refreshing and nourishing Kunu drink sweetened naturally with dates.'
    },
    {
        id: 8,
        name: 'Kunu with Sugar',
        category: 'Drinks',
        sizes: [
            { label: 'Retail Bottle', price: 1200 },
            { label: 'Wholesale (Bulk)', price: 1000 }
        ],
        image: './public/kunu.png',
        description: 'Refreshing and nourishing Kunu drink perfectly sweetened with sugar.'
    }
];

let cart = JSON.parse(localStorage.getItem('maminor_cart')) || [];
let currentViewedProduct = null;
let currentQuantity = 1;
let currentSelectedSizeIndex = 0;

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
                    <p class="product-price">From ₦${product.sizes[0].price.toLocaleString()}</p>
                    <button class="btn btn-primary btn-sm block-btn" onclick="openProductModal(${product.id})">View Details</button>
                </div>
            </div>
        `).join('');
    }

    // Modal Closes
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.target.closest('.modal-overlay').classList.remove('active');
        });
    });

    // Mobile Menu
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    if(mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = navLinks.classList.contains('active') ? 'x' : 'menu';
            mobileBtn.innerHTML = `<i data-lucide="${icon}"></i>`;
            lucide.createIcons();
        });
    }

    // Cart Button
    const cartBtn = document.querySelector('.cart-btn');
    if(cartBtn) {
        cartBtn.addEventListener('click', () => {
            if(cart.length > 0) {
                openCheckoutModal();
            } else {
                alert("Your cart is empty!");
            }
        });
    }

    updateCartBadge();
});

window.openProductModal = (id) => {
    currentViewedProduct = products.find(p => p.id === id);
    currentQuantity = 1;
    currentSelectedSizeIndex = 0;
    
    document.getElementById('modal-img').src = currentViewedProduct.image;
    document.getElementById('modal-title').textContent = currentViewedProduct.name;
    document.getElementById('modal-price').textContent = `₦${currentViewedProduct.sizes[0].price.toLocaleString()}`;
    document.getElementById('modal-desc').textContent = currentViewedProduct.description;
    document.getElementById('modal-qty').textContent = currentQuantity;
    
    // Render Sizes
    const sizesContainer = document.getElementById('modal-sizes');
    if(sizesContainer) {
        sizesContainer.innerHTML = currentViewedProduct.sizes.map((sz, index) => 
            `<button class="size-btn ${index === 0 ? 'active' : ''}" onclick="selectSize(${index})">${sz.label}</button>`
        ).join('');
    }
    
    document.getElementById('product-modal').classList.add('active');
}

window.selectSize = (index) => {
    currentSelectedSizeIndex = index;
    const selectedSize = currentViewedProduct.sizes[index];
    document.getElementById('modal-price').textContent = `₦${selectedSize.price.toLocaleString()}`;
    
    // Update active class
    document.querySelectorAll('.size-btn').forEach((btn, i) => {
        if(i === index) btn.classList.add('active');
        else btn.classList.remove('active');
    });
}

window.updateQuantity = (change) => {
    if(currentQuantity + change > 0) {
        currentQuantity += change;
        document.getElementById('modal-qty').textContent = currentQuantity;
    }
}

window.addToCart = () => {
    const selectedSize = currentViewedProduct.sizes[currentSelectedSizeIndex];
    // Check if same product AND same size exists
    const existing = cart.find(item => item.product.id === currentViewedProduct.id && item.size.label === selectedSize.label);
    
    if(existing) {
        existing.quantity += currentQuantity;
    } else {
        cart.push({ product: currentViewedProduct, size: selectedSize, quantity: currentQuantity });
    }
    
    localStorage.setItem('maminor_cart', JSON.stringify(cart));
    updateCartBadge();
    document.getElementById('product-modal').classList.remove('active');
}

window.removeFromCart = (index) => {
    cart.splice(index, 1);
    localStorage.setItem('maminor_cart', JSON.stringify(cart));
    updateCartBadge();
    
    if(cart.length === 0) {
        document.getElementById('checkout-modal').classList.remove('active');
    } else {
        updateOrderSummary();
    }
}

function updateCartBadge() {
    const badge = document.getElementById('cart-badge');
    if(badge) {
        const total = cart.reduce((sum, item) => sum + item.quantity, 0);
        badge.textContent = total;
    }
}

window.openCheckoutModal = () => {
    updateOrderSummary();
    document.getElementById('checkout-modal').classList.add('active');
}

function updateOrderSummary() {
    const orderItemsContainer = document.getElementById('order-items');
    let subtotal = 0;
    const deliveryFee = 800; // Flat rate for demo
    
    if(orderItemsContainer) {
        orderItemsContainer.innerHTML = cart.map((item, index) => {
            const itemTotal = item.size.price * item.quantity;
            subtotal += itemTotal;
            return `
                <div class="checkout-item" style="position:relative;">
                    <div>
                        <h4>${item.product.name}</h4>
                        <p>${item.size.label} x ${item.quantity}</p>
                    </div>
                    <span>₦${itemTotal.toLocaleString()}</span>
                    <button class="remove-item" onclick="removeFromCart(${index})" style="background:none; border:none; color:var(--color-orange); cursor:pointer; font-size:0.8rem; margin-left:10px;"><i data-lucide="trash-2" size="14"></i></button>
                </div>
            `;
        }).join('');
        
        lucide.createIcons(); // refresh trash icons
    }
    
    document.getElementById('checkout-subtotal').textContent = `₦${subtotal.toLocaleString()}`;
    document.getElementById('checkout-total').textContent = `₦${(subtotal + deliveryFee).toLocaleString()}`;
}

window.placeOrder = async (event) => {
    event.preventDefault();
    
    const btn = document.getElementById('place-order-btn');
    const originalText = btn.innerHTML;
    btn.innerHTML = 'Processing...';
    btn.disabled = true;

    // Calculate Totals
    let subtotal = 0;
    cart.forEach(item => {
        subtotal += item.size.price * item.quantity;
    });
    const deliveryFee = 800;
    const totalAmount = subtotal + deliveryFee;

    const orderData = {
        name: document.getElementById('order-name').value,
        phone: document.getElementById('order-phone').value,
        address: document.getElementById('order-address').value,
        payment: document.querySelector('input[name="payment"]:checked').value,
        items: cart,
        totalAmount: `₦${totalAmount.toLocaleString()}`
    };

    try {
        // 1. Webhook
        const webhookUrl = "https://formspree.io/f/placeholder"; 
        
        await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData)
        }).catch(err => console.log("Webhook skipped or failed."));

        // 2. Format WhatsApp Message
        let waMessage = `*New Order - Maminor Foods*\n\n*Name:* ${orderData.name}\n*Phone:* ${orderData.phone}\n*Address:* ${orderData.address}\n*Payment:* ${orderData.payment}\n\n*Items:*\n`;
        
        cart.forEach(item => {
            waMessage += `- ${item.product.name} (${item.size.label}) x ${item.quantity} = ₦${(item.size.price * item.quantity).toLocaleString()}\n`;
        });
        
        waMessage += `\n*Delivery:* ₦${deliveryFee.toLocaleString()}`;
        waMessage += `\n*Total:* ${orderData.totalAmount}`;
        
        const encodedMessage = encodeURIComponent(waMessage);
        const whatsappNumber = "2348107268823"; // Business WhatsApp Number
        
        // 3. Open WhatsApp
        window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
        
        // 4. Clear cart & close
        cart = [];
        localStorage.setItem('maminor_cart', JSON.stringify(cart));
        updateCartBadge();
        document.getElementById('checkout-modal').classList.remove('active');
        document.getElementById('checkout-form').reset();
        
    } catch (error) {
        console.error("Order processing error:", error);
        alert("Something went wrong processing your order. Please try again.");
    } finally {
        btn.innerHTML = originalText;
        btn.disabled = false;
    }
}
