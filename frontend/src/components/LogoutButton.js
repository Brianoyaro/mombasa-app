import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LogoutButton = () => {
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:3000';
  const logoutUrl = `${baseUrl}/api/logout`;

  const handleLogout = async () => {
    const confirmed = window.confirm('Are you sure you want to log out?');
    if (!confirmed) return;

    // localStorage.removeItem('token');
    // Clear any user data or state if needed
    try {
        await axios.post(logoutUrl, {}, { withCredentials: true });
    } catch (error) {
        console.error('Logout failed:', error);
    }
    navigate('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
