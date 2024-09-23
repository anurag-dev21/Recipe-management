const { check } = require('express-validator');

// Permission Validation---------------------------------------------------
exports.PermisionValidator = [
    check('permision_name', 'Permission Name is required').not().isEmpty(),
]

exports.PermisionDeleteValidator = [
    check('id', 'id is required').not().isEmpty(),
]

exports.PermisionUpdateValidator = [
    check('id', 'id is required').not().isEmpty(),
    check('permision_name', 'Permission Name is required').not().isEmpty(),
]

// Category validations----------------------------------------------------
exports.CategoryAddValidator = [
    check('category_name', 'Category Name is required').not().isEmpty(),
]

exports.CategoryDeleteValidator = [
    check('id', 'id is required').not().isEmpty(),
]

exports.CategoryUpdateValidator = [
    check('id', 'id is required').not().isEmpty(),
    check('category_name', 'Category Name is required').not().isEmpty(),
]

// Post validation---------------------------------------------------------
exports.PostAddValidator = [
    check('title', 'title is required').not().isEmpty(),
    check('description', 'description is required').not().isEmpty(),
]

exports.PostDeleteValidator = [
    check('id', 'id is required').not().isEmpty(),
]

exports.PostUpdateValidator = [
    check('id', 'id is required').not().isEmpty(),
    check('title', 'title is required').not().isEmpty(),
    check('description', 'description is required').not().isEmpty(),
]

// Role Validation ----------------------------------------------------------

exports.StoreRoleValidator = [
    check('role_name', 'name is required').not().isEmpty(),
    check('role_value', 'value is required').not().isEmpty(),
]