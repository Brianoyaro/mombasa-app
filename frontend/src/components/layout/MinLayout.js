// src/components/layout/MainLayout.jsx
import React from 'react';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import Footer from '../Footer';

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <main className="flex-grow p-4 md:p-6">{children}</main>

        {/* Footer (mobile only) */}
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
