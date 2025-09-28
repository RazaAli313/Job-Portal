const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');
const auth = require('../../middleware/auth');
const roles = require('../../middleware/roles');

// Get all users (admin only)
// router.get('/', auth, userController.getUsers);
router.get('/', userController.getUsers);
// Delete user (admin only)
router.delete('/:id', auth, roles(['admin']), userController.deleteUser);

module.exports = router;
