import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';


const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', description: '', website: '' });
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
  const token = localStorage.getItem('token');
  const res = await axios.get('http://localhost:3000/api/companies', { headers: { Authorization: `Bearer ${token}` } });
      setCompanies(res.data);
    } catch (err) {
      setError('Failed to fetch companies');
      toast.error('Failed to fetch companies');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
  const token = localStorage.getItem('token');
  await axios.post('http://localhost:3000/api/companies', form, { headers: { Authorization: `Bearer ${token}` } });
      toast.success('Company created');
      setForm({ name: '', description: '', website: '' });
      fetchCompanies();
    } catch (err) {
      toast.error('Failed to create company');
    }
  };

  const handleEdit = (company) => {
    setEditing(company._id);
    setForm({ name: company.name, description: company.description, website: company.website || '' });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
  const token = localStorage.getItem('token');
  await axios.put(`http://localhost:3000/api/companies/${editing}`, form, { headers: { Authorization: `Bearer ${token}` } });
      toast.success('Company updated');
      setEditing(null);
      setForm({ name: '', description: '', website: '' });
      fetchCompanies();
    } catch (err) {
      toast.error('Failed to update company');
    }
  };

  const handleDelete = async (id) => {
    try {
  const token = localStorage.getItem('token');
  await axios.delete(`http://localhost:3000/api/companies/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      toast.success('Company deleted');
      fetchCompanies();
    } catch (err) {
      toast.error('Failed to delete company');
    }
  };

  if (loading) return <div>Loading companies...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">Companies</h2>
      <form onSubmit={editing ? handleUpdate : handleCreate} className="mb-8 space-y-4 max-w-md">
        <input
          type="text"
          placeholder="Name"
          className="border p-2 rounded w-full"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          className="border p-2 rounded w-full"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Website"
          className="border p-2 rounded w-full"
          value={form.website}
          onChange={e => setForm({ ...form, website: e.target.value })}
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">
          {editing ? 'Update Company' : 'Create Company'}
        </button>
        {editing && (
          <button className="ml-2 px-4 py-2 rounded bg-gray-300" type="button" onClick={() => { setEditing(null); setForm({ name: '', description: '', website: '' }); }}>Cancel</button>
        )}
      </form>
      {Array.isArray(companies) && companies.length > 0 ? (
        <ul className="space-y-4">
          {companies.map(company => (
            <li key={company._id} className="border p-4 rounded flex justify-between items-center">
              <div>
                <div className="font-bold">{company.name}</div>
                <div className="text-sm text-gray-600">{company.description}</div>
                {company.website && (
                  <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Visit Website</a>
                )}
              </div>
              <div className="flex gap-2">
                <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => handleEdit(company)}>Edit</button>
                <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => handleDelete(company._id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No companies found.</p>
      )}
    </div>
  );
};

export default Companies;
