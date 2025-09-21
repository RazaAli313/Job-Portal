import React, { useEffect, useState } from 'react';
import axios from 'axios';


const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
  const res = await axios.get('http://localhost:3000/api/companies');
        setCompanies(res.data);
      } catch (err) {
        setError('Failed to fetch companies');
      } finally {
        setLoading(false);
      }
    };
    fetchCompanies();
  }, []);

  if (loading) return <div>Loading companies...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-2xl text-center">
        <h2 className="text-2xl font-bold mb-6">Companies</h2>
        {companies.length === 0 ? (
          <p>No companies found.</p>
        ) : (
          <ul className="space-y-4">
            {companies.map(company => (
              <li key={company._id} className="border p-4 rounded shadow">
                <h3 className="text-lg font-semibold mb-2">{company.name}</h3>
                <p>{company.description}</p>
                {company.website && (
                  <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Visit Website</a>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Companies;
