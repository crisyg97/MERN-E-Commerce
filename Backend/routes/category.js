const express = require('express');
const router = express.Router();

const product = require('../controllers/category');

router.get('/', category.index );
router.post('/add', category.create);
router.get('/:category_id', category.getById);
router.put('/:category_id/update', category.update);
router.post('/:category_id/deleste', category.remove);

module.exports = router;