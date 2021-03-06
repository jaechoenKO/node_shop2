const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const http = require('http');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/oders');
const userRoutes = require('./api/routes/user');

// const db = "mongodb+srv://jaecheon:epffl0128!@cluster0-1fqcl.mongodb.net/test?retryWrites=true&w=majority";

const db = "mongodb://teddykwak:k9915402@ds141294.mlab.com:41294/node-rest-shop";

mongoose.connect(db, {useNewUrlParser: true, useCreateIndex: true})
    .then(() => console.log("MongoDB Connected..."))
    .catch(err => console.log(err));

app.use(morgan('dev'));

// 사용자 입력을 보기 편하게 보기 위함.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// 라우팅 경로 지정 접근
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/user', userRoutes);

const PORT = 3000;

// express server 할당.
const server = http.createServer(app);

server.listen(PORT, () => console.log('Server Started...'));