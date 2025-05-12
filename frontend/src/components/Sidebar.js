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

const Sidebar = ({ isOpen, closeSidebar, isMobile }) => {
  return (
    <div className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-40 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out ${isMobile ? '' : 'hidden md:block'}`}>
      <div className="p-4 border-b font-semibold text-lg">Menu</div>
      <div className="p-4 space-y-2">
        <a href="/activity" className="block hover:text-blue-600">Recent Activity</a>
        <a href="/profile" className="block hover:text-blue-600">Profile</a>
        <a href="/logout" className="block hover:text-red-600">Logout</a>
      </div>
      {isMobile && (
        <button onClick={closeSidebar} className="absolute top-4 right-4 text-gray-500">✕</button>
      )}
    </div>
  );
};

export default Sidebar;
