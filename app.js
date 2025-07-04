const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/product.routes');
const cartRoutes = require('./routes/cart.routes');
const orderRoutes = require('./routes/order.routes');

const app = express();

// Security + parsing middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// ? Serve static frontend from ./frontend
const frontendPath = path.join(__dirname, 'frontend');
console.log('?? Serving static files from:', frontendPath);
app.use(express.static(frontendPath));

// ? Serve index.html on root route
app.get('/', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
});

// ? API routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

module.exports = app;
