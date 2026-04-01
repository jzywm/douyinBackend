const express = require('express');
const router = express.Router();
const validate = require('../middleware/validator/userVailidator');


// 用户注册
router.get('/register', validate.validateRegisterGet, require('../controller/userController').getRegisterCode);
router.post('/register', validate.validateRegisterPost, require('../controller/userController').register);

module.exports = router;
