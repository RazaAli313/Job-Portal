// components/JobListings.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import JobCard from './JobCard';
import JobModal from './JobModal';

const JobListings = ({ searchTerm, filters }) => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
  const res = await axios.get('http://localhost:3000/api/jobs');
        setJobs(res.data);
      } catch (err) {
        setError('Failed to fetch jobs');
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filters.type ? job.type === filters.type : true;
    const matchesLocation = filters.location ? job.location === filters.location : true;
    const matchesExperience = filters.experience ? job.experience === filters.experience : true;
    return matchesSearch && matchesType && matchesLocation && matchesExperience;
  });

  const handleJobSelect = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1 } 
    }
  };

  if (loading) return <div>Loading jobs...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {filteredJobs.map(job => (
            <JobCard 
              key={job._id} 
              job={job} 
              onSelect={handleJobSelect}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      <JobModal 
        job={selectedJob} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};

export default JobListings;