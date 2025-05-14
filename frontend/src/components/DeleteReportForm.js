import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DeleteReportForm = ({ reportId }) => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [confirming, setConfirming] = useState(false);
  const navigate = useNavigate();

  const baseURL = process.env.REACT_APP_BASE_URL || 'http://localhost:3000';

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${baseURL}/reports/${reportId}`, { withCredentials: true });
      setMessage('Report deleted successfully.');
      setTimeout(() => navigate('/reports'), 1500); // Redirect after a short delay
    } catch (err) {
      setError('Failed to delete the report.');
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-6 p-4 bg-white border rounded shadow">
      {message && <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">{message}</div>}
      {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>}

      {!confirming ? (
        <button
          onClick={() => setConfirming(true)}
          className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
        >
          Delete Report
        </button>
      ) : (
        <div className="space-y-2">
          <p className="text-sm text-gray-700">Are you sure you want to delete this report? This action cannot be undone.</p>
          <div className="flex space-x-2">
            <button
              onClick={handleDelete}
              className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700"
            >
              Yes, Delete
            </button>
            <button
              onClick={() => setConfirming(false)}
              className="flex-1 bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteReportForm;
