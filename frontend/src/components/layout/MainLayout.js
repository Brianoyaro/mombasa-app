// src/components/MainLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer'; // Adjust path if needed
import Navbar from '../Navbar'; // Optional

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Optional: Navbar */}
      <Navbar />

      {/* Main content */}
      <main className="flex-grow min-h-screen pxx-4 py-6 bg-gray-100 ">
        <Outlet />
      </main>

      {/* Persistent Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
