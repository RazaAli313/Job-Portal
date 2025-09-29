// components/Hero.js
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate=useNavigate();
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20"
    >
      <div className="container mx-auto px-4 text-center">
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-5xl font-bold mb-6"
        >
          Find Your Dream Job Today
        </motion.h1>
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto"
        >
          Discover thousands of job opportunities from top companies around the world.
        </motion.p>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow-md hover:shadow-lg transition-shadow"
            onClick={() => navigate('/jobs')}
         
         >
            Find Jobs
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-indigo-600 transition-colors"
            onClick={() => navigate('/employer')}
          >
            Post a Job
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Hero;