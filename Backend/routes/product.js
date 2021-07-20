const express = require('express');
const router = express.Router();

const product = require('../controllers/product');

router.get('/', product.index );
router.post('/add', product.create);
router.get('/:product_id', product.getById);

module.exports = router;
