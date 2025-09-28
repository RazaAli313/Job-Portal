import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ChatModal = ({ chatId, participant, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (chatId) fetchMessages();
  }, [chatId]);

  const fetchMessages = async () => {
    try {
      const res = await axios.get(`/api/chat/${chatId}`);
      setMessages(res.data.messages);
    } catch (err) {
      toast.error('Failed to load messages');
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    try {
      await axios.post('/api/chat/message', { chatId, text: input });
      setInput('');
      fetchMessages();
    } catch (err) {
      toast.error('Failed to send message');
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button className="absolute top-2 right-2 text-gray-500" onClick={onClose}>×</button>
        <h3 className="text-xl font-bold mb-4">Chat with {participant?.name || 'User'}</h3>
        <div className="overflow-y-auto h-64 border rounded mb-4 p-2 bg-gray-50">
          {messages.map((msg, idx) => (
            <div key={idx} className={`mb-2 flex ${msg.sender === participant?._id ? 'justify-start' : 'justify-end'}`}>
              <div className={`px-3 py-2 rounded ${msg.sender === participant?._id ? 'bg-gray-200' : 'bg-blue-500 text-white'}`}>
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={sendMessage} className="flex gap-2">
          <input
            type="text"
            className="border rounded px-2 py-1 flex-1"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type a message..."
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded">Send</button>
        </form>
      </div>
    </div>
  );
};

export default ChatModal;
