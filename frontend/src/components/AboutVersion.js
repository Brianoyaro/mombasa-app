// src/components/AboutVersion.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const AboutVersion = () => {
  const appVersion = process.env.REACT_APP_VERSION || '1.0.0'; // fallback version

  return (
    // <div className="p-4 space-y-2 bg-white dark:bg-gray-800 rounded-xl shadow-md">
    //   <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">About This App</h2>
      
    //   <p className="text-sm text-gray-700 dark:text-gray-300">
    //     Version: <strong>{appVersion}</strong>
    //   </p>

    //   <ul className="space-y-1">
    //     <li>
    //       <a
    //         href="https://github.com/your-username/your-repo"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //         className="text-blue-600 hover:underline dark:text-blue-400"
    //       >
    //         GitHub Repository
    //       </a>
    //     </li>
    //     <li>
    //       <a
    //         href="/terms"
    //         className="text-blue-600 hover:underline dark:text-blue-400"
    //       >
    //         Terms of Service
    //       </a>
    //     </li>
    //     <li>
    //       <a
    //         href="/privacy"
    //         className="text-blue-600 hover:underline dark:text-blue-400"
    //       >
    //         Privacy Policy
    //       </a>
    //     </li>
    //   </ul>
    // </div>
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 dark:text-white mb-4">
        About This App
    </h2>
    <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300">
        This app is built with ❤️ using React, Tailwind CSS, and more.
    </p>

    <h3 className="mt-6 text-base sm:text-lg md:text-xl font-medium text-gray-800 dark:text-white">
        Version: {appVersion}
    </h3>

    <div className="mt-4 space-y-2">
        <a
        href="https://github.com/your-repo"
        target="_blank"
        rel="noopener noreferrer"
        className="block text-sm sm:text-base md:text-lg text-blue-500 hover:underline"
        >
        GitHub
        </a>
        
        <Link to="/terms" className="block text-sm sm:text-base md:text-lg text-blue-500 hover:underline">
        Terms of Service
        </Link>
        <Link to="/privacy" className="block text-sm sm:text-base md:text-lg text-blue-500 hover:underline">
        Privacy Policy
        </Link>
    </div>
    </div>
  );
};

export default AboutVersion;
