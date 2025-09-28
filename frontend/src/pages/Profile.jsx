import React, { useContext, useState } from 'react';
import ProfileSettings from '../components/ProfileSettings';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const Profile = () => {
  const { user, token } = useContext(AuthContext);
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    company: user?.company?.name || '',
    role: user?.role || '',
    password: ''
  });
  const [editing, setEditing] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async e => {
    e.preventDefault();
    // Simulate API call
    setEditing(false);
    toast.success('Profile updated!');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-8 mt-12"
    >
      <h2 className="text-2xl font-bold mb-6 text-indigo-700">My Profile</h2>
      {/* Basic Info Form */}
      <form onSubmit={handleSave} className="space-y-6">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Name</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} disabled={!editing} className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring focus:border-indigo-300" />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} disabled={!editing} className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring focus:border-indigo-300" />
        </div>
        {form.role === 'employer' && (
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Company</label>
            <input type="text" name="company" value={form.company} onChange={handleChange} disabled={!editing} className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring focus:border-indigo-300" />
          </div>
        )}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Role</label>
          <input type="text" name="role" value={form.role} disabled className="w-full border rounded-lg px-4 py-2 bg-gray-100" />
        </div>
        {editing && (
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Password</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring focus:border-indigo-300" />
          </div>
        )}
        <div className="flex gap-4 mt-6">
          {!editing ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
              onClick={() => setEditing(true)}
            >Edit</motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >Save</motion.button>
          )}
        </div>
      </form>
      {/* Profile Settings for education, experience, image */}
      <ProfileSettings user={user} token={token} onUpdate={data => toast.success('Profile settings updated!')} />
    </motion.div>
  );
};

export default Profile;
