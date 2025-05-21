import React from 'react';
import { Home, PlusCircle, User, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="fixed bottom-0 w-full bg-white border-t shadow mdd:hidden z-40 dark:bg-gray-800">
      <div className="max-w-md mx-auto flex justify-between items-center py-2 px-6">
        <Link to="/" className="flex flex-col items-center text-gray-700 dark:text-white">
          <Home className="w-5 h-5 md:w-6 md:h-6" />
          <span className="text-xs md:text-sm">Home</span>
        </Link>
        <Link to="/report/new" className="flex flex-col items-center text-blue-600 dark:text-blue-400">
          <PlusCircle className="w-6 h-6 md:w-7 md:h-7" />
          <span className="text-xs md:text-sm">Add</span>
        </Link>
        <Link to="/profile" className="flex flex-col items-center text-gray-700 dark:text-white">
          <User className="w-5 h-5 md:w-6 md:h-6" />
          <span className="text-xs md:text-sm">Profile</span>
        </Link>
        <Link to="/settings" className="flex flex-col items-center text-gray-700 dark:text-white">
          <Settings className="w-5 h-5 md:w-6 md:h-6" />
          <span className="text-xs md:text-sm">Settings</span>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
