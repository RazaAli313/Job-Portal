// components/JobCard.js
import React from 'react';
import { motion } from 'framer-motion';

const JobCard = ({ job, onSelect }) => {
  if (!job) return null;

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={() => onSelect(job)}
    >
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-3xl">{job.logo}</div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>
              <p className="text-gray-600">{job.company}</p>
            </div>
          </div>
          {job.featured && (
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-800">
              Featured
            </span>
          )}
        </div>
        
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="inline-flex items-center text-sm text-gray-600">
            📍 {job.location}
          </span>
          {job.remote && (
            <span className="inline-flex items-center text-sm text-indigo-600">
              🌐 Remote
            </span>
          )}
          <span className="inline-flex items-center text-sm text-gray-600">
            💰 {job.salary}
          </span>
          <span className="inline-flex items-center text-sm text-gray-600">
            🎯 {job.experience}
          </span>
        </div>
        
        <p className="mt-4 text-gray-600 line-clamp-2">{job.description}</p>
        
        <div className="mt-6 flex justify-between items-center">
          <span className="text-sm text-gray-500">{job.posted}</span>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 text-sm font-medium rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
          >
            Apply Now
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default JobCard;