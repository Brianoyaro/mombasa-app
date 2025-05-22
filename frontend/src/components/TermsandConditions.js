import React from 'react';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
  return (
    <div className="min-h-screen px-4 py-8 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4">Terms of Service</h1>

        <p className="text-base sm:text-lg mb-4">
          By using this application, you agree to the following terms and conditions.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">1. Use of Service</h2>
        <p className="mb-4">
          You agree not to misuse the services or access them using a method other than provided.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">2. Termination</h2>
        <p className="mb-4">
          We may suspend or terminate your access if you violate our terms.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">3. Changes</h2>
        <p className="mb-6">
          We may update our terms occasionally. You are encouraged to review them regularly.
        </p>

        <div className="space-y-2">
          <Link
            to="/settings"
            className="block text-blue-500 hover:underline text-sm sm:text-base"
          >
            ← Back to Settings
          </Link>
          <Link
            to="/privacy"
            className="block text-blue-500 hover:underline text-sm sm:text-base"
          >
            View our Privacy Policy →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
