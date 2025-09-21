// components/SearchFilters.js
import React from 'react';
import { motion } from 'framer-motion';

const SearchFilters = ({ searchTerm, setSearchTerm, filters, setFilters }) => {
  const filterOptions = {
    type: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'],
    location: ['New York', 'San Francisco', 'London', 'Berlin', 'Remote'],
    experience: ['Entry', 'Mid', 'Senior', 'Executive']
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-white p-6 rounded-xl shadow-md mb-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
            Search Jobs
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              id="search"
              className="block w-full rounded-md border-gray-300 pl-10 pr-4 py-3 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Job title, company, or keywords"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {Object.keys(filterOptions).map((filterType) => (
          <div key={filterType}>
            <label htmlFor={filterType} className="block text-sm font-medium text-gray-700 mb-1">
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </label>
            <select
              id={filterType}
              className="block w-full rounded-md border-gray-300 shadow-sm py-3 px-3 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={filters[filterType]}
              onChange={(e) => handleFilterChange(filterType, e.target.value)}
            >
              <option value="">All {filterType}s</option>
              {filterOptions[filterType].map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default SearchFilters;