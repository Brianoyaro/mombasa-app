import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import Footer from '../Footer';

const MainLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setIsSidebarOpen(!mobile); // Open sidebar by default on large screens
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="min-h-screen bg-gray-50 pt-14 pb-16 flex">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        closeSidebar={closeSidebar}
        isMobile={isMobile}
      />

      {/* Content Area */}
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          !isMobile ? 'ml-64' : ''
        }`}
      >
        <Navbar
          openSidebar={openSidebar}
          isMobile={isMobile}
          isSidebarOpen={isSidebarOpen}
        />

        <main className="px-4 mt-4">{children}</main>
      </div>

      <Footer />
    </div>
  );
};

export default MainLayout;
