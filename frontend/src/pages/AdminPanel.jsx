
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  fetchUsers();
  fetchJobs();
  }, []);

  // Dashboard analytics
  const userArr = Array.isArray(users) ? users : [];
  const jobArr = Array.isArray(jobs) ? jobs : [];
  const userCount = userArr.length;
  const jobCount = jobArr.length;
  const candidateCount = userArr.filter(u => u.role === 'candidate').length;
  const employerCount = userArr.filter(u => u.role === 'employer').length;

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:3000/api/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(Array.isArray(res.data) ? res.data : []);
      toast.success('Users loaded successfully!');
    } catch (err) {
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:3000/api/jobs', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setJobs(Array.isArray(res.data) ? res.data : []);
      toast.success('Jobs loaded successfully!');
    } catch (err) {
      toast.error('Failed to fetch jobs');
    }
  };

  // Delete user
  const handleDeleteUser = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('User deleted successfully!');
      fetchUsers();
    } catch (err) {
      toast.error('Failed to delete user');
    }
  };

  // Delete job
  const handleDeleteJob = async (jobId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/api/jobs/${jobId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Job deleted successfully!');
      fetchJobs();
    } catch (err) {
      toast.error('Failed to delete job');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-4xl border border-gray-200">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-indigo-700">Admin Panel</h2>
        <p className="mb-6 text-center text-lg text-gray-700">Manage users, jobs, and site settings here.</p>

        {/* Dashboard Analytics */}
        <div className="mb-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-r from-indigo-200 to-indigo-400 p-6 rounded-xl shadow text-center">
            <div className="text-4xl font-extrabold text-indigo-900">{userCount}</div>
            <div className="text-indigo-700 font-semibold">Total Users</div>
          </div>
          <div className="bg-gradient-to-r from-purple-200 to-purple-400 p-6 rounded-xl shadow text-center">
            <div className="text-4xl font-extrabold text-purple-900">{jobCount}</div>
            <div className="text-purple-700 font-semibold">Total Jobs</div>
          </div>
          <div className="bg-gradient-to-r from-green-200 to-green-400 p-6 rounded-xl shadow text-center">
            <div className="text-4xl font-extrabold text-green-900">{candidateCount}</div>
            <div className="text-green-700 font-semibold">Candidates</div>
          </div>
          <div className="bg-gradient-to-r from-pink-200 to-pink-400 p-6 rounded-xl shadow text-center">
            <div className="text-4xl font-extrabold text-pink-900">{employerCount}</div>
            <div className="text-pink-700 font-semibold">Employers</div>
          </div>
        </div>

        {/* Users Management */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-4 text-indigo-800">Users</h3>
          {loading ? (
            <p className="text-center text-gray-500">Loading users...</p>
          ) : userArr.length === 0 ? (
            <p className="text-center text-gray-500">No users found.</p>
          ) : (
            <ul className="space-y-4">
              {userArr.map(user => (
                <li key={user._id} className="border p-4 rounded-xl flex justify-between items-center bg-gray-50 shadow-sm">
                  <div>
                    <div className="font-bold text-lg text-indigo-700">{user.name}</div>
                    <div className="text-sm text-gray-600">Role: {user.role}</div>
                  </div>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors font-semibold"
                    onClick={() => handleDeleteUser(user._id)}
                  >Delete</button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Jobs Management */}
        <div>
          <h3 className="text-2xl font-bold mb-4 text-purple-800">Jobs</h3>
          {jobArr.length === 0 ? (
            <p className="text-center text-gray-500">No jobs found.</p>
          ) : (
            <ul className="space-y-4">
              {jobArr.map(job => (
                <li key={job._id} className="border p-4 rounded-xl flex justify-between items-center bg-gray-50 shadow-sm">
                  <div>
                    <div className="font-bold text-lg text-purple-700">{job.title}</div>
                    <div className="text-sm text-gray-600">{job.location}</div>
                  </div>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors font-semibold"
                    onClick={() => handleDeleteJob(job._id)}
                  >Delete</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
