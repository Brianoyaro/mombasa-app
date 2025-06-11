import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuthRedirect from '../hooks/userAuthRedirect';

const UserProfile = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone_number: '',
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const baseURL = process.env.REACT_APP_BASE_URL || 'http://localhost:3000';

  //console.log(req.user)
  useAuthRedirect('/login');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${baseURL}/profile`, {
          withCredentials: true,
        });
        const { username, email, phone_number } = res.data;
        // This is a debugging line to check the response data. I think GET /profile is wrong
        console.log('GET /proile data', res.data);
        setFormData({ username, email, phone_number });
      } catch (error) {
        setMessage('Failed to load profile.');
        console.error(error);
      }
    };

    fetchProfile();
  }, [baseURL]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const { username, phone_number } = formData;
      await axios.post(
        `${baseURL}/profile`,
        { username, phone_number },
        { withCredentials: true }
      );
      setMessage('Profile updated successfully!');
    } catch (error) {
      console.error(error);
      setMessage('Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col justify-center px-4 sm:px-6 lg:px-8 text-gray-900 dark:text-white">
      <div className="max-w-md w-full mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
          User Profile
        </h2>

        {message && (
          <div className="text-center mb-4 text-sm text-red-600 dark:text-red-400">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email (readonly)
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              readOnly
              className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Phone Number
            </label>
            <input
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition disabled:opacity-60"
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
