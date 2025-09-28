
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import ChatModal from '../components/ChatModal';

const EmployerPanel = () => {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', location: '', company: '' });
  const [companies, setCompanies] = useState([]);
  const [chats, setChats] = useState([]);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInfo, setChatInfo] = useState({ chatId: null, participant: null });

  // Fetch employer's jobs
  useEffect(() => {
    fetchJobs();
    fetchApplications();
    fetchChats();
    fetchCompanies();
  }, []);

  // Fetch companies for dropdown
  const fetchCompanies = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:3000/api/companies'
        
        , { headers: { Authorization: `Bearer ${token}` } }
        );
      setCompanies(res.data);
    } catch (err) {
      toast.error('Failed to fetch companies');
    }
  };
  // Fetch chats with candidates
  const fetchChats = async () => {
    try {
  const token = localStorage.getItem('token');
  const res = await axios.get('http://localhost:3000/api/chat', { headers: { Authorization: `Bearer ${token}` } });
      setChats(res.data);
    } catch (err) {
      toast.error('Failed to fetch chats');
    }
  };

  // Open chat modal
  const handleOpenChat = (chat) => {
    const candidate = chat.participants.find(p => p.role === 'candidate');
    setChatInfo({ chatId: chat._id, participant: candidate });
    setChatOpen(true);
  };
        {/* Chats with Candidates */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Chats with Candidates</h3>
          {Array.isArray(chats) && chats.length > 0 ? (
            <ul className="space-y-4">
              {chats.map(chat => (
                <li key={chat._id} className="border p-4 rounded flex justify-between items-center">
                  <div>
                    <div className="font-bold">{chat.participants.find(p => p.role === 'candidate')?.name || 'Candidate'}</div>
                  </div>
                  <button
                    className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
                    onClick={() => handleOpenChat(chat)}
                  >Chat</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No chats yet.</p>
          )}
        </div>

        {chatOpen && (
          <ChatModal
            chatId={chatInfo.chatId}
            participant={chatInfo.participant}
            onClose={() => setChatOpen(false)}
          />
        )}

  const fetchJobs = async () => {
    setLoading(true);
    try {
  const token = localStorage.getItem('token');
  console.log("Token:", token);
  const res = await axios.get('http://localhost:3000/api/jobs/my', { headers: { Authorization: `Bearer ${token}` } });
      setJobs(res.data);
    } catch (err) {
      toast.error('Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  };

  const fetchApplications = async () => {
    try {
  const token = localStorage.getItem('token');
  const res = await axios.get('http://localhost:3000/api/applications/received', { headers: { Authorization: `Bearer ${token}` } });
      setApplications(res.data);
    } catch (err) {
      toast.error('Failed to fetch applications');
    }
  };

  // Post a new job
  const handlePostJob = async (e) => {
    e.preventDefault();
    if (!form.company) {
      toast.error('Please select a company');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      console.log("Form Data: ", form);
      await axios.post('http://localhost:3000/api/jobs', form, { headers: { Authorization: `Bearer ${token}` } });
      toast.success('Job posted successfully!');
      setForm({ title: '', description: '', location: '', company: '',salary:'',experience:'',type:'' });
      fetchJobs();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to post job');
    }
  };

  // Delete a job
  const handleDeleteJob = async (jobId) => {
    try {
  const token = localStorage.getItem('token');
  await axios.delete(`http://localhost:3000/api/jobs/${jobId}`, { headers: { Authorization: `Bearer ${token}` } });
      toast.success('Job deleted');
      fetchJobs();
    } catch (err) {
      toast.error('Failed to delete job');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Employer Panel</h2>
        <p className="mb-6 text-center">Post jobs, view applications, and manage listings.</p>

        {/* Post Job Form */}
        <form onSubmit={handlePostJob} className="mb-8 space-y-4">
          <h3 className="text-xl font-semibold">Post a New Job</h3>
          <input
            type="text"
            placeholder="Title"
            className="border p-2 rounded w-full"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Location"
            className="border p-2 rounded w-full"
            value={form.location}
            onChange={e => setForm({ ...form, location: e.target.value })}
            required
          />
          <textarea
            placeholder="Description"
            className="border p-2 rounded w-full"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Salary"
            className="border p-2 rounded w-full"
            value={form.salary}
            onChange={e => setForm({ ...form, salary: e.target.value })}
            required
          />
         <select
            className="border p-2 rounded w-full"
            value={form.experience}
            onChange={e => setForm({ ...form, experience: e.target.value })}
            required
          >
            <option value="">Select Experience Level</option>
            <option value="entry">Entry</option>
            <option value="mid">Mid</option>
            <option value="senior">Senior</option>
            <option value="executive">Executive</option>
         </select>
         <select
            className="border p-2 rounded w-full"
            value={form.type}
            onChange={e => setForm({ ...form, type: e.target.value })}
            required
          >
            <option value="">Select Job Type</option>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="contract">Contract</option>
            <option value="internship">Internship</option>
            <option value="remote">Remote</option>
          </select>
          <select
            className="border p-2 rounded w-full"
            value={form.company}
            onChange={e => setForm({ ...form, company: e.target.value })}
            required
          >
            <option value="">Select Company</option>
            {companies.map(company => (
              <option key={company._id} value={company._id}>{company.name}</option>
            ))}
          </select>
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600" type="submit">Post Job</button>
        </form>

        {/* Job Listings */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">My Job Listings</h3>
          {loading ? (
            <p>Loading jobs...</p>
          ) : Array.isArray(jobs) && jobs.length > 0 ? (
            <ul className="space-y-4">
              {jobs.map(job => (
                <li key={job._id} className="border p-4 rounded flex justify-between items-center">
                  <div>
                    <div className="font-bold">{job.title}</div>
                    <div className="text-sm text-gray-600">{job.location}</div>
                  </div>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    onClick={() => handleDeleteJob(job._id)}
                  >Delete</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No jobs posted yet.</p>
          )}
        </div>

        {/* Applications Received */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Applications Received</h3>
          {Array.isArray(applications) && applications.length > 0 ? (
            <ul className="space-y-4">
              {applications.map(app => (
                <li key={app._id} className="border p-4 rounded flex justify-between items-center">
                  <div>
                    <div className="font-bold">{app.candidate?.name || 'Candidate'}</div>
                    <div className="text-sm text-gray-600">Applied for: {app.job?.title || 'Job Deleted'}</div>
                    <div className="text-sm">Status: {app.status}</div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No applications received yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployerPanel;
