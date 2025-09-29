import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProfileSettings from '../components/ProfileSettings';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const Profile = () => {
  const CLOUDINARY_UPLOAD_PRESET = "job_portal";
  const CLOUDINARY_CLOUD_NAME = "dznl83gq6";
  const { user, setUser } = useContext(AuthContext);
  const { id } = useParams();
  const isOwnProfile = !id || id === user?._id;
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    image: '',
    education: '',
    experience: '',
    password: ''
  });
  const [editing, setEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id && id !== user?._id) {
      // Fetch other user's profile
      const fetchUser = async () => {
        setLoading(true);
        try {
          const token = localStorage.getItem("token");
          const res = await axios.get(`http://localhost:3000/api/users/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setForm({
            name: res.data.name || '',
            email: res.data.email || '',
            company: res.data.company?.name || '',
            role: res.data.role || '',
            image: res.data.image || '',
            education: res.data.education || '',
            experience: res.data.experience || '',
            password: ''
          });
        } catch (err) {
          toast.error("Failed to load user profile");
        }
        setLoading(false);
      };
      fetchUser();
      setEditing(false);
    } else {
      // Own profile - initialize with current user data
      setForm({
        name: user?.name || '',
        email: user?.email || '',
        company: user?.company?.name || '',
        role: user?.role || '',
        image: user?.image || '',
        education: user?.education || '',
        experience: user?.experience || '',
        password: ''
      });
    }
  }, [id, user]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        data
      );
      if (res.data && res.data.secure_url) {
        const imageUrl = res.data.secure_url;
        setForm({ ...form, image: imageUrl });
        
        // Auto-save image to backend when uploaded
        if (isOwnProfile) {
          try {
            const token = localStorage.getItem("token");
            await axios.put(
              "http://localhost:3000/api/users/profile",
              { ...form, image: imageUrl },
              { headers: { Authorization: `Bearer ${token}` } }
            );
            setUser(prev => ({ ...prev, image: imageUrl }));
            toast.success("Profile image updated!");
          } catch (err) {
            toast.error("Failed to save image to profile");
          }
        }
      } else {
        toast.error("Image upload failed: Invalid response");
      }
    } catch (err) {
      toast.error("Image upload failed: " + (err.response?.data?.error?.message || err.message));
    }
    setUploading(false);
  };

  const handleSave = async e => {
    e.preventDefault();
    if (!isOwnProfile) return; // Only allow editing own profile
    
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      // Prepare update data - don't send empty password
      const updateData = { ...form };
      if (!updateData.password) {
        delete updateData.password;
      }
      
      const res = await axios.put(
        "http://localhost:3000/api/users/profile",
        updateData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser(res.data);
      setEditing(false);
      // Reset password field after save
      setForm(prev => ({ ...prev, password: '' }));
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error("Profile update failed: " + (err.response?.data?.error || err.message));
    }
    setLoading(false);
  };

  const handleCancel = () => {
    // Reset form to original user data
    setForm({
      name: user?.name || '',
      email: user?.email || '',
      company: user?.company?.name || '',
      role: user?.role || '',
      image: user?.image || '',
      education: user?.education || '',
      experience: user?.experience || '',
      password: ''
    });
    setEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-8 mt-12"
    >
      <h2 className="text-2xl font-bold mb-6 text-indigo-700">
        {isOwnProfile ? "My Profile" : "User Profile"}
        {!isOwnProfile && <span className="text-sm text-gray-500 ml-2">(View Only)</span>}
      </h2>
      
      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>
      ) : (
        <form onSubmit={handleSave} className="space-y-6">
          {/* Profile Image */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative">
              <img 
                src={form.image || '/default-avatar.png'} 
                alt="Profile" 
                className="w-32 h-32 rounded-full object-cover border-4 border-indigo-100"
              />
              {editing && isOwnProfile && (
                <label className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full cursor-pointer hover:bg-indigo-700 transition-colors">
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageUpload} 
                    disabled={uploading}
                    className="hidden"
                  />
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </label>
              )}
            </div>
            {uploading && (
              <div className="mt-2 text-sm text-gray-600">Uploading image...</div>
            )}
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Name</label>
              <input 
                type="text" 
                name="name" 
                value={form.name} 
                onChange={handleChange} 
                disabled={!editing || !isOwnProfile} 
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 disabled:bg-gray-100 disabled:cursor-not-allowed" 
                autoComplete="name" 
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Email</label>
              <input 
                type="email" 
                name="email" 
                value={form.email} 
                onChange={handleChange} 
                disabled={!editing || !isOwnProfile} 
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 disabled:bg-gray-100 disabled:cursor-not-allowed" 
                autoComplete="email" 
              />
            </div>
            
            {form.role === 'employer' && (
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Company</label>
                <input 
                  type="text" 
                  name="company" 
                  value={form.company} 
                  onChange={handleChange} 
                  disabled={!editing || !isOwnProfile} 
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 disabled:bg-gray-100 disabled:cursor-not-allowed" 
                  autoComplete="organization" 
                />
              </div>
            )}
            
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Role</label>
              <input 
                type="text" 
                name="role" 
                value={form.role} 
                disabled 
                className="w-full border rounded-lg px-4 py-2 bg-gray-100 cursor-not-allowed" 
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Education</label>
              <input 
                type="text" 
                name="education" 
                value={form.education} 
                onChange={handleChange} 
                disabled={!editing || !isOwnProfile} 
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 disabled:bg-gray-100 disabled:cursor-not-allowed" 
                autoComplete="education" 
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Experience</label>
              <textarea 
                name="experience" 
                value={form.experience} 
                onChange={handleChange} 
                disabled={!editing || !isOwnProfile} 
                rows="3"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 disabled:bg-gray-100 disabled:cursor-not-allowed" 
              />
            </div>
            
            {editing && isOwnProfile && (
              <div>
                <label className="block text-gray-700 font-semibold mb-2">New Password</label>
                <input 
                  type="password" 
                  name="password" 
                  value={form.password} 
                  onChange={handleChange} 
                  placeholder="Leave blank to keep current password"
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300" 
                  autoComplete="new-password" 
                />
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-8 pt-6 border-t">
            {!editing && isOwnProfile ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                onClick={() => setEditing(true)}
              >
                Edit Profile
              </motion.button>
            ) : (
              editing && isOwnProfile && (
                <>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={handleCancel}
                    className="px-6 py-2 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </motion.button>
                </>
              )
            )}
          </div>
        </form>
      )}
    </motion.div>
  );
};

export default Profile;