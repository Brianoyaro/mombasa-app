// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Dashboard from './components/Dashboard';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

const App = () => {
  return (
    // <MainLayout>
    //   {/* Routes or component views go here */}
    //   <ReportList />
    // </MainLayout>
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          {/* Add more routes as needed */}
          <Route path='/login' element={<LoginForm />} />
          <Route path='/register' element={<RegisterForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
