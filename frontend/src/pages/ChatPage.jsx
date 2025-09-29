// ChatPage.jsx
import React, { useState } from 'react';
import UserSearch from '../components/UserSearch';
import Chat from '../components/Chat';

const ChatPage = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [chatId, setChatId] = useState(null);

  const handleUserSelect = async (user) => {
    setSelectedUser(user);
    // Start chat with selected user
    const res = await fetch('http://localhost:3000/api/chat/start', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ participantId: user._id })
    });
    const chat = await res.json();
    setChatId(chat._id);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Start a Chat</h2>
      <UserSearch onUserSelect={handleUserSelect} />
      {chatId && selectedUser && (
        <div className="mt-8">
          <Chat chatId={chatId} userId={localStorage.getItem('userId')} recipientId={selectedUser._id} />
        </div>
      )}
    </div>
  );
};

export default ChatPage;
