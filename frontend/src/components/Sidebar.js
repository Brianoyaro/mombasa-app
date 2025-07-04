// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Home, FileText, Camera, Settings } from 'lucide-react';

// const Sidebar = () => {
//   return (
//     <div className="h-screen w-64 bg-white border-r shadow-sm fixed top-0 left-0 z-20 hidden md:flex flex-col p-4 space-y-4">
//       <h2 className="text-2xl font-bold text-blue-600">My Reports</h2>

//       <Link to="/" className="flex items-center space-x-2 hover:text-blue-600">
//         <Home size={20} />
//         <span>Dashboard</span>
//       </Link>

//       <Link to="/reports" className="flex items-center space-x-2 hover:text-blue-600">
//         <FileText size={20} />
//         <span>All Reports</span>
//       </Link>

//       <Link to="/report/new" className="flex items-center space-x-2 hover:text-blue-600">
//         <Camera size={20} />
//         <span>Submit Report</span>
//       </Link>

//       <Link to="/settings" className="flex items-center space-x-2 hover:text-blue-600">
//         <Settings size={20} />
//         <span>Settings</span>
//       </Link>
//     </div>
//   );
// };

// export default Sidebar;

// Sidebar.jsx
import React from 'react';
import LogoutButton from './LogoutButton';

const Sidebar = ({ isOpen, closeSidebar, isMobile }) => {
  const baseClasses =
    'bg-white shadow-lg h-full z-40 transform transition-transform duration-300 ease-in-out';

  return (
    <aside
      className={`${baseClasses} ${
        isMobile
          ? `fixed top-0 left-0 w-64 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`
          : 'hidden md:block md:fixed md:left-0 md:top-14 md:w-64'
      }`}
    >
      <div className="p-4 border-b font-semibold text-lg">Menu</div>
      <div className="p-4 space-y-2">
        <a href="/#" className="block hover:text-blue-600">Recent Activity</a>
        <a href="/#" className="block hover:text-blue-600">Profile</a>
        {/* <a href="/#" className="block hover:text-red-600">Logout</a> */}
        <LogoutButton />
      </div>

      {isMobile && (
        <button
          onClick={closeSidebar}
          className="absolute top-4 right-4 text-gray-500"
        >
          ✕
        </button>
      )}
    </aside>
  );
};

export default Sidebar;
