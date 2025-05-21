// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CookieConsent from 'react-cookie-consent';

import Dashboard from './components/Dashboard';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ReportForm from './components/ReportForm';
import ReportDetail from './components/ReportDetail';
import UserProfile from './components/UserProfile';

const App = () => {
  return (
    // <MainLayout>
    //   {/* Routes or component views go here */}
    //   <ReportList />
    // </MainLayout>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          {/* Add more routes as needed */}
          <Route path='/login' element={<LoginForm />} />
          <Route path='/register' element={<RegisterForm />} />
          <Route path="/report/new" element={<ReportForm />} />
          <Route path="/report/:id" element={<ReportDetail />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
        <CookieConsent
          location="bottom"
          buttonText="Accept"
          cookieName="userConsent"
          style={{ background: "#2B373B" }}
          buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
          expires={150}
        >
        We use cookies to enhance your experience. By continuing, you accept our use of cookies.
      </CookieConsent>
    </BrowserRouter>
  );
};

export default App;
