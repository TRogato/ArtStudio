[file name]: server.js
[file content begin]
// Simulated backend server for demonstration
// This would be replaced with a real backend in production

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.json());

// Mock data
let products = [
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
    }
];

let orders = [
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
    }
];

let messages = [
    {
        id: 1,
        name: 'Carlos Oliveira',
        email: 'carlos@email.com',
        phone: '(42) 97777-7777',
        message: 'Gostaria de orçamento para fachada comercial',
        date: '2024-01-15T10:30:00',
        read: false
    }
];

// Products endpoints
app.get('/api/products', (req, res) => {
    res.json(products);
});

app.post('/api/products', (req, res) => {
    const product = {
        id: Date.now(),
        ...req.body,
        status: 'active'
    };
    products.push(product);
    res.json(product);
});

app.put('/api/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
        products[index] = { ...products[index], ...req.body };
        res.json(products[index]);
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
});

app.delete('/api/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    products = products.filter(p => p.id !== id);
    res.json({ success: true });
});

// Orders endpoints
app.get('/api/orders', (req, res) => {
    const { status } = req.query;
    let filteredOrders = orders;
    
    if (status && status !== 'all') {
        filteredOrders = orders.filter(order => order.status === status);
    }
    
    res.json(filteredOrders);
});

app.post('/api/orders', (req, res) => {
    const order = {
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        status: 'pending',
        ...req.body
    };
    orders.push(order);
    res.json(order);
});

app.put('/api/orders/:id/status', (req, res) => {
    const id = parseInt(req.params.id);
    const { status } = req.body;
    const order = orders.find(o => o.id === id);
    
    if (order) {
        order.status = status;
        res.json(order);
    } else {
        res.status(404).json({ error: 'Order not found' });
    }
});

// Messages endpoints
app.get('/api/messages', (req, res) => {
    res.json(messages);
});

app.post('/api/messages', (req, res) => {
    const message = {
        id: Date.now(),
        date: new Date().toISOString(),
        read: false,
        ...req.body
    };
    messages.push(message);
    res.json(message);
});

app.put('/api/messages/:id/read', (req, res) => {
    const id = parseInt(req.params.id);
    const message = messages.find(m => m.id === id);
    
    if (message) {
        message.read = true;
        res.json(message);
    } else {
        res.status(404).json({ error: 'Message not found' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
[file content end]