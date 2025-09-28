import React, { useState } from 'react';

const ProfileSettings = ({ user, token, onUpdate }) => {
  const [form, setForm] = useState({
    education: user?.education || '',
    experience: user?.experience || '',
    image: user?.image || '',
  });
  const [imagePreview, setImagePreview] = useState(form.image);
  const [uploading, setUploading] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = async e => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    // Simulate upload
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setForm({ ...form, image: reader.result });
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async e => {
    e.preventDefault();
    // Simulate API call
    if (onUpdate) onUpdate(form);
  };

  return (
    <form onSubmit={handleSave} className="space-y-6 mt-8">
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Profile Image</label>
        <input type="file" accept="image/*" onChange={handleImageChange} disabled={uploading} />
        {imagePreview && (
          <img src={imagePreview} alt="Profile" className="mt-2 w-24 h-24 rounded-full object-cover border" />
        )}
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Education</label>
        <textarea name="education" value={form.education} onChange={handleChange} className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring focus:border-indigo-300" rows={3} />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Experience</label>
        <textarea name="experience" value={form.experience} onChange={handleChange} className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring focus:border-indigo-300" rows={3} />
      </div>
      <button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors">Save Settings</button>
    </form>
  );
};

export default ProfileSettings;
