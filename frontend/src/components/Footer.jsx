// components/Footer.js
import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-xl font-bold mb-4">JobPortal</h3>
            <p className="text-gray-400">Connecting talent with opportunity. Find your dream job or the perfect candidate.</p>
          </motion.div>
          
          {['For Job Seekers', 'For Employers', 'Resources', 'Company'].map((section, i) => (
            <motion.div
              key={section}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + (i * 0.1) }}
            >
              <h4 className="font-semibold mb-4">{section}</h4>
              <ul className="space-y-2">
                {['Browse Jobs', 'Create Account', 'Login', 'Job Alerts'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-gray-400">© {new Date().getFullYear()} JobPortal. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            {['facebook', 'twitter', 'linkedin', 'instagram'].map((social) => (
              <a key={social} href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">{social}</span>
                <i className={`fab fa-${social} text-xl`}></i>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;