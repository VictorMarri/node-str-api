'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const router = express.Router();

//Conecta ao banco
mongoose.connect('mongodb+srv://victor:victor10@cluster0.0of6f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')

//Carrega os Models
const Product = require('./models/product');

//Carrega todas as rotas quue tivermos na aplicação
const indexRoute = require('./routes/index-route');
const productRoute = require('./routes/product-route');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));



app.use('/', indexRoute);
app.use('/products', productRoute);

module.exports = app;