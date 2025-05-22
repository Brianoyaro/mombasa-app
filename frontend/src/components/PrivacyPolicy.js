import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen px-4 py-8 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4">Privacy Policy</h1>

        <p className="text-base sm:text-lg mb-4">
          We value your privacy. This policy explains how we collect, use, and safeguard your information.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
        <p className="mb-4">
          We may collect data such as your name, email, and usage data when using our services.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Information</h2>
        <p className="mb-4">
          We use the information to improve our service and contact users when necessary.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">3. Cookies</h2>
        <p className="mb-4">
          Our application may use cookies and similar tracking technologies to enhance your experience, analyze
          usage patterns, and store preferences. You can choose to disable cookies through your browser settings,
          but this may affect some functionality.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">4. Contact</h2>
        <p className="mb-6">
          If you have any questions, feel free to{' '}
          <a
            href="mailto:support@janedoe.com?subject=Mombasa%20Hub%20App"
            className="text-blue-500 hover:underline"
          >
            contact us
          </a>.
        </p>

        <div className="space-y-2">
          <Link to="/settings" className="block text-blue-500 hover:underline text-sm sm:text-base">
            ← Back to Settings
          </Link>
          <Link to="/terms" className="block text-blue-500 hover:underline text-sm sm:text-base">
            View our Terms of Service →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
