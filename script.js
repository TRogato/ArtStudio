// Global variables
let products = [];
let cart = [];
let currentProduct = null;

// DOM Elements
const elements = {
    carouselTrack: document.getElementById('carousel-track'),
    productsGrid: document.getElementById('products-grid'),
    cartBtn: document.getElementById('cart-btn'),
    cartCount: document.getElementById('cart-count'),
    productModal: document.getElementById('product-modal'),
    modalTitle: document.getElementById('modal-title'),
    modalBody: document.getElementById('modal-body'),
    modalClose: document.getElementById('modal-close'),
    modalCloseBtn: document.getElementById('modal-close-btn'),
    addToCartBtn: document.getElementById('add-to-cart-btn'),
    cartModal: document.getElementById('cart-modal'),
    cartModalClose: document.getElementById('cart-modal-close'),
    cartModalBody: document.getElementById('cart-modal-body'),
    clearCartBtn: document.getElementById('clear-cart-btn'),
    checkoutBtn: document.getElementById('checkout-btn'),
    contactForm: document.getElementById('contact-form'),
    whatsappBtn: document.getElementById('whatsapp-btn'),
    menuToggle: document.getElementById('menu-toggle')
};

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    initializeCarousel();
    loadProducts();
    setupEventListeners();
    updateCartDisplay();
});

// Initialize infinite carousel
function initializeCarousel() {
    const carouselImages = [
        'images/r38cKXPtRAZ5.jpg',
        'images/BuvfH47mUoX5.png',
        'images/D3ch2RmEw5ME.jpg',
        'images/a0kcqatXzAyg.jpg'
    ];
    
    // Create carousel items (duplicate for infinite effect)
    const allImages = [...carouselImages, ...carouselImages];
    
    elements.carouselTrack.innerHTML = '';
    
    allImages.forEach((imagePath, index) => {
        const item = document.createElement('div');
        item.className = 'carousel-item';
        item.style.backgroundImage = `url('${imagePath}')`;
        elements.carouselTrack.appendChild(item);
    });
}

// Load products from JSON
async function loadProducts() {
    try {
        const response = await fetch('products.json');
        const data = await response.json();
        
        // Transform stock data to visual art products
        products = transformStockToProducts(data.slice(0, 12)); // Limit to 12 products
        renderProducts();
    } catch (error) {
        console.error('Error loading products:', error);
        showError('Erro ao carregar produtos');
    }
}

// Transform stock data to visual art products
function transformStockToProducts(stockData) {
    const productTypes = [
        { name: 'Banner Promocional', icon: 'fas fa-flag', category: 'Impressão' },
        { name: 'Fachada Comercial', icon: 'fas fa-store', category: 'Fachadas' },
        { name: 'Adesivo Decorativo', icon: 'fas fa-sticky-note', category: 'Adesivos' },
        { name: 'Letra Caixa 3D', icon: 'fas fa-cube', category: 'Letras' },
        { name: 'Placa Informativa', icon: 'fas fa-info-circle', category: 'Placas' },
        { name: 'Totem Publicitário', icon: 'fas fa-monument', category: 'Totens' },
        { name: 'Painel LED', icon: 'fas fa-tv', category: 'Digital' },
        { name: 'Luminoso Neon', icon: 'fas fa-lightbulb', category: 'Luminosos' },
        { name: 'Wind Banner', icon: 'fas fa-wind', category: 'Banners' },
        { name: 'Placa de Obra', icon: 'fas fa-hard-hat', category: 'Construção' },
        { name: 'Sinalização Interna', icon: 'fas fa-directions', category: 'Sinalização' },
        { name: 'Display Promocional', icon: 'fas fa-desktop', category: 'Displays' }
    ];
    
    return stockData.map((item, index) => {
        const productType = productTypes[index % productTypes.length];
        const basePrice = Math.round(item.Price * 2.5); // Convert to BRL and adjust
        
        return {
            id: index + 1,
            name: productType.name,
            category: productType.category,
            description: `${productType.name} de alta qualidade, ideal para comunicação visual impactante. Dimensões personalizáveis conforme sua necessidade.`,
            price: basePrice,
            originalPrice: Math.round(basePrice * 1.3),
            icon: productType.icon,
            specifications: {
                material: item.Logs,
                dimensions: item.Size,
                thickness: `${item.Thickness}mm`,
                grade: item.Grade,
                stock: item.Crates
            },
            features: [
                'Material de alta qualidade',
                'Impressão em alta resolução',
                'Resistente às intempéries',
                'Instalação profissional',
                'Garantia de 2 anos'
            ]
        };
    });
}

// Render products grid
function renderProducts() {
    elements.productsGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = createProductCard(product);
        elements.productsGrid.appendChild(productCard);
    });
}

// Create product card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.onclick = () => showProductModal(product);
    
    const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    
    card.innerHTML = `
        <div class="product-image">
            <i class="${product.icon}"></i>
            ${discountPercent > 0 ? `<div class="discount-badge">-${discountPercent}%</div>` : ''}
        </div>
        <div class="product-content">
            <div class="product-category">${product.category}</div>
            <h3 class="product-title">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-pricing">
                ${product.originalPrice > product.price ? 
                    `<span class="original-price">R$ ${product.originalPrice.toLocaleString()}</span>` : ''
                }
                <span class="product-price">R$ ${product.price.toLocaleString()}</span>
            </div>
            <div class="product-actions">
                <button class="btn btn-secondary btn-small" onclick="event.stopPropagation(); showProductModal(${product.id})">
                    <i class="fas fa-eye"></i> Ver Detalhes
                </button>
                <button class="btn btn-primary btn-small" onclick="event.stopPropagation(); addToCart(${product.id})">
                    <i class="fas fa-cart-plus"></i> Adicionar
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// Show product modal
function showProductModal(productId) {
    const product = typeof productId === 'object' ? productId : products.find(p => p.id === productId);
    if (!product) return;
    
    currentProduct = product;
    
    elements.modalTitle.textContent = product.name;
    elements.modalBody.innerHTML = `
        <div class="product-modal-content">
            <div class="product-modal-image">
                <i class="${product.icon}"></i>
            </div>
            <div class="product-modal-details">
                <div class="product-modal-category">${product.category}</div>
                <h3>${product.name}</h3>
                <p class="product-modal-description">${product.description}</p>
                
                <div class="product-pricing">
                    ${product.originalPrice > product.price ? 
                        `<span class="original-price">R$ ${product.originalPrice.toLocaleString()}</span>` : ''
                    }
                    <span class="product-price">R$ ${product.price.toLocaleString()}</span>
                </div>
                
                <div class="product-specifications">
                    <h4>Especificações Técnicas</h4>
                    <ul>
                        <li><strong>Material:</strong> ${product.specifications.material}</li>
                        <li><strong>Dimensões:</strong> ${product.specifications.dimensions}mm</li>
                        <li><strong>Espessura:</strong> ${product.specifications.thickness}</li>
                        <li><strong>Qualidade:</strong> ${product.specifications.grade}</li>
                        <li><strong>Estoque:</strong> ${product.specifications.stock} unidades</li>
                    </ul>
                </div>
                
                <div class="product-features">
                    <h4>Características</h4>
                    <ul>
                        ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>
    `;
    
    elements.productModal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// Close product modal
function closeProductModal() {
    elements.productModal.classList.remove('show');
    document.body.style.overflow = 'auto';
    currentProduct = null;
}

// Add product to cart
function addToCart(productId) {
    const product = typeof productId === 'object' ? productId : products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartDisplay();
    showNotification(`${product.name} adicionado ao carrinho!`);
    
    // Close modal if open
    if (elements.productModal.classList.contains('show')) {
        closeProductModal();
    }
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
    renderCartModal();
}

// Update cart display
function updateCartDisplay() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    elements.cartCount.textContent = totalItems;
    elements.cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
}

// Show cart modal
function showCartModal() {
    renderCartModal();
    elements.cartModal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// Close cart modal
function closeCartModal() {
    elements.cartModal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

// Render cart modal
function renderCartModal() {
    if (cart.length === 0) {
        elements.cartModalBody.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <h3>Carrinho vazio</h3>
                <p>Adicione produtos ao seu carrinho para continuar</p>
            </div>
        `;
        return;
    }
    
    const cartItems = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">
                <i class="${item.icon}"></i>
            </div>
            <div class="cart-item-details">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">R$ ${item.price.toLocaleString()} x ${item.quantity}</div>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    elements.cartModalBody.innerHTML = `
        <div class="cart-items">
            ${cartItems}
        </div>
        <div class="cart-total">
            <div class="cart-total-label">Total:</div>
            <div class="cart-total-amount">R$ ${total.toLocaleString()}</div>
        </div>
    `;
}

// Clear cart
function clearCart() {
    cart = [];
    updateCartDisplay();
    renderCartModal();
    showNotification('Carrinho limpo!');
}

// Checkout (send to WhatsApp)
function checkout() {
    if (cart.length === 0) {
        showNotification('Carrinho vazio!', 'error');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemsList = cart.map(item => 
        `• ${item.name} - Qtd: ${item.quantity} - R$ ${(item.price * item.quantity).toLocaleString()}`
    ).join('\n');
    
    const message = `🛒 *Pedido de Orçamento - Visual Art Studio*\n\n` +
                   `📋 *Itens solicitados:*\n${itemsList}\n\n` +
                   `💰 *Total estimado:* R$ ${total.toLocaleString()}\n\n` +
                   `📞 Gostaria de receber um orçamento detalhado para estes produtos.\n\n` +
                   `Obrigado!`;
    
    const whatsappUrl = `https://wa.me/5542999152224?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    closeCartModal();
}

// Send contact form
function sendContactForm(formData) {
    const message = `📧 *Contato - Visual Art Studio*\n\n` +
                   `👤 *Nome:* ${formData.name}\n` +
                   `📧 *E-mail:* ${formData.email}\n` +
                   `📞 *Telefone:* ${formData.phone}\n\n` +
                   `💬 *Mensagem:*\n${formData.message}`;
    
    const whatsappUrl = `https://wa.me/5542999999999?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    // Also send email (simulate)
    const emailUrl = `mailto:contato@visualartstudio.com?subject=Contato do Site&body=${encodeURIComponent(
        `Nome: ${formData.name}\nE-mail: ${formData.email}\nTelefone: ${formData.phone}\n\nMensagem:\n${formData.message}`
    )}`;
    
    // Show options to user
    setTimeout(() => {
        if (confirm('Deseja também enviar por e-mail?')) {
            window.open(emailUrl, '_blank');
        }
    }, 1000);
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Smooth scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Setup event listeners
function setupEventListeners() {
    // Cart button
    elements.cartBtn.addEventListener('click', showCartModal);
    
    // Modal close buttons
    elements.modalClose.addEventListener('click', closeProductModal);
    elements.modalCloseBtn.addEventListener('click', closeProductModal);
    elements.cartModalClose.addEventListener('click', closeCartModal);
    
    // Add to cart from modal
    elements.addToCartBtn.addEventListener('click', () => {
        if (currentProduct) {
            addToCart(currentProduct);
        }
    });
    
    // Cart actions
    elements.clearCartBtn.addEventListener('click', clearCart);
    elements.checkoutBtn.addEventListener('click', checkout);
    
    // Contact form
    elements.contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            message: document.getElementById('message').value
        };
        
        sendContactForm(formData);
        elements.contactForm.reset();
        showNotification('Mensagem enviada com sucesso!');
    });
    
    // WhatsApp button
    elements.whatsappBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const message = `Olá! Gostaria de saber mais sobre os serviços da Visual Art Studio.`;
        const whatsappUrl = `https://wa.me/5542999152224?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    });
    
    // Close modals on outside click
    elements.productModal.addEventListener('click', (e) => {
        if (e.target === elements.productModal) {
            closeProductModal();
        }
    });
    
    elements.cartModal.addEventListener('click', (e) => {
        if (e.target === elements.cartModal) {
            closeCartModal();
        }
    });
    
    // Keyboard events
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (elements.productModal.classList.contains('show')) {
                closeProductModal();
            }
            if (elements.cartModal.classList.contains('show')) {
                closeCartModal();
            }
        }
    });
    
    // Mobile menu toggle
    elements.menuToggle.addEventListener('click', () => {
        const navMenu = document.querySelector('.nav-menu');
        navMenu.classList.toggle('active');
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
}

// Show error message
function showError(message) {
    elements.productsGrid.innerHTML = `
        <div class="error-message">
            <i class="fas fa-exclamation-triangle"></i>
            <h3>Erro</h3>
            <p>${message}</p>
        </div>
    `;
}

// Add notification styles
const notificationStyles = `
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: var(--shadow-lg);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    z-index: 3000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    border-left: 4px solid var(--primary-color);
}

.notification.show {
    transform: translateX(0);
}

.notification.error {
    border-left-color: var(--accent-color);
}

.notification i {
    color: var(--primary-color);
}

.notification.error i {
    color: var(--accent-color);
}

.product-modal-content {
    display: grid;
    grid-template-columns: 200px 1fr;
    gap: 2rem;
}

.product-modal-image {
    width: 200px;
    height: 200px;
    background: var(--gradient-secondary);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 4rem;
}

.product-modal-category {
    color: var(--primary-color);
    font-weight: 600;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 0.5rem;
}

.product-modal-description {
    color: var(--text-secondary);
    margin-bottom: 1.5rem;
    line-height: 1.6;
}

.product-specifications,
.product-features {
    margin-top: 1.5rem;
}

.product-specifications h4,
.product-features h4 {
    color: var(--text-primary);
    margin-bottom: 0.75rem;
    font-size: 1.1rem;
}

.product-specifications ul,
.product-features ul {
    list-style: none;
    padding: 0;
}

.product-specifications li,
.product-features li {
    padding: 0.25rem 0;
    color: var(--text-secondary);
}

.product-category {
    color: var(--primary-color);
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 0.5rem;
}

.product-pricing {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1rem;
}

.original-price {
    color: var(--text-light);
    text-decoration: line-through;
    font-size: 0.9rem;
}

.discount-badge {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: var(--accent-color);
    color: white;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.8rem;
    font-weight: 600;
}

@media (max-width: 768px) {
    .product-modal-content {
        grid-template-columns: 1fr;
        gap: 1rem;
    }
    
    .product-modal-image {
        width: 100%;
        height: 150px;
    }
    
    .notification {
        right: 10px;
        left: 10px;
        transform: translateY(-100%);
    }
    
    .notification.show {
        transform: translateY(0);
    }
}
`;

// Inject notification styles
const style = document.createElement('style');
style.textContent = notificationStyles;
document.head.appendChild(style);

