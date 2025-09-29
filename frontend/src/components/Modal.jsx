import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Clock, DollarSign, Briefcase, Building, Users, Bookmark, Share2, Send, CheckCircle, ExternalLink, Calendar } from 'lucide-react';
import { useState } from 'react';

const Modal = ({ job, isOpen, onClose }) => {
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
    exp=exp.toLowerCase();
    if (!exp) return 'bg-blue-100 text-blue-800';
    if (exp.includes('senior') || exp.includes('lead')) return 'bg-red-100 text-red-800';
    if (exp.includes('mid')) return 'bg-orange-100 text-orange-800';
    if (exp.includes('junior') || exp.includes('entry')) return 'bg-green-100 text-green-800';
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

  const handleQuickApply = (e) => {
    e.stopPropagation();
    handleApply();
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
            {/* Header with Gradient Background */}
            <div className="bg-gradient-to-r from-indigo-50 via-blue-50 to-purple-50 px-8 py-6 border-b border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center border-2 border-white">
                    <span className="text-3xl">{job.logo || '💼'}</span>
                  </div>
                  <div className="max-w-lg">
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2 leading-tight">
                      {job.title}
                    </h2>
                    <div className="flex items-center flex-wrap gap-3 text-gray-700">
                      <div className="flex items-center space-x-1 bg-white/80 px-3 py-1 rounded-full">
                        <Building size={16} className="text-indigo-500" />
                        <span className="font-medium">{job.company}</span>
                      </div>
                      <div className="flex items-center space-x-1 bg-white/80 px-3 py-1 rounded-full">
                        <MapPin size={16} className="text-red-500" />
                        <span>{job.location}</span>
                      </div>
                      {job.remote && (
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                          🌐 Remote
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsSaved(!isSaved)}
                    className={`p-3 rounded-xl border transition-all duration-200 ${
                      isSaved 
                        ? 'bg-indigo-50 border-indigo-200 text-indigo-600 shadow-sm' 
                        : 'bg-white/80 border-gray-200 text-gray-400 hover:border-indigo-200 hover:text-indigo-500'
                    }`}
                  >
                    <Bookmark size={20} fill={isSaved ? "currentColor" : "none"} />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 rounded-xl border border-gray-200 text-gray-400 hover:border-gray-300 hover:text-gray-600 transition-all duration-200 bg-white/80"
                  >
                    <Share2 size={20} />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onClose}
                    className="p-3 rounded-xl border border-gray-200 text-gray-400 hover:border-gray-300 hover:text-gray-600 transition-all duration-200 bg-white/80"
                  >
                    <X size={20} />
                  </motion.button>
                </div>
              </div>

              {/* Quick Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3 border border-white">
                  <div className="flex items-center space-x-2">
                    <DollarSign size={18} className="text-green-500" />
                    <div>
                      <p className="text-xs text-gray-500">Salary</p>
                      <p className="font-semibold text-gray-900">{formatSalary(job.salary)}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3 border border-white">
                  <div className="flex items-center space-x-2">
                    <Briefcase size={18} className="text-blue-500" />
                    <div>
                      <p className="text-xs text-gray-500">Type</p>
                      <p className="font-semibold text-gray-900">{job.type || 'Full-time'}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3 border border-white">
                  <div className="flex items-center space-x-2">
                    <Users size={18} className="text-purple-500" />
                    <div>
                      <p className="text-xs text-gray-500">Experience</p>
                      <p className="font-semibold text-gray-900">{job.experience || 'Any'}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3 border border-white">
                  <div className="flex items-center space-x-2">
                    <Clock size={18} className="text-amber-500" />
                    <div>
                      <p className="text-xs text-gray-500">Posted</p>
                      <p className="font-semibold text-gray-900">{job.posted || 'Recently'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="p-8 max-h-[50vh] overflow-y-auto">
              {/* Navigation Tabs */}
              <div className="flex space-x-1 bg-gray-100 rounded-xl p-1 mb-6">
                {['description', 'requirements', 'company', 'benefits'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      activeTab === tab
                        ? 'bg-white text-indigo-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {activeTab === 'description' && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold mb-4 text-gray-900">Job Description</h3>
                        <p className="text-gray-700 leading-relaxed">{job.description}</p>
                      </div>
                      
                      {job.responsibilities && (
                        <div>
                          <h4 className="text-lg font-semibold mb-3 text-gray-900">Key Responsibilities</h4>
                          <ul className="space-y-3">
                            {(job.responsibilities || []).map((resp, index) => (
                              <li key={index} className="flex items-start space-x-3">
                                <CheckCircle size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700">{resp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === 'requirements' && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold mb-4 text-gray-900">Requirements</h3>
                        <ul className="space-y-3">
                          {(job.requirements || []).map((req, index) => (
                            <li key={index} className="flex items-start space-x-3">
                              <CheckCircle size={18} className="text-indigo-500 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700">{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {job.skills && (
                        <div>
                          <h4 className="text-lg font-semibold mb-3 text-gray-900">Skills & Technologies</h4>
                          <div className="flex flex-wrap gap-2">
                            {(job.skills || []).map((skill, index) => (
                              <span 
                                key={index}
                                className="px-3 py-2 bg-gradient-to-r from-indigo-100 to-blue-100 text-indigo-700 rounded-lg font-medium text-sm"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === 'company' && (
                    <div>
                      <h3 className="text-xl font-semibold mb-4 text-gray-900">About {job.company}</h3>
                      <p className="text-gray-700 leading-relaxed">
                        {job.companyDescription || 'Learn more about our company culture and values.'}
                      </p>
                    </div>
                  )}

                  {activeTab === 'benefits' && (
                    <div>
                      <h3 className="text-xl font-semibold mb-4 text-gray-900">Benefits & Perks</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          { icon: '💼', text: 'Flexible working hours' },
                          { icon: '🏥', text: 'Health insurance' },
                          { icon: '📚', text: 'Learning budget' },
                          { icon: '🏖️', text: 'Paid time off' },
                          { icon: '💻', text: 'Remote work options' },
                          { icon: '🎯', text: 'Career growth opportunities' }
                        ].map((benefit, index) => (
                          <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                            <span className="text-2xl">{benefit.icon}</span>
                            <span className="text-gray-700">{benefit.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer Actions */}
            <div className="px-8 py-6 border-t border-gray-100 bg-gray-50/50">
              {applyStep === 1 ? (
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar size={16} />
                    <span>Apply before {job.deadline || 'soon'}</span>
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
                      onClick={handleQuickApply}
                      className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 font-medium transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2"
                    >
                      <Send size={18} />
                      <span>Apply Now</span>
                    </motion.button>
                  </div>
                </div>
              ) : applyStep === 2 ? (
                <div className="text-center py-2">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-3"></div>
                  <p className="text-gray-600 font-medium">Processing your application...</p>
                  <p className="text-gray-500 text-sm">Please wait a moment</p>
                </div>
              ) : (
                <div className="text-center py-2">
                  <CheckCircle size={48} className="text-green-500 mx-auto mb-3" />
                  <p className="text-gray-700 font-semibold text-lg mb-1">Application Submitted!</p>
                  <p className="text-gray-600 text-sm">We'll contact you within 3 business days</p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;