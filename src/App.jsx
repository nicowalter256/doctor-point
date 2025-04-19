/**
 * Root component
 * – Hosts global routing and a single ToastContainer for notifications.
 * – Keep ToastContainer only here; remove any duplicates in page components.
 */
import React from 'react';
import AppRoutes from './router/AppRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => (
  <div className="w-full min-h-screen font-roboto">
    <AppRoutes />

    {/* Global toast notifications */}
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      pauseOnFocusLoss
      draggable
      pauseOnHover
    /* z‑index and positioning handled internally by react‑toastify */
    />
  </div>
);

export default App;
