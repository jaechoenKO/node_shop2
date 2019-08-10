const express = require('express');
const app = express();

const http = require('http');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/oders');



app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

const PORT = 3000;

// express server 할당.
const server = http.createServer(app);

server.listen(PORT, () => console.log('Server Started...'));