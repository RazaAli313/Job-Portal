// UserSearchBar.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserSearchBar = ({ onUserSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://localhost:3000/api/users?search=${query}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setResults(res.data);
    } catch (err) {
      setError('Failed to search users');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-6">
      <form onSubmit={handleSearch} className="flex gap-2 mb-2">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search users by name or email..."
          className="px-4 py-2 border rounded w-full"
        />
        <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded">Search</button>
      </form>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-600">{error}</div>}
      <ul className="space-y-2">
        {results.map(user => (
          <li key={user._id} className="flex justify-between items-center p-2 border rounded">
            <span>{user.name} ({user.email})</span>
            <div className="flex gap-2">
              <button className="px-2 py-1 bg-blue-600 text-white rounded" onClick={() => navigate(`/profile/${user._id}`)}>View Profile</button>
              <button className="px-2 py-1 bg-green-600 text-white rounded" onClick={() => onUserSelect(user)}>Message</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserSearchBar;
