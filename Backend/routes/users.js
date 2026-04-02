const express = require('express');
const router = express.Router();
const validate = require('../middleware/validator/userVailidator');


// 用户注册
router.get('/register', validate.validateRegisterGet, require('../controller/userController').getRegisterCode);
router.post('/register', validate.validateRegisterPost, require('../controller/userController').register);

// 用户登录

// 验证码登录
router.post('/login/code', validate.validateGetcode, require('../controller/userController').getcode);
router.post('/login/code/verify', validate.validatecodelogin, require('../controller/userController').codelogin);

// 密码登录

router.post('/login/password', validate.validatepasswordLogin, require('../controller/userController').passwordlogin);

module.exports = router;
