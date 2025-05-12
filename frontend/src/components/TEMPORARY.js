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

//export default Navbar;


// Sidebar.jsx
import React from 'react';

const Sidebar = ({ isOpen, toggleSidebar, isMobile }) => {
  return (
    <div className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-40 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out ${isMobile ? '' : 'hidden md:block'}`}>
      <div className="p-4 border-b font-semibold text-lg">Menu</div>
      <div className="p-4 space-y-2">
        <a href="/activity" className="block hover:text-blue-600">Recent Activity</a>
        <a href="/profile" className="block hover:text-blue-600">Profile</a>
        <a href="/logout" className="block hover:text-red-600">Logout</a>
      </div>
      {isMobile && (
        <button onClick={toggleSidebar} className="absolute top-4 right-4 text-gray-500">✕</button>
      )}
    </div>
  );
};

//export default Sidebar;


// Footer.jsx (mobile only)
import React from 'react';
import { Home, PlusCircle, User } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="fixed bottom-0 w-full bg-white border-t shadow md:hidden z-40">
      <div className="flex justify-around items-center py-2">
        <a href="/home" className="flex flex-col items-center text-gray-700">
          <Home size={20} />
          <span className="text-xs">Home</span>
        </a>
        <a href="/report/new" className="flex flex-col items-center text-blue-600">
          <PlusCircle size={24} />
          <span className="text-xs">Add</span>
        </a>
        <a href="/profile" className="flex flex-col items-center text-gray-700">
          <User size={20} />
          <span className="text-xs">Profile</span>
        </a>
      </div>
    </footer>
  );
};

//export default Footer;
