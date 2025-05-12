// // src/components/layout/MainLayout.jsx
// import React from 'react';
// import Navbar from '../Navbar';
// import Sidebar from '../Sidebar';
// import Footer from '../Footer';

// const MainLayout = ({ children }) => {
//   return (
//     <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
//       {/* Sidebar */}
//       <Sidebar />

//       <div className="flex-1 flex flex-col">
//         {/* Navbar */}
//         <Navbar />

//         {/* Main Content */}
//         <main className="flex-grow p-4 md:p-6">{children}</main>

//         {/* Footer (mobile only) */}
//         <Footer />
//       </div>
//     </div>
//   );
// };

// export default MainLayout;


import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import Footer from '../Footer';

const MainLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size on mount and resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Run on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="min-h-screen pt-14 pb-16 bg-gray-50">
      <Navbar openSidebar={openSidebar} isMobile={isMobile} isSidebarOpen={isSidebarOpen} />
      <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} isMobile={isMobile} />
      
      <main className="px-4 mt-4">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
