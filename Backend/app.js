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
const auth = require('./routes/auth');
const product = require('./routes/product');

app.use('/api/product', product);
app.use('/api/auth', auth);

//database connection
const mongodb_connect = require('./database');
const db = mongodb_connect.connect();

module.exports = app;