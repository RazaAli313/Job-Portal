const Chat = require('../models/Chat');
const User = require('../models/User');

// Get all chats for a user
exports.getChats = async (req, res) => {
  try {
    const chats = await Chat.find({ participants: req.user._id }).populate('participants', 'name role');
    res.json(chats);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch chats' });
  }
};

// Send a message in a chat
exports.sendMessage = async (req, res) => {
  const { chatId, text } = req.body;
  try {
    const chat = await Chat.findById(chatId);
    if (!chat) return res.status(404).json({ message: 'Chat not found' });
    chat.messages.push({ sender: req.user._id, text });
    await chat.save();
    res.json(chat);
  } catch (err) {
    res.status(500).json({ message: 'Failed to send message' });
  }
};

// Start a new chat between candidate and employer
exports.startChat = async (req, res) => {
  const { participantId } = req.body;
  try {
    if (!participantId) {
      console.error('Missing participantId');
      return res.status(400).json({ message: 'participantId is required' });
    }
    if (!req.user || !req.user._id) {
      console.error('Missing authenticated user');
      return res.status(401).json({ message: 'User not authenticated' });
    }
    // Validate participantId format
    if (!participantId.match(/^[0-9a-fA-F]{24}$/)) {
      console.error('Invalid participantId format:', participantId);
      return res.status(400).json({ message: 'Invalid participantId format' });
    }
    let chat = await Chat.findOne({
      participants: { $all: [req.user._id, participantId] }
    });
    if (!chat) {
      chat = new Chat({ participants: [req.user._id, participantId], messages: [] });
      await chat.save();
    }
    res.json(chat);
  } catch (err) {
    console.error('Error in startChat:', err);
    res.status(500).json({ message: 'Failed to start chat', error: err.message });
  }
};
