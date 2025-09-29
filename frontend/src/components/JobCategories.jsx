// components/JobCategories.js
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Users, TrendingUp } from 'lucide-react';

const JobCategories = () => {
  const categories = []
  // const categories = [
  //   { 
  //     name: "Technology", 
  //     icon: "💻", 
  //     jobs: "1,240",
  //     growth: "+15%",
  //     color: "from-blue-500 to-cyan-500",
  //     bgColor: "bg-blue-50",
  //     textColor: "text-blue-700"
  //   },
  //   { 
  //     name: "Healthcare", 
  //     icon: "🏥", 
  //     jobs: "862",
  //     growth: "+22%",
  //     color: "from-emerald-500 to-green-500",
  //     bgColor: "bg-emerald-50",
  //     textColor: "text-emerald-700"
  //   },
  //   { 
  //     name: "Finance", 
  //     icon: "💰", 
  //     jobs: "945",
  //     growth: "+18%",
  //     color: "from-amber-500 to-yellow-500",
  //     bgColor: "bg-amber-50",
  //     textColor: "text-amber-700"
  //   },
  //   { 
  //     name: "Education", 
  //     icon: "🎓", 
  //     jobs: "732",
  //     growth: "+12%",
  //     color: "from-purple-500 to-indigo-500",
  //     bgColor: "bg-purple-50",
  //     textColor: "text-purple-700"
  //   },
  //   { 
  //     name: "Marketing", 
  //     icon: "📊", 
  //     jobs: "563",
  //     growth: "+25%",
  //     color: "from-pink-500 to-rose-500",
  //     bgColor: "bg-pink-50",
  //     textColor: "text-pink-700"
  //   },
  //   { 
  //     name: "Design", 
  //     icon: "🎨", 
  //     jobs: "421",
  //     growth: "+20%",
  //     color: "from-violet-500 to-purple-500",
  //     bgColor: "bg-violet-50",
  //     textColor: "text-violet-700"
  //   },
  //   { 
  //     name: "Engineering", 
  //     icon: "⚙️", 
  //     jobs: "689",
  //     growth: "+16%",
  //     color: "from-orange-500 to-red-500",
  //     bgColor: "bg-orange-50",
  //     textColor: "text-orange-700"
  //   },
  //   { 
  //     name: "Sales", 
  //     icon: "📈", 
  //     jobs: "512",
  //     growth: "+30%",
  //     color: "from-teal-500 to-cyan-500",
  //     bgColor: "bg-teal-50",
  //     textColor: "text-teal-700"
  //   }
  // ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header Section */}
        {/* <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center space-x-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <TrendingUp size={16} />
            <span>Explore Opportunities</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Browse by <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Category</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover your perfect role across various industries and specialties
          </p>
        </motion.div> */}

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              variants={itemVariants}
              whileHover={{ 
                y: -8, 
                scale: 1.02,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              whileTap={{ scale: 0.98 }}
              className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100/80 hover:border-indigo-100 transition-all duration-300 cursor-pointer overflow-hidden"
            >
              {/* Background Gradient on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              
              <div className="relative p-6">
                {/* Icon Container */}
                <div className={`w-16 h-16 rounded-xl ${category.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-2xl">{category.icon}</span>
                </div>

                {/* Category Info */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors mb-2">
                    {category.name}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <Users size={16} className="text-gray-400" />
                    <span className="text-2xl font-bold text-gray-900">{category.jobs}</span>
                    <span className="text-sm text-gray-500">jobs</span>
                  </div>
                </div>

                {/* Growth Indicator */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <TrendingUp size={14} className="text-green-500" />
                    <span className="text-sm font-medium text-green-600">{category.growth}</span>
                    <span className="text-xs text-gray-500">this month</span>
                  </div>
                  
                  <motion.div
                    whileHover={{ x: 4 }}
                    className="flex items-center space-x-1 text-indigo-600 group-hover:text-indigo-700 transition-colors"
                  >
                    <span className="text-sm font-medium">Explore</span>
                    <ArrowRight size={16} />
                  </motion.div>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-indigo-200/30 pointer-events-none transition-all duration-300" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center mt-12"
        >
          {/* <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(99, 102, 241, 0.15)"
            }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2 mx-auto"
          >
            <span>View All Categories</span>
            <ArrowRight size={20} />
          </motion.button> */}
        </motion.div>
      </div>
    </section>
  );
};

export default JobCategories;