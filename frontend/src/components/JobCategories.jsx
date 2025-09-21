// components/JobCategories.js
import React from 'react';
import { motion } from 'framer-motion';

const JobCategories = () => {
  const categories = [
    { name: "Technology", icon: "💻", jobs: "1240" },
    { name: "Healthcare", icon: "🏥", jobs: "862" },
    { name: "Finance", icon: "💰", jobs: "945" },
    { name: "Education", icon: "🎓", jobs: "732" },
    { name: "Marketing", icon: "📊", jobs: "563" },
    { name: "Design", icon: "🎨", jobs: "421" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="mb-12"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Browse by Category</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category, index) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex items-center space-x-4 cursor-pointer hover:shadow-lg transition-shadow"
          >
            <div className="text-3xl">{category.icon}</div>
            <div>
              <h3 className="font-semibold text-gray-800">{category.name}</h3>
              <p className="text-gray-600">{category.jobs} jobs</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default JobCategories;