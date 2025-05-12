// Navbar.jsx
import React from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = ({ toggleSidebar, isMobile, isSidebarOpen }) => {
  return (
    <nav className="flex items-center justify-between px-4 py-2 shadow bg-white fixed w-full top-0 z-50">
      <div className="text-xl font-bold">MyApp</div>

      {isMobile ? (
        <button onClick={toggleSidebar} className="p-2 rounded">
          {isSidebarOpen ? <X /> : <Menu />}
        </button>
      ) : (
        <div className="space-x-4 hidden md:flex">
          <a href="/home" className="text-gray-700 hover:underline">Home</a>
          <a href="/reports" className="text-gray-700 hover:underline">Reports</a>
          <a href="/profile" className="text-gray-700 hover:underline">Profile</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;