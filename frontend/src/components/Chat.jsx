import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Chat = ({ jobId, userId, recipientId }) => {
  const [messages, setMessages] = useState([
    // Example starter messages
    { sender: 'employer', text: 'Welcome to the job chat! Feel free to ask questions.' },
    { sender: 'candidate', text: 'Thank you! What are the main responsibilities?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { sender: userId, text: input }]);
      setInput('');
    }
  };

  return (
    <motion.div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg mx-auto mt-8">
      <h3 className="text-lg font-bold mb-4 text-indigo-700">Job Chat</h3>
      <div className="h-64 overflow-y-auto mb-4 border rounded-lg p-3 bg-gray-50">
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-2 flex ${msg.sender === userId ? 'justify-end' : 'justify-start'}`}>
            <div className={`px-4 py-2 rounded-lg ${msg.sender === userId ? 'bg-indigo-100 text-indigo-800' : 'bg-gray-200 text-gray-700'}`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:border-indigo-300"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
          onClick={handleSend}
        >
          Send
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Chat;
