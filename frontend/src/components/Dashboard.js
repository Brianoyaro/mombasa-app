// src/Dashboard.jsx
import React from 'react';
import MainLayout from './layout/MainLayout';
import ReportList from './ReportList';


const Dashboard = () => {
  return (
    <MainLayout>
      {/* Routes or component views go here */}
      <ReportList />
    </MainLayout>
  );
};

export default Dashboard;
