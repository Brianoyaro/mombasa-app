// SettingsPage.jsx
import React, { useState } from 'react';
import { Sun, Moon, ChevronRight } from 'lucide-react';
import useTheme from '../hooks/useTheme';
import AboutVersion from './AboutVersion';

const SettingItem = ({ label, action, rightIcon }) => (
  <div
    onClick={action}
    className="flex items-center justify-between p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-all cursor-pointer"
  >
    <span className="text-base font-medium text-gray-800 dark:text-gray-100">{label}</span>
    {rightIcon}
  </div>
);

const SettingsPage = () => {
  const { isDark, toggleTheme } = useTheme();
  const [ showAbout, setShowAbout ] = useState(false);

  return (
    <div className="min-h-screen px-4 py-6 bg-gray-100 dark:bg-gray-900">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Settings</h1>

      <div className="space-y-4">
        <SettingItem
          label="Dark Mode"
          action={toggleTheme}
          rightIcon={isDark ? <Sun className="text-yellow-500" /> : <Moon className="text-blue-500" />}
        />
        <SettingItem label="Language" action={() => {}} rightIcon={<ChevronRight />} />
        <SettingItem label="Notifications" action={() => {}} rightIcon={<ChevronRight />} />
        <SettingItem label="Privacy" action={() => {}} rightIcon={<ChevronRight />} />
        <SettingItem label="Account Management" action={() => {}} rightIcon={<ChevronRight />} />
        <SettingItem label="About & Version" action={() => setShowAbout(!showAbout) } rightIcon={<ChevronRight />} />
      </div>
      {showAbout && (
        <div className="mt-6">
          <AboutVersion />
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
