const express = require('express');
const router = express.Router();

const product = require('../controllers/product');

router.get('/', product.index );

module.exports = router;
