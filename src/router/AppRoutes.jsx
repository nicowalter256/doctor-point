import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Register from '../pages/Register';
import Login from '../pages/Login';
import DashboardLayout from '../pages/DashboardLayout';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard/*' element={<DashboardLayout />} />
        <Route path='/' element={<Navigate to='/login' replace />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
