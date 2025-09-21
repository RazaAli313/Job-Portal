import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';


const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { token, user } = useContext(AuthContext);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/applications', {
          headers: { Authorization: `Bearer ${token}` }
        });
        // Filter applications for candidate role
        const filtered = user?.role === 'candidate'
          ? res.data.filter(app => app.candidate?._id === user.id)
          : res.data;
        setApplications(filtered);
      } catch (err) {
        setError('Failed to fetch applications');
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, [token, user]);

  if (loading) return <div>Loading applications...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-2xl text-center">
        <h2 className="text-2xl font-bold mb-6">Applications</h2>
        {applications.length === 0 ? (
          <p>No applications found.</p>
        ) : (
          <ul className="space-y-4">
            {applications.map(app => (
              <li key={app._id} className="border p-4 rounded shadow">
                <h3 className="text-lg font-semibold mb-2">{app.job?.title || 'Job'}</h3>
                <p>Status: <span className="font-semibold">{app.status}</span></p>
                <p>Candidate: {app.candidate?.name || 'N/A'}</p>
                <p>Applied: {new Date(app.createdAt).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Applications;
