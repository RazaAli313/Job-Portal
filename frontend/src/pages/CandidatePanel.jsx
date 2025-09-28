
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import ChatModal from '../components/ChatModal';

const CandidatePanel = () => {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInfo, setChatInfo] = useState({ chatId: null, participant: null });
  // Start chat with employer
  const handleStartChat = async (employerId) => {
    try {
  const token = localStorage.getItem('token');
  const res = await axios.post('http://localhost:3000/api/chat/start', { participantId: employerId }, { headers: { Authorization: `Bearer ${token}` } });
      setChatInfo({ chatId: res.data._id, participant: res.data.participants.find(p => p._id !== employerId) });
      setChatOpen(true);
    } catch (err) {
      toast.error('Failed to start chat');
    }
  };

  // Fetch jobs from backend
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
  const token = localStorage.getItem('token');
  const res = await axios.get('http://localhost:3000/api/jobs', { headers: { Authorization: `Bearer ${token}` } });
        setJobs(res.data);
      } catch (err) {
        toast.error('Failed to fetch jobs');
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
    fetchApplications();
  }, []);

  // Fetch candidate's applications
  const fetchApplications = async () => {
    try {
  const token = localStorage.getItem('token');
  const res = await axios.get('http://localhost:3000/api/applications/my', { headers: { Authorization: `Bearer ${token}` } });
      setApplications(res.data);
    } catch (err) {
      toast.error('Failed to fetch applications');
    }
  };

  // Apply for a job
  const handleApply = async (jobId) => {
    try {
  const token = localStorage.getItem('token');
  await axios.post('http://localhost:3000/api/applications', { jobId }, { headers: { Authorization: `Bearer ${token}` } });
      toast.success('Applied successfully!');
      fetchApplications();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to apply');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Candidate Panel</h2>
        <p className="mb-6 text-center">Browse jobs, apply, and track your applications.</p>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Available Jobs</h3>
          {loading ? (
            <p>Loading jobs...</p>
          ) : Array.isArray(jobs) && jobs.length > 0 ? (
            <ul className="space-y-4">
              {jobs.map((job) => (
                <li key={job._id} className="border p-4 rounded flex justify-between items-center">
                  <div>
                    <div className="font-bold">{job.title}</div>
                    <div className="text-sm text-gray-600">{job.company?.name || job.companyName}</div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                      onClick={() => handleApply(job._id)}
                    >
                      Apply
                    </button>
                    {job.employer && (
                      <button
                        className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
                        onClick={() => handleStartChat(job.employer._id)}
                      >
                        Chat
                      </button>
                    )}
                  </div>
                </li>
              ))}
      {chatOpen && (
        <ChatModal
          chatId={chatInfo.chatId}
          participant={chatInfo.participant}
          onClose={() => setChatOpen(false)}
        />
      )}
            </ul>
          ) : (
            <p>No jobs found.</p>
          )}
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">My Applications</h3>
          {applications.length === 0 ? (
            <p>No applications yet.</p>
          ) : (
            <ul className="space-y-4">
              {applications.map((app) => (
                <li key={app._id} className="border p-4 rounded flex justify-between items-center">
                  <div>
                    <div className="font-bold">{app.job?.title || 'Job Deleted'}</div>
                    <div className="text-sm text-gray-600">Status: {app.status}</div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default CandidatePanel;
