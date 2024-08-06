import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';



const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validateLoginForm = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email) {
      alert('Email is required');
      return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert('Please enter a valid email address');
      return false;
    }

    if (!password) {
      alert('Password is required');
      return false;
    }

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', 
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Retrieve token from localStorage


       

        alert('Login successful');
        navigate('/user_listing');
        
        // Optionally, redirect the user to another page
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto mt-20 px-4 flex justify-center">
      <div className="form-container bg-white p-8 shadow-md rounded-lg w-full md:w-1/3">
        <h2 className="text-2xl font-bold mb-4">User Login</h2>
        <form id="login-form" onSubmit={validateLoginForm}>
          <div className="form-group mb-4">
            <label htmlFor="email" className="text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="new-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="password" className="text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              autoComplete="new-password"
              value={password}

              onChange={(e) => setPassword(e.target.value)}
              
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;


