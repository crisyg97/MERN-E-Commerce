const express = require('express');
      dotenv = require('dotenv');
      morgan = require('morgan');
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
dotenv.config({ path: 'backend/config/config.env' });

//routes
const product = require('./routes/product');
const auth = require('./routes/auth');

app.use('/api/product', product);
app.use('/api/auth', auth);

//database connection
const mongodb_connect = require('./database');
const db = mongodb_connect.connect();

module.exports = app;