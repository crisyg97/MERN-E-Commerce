const express = require('express');
const router = express.Router();

const authJwt = require('../middleware/authJWT');

const cart = require('../controllers/cart');

router.post('/addToCart',  authJwt.verifyToken, cart.addItemToCart);

module.exports = router;