// src/Dashboard.jsx
import React from 'react';
// import MainLayout from './layout/MainLayout';
import ReportList from './ReportList';


const Dashboard = () => {
  return (
    // <MainLayout>
    //   {/* Routes or component views go here */}
    //   <ReportList />
    // </MainLayout>
    <div className="min-h-screen px-4 py-6 bg-gray-100 dark:bg-gray-900">
      <ReportList />
    </div>
  );
};

export default Dashboard;
