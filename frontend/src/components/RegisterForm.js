import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

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
    const token = localStorage.getItem('token');
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

      setMessage('✅ Registration successful!');
      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone_number: ''
      });

      setTimeout(() => navigate('/login'), 1000);
    } catch (error) {
      setMessage(error.response?.data?.message || '❌ Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6 dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Create an Account
        </h2>

        {message && (
          <div className="mb-4 text-sm text-center font-medium text-green-600 dark:text-green-400">
            {message}
          </div>
        )}

        {passwordError && (
          <div className="mb-4 text-sm text-center font-medium text-red-500">
            {passwordError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {[
            { label: 'Username', name: 'username', type: 'text' },
            { label: 'Email', name: 'email', type: 'email' },
            { label: 'Password', name: 'password', type: 'password' },
            { label: 'Confirm Password', name: 'confirmPassword', type: 'password' },
            { label: 'Phone Number', name: 'phone_number', type: 'tel' }
          ].map(({ label, name, type }) => (
            <div key={name}>
              <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {label}
              </label>
              <input
                type={type}
                name={name}
                required={name !== 'phone_number'}
                value={formData[name]}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border ${
                  name === 'confirmPassword' && passwordError
                    ? 'border-red-500'
                    : 'border-gray-300 dark:border-gray-600'
                } bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
                placeholder={`Enter your ${label.toLowerCase()}`}
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300 disabled:opacity-50"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>

          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 dark:text-blue-400 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
