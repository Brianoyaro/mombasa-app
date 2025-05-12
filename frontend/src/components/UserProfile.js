import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserProfile = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone_number: ''
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('http://localhost:5000/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });

        const { username, email, phone_number } = res.data;
        setFormData({ username, email, phone_number });
      } catch (error) {
        setMessage('Failed to load profile.');
        console.error(error);
      }
    };

    fetchProfile();
  }, [token]);

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
        'http://localhost:5000/profile',
        { username, phone_number },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
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
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">User Profile</h2>

        {message && (
          <div className="text-center mb-4 text-sm text-red-600">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email (readonly)</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              readOnly
              className="mt-1 w-full px-4 py-2 border bg-gray-100 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;