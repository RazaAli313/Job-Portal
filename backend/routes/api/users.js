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

router.put('/profile', auth, userController.updateProfile);
router.get('/:id', auth, async (req, res) => {
	try {
		const user = await require('../../models/User').findById(req.params.id).select('-password');
		if (!user) return res.status(404).json({ message: 'User not found' });
		res.json(user);
	} catch (err) {
		res.status(500).json({ message: 'Failed to fetch user profile' });
	}
});
module.exports = router;
