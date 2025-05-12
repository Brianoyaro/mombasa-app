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

export default Footer;
