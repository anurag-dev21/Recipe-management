const express = require('express');
const routes = express.Router();
const auth = require('../middlewares/authMiddlewere');
const CategoryController = require('../controllers/categoryController');
const PostController = require('../controllers/postController');
const UserController = require('../controllers/userController');

const { CategoryAddValidator, CategoryDeleteValidator, CategoryUpdateValidator, PostAddValidator ,PostDeleteValidator ,PostUpdateValidator } = require('../helpers/adminValidator');

const { UserValidator } = require('../helpers/validator');

// categories routes -------------------------
routes.post('/add-category', auth, CategoryAddValidator, CategoryController.AddCategory);
routes.get('/get-category', auth, CategoryController.GetCategory);
routes.delete('/delete-category', auth, CategoryDeleteValidator, CategoryController.DeleteCategory);
routes.put('/update-category', auth, CategoryUpdateValidator, CategoryController.UpdateCategory);

//Post routes --------------------------------
routes.post('/create-post', auth, PostAddValidator, PostController.AddPost);
routes.get('/view-post', auth, PostController.GetPost);
routes.delete('/delete-post', auth, PostDeleteValidator, PostController.DeletePost);
routes.put('/update-post', auth, PostUpdateValidator, PostController.UpdatePost);

//User routes --------------------------------
routes.post('/create-user', auth, UserValidator, UserController.AddUser);


module.exports = routes;