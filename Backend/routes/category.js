const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const validator = require('../middleware/validator');
const authJwt = require('../middleware/authJWT');

const category = require('../controllers/category');

router.get('/', category.index );
//router.post('/add', jwt.verifyToken, validator.isAdmin, category.create);
router.post('/add', authJwt.verifyToken, category.create);
router.get('/:category_id', category.getById);
router.put('/:category_id/update', authJwt.verifyToken, category.update);
router.post('/:category_id/deleste', authJwt.verifyToken, category.remove);

module.exports = router;