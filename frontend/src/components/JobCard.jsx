// components/JobCard.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bookmark, MapPin, Clock, DollarSign, Briefcase, Zap, ExternalLink, Building, User } from 'lucide-react';

const JobCard = ({ job, onSelect, viewMode = 'grid' }) => {
  const [isSaved, setIsSaved] = useState(false);

  if (!job) return null;

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const getExperienceColor = (exp) => {
    if (!exp) return 'bg-blue-100 text-blue-800';
    if (exp.includes('Senior') || exp.includes('Lead')) return 'bg-red-100 text-red-800';
    if (exp.includes('Mid')) return 'bg-orange-100 text-orange-800';
    if (exp.includes('Junior') || exp.includes('Entry')) return 'bg-green-100 text-green-800';
    return 'bg-blue-100 text-blue-800';
  };

  const getJobTypeColor = (type) => {
    if (!type) return 'bg-gray-100 text-gray-800';
    switch(type.toLowerCase()) {
      case 'full-time': return 'bg-emerald-100 text-emerald-800';
      case 'part-time': return 'bg-blue-100 text-blue-800';
      case 'contract': return 'bg-amber-100 text-amber-800';
      case 'internship': return 'bg-purple-100 text-purple-800';
      case 'remote': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatSalary = (salary) => {
    if (!salary) return 'Negotiable';
    return salary.replace('💰', '').trim();
  };

  // List View Layout
  if (viewMode === 'list') {
    return (
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ x: 4, backgroundColor: "#fafbff" }}
        className="group bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-100 hover:border-indigo-100 transition-all duration-300 cursor-pointer p-6"
        onClick={() => onSelect(job)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-100 to-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-xl">{job.logo || '💼'}</span>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-3 mb-2">
                <h3 className="text-lg font-semibold text-gray-900 truncate group-hover:text-indigo-700">
                  {job.title}
                </h3>
                {job.featured && (
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-amber-100 text-amber-800 flex items-center space-x-1">
                    <Zap size={10} />
                    <span>Featured</span>
                  </span>
                )}
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Building size={14} />
                  <span>{job.company?.name || job.company}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin size={14} />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <DollarSign size={14} />
                  <span className="font-medium text-green-600">{formatSalary(job.salary)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4 ml-4">
            <div className="text-right">
              <span className={`px-3 py-1 text-xs font-medium rounded-full ${getJobTypeColor(job.type)}`}>
                {job.type || 'Full-time'}
              </span>
              <div className="flex items-center space-x-1 text-xs text-gray-500 mt-1">
                <Clock size={12} />
                <span>{job.posted || 'Recently'}</span>
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                setIsSaved(!isSaved);
              }}
              className={`p-2 rounded-lg border transition-all duration-200 ${
                isSaved 
                  ? 'bg-indigo-50 border-indigo-200 text-indigo-600' 
                  : 'bg-white border-gray-200 text-gray-400 hover:border-indigo-200 hover:text-indigo-500'
              }`}
            >
              <Bookmark size={16} fill={isSaved ? "currentColor" : "none"} />
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  }

  // Default Grid View
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100/80 hover:border-indigo-100 transition-all duration-300 cursor-pointer overflow-hidden"
      onClick={() => onSelect(job)}
    >
      {/* Background Gradient on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-blue-50 opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
      
      <div className="relative p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-100 to-blue-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="text-2xl">{job.logo || '💼'}</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-700 transition-colors line-clamp-1">
                {job.title}
              </h3>
              <p className="text-gray-700 font-medium">{job.company?.name || job.company}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {job.featured && (
              <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white flex items-center space-x-1">
                <Zap size={12} />
                <span>Featured</span>
              </span>
            )}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                setIsSaved(!isSaved);
              }}
              className={`p-2 rounded-lg border transition-all duration-200 ${
                isSaved 
                  ? 'bg-indigo-50 border-indigo-200 text-indigo-600' 
                  : 'bg-white border-gray-200 text-gray-400 hover:border-indigo-200 hover:text-indigo-500'
              }`}
            >
              <Bookmark size={16} fill={isSaved ? "currentColor" : "none"} />
            </motion.button>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className={`px-3 py-1 text-xs font-medium rounded-full ${getJobTypeColor(job.type)}`}>
            {job.type || 'Full-time'}
          </span>
          <span className={`px-3 py-1 text-xs font-medium rounded-full ${getExperienceColor(job.experience)}`}>
            {job.experience || 'Experienced'}
          </span>
          {job.remote && (
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-800">
              🌐 Remote
            </span>
          )}
        </div>

        {/* Job Info Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <MapPin size={16} className="text-gray-400" />
            <span className="line-clamp-1">{job.location}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <DollarSign size={16} className="text-gray-400" />
            <span className="font-medium text-green-600">{formatSalary(job.salary)}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Briefcase size={16} className="text-gray-400" />
            <span>{job.category || 'Development'}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Clock size={16} className="text-gray-400" />
            <span>{job.posted || 'Recently'}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-4">
          {job.description}
        </p>

        {/* Skills */}
        {job.skills && job.skills.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {job.skills.slice(0, 4).map((skill, index) => (
                <span 
                  key={index}
                  className="px-2.5 py-1 text-xs bg-gray-100 text-gray-700 rounded-md font-medium"
                >
                  {skill}
                </span>
              ))}
              {job.skills.length > 4 && (
                <span className="px-2.5 py-1 text-xs bg-gray-100 text-gray-500 rounded-md">
                  +{job.skills.length - 4} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Clock size={14} />
            <span>Posted {job.posted || 'recently'}</span>
          </div>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 text-sm font-medium rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-sm hover:shadow-md flex items-center space-x-2 group/btn"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(job);
            }}
          >
            <span>Apply Now</span>
            <ExternalLink size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
          </motion.button>
        </div>
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-indigo-200/50 pointer-events-none transition-all duration-300" />
    </motion.div>
  );
};

export default JobCard;