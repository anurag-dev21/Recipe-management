const express = require('express');
const routes = express.Router();
const auth = require('../middlewares/authMiddlewere');
const permissionControl = require('../controllers/admin/permisionController');

const { onlyAdminAccess } = require('../middlewares/adminMiddlewere');
const { PermisionValidator , PermisionDeleteValidator, PermisionUpdateValidator} = require('../helpers/adminValidator');

// Permision routes ---------
routes.post('/add-permission', auth, onlyAdminAccess, PermisionValidator, permissionControl.AddPermision);
routes.get('/get-permission', auth, onlyAdminAccess, permissionControl.GetPermision);
routes.delete('/delete-permission', auth, onlyAdminAccess, PermisionDeleteValidator, permissionControl.DeletePermision);
routes.put('/update-permission', auth, onlyAdminAccess, PermisionUpdateValidator, permissionControl.UpdatePermision);

module.exports = routes;