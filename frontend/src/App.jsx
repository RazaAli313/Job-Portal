// App.js (Main Component)

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import JobListings from './components/JobListings';
import SearchFilters from './components/SearchFilters';
import JobCategories from './components/JobCategories';
import ErrorBoundary from './components/ErrorBoundary';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import EmployerPanel from './pages/EmployerPanel';
import CandidatePanel from './pages/CandidatePanel';
import JobDetails from './pages/JobDetails';
import Applications from './pages/Applications';

import Jobs from './pages/Jobs';
import Chat from './components/Chat';
// (removed ChatPage import)
import Companies from './pages/Companies';

import  { lazy, Suspense } from 'react';
const Profile = lazy(() => import('./pages/Profile.jsx'));


import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const App = () => {
  // Default state for search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: '',
    location: '',
    experience: ''
  });

  return (
    <AuthProvider>
      <Router>
        <Header />
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <div className="container mx-auto px-4 py-12">
                <ErrorBoundary>
                  <SearchFilters 
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    filters={filters}
                    setFilters={setFilters}
                  />
                </ErrorBoundary>
                <JobCategories />
                <ErrorBoundary>
                  <JobListings 
                    searchTerm={searchTerm}
                    filters={filters}
                  />
                </ErrorBoundary>
              </div>
              <Footer />
            </>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={
            <ProtectedRoute roles={['admin', 'employer', 'candidate']}>
              <Dashboard role="candidate" />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute roles={['admin']}>
              <AdminPanel />
            </ProtectedRoute>
          } />
          <Route path="/employer" element={
            <ProtectedRoute roles={['employer']}>
              <EmployerPanel />
            </ProtectedRoute>
          } />
          <Route path="/candidate" element={
            <ProtectedRoute roles={['candidate']}>
              <CandidatePanel />
            </ProtectedRoute>
          } />
          <Route path="/job/:id" element={<JobDetails />} />
          <Route path="/applications" element={
            <ProtectedRoute roles={['admin', 'employer', 'candidate']}>
              <Applications />
            </ProtectedRoute>
          } />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/companies" element={<Companies />} />
          {/* ChatPage route removed, chat now integrated in jobs feed */}
          <Route path="/profile" element={
            <ProtectedRoute roles={['admin', 'employer', 'candidate']}>
              <ErrorBoundary>
                <Suspense fallback={<div>Loading...</div>}>
                  <Profile />
                </Suspense>
              </ErrorBoundary>
            </ProtectedRoute>
          } />
          {/* <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} /> */}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;