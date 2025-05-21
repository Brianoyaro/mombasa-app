import React from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = ({ openSidebar, isMobile, isSidebarOpen }) => {
  // onst baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:3000';

  return (
    <nav className="flex items-center justify-between px-4 py-2 shadow bg-white fixed w-full top-0 dark:bg-gray-800 z-50">
      <div className="text-xl font-bold">MyApp</div>

      {isMobile ? (
        <button onClick={openSidebar} className="p-2 rounded md:hidden">
          {isSidebarOpen ? <X /> : <Menu />}
        </button>
      ) : (
        <div className="items-center space-x-4 hidden md:flex">
          <a href="/" className="text-blue-700 hover:underline">Home</a>
          <a href="/reports" className="text-gray-700 hover:underline">Reports</a>
          <a href="/profile" className="text-gray-700 hover:underline">Profile</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
