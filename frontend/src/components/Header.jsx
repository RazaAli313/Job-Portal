// components/Header.js
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);

  const categories = [
    'Engineering', 'Design', 'Marketing', 'Sales', 'Product', 'Finance', 'HR', 'Operations', 'Support', 'Other'
  ];
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white shadow-sm py-4"
    >
  <div className="container mx-auto px-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="text-2xl font-bold text-indigo-600"
        >
          JobPortal
        </motion.div>
        {/* Categories and Search */}
        {/* <div className="flex flex-col md:flex-row md:items-center gap-2 w-full md:w-auto">
          <div className="flex gap-2 flex-wrap md:flex-nowrap overflow-x-auto md:overflow-visible pb-2 md:pb-0">
            <button
              className={`px-3 py-1 rounded-lg font-semibold transition-colors ${activeCategory === 'All' ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600 border border-indigo-200'}`}
              onClick={() => setActiveCategory('All')}
            >All</button>
            {categories.map(cat => (
              <button
                key={cat}
                className={`px-3 py-1 rounded-lg font-semibold transition-colors ${activeCategory === cat ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600 border border-indigo-200'}`}
                onClick={() => setActiveCategory(cat)}
              >{cat}</button>
            ))}
          </div>
          <div className="w-full md:w-64">
            <input
              type="text"
              className="px-4 py-2 rounded-lg border border-indigo-200 focus:outline-none focus:ring focus:border-indigo-400 w-full"
              placeholder="Search jobs or companies..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
        </div> */}
        <nav className="hidden md:flex space-x-8 items-center">
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link to="/" className="text-gray-600 hover:text-indigo-600 transition-colors">Home</Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link to="/jobs" className="text-gray-600 hover:text-indigo-600 transition-colors">Jobs</Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link to="/companies" className="text-gray-600 hover:text-indigo-600 transition-colors">Companies</Link>
          </motion.div>
          {/* <motion.div whileHover={{ scale: 1.05 }}>
            <Link to="/chat" className="text-gray-600 hover:text-indigo-600 transition-colors">Chat</Link>
          </motion.div> */}
          {/* <motion.div whileHover={{ scale: 1.05 }}>
            <Link to="/profile" className="text-gray-600 hover:text-indigo-600 transition-colors">Profile</Link>
          </motion.div> */}
        </nav>

  <div className="hidden md:flex items-center space-x-4">
          {!user ? (
            <>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/login" className="px-4 py-2 text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-50 transition-colors">Sign In</Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/register" className="px-4 py-2 text-green-600 border border-green-600 rounded-md hover:bg-green-50 transition-colors">Register</Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/employer" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">Post a Job</Link>
              </motion.div>
            </>
          ) : (
            <>
              <span className="px-2 text-gray-700 whitespace-nowrap">Hello, {user.name}</span>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to={user?.role === 'admin' ? '/admin' : user?.role === 'employer' ? '/employer' : '/candidate'} className="px-4 py-2 text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-50 transition-colors">Dashboard</Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/profile" className="px-4 py-2 text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-50 transition-colors">Profile</Link>
              </motion.div>
              {/* <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/chat" className="px-4 py-2 text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-50 transition-colors">Chat</Link>
              </motion.div> */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors"
                style={{ fontSize: '1rem', height: 'auto' }}
                onClick={logout}
              >
                Logout
              </motion.button>
            </>
          )}
        </div>

        <button 
          className="md:hidden text-gray-600"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white px-4 py-2 shadow-md"
          >
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-600 hover:text-indigo-600 transition-colors py-2">Home</Link>
              <Link to="/jobs" className="text-gray-600 hover:text-indigo-600 transition-colors py-2">Jobs</Link>
              <Link to="/companies" className="text-gray-600 hover:text-indigo-600 transition-colors py-2">Companies</Link>
              <Link to="/about" className="text-gray-600 hover:text-indigo-600 transition-colors py-2">About</Link>
              <Link to="/contact" className="text-gray-600 hover:text-indigo-600 transition-colors py-2">Contact</Link>
              <div className="flex flex-col space-y-2 py-4 border-t border-gray-100">
                {!user ? (
                  <>
                    <Link to="/login" className="px-4 py-2 text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-50 transition-colors">Sign In</Link>
                    <Link to="/register" className="px-4 py-2 text-green-600 border border-green-600 rounded-md hover:bg-green-50 transition-colors">Register</Link>
                    <Link to="/employer" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">Post a Job</Link>
                  </>
                ) : (
                  <>
                    <span className="px-2 text-gray-700 whitespace-nowrap">Hello, {user.name}</span>
                    <Link to="/dashboard" className="px-4 py-2 text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-50 transition-colors">Dashboard</Link>
                    <button
                      className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors"
                      style={{ fontSize: '1rem', height: 'auto' }}
                      onClick={logout}
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;