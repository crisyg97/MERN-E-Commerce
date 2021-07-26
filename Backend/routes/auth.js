const express = require('express');
const router = express.Router();

const auth = require('../controllers/auth');
const validator = require('../middleware/validator');

router.post('/signup', [validator.checkDuplicatedUserOrEmail, validator.checkRolesExists],auth.signup);
router.post('/signin', auth.signin);

module.exports = router;