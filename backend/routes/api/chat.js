const express = require('express');
const router = express.Router();
const chatController = require('../../controllers/chatController');
const auth = require('../../middleware/auth');

router.get('/', auth, chatController.getChats);
router.post('/start', auth, chatController.startChat);
router.post('/message', auth, chatController.sendMessage);

module.exports = router;
