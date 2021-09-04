const express = require('express');
const router = express.Router();

const cart = require('../controllers/cart');

router.post('/user/cart/addToCart',  cart.addItemToCart);

module.exports = router;