const { body, validationResult } = require('express-validator');
const errorBack = require('./errorBack');

exports.validateRegisterGet = errorBack([
    body('username')
        .notEmpty().withMessage('Username is required').bail()
        .isLength({ min: 3, max: 20 }).withMessage('Username must be between 3 and 20 characters'),
    body('telephone')
        .notEmpty().withMessage('Telephone is required').bail()
        .isLength({ min: 11, max: 11 }).withMessage('Telephone must be 11 characters')
        .isMobilePhone().withMessage('Invalid telephone number'),
    ]);


exports.validateRegisterPost = errorBack([
  body('username')
    .notEmpty() .bail()
    .isLength({ min: 3, max: 20 }).withMessage('Username must be between 3 and 20 characters').bail()
    .matches(/^[a-zA-Z0-9_]+$/).withMessage('Username can only contain letters, numbers, and underscores'),
  body('password')
    .notEmpty() .bail()
    .isLength({ min: 6, max: 20 }).withMessage('Password must be between 6 and 20 characters') .bail()
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/).withMessage('Password must contain at least one letter and one number'),
]);

