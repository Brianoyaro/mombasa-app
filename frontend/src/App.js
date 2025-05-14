// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes } from 'react-router-dom';

import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';

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
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
