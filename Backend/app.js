const express = require('express');
      dotenv = require('dotenv');
      morgan = require('morgan');
      cors = require('cors');
      app = express();

//middleware
app.use((req, res, next) => { //access CORS 
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
      res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
      res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
      next();
});
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
dotenv.config({ path: 'backend/config/config.env' });

//routes
const product = require('./routes/product');
const auth = require('./routes/auth');
const category = require('./routes/category');
const cart = require('./routes/cart');

app.use('/api/product', product);
app.use('/api/auth', auth);
app.use('/api/category', category);
app.use('/api/cart', cart);

//database connection
const mongodb_connect = require('./database');
const db = mongodb_connect.connect();

module.exports = app;