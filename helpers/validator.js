const { check } = require('express-validator');

exports.registerValidator = [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please Provide Valid Email').isEmail().normalizeEmail({
        gmail_remove_dots:true,
    }),
    check('password', 'Password is required').not().isEmpty(),
]

exports.loginValidator = [
    check('email', 'Please Provide Valid Email').isEmail().normalizeEmail({
        gmail_remove_dots:true,
    }),
    check('password', 'Password is required').not().isEmpty(),
]


// User Validation -------------------------------------------------------------
exports.UserValidator = [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please Provide Valid Email').isEmail().normalizeEmail({
        gmail_remove_dots:true,
    })
]