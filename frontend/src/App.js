// src/App.jsx
import React from 'react';
import MainLayout from './components/layout/MainLayout';
import ReportList from './components/ReportList';
// import ReportForm from './components/ReportForm';
// Import routes as needed

const App = () => {
  return (
    <MainLayout>
      {/* Routes or component views go here */}
      <ReportList />
    </MainLayout>
  );
};

export default App;
