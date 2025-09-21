import React from 'react';

const Dashboard = ({ role }) => {
  // This will be replaced with actual role logic from auth context
  // For now, you can pass role as a prop for testing
  let content;
  if (role === 'admin') {
    content = <div>Welcome Admin! Manage users and jobs here.</div>;
  } else if (role === 'employer') {
    content = <div>Welcome Employer! Post and manage your jobs.</div>;
  } else {
    content = <div>Welcome Candidate! Browse and apply for jobs.</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96 text-center">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        {content}
      </div>
    </div>
  );
};

export default Dashboard;
