import UserSearchBar from '../components/UserSearchBar';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import JobCard from '../components/JobCard';
import JobModal from '../components/JobModal';
import Chat from '../components/Chat';
import { motion, AnimatePresence } from 'framer-motion';

// const categories = [
//   'Engineering', 'Design', 'Marketing', 'Sales', 'Product', 'Finance', 'HR', 'Operations', 'Support', 'Other'
// ];
const categories = []

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  // Get unique locations from jobs
  const availableLocations = Array.from(new Set(jobs.map(job => job.location).filter(Boolean)));
  const [comments, setComments] = useState({});
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:3000/api/jobs', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        setJobs(response.data);
        toast.success('Jobs loaded successfully!');
      })
      .catch(error => {
        console.error(error);
        toast.error('Failed to fetch jobs');
      });
  }, []);

  // Filter jobs by category and search
  const filteredJobs = jobs.filter(job => {
    // const matchesCategory = activeCategory === 'All' || job.category === activeCategory;
  const matchesCategory = activeCategory === 'All' || job.category === activeCategory;
  const matchesSearch = searchTerm === '' || job.title.toLowerCase().includes(searchTerm.toLowerCase()) || job.company?.name?.toLowerCase().includes(searchTerm.toLowerCase());
  const matchesLocation = locationFilter === '' || (job.location && job.location.toLowerCase().includes(locationFilter.toLowerCase()));
  return matchesCategory && matchesSearch && matchesLocation;
  });

  // Handle job selection for modal
  const handleJobSelect = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
    setShowChat(false);
  };

  // Handle comment submission
  const handleComment = (jobId, text) => {
    if (!text.trim()) return;
    setComments(prev => ({
      ...prev,
      [jobId]: [...(prev[jobId] || []), { user: 'You', text }]
    }));
    toast.success('Comment added!');
  };

  // LinkedIn-style feed UI
  // User search bar above jobs feed
  const [chatUser, setChatUser] = useState(null);
  const [chatId, setChatId] = useState(null);
  const handleUserSelect = async (user) => {
    setChatUser(user);
    // Start chat with selected user
    const token = localStorage.getItem('token');
    const res = await axios.post('http://localhost:3000/api/chat/start', { participantId: user._id }, { headers: { Authorization: `Bearer ${token}` } });
    setChatId(res.data._id);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 py-12">
      <div className="container mx-auto px-4">
 
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2 text-indigo-700">Search Users</h2>
          <UserSearchBar onUserSelect={handleUserSelect} />
        </div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <h2 className="text-3xl font-extrabold text-indigo-700">Job Feed</h2>
          <div className="flex gap-2 flex-wrap">
            {/* <button
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${activeCategory === 'All' ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600 border border-indigo-200'}`}
              onClick={() => setActiveCategory('All')}
            >All</button> */}
            {categories.map(cat => (
              <button
                key={cat}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${activeCategory === cat ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600 border border-indigo-200'}`}
                onClick={() => setActiveCategory(cat)}
              >{cat}</button>
            ))}
          </div>
          <input
            type="text"
            className="px-4 py-2 rounded-lg border border-indigo-200 focus:outline-none focus:ring focus:border-indigo-400 w-full md:w-64"
            placeholder="Search jobs or companies..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <select
            className="px-4 py-2 rounded-lg border border-green-200 focus:outline-none focus:ring focus:border-green-400 w-full md:w-64"
            value={locationFilter}
            onChange={e => setLocationFilter(e.target.value)}
          >
            <option value="">All Locations</option>
            {availableLocations.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredJobs.length === 0 ? (
            <div className="col-span-full text-center py-16">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No jobs found</h3>
              <p className="text-gray-500">Try adjusting your search or filters.</p>
            </div>
          ) : (
            filteredJobs.map(job => (
              <motion.div key={job._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <JobCard job={job} onSelect={handleJobSelect} />
                {/* Comments Section */}
                {/* <div className="mt-4 bg-white rounded-xl shadow p-4">
                  <h4 className="font-semibold text-indigo-700 mb-2">Comments</h4>
                  <ul className="mb-2 space-y-2">
                    {(comments[job._id] || []).map((c, idx) => (
                      <li key={idx} className="text-gray-700"><span className="font-bold text-indigo-600">{c.user}:</span> {c.text}</li>
                    ))}
                  </ul>
                  <form
                    onSubmit={e => {
                      e.preventDefault();
                      const text = e.target.elements.comment.value;
                      handleComment(job._id, text);
                      e.target.reset();
                    }}
                    className="flex gap-2"
                  >
                    <input name="comment" type="text" className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:border-indigo-300" placeholder="Add a comment..." />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                    >Comment</motion.button>
                  </form>
                  <button
                    className="mt-2 text-indigo-500 hover:underline text-sm"
                    onClick={() => { setSelectedJob(job); setShowChat(true); setIsModalOpen(false); }}
                  >Open Chat</button>
                </div> */}
              </motion.div>
            ))
          )}
        </motion.div>

        {/* Job Modal */}
        <JobModal job={selectedJob} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

        {/* Chat Section for user search */}
        <AnimatePresence>
          {chatId && chatUser && (
            <Chat chatId={chatId} userId={localStorage.getItem('userId')} recipientId={chatUser._id} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Jobs;
