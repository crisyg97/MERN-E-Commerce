const express = require('express');
      dotenv = require('dotenv');
      morgan = require('morgan');
      app = express();

//middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(morgan('dev'));
dotenv.config({ path: 'backend/config/config.env' });

//routes
const product = require('./routes/product');

app.use('/api/product', product)

//database connection
const mongodb_connect = require('./database');
const db = mongodb_connect.connect();

module.exports = app;