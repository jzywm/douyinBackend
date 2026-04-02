const { body, query, validationResult } = require('express-validator');
const errorBack = require('./errorBack');
// yonghuzhuce
exports.validateRegisterGet = errorBack([
    query('username')
        .notEmpty().withMessage('Username is required').bail()
        .isLength({ min: 3, max: 20 }).withMessage('Username must be between 3 and 20 characters')
        .custom(async (value) => {
            const { User } = require('../../model/index');
            const user = await User.findOne({ username: value });
            if (user) {
                return Promise.reject('用户名已经被注册');
            }
        }),
    query('tel')
        .notEmpty().withMessage('Telephone is required').bail()
        .isLength({ min: 11, max: 11 }).withMessage('Telephone must be 11 characters')
        .isMobilePhone().withMessage('Invalid telephone number')
        .custom(async (value) => {
            const { User } = require('../../model/index');
            const user = await User.findOne({ tel: value });
            if (user) {
                return Promise.reject('手机号已经被注册');
            }
        }),
]);


exports.validateRegisterPost = errorBack([
    body('username')
        .notEmpty().bail()
        .isLength({ min: 3, max: 20 }).withMessage('Username must be between 3 and 20 characters').bail()
        .matches(/^[a-zA-Z0-9_]+$/).withMessage('Username can only contain letters, numbers, and underscores'),
    body('tel')
        .notEmpty().withMessage('Telephone is required').bail()
        .isLength({ min: 11, max: 11 }).withMessage('Telephone must be 11 characters')
        .isMobilePhone().withMessage('Invalid telephone number'),
    body('password')
        .notEmpty().bail()
        .isLength({ min: 6, max: 20 }).withMessage('Password must be between 6 and 20 characters').bail()
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/).withMessage('Password must contain at least one letter and one number'),
    body('code')
        .notEmpty().withMessage('Verification code is required').bail()
        .isLength({ min: 6, max: 6 }).withMessage('Verification code must be 6 characters'),
]);

// 用户登录

exports.validateGetcode = errorBack([
    body('tel')
        .notEmpty().withMessage('Telephone is required').bail()
        .isLength({ min: 11, max: 11 }).withMessage('Telephone must be 11 characters')
        .isMobilePhone().withMessage('Invalid telephone number')
        .custom(async (value) => {
            const { User } = require('../../model/index');
            const user = await User.findOne({ tel: value });
            if (!user) {
                return Promise.reject('用户还没有注册');
            }
        }),
]);

exports.validatecodelogin = errorBack([
    body('tel')
        .notEmpty().withMessage('Telephone is required').bail()
        .isLength({ min: 11, max: 11 }).withMessage('Telephone must be 11 characters')
        .isMobilePhone().withMessage('Invalid telephone number')
        .custom(async (value) => {
            const { User } = require('../../model/index');
            const user = await User.findOne({ tel: value });
            if (!user) {
                return Promise.reject('用户还没有注册');
            }
        }),
    body('code')
        .notEmpty().withMessage('Verification code is required').bail()
        .isLength({ min: 6, max: 6 }).withMessage('Verification code must be 6 characters'),
]);

exports.validatepasswordLogin = errorBack([
    body('tel')
        .notEmpty().withMessage('Telephone is required').bail()
        .isLength({ min: 11, max: 11 }).withMessage('Telephone must be 11 characters')
        .isMobilePhone().withMessage('Invalid telephone number')
        .custom(async (value) => {
            const { User } = require('../../model/index');
            const user = await User.findOne({ tel: value });
            if (!user) {
                return Promise.reject('用户还没有注册');
            }
        }),
    body('password')
        .notEmpty().withMessage('Password is required').bail()
        .isLength({ min: 6, max: 20 }).withMessage('Password must be between 6 and 20 characters').bail()
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/).withMessage('Password must contain at least one letter and one number'),
]);
