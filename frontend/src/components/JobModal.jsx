// components/JobModal.js
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Clock, DollarSign, Briefcase, Building, Users, Bookmark, Share2, Send, CheckCircle, ExternalLink } from 'lucide-react';

const JobModal = ({ job, isOpen, onClose }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [applyStep, setApplyStep] = useState(1);

  if (!job) return null;

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        duration: 0.3,
        ease: "easeOut" 
      } 
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        duration: 0.4,
        ease: "easeOut",
        type: "spring",
        stiffness: 300,
        damping: 30
      } 
    },
    exit: { 
      opacity: 0, 
      scale: 0.9,
      transition: { duration: 0.2 }
    }
  };

  const getExperienceColor = (exp) => {
    if (!exp) return 'bg-blue-100 text-blue-800';
    if (exp.includes('Senior') || exp.includes('Lead')) return 'bg-red-100 text-red-800';
    if (exp.includes('Mid')) return 'bg-orange-100 text-orange-800';
    if (exp.includes('Junior') || exp.includes('Entry')) return 'bg-green-100 text-green-800';
    return 'bg-blue-100 text-blue-800';
  };

  const formatSalary = (salary) => {
    if (!salary) return 'Negotiable';
    return salary.replace('💰', '').trim();
  };

  const handleApply = () => {
    setApplyStep(2);
    // Simulate application process
    setTimeout(() => setApplyStep(3), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[95vh] overflow-hidden"
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 px-8 py-6 border-b border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center">
                    <span className="text-3xl">{job.logo || '💼'}</span>
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-1">{job.title}</h2>
                    <div className="flex items-center space-x-4 text-lg text-gray-700">
                      <div className="flex items-center space-x-1">
                        <Building size={18} />
                        <span className="font-medium">{job.company?.name || job.company}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin size={18} />
                        <span>{job.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsSaved(!isSaved)}
                    className={`p-3 rounded-xl border transition-all duration-200 ${
                      isSaved 
                        ? 'bg-indigo-50 border-indigo-200 text-indigo-600' 
                        : 'bg-white border-gray-200 text-gray-400 hover:border-indigo-200 hover:text-indigo-500'
                    }`}
                  >
                    <Bookmark size={20} fill={isSaved ? "currentColor" : "none"} />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 rounded-xl border border-gray-200 text-gray-400 hover:border-gray-300 hover:text-gray-600 transition-all duration-200"
                  >
                    <Share2 size={20} />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    className="p-3 rounded-xl border border-gray-200 text-gray-400 hover:border-gray-300 hover:text-gray-600 transition-all duration-200"
                  >
                    <X size={20} />
                  </motion.button>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 text-center">
                  <DollarSign size={20} className="text-green-500 mx-auto mb-1" />
                  <p className="text-sm text-gray-600">Salary</p>
                  <p className="font-semibold text-gray-900">{formatSalary(job.salary)}</p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 text-center">
                  <Briefcase size={20} className="text-blue-500 mx-auto mb-1" />
                  <p className="text-sm text-gray-600">Type</p>
                  <p className="font-semibold text-gray-900">{job.type || 'Full-time'}</p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 text-center">
                  <Users size={20} className="text-purple-500 mx-auto mb-1" />
                  <p className="text-sm text-gray-600">Experience</p>
                  <p className="font-semibold text-gray-900">{job.experience || 'Any'}</p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 text-center">
                  <Clock size={20} className="text-amber-500 mx-auto mb-1" />
                  <p className="text-sm text-gray-600">Posted</p>
                  <p className="font-semibold text-gray-900">{job.posted || 'Recently'}</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 max-h-[60vh] overflow-y-auto">
              {/* Navigation Tabs */}
              <div className="flex border-b border-gray-200 mb-6">
                {['description', 'company'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 font-medium capitalize border-b-2 transition-colors ${
                      activeTab === tab
                        ? 'border-indigo-600 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {activeTab === 'description' && (
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Job Description</h3>
                      <p className="text-gray-700 leading-relaxed">{job.description}</p>
                      
                      {job.responsibilities && (
                        <div className="mt-6">
                          <h4 className="text-lg font-semibold mb-3">Key Responsibilities</h4>
                          <ul className="space-y-2">
                            {job.responsibilities.map((resp, index) => (
                              <li key={index} className="flex items-start space-x-3">
                                <CheckCircle size={16} className="text-green-500 mt-1 flex-shrink-0" />
                                <span className="text-gray-700">{resp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {/* {activeTab === 'requirements' && (
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Requirements</h3>
                      <ul className="space-y-3">
                        {job.requirements?.map((req, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <CheckCircle size={16} className="text-indigo-500 mt-1 flex-shrink-0" />
                            <span className="text-gray-700">{req}</span>
                          </li>
                        )) || (
                          <p className="text-gray-600">No specific requirements listed.</p>
                        )}
                      </ul>

                      {job.skills && job.skills.length > 0 && (
                        <div className="mt-6">
                          <h4 className="text-lg font-semibold mb-3">Skills Required</h4>
                          <div className="flex flex-wrap gap-2">
                            {job.skills.map((skill, index) => (
                              <span 
                                key={index}
                                className="px-3 py-2 bg-indigo-100 text-indigo-700 rounded-lg font-medium"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )} */}

                  {activeTab === 'company' && (
                    <div>
                      <h3 className="text-xl font-semibold mb-4">About {job.company?.name || job.company}</h3>
                      <p className="text-gray-700 leading-relaxed">
                        {job.company?.description || 'Company information not available.'}
                      </p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="px-8 py-6 border-t border-gray-100 bg-gray-50">
              {applyStep === 1 ? (
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-600">
                    ⏳ Apply before {job.deadline || 'soon'}
                  </div>
                  <div className="flex space-x-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={onClose}
                      className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-100 font-medium transition-colors"
                    >
                      Close
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleApply}
                      className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 font-medium transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2"
                    >
                      <Send size={18} />
                      <span>Apply Now</span>
                    </motion.button>
                  </div>
                </div>
              ) : applyStep === 2 ? (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-2"></div>
                  <p className="text-gray-600">Processing your application...</p>
                </div>
              ) : (
                <div className="text-center py-4">
                  <CheckCircle size={48} className="text-green-500 mx-auto mb-2" />
                  <p className="text-gray-700 font-semibold">Application Submitted Successfully!</p>
                  <p className="text-gray-600 text-sm">We'll get back to you soon.</p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default JobModal;