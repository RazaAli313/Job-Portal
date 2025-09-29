// UserSearch.jsx
import React, { useState } from 'react';
import axios from 'axios';

const UserSearch = ({ onUserSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // const token = localStorage.getItem('token');
      const res = await axios.get(`http://localhost:3000/api/users?search=${query}`,
        // { headers: { Authorization: `Bearer ${token}` } }
      );
      setResults(res.data);
    } catch (err) {
      setError('Failed to search users');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <form onSubmit={handleSearch} className="mb-4 flex gap-2">
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
            <button className="px-2 py-1 bg-green-600 text-white rounded" onClick={() => onUserSelect(user)}>Chat</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserSearch;
