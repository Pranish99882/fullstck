import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import EditProfileForm from './components/EditProfileForm';
import UserListing from './components/UserListing';

const App = () => {
  return (
    <Router>
      <div className="bg-gray-100 h-screen">
        <Navbar />
        <div className="container mx-auto mt-40 px-4">
          <Routes>
          <Route path="/" element={<RegistrationForm />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/edit_profile" element={<EditProfileForm />} />
            <Route path="/user_listing" element={<UserListing />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;


