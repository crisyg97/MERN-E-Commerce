const express = require('express');
const router = express.Router();

const validator = require('../middleware/validator');
const jwt = require('../middleware/authJWT');

const product = require('../controllers/category');

router.get('/', category.index );
router.post('/add', [jwt.verifyToken, validator.isAdmin], category.create);
router.get('/:category_id', category.getById);
router.put('/:category_id/update', [jwt.verifyToken, validator.isAdmin], category.update);
router.post('/:category_id/deleste', [jwt.verifyToken, validator.isAdmin], category.remove);

module.exports = router;