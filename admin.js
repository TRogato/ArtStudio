// Admin Panel JavaScript
class AdminPanel {
    constructor() {
        this.currentTab = 'dashboard';
        this.products = [];
        this.orders = [];
        this.messages = [];
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadDashboardData();
        this.loadProducts();
        this.loadOrders();
        this.loadMessages();
        this.initCharts();
    }

    bindEvents() {
        // Navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const tab = e.currentTarget.dataset.tab;
                this.switchTab(tab);
            });
        });

        // Menu toggle for mobile
        document.getElementById('menu-toggle').addEventListener('click', () => {
            document.querySelector('.admin-sidebar').classList.toggle('show');
        });

        // Logout
        document.getElementById('logout-btn').addEventListener('click', () => {
            if (confirm('Deseja sair do painel administrativo?')) {
                window.location.href = 'index.html';
            }
        });

        // Product modal
        document.getElementById('add-product-btn').addEventListener('click', () => {
            this.openProductModal();
        });

        // Modal close buttons
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', () => {
                this.closeModals();
            });
        });

        // Product form submission
        document.getElementById('product-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveProduct();
        });

        // Order filter
        document.getElementById('order-filter').addEventListener('change', (e) => {
            this.filterOrders(e.target.value);
        });

        // Click outside modal to close
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModals();
                }
            });
        });
    }

    switchTab(tab) {
        // Update navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tab}"]`).classList.add('active');

        // Update content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${tab}-tab`).classList.add('active');

        // Update page title
        document.getElementById('page-title').textContent = this.getTabTitle(tab);

        // Close sidebar on mobile
        document.querySelector('.admin-sidebar').classList.remove('show');

        this.currentTab = tab;
    }

    getTabTitle(tab) {
        const titles = {
            'dashboard': 'Dashboard',
            'products': 'Produtos',
            'orders': 'Pedidos',
            'messages': 'Mensagens',
            'settings': 'Configurações'
        };
        return titles[tab] || 'Dashboard';
    }

    async loadDashboardData() {
        // Simulate API call
        setTimeout(() => {
            // Update stats would go here
        }, 1000);
    }

    async loadProducts() {
        try {
            // Load from localStorage or use sample data
            const savedProducts = localStorage.getItem('visualArtProducts');
            
            if (savedProducts) {
                this.products = JSON.parse(savedProducts);
            } else {
                // Sample products
                this.products = [
                    {
                        id: 1,
                        name: 'Impressão Digital',
                        category: 'Impressão',
                        price: 89.90,
                        originalPrice: 119.90,
                        description: 'Impressão de alta qualidade em diversos materiais',
                        stock: 50,
                        icon: 'fas fa-print',
                        status: 'active'
                    },
                    {
                        id: 2,
                        name: 'Letra Caixa',
                        category: 'Letras',
                        price: 249.90,
                        originalPrice: 299.90,
                        description: 'Letras em acrílico com iluminação LED',
                        stock: 15,
                        icon: 'fas fa-font',
                        status: 'active'
                    }
                ];
                this.saveProducts();
            }

            this.renderProducts();
        } catch (error) {
            console.error('Error loading products:', error);
        }
    }

    renderProducts() {
        const tbody = document.getElementById('products-table-body');
        tbody.innerHTML = '';

        if (this.products.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="6" class="empty-state">
                        <i class="fas fa-box-open"></i>
                        <h3>Nenhum produto cadastrado</h3>
                        <p>Comece adicionando seu primeiro produto</p>
                    </td>
                </tr>
            `;
            return;
        }

        this.products.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <div style="width: 40px; height: 40px; background: #6366f1; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white;">
                            <i class="${product.icon}"></i>
                        </div>
                        <div>
                            <div style="font-weight: 500;">${product.name}</div>
                            <div style="font-size: 12px; color: #6b7280;">${product.description.substring(0, 50)}...</div>
                        </div>
                    </div>
                </td>
                <td>${product.category}</td>
                <td>R$ ${product.price.toFixed(2)}</td>
                <td>${product.stock}</td>
                <td>
                    <span class="status-badge ${product.status === 'active' ? 'status-active' : 'status-inactive'}">
                        ${product.status === 'active' ? 'Ativo' : 'Inativo'}
                    </span>
                </td>
                <td>
                    <div style="display: flex; gap: 8px;">
                        <button class="btn btn-sm btn-secondary" onclick="admin.editProduct(${product.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="admin.deleteProduct(${product.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    async loadOrders() {
        try {
            // Load from localStorage or use sample data
            const savedOrders = localStorage.getItem('visualArtOrders');
            
            if (savedOrders) {
                this.orders = JSON.parse(savedOrders);
            } else {
                // Sample orders
                this.orders = [
                    {
                        id: 1001,
                        customer: 'João Silva',
                        email: 'joao@email.com',
                        phone: '(42) 99999-9999',
                        date: '2024-01-15',
                        total: 189.80,
                        status: 'pending',
                        items: [
                            { product: 'Impressão Digital', quantity: 2, price: 89.90 }
                        ]
                    },
                    {
                        id: 1002,
                        customer: 'Maria Santos',
                        email: 'maria@email.com',
                        phone: '(42) 98888-8888',
                        date: '2024-01-14',
                        total: 249.90,
                        status: 'completed',
                        items: [
                            { product: 'Letra Caixa', quantity: 1, price: 249.90 }
                        ]
                    }
                ];
                this.saveOrders();
            }

            this.renderOrders();
        } catch (error) {
            console.error('Error loading orders:', error);
        }
    }

    renderOrders(filter = 'all') {
        const tbody = document.getElementById('orders-table-body');
        tbody.innerHTML = '';

        const filteredOrders = filter === 'all' 
            ? this.orders 
            : this.orders.filter(order => order.status === filter);

        if (filteredOrders.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="6" class="empty-state">
                        <i class="fas fa-shopping-cart"></i>
                        <h3>Nenhum pedido encontrado</h3>
                        <p>${filter === 'all' ? 'Ainda não há pedidos' : `Nenhum pedido com status "${filter}"`}</p>
                    </td>
                </tr>
            `;
            return;
        }

        filteredOrders.forEach(order => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>#${order.id}</td>
                <td>
                    <div>${order.customer}</div>
                    <div style="font-size: 12px; color: #6b7280;">${order.email}</div>
                </td>
                <td>${new Date(order.date).toLocaleDateString('pt-BR')}</td>
                <td>R$ ${order.total.toFixed(2)}</td>
                <td>
                    <span class="status-badge status-${order.status}">
                        ${this.getOrderStatusText(order.status)}
                    </span>
                </td>
                <td>
                    <button class="btn btn-sm btn-primary" onclick="admin.viewOrder(${order.id})">
                        <i class="fas fa-eye"></i> Ver
                    </button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    getOrderStatusText(status) {
        const statusMap = {
            'pending': 'Pendente',
            'processing': 'Processando',
            'completed': 'Concluído',
            'cancelled': 'Cancelado'
        };
        return statusMap[status] || status;
    }

    async loadMessages() {
        try {
            // Load from localStorage or use sample data
            const savedMessages = localStorage.getItem('visualArtMessages');
            
            if (savedMessages) {
                this.messages = JSON.parse(savedMessages);
            } else {
                // Sample messages
                this.messages = [
                    {
                        id: 1,
                        name: 'Carlos Oliveira',
                        email: 'carlos@email.com',
                        phone: '(42) 97777-7777',
                        message: 'Gostaria de orçamento para fachada comercial',
                        date: '2024-01-15T10:30:00',
                        read: false
                    },
                    {
                        id: 2,
                        name: 'Ana Costa',
                        email: 'ana@email.com',
                        phone: '(42) 96666-6666',
                        message: 'Preciso de adesivos para veículo',
                        date: '2024-01-14T15:45:00',
                        read: true
                    }
                ];
                this.saveMessages();
            }

            this.renderMessages();
        } catch (error) {
            console.error('Error loading messages:', error);
        }
    }

    renderMessages() {
        const container = document.getElementById('messages-list');
        container.innerHTML = '';

        if (this.messages.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-envelope-open"></i>
                    <h3>Nenhuma mensagem</h3>
                    <p>Nenhuma mensagem de contato recebida</p>
                </div>
            `;
            return;
        }

        this.messages.forEach(msg => {
            const messageEl = document.createElement('div');
            messageEl.className = `message-item ${msg.read ? '' : 'unread'}`;
            messageEl.innerHTML = `
                <div class="message-header">
                    <span class="message-sender">${msg.name}</span>
                    <span class="message-time">${new Date(msg.date).toLocaleDateString('pt-BR')}</span>
                </div>
                <div class="message-preview">${msg.message}</div>
                <div style="margin-top: 8px; font-size: 12px; color: #6b7280;">
                    ${msg.email} • ${msg.phone}
                </div>
            `;
            container.appendChild(messageEl);
        });
    }

    openProductModal(product = null) {
        const modal = document.getElementById('product-modal');
        const title = document.getElementById('modal-product-title');
        const form = document.getElementById('product-form');

        if (product) {
            title.textContent = 'Editar Produto';
            // Fill form with product data
            document.getElementById('product-name').value = product.name;
            document.getElementById('product-category').value = product.category;
            document.getElementById('product-description').value = product.description;
            document.getElementById('product-price').value = product.price;
            document.getElementById('product-original-price').value = product.originalPrice || '';
            document.getElementById('product-stock').value = product.stock;
            document.getElementById('product-icon').value = product.icon;
            form.dataset.editId = product.id;
        } else {
            title.textContent = 'Adicionar Produto';
            form.reset();
            delete form.dataset.editId;
        }

        modal.classList.add('show');
    }

    closeModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('show');
        });
    }

    saveProduct() {
        const form = document.getElementById('product-form');
        const formData = new FormData(form);
        
        const product = {
            name: formData.get('product-name'),
            category: formData.get('product-category'),
            description: formData.get('product-description'),
            price: parseFloat(formData.get('product-price')),
            originalPrice: parseFloat(formData.get('product-original-price')) || null,
            stock: parseInt(formData.get('product-stock')),
            icon: formData.get('product-icon'),
            status: 'active'
        };

        if (form.dataset.editId) {
            // Edit existing product
            const id = parseInt(form.dataset.editId);
            const index = this.products.findIndex(p => p.id === id);
            if (index !== -1) {
                product.id = id;
                this.products[index] = product;
            }
        } else {
            // Add new product
            product.id = Date.now();
            this.products.push(product);
        }

        this.saveProducts();
        this.renderProducts();
        this.closeModals();
        
        alert('Produto salvo com sucesso!');
    }

    editProduct(id) {
        const product = this.products.find(p => p.id === id);
        if (product) {
            this.openProductModal(product);
        }
    }

    deleteProduct(id) {
        if (confirm('Tem certeza que deseja excluir este produto?')) {
            this.products = this.products.filter(p => p.id !== id);
            this.saveProducts();
            this.renderProducts();
            alert('Produto excluído com sucesso!');
        }
    }

    viewOrder(id) {
        const order = this.orders.find(o => o.id === id);
        if (order) {
            const modal = document.getElementById('order-modal');
            const details = document.getElementById('order-details');
            
            details.innerHTML = `
                <div style="margin-bottom: 1.5rem;">
                    <h3 style="margin-bottom: 1rem;">Informações do Pedido</h3>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                        <div>
                            <strong>Número do Pedido:</strong><br>
                            #${order.id}
                        </div>
                        <div>
                            <strong>Data:</strong><br>
                            ${new Date(order.date).toLocaleDateString('pt-BR')}
                        </div>
                        <div>
                            <strong>Cliente:</strong><br>
                            ${order.customer}
                        </div>
                        <div>
                            <strong>Telefone:</strong><br>
                            ${order.phone}
                        </div>
                        <div>
                            <strong>E-mail:</strong><br>
                            ${order.email}
                        </div>
                        <div>
                            <strong>Status:</strong><br>
                            <span class="status-badge status-${order.status}">
                                ${this.getOrderStatusText(order.status)}
                            </span>
                        </div>
                    </div>
                </div>
                
                <div style="margin-bottom: 1.5rem;">
                    <h3 style="margin-bottom: 1rem;">Itens do Pedido</h3>
                    <table style="width: 100%; border-collapse: collapse;">
                        <thead>
                            <tr style="background: #f3f4f6;">
                                <th style="padding: 0.75rem; text-align: left;">Produto</th>
                                <th style="padding: 0.75rem; text-align: right;">Quantidade</th>
                                <th style="padding: 0.75rem; text-align: right;">Preço</th>
                                <th style="padding: 0.75rem; text-align: right;">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${order.items.map(item => `
                                <tr>
                                    <td style="padding: 0.75rem; border-bottom: 1px solid #e5e7eb;">${item.product}</td>
                                    <td style="padding: 0.75rem; border-bottom: 1px solid #e5e7eb; text-align: right;">${item.quantity}</td>
                                    <td style="padding: 0.75rem; border-bottom: 1px solid #e5e7eb; text-align: right;">R$ ${item.price.toFixed(2)}</td>
                                    <td style="padding: 0.75rem; border-bottom: 1px solid #e5e7eb; text-align: right;">R$ ${(item.quantity * item.price).toFixed(2)}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colspan="3" style="padding: 0.75rem; text-align: right; font-weight: bold;">Total:</td>
                                <td style="padding: 0.75rem; text-align: right; font-weight: bold;">R$ ${order.total.toFixed(2)}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                
                <div style="display: flex; gap: 1rem; justify-content: flex-end;">
                    <button class="btn btn-secondary modal-close">Fechar</button>
                    ${order.status === 'pending' ? `
                        <button class="btn btn-primary" onclick="admin.updateOrderStatus(${order.id}, 'processing')">
                            Processar Pedido
                        </button>
                    ` : ''}
                    ${order.status === 'processing' ? `
                        <button class="btn btn-success" onclick="admin.updateOrderStatus(${order.id}, 'completed')">
                            Concluir Pedido
                        </button>
                    ` : ''}
                </div>
            `;
            
            modal.classList.add('show');
        }
    }

    updateOrderStatus(orderId, status) {
        const order = this.orders.find(o => o.id === orderId);
        if (order) {
            order.status = status;
            this.saveOrders();
            this.renderOrders(document.getElementById('order-filter').value);
            this.closeModals();
            alert('Status do pedido atualizado com sucesso!');
        }
    }

    filterOrders(status) {
        this.renderOrders(status);
    }

    saveProducts() {
        localStorage.setItem('visualArtProducts', JSON.stringify(this.products));
    }

    saveOrders() {
        localStorage.setItem('visualArtOrders', JSON.stringify(this.orders));
    }

    saveMessages() {
        localStorage.setItem('visualArtMessages', JSON.stringify(this.messages));
    }

    initCharts() {
        // Sales Chart
        const salesCtx = document.getElementById('salesChart').getContext('2d');
        this.salesChart = new Chart(salesCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
                datasets: [{
                    label: 'Vendas (R$)',
                    data: [12000, 19000, 15000, 25000, 22000, 30000, 28000, 32000, 35000, 40000, 42000, 45000],
                    borderColor: '#6366f1',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            drawBorder: false
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });

        // Products Chart
        const productsCtx = document.getElementById('productsChart').getContext('2d');
        this.productsChart = new Chart(productsCtx, {
            type: 'bar',
            data: {
                labels: ['Impressão', 'Fachadas', 'Adesivos', 'Letras', 'Placas'],
                datasets: [{
                    label: 'Vendas',
                    data: [120, 85, 75, 95, 65],
                    backgroundColor: [
                        'rgba(99, 102, 241, 0.8)',
                        'rgba(245, 158, 11, 0.8)',
                        'rgba(236, 72, 153, 0.8)',
                        'rgba(16, 185, 129, 0.8)',
                        'rgba(139, 92, 246, 0.8)'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            drawBorder: false
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }
}

// Initialize admin panel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.admin = new AdminPanel();
});