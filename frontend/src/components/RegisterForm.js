import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwt from 'jsonwebtoken';


const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone_number: ''
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();
  const baseURL = process.env.REACT_APP_BASE_URL || 'http://localhost:3000';

  useEffect(() => {
    // Check if the user is already logged in
    const token = localStorage.getItem('token');
    console.log(process.env);
    // if (token) {
    //   // If the user is logged in, redirect to the dashboard
    //   const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //   if (!decoded) {
    //     localStorage.removeItem('token');
    //     navigate('/login');
    //   } else {
    //     navigate('/dashboard');
    //   }
    // }
    if (token) {
        navigate('/dashboard');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    // Clear password mismatch error when user types
    if (name === 'password' || name === 'confirmPassword') {
      setPasswordError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setPasswordError('');

    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const { username, email, password, phone_number } = formData;
      await axios.post(`${baseURL}/register`, {
        username,
        email,
        password,
        phone_number
      });
      setMessage('Registration successful!');
      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone_number: ''
      });

      setTimeout(() => navigate('/login'), 1000); // navigate to login
    } catch (error) {
      setMessage(error.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Create Account</h2>

        {message && (
          <div className="mb-4 text-sm text-center text-green-600">{message}</div>
        )}

        {passwordError && (
          <div className="mb-4 text-sm text-center text-red-500">{passwordError}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="username" className="block text-gray-600 text-sm mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              required
              value={formData.username}
              onChange={handleChange}
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-600 text-sm mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-600 text-sm mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-gray-600 text-sm mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full border rounded-md px-4 py-2 focus:outline-none ${
                passwordError ? 'border-red-500' : 'focus:ring-2 focus:ring-blue-500'
              }`}
            />
          </div>

          <div>
            <label htmlFor="phone_number" className="block text-gray-600 text-sm mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
          <p className="text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;