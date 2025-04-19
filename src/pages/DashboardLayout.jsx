/**
 * DashboardLayout
 * – Shared shell for all “/dashboard/*” routes
 * – Responsive (sidebar + navbar), accessible, and easily extensible
 */
import React, { useState, useMemo, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Menu, UserCircle } from 'lucide-react';

import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

import Home from './Home';
import Doctor from './Doctor';
import Appointments from './Appointments';
import Profile from './Profile';

import logo from '../assets/logo.png';

/* ------------------------------------------------------------------
   Single source of truth for path ↔ label ↔ element
   NOTE: Paths are **relative** to "/dashboard"
-------------------------------------------------------------------*/
const routeConfig = [
  { path: '/', label: 'Dashboard', element: <Home /> },
  { path: '/doctors', label: 'Doctors', element: <Doctor /> },
  { path: '/appointment', label: 'Appointments', element: <Appointments /> },
  { path: '/profile', label: 'Profile', element: <Profile /> },
];

/* Utility map for quick label lookup */
const routeNameMap = Object.fromEntries(
  routeConfig.map(({ path, label }) => [`/dashboard${path === '/' ? '' : path}`, label])
);

/* Fallback page */
const NotFound = () => (
  <div className="flex items-center justify-center min-h-[70vh]">
    <h2 className="text-2xl font-semibold text-gray-700">404 – Page not found</h2>
  </div>
);

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  /* ----------------------------------------------------------------
     Close sidebar whenever route changes (handy on mobile)
  -----------------------------------------------------------------*/
  useEffect(() => setSidebarOpen(false), [location.pathname]);

  /* Current page title (memoised for perf) */
  const currentRouteName = useMemo(
    () => routeNameMap[location.pathname] ?? 'Dashboard',
    [location.pathname]
  );

  /* ----------------------------------------------------------------
     Render
  -----------------------------------------------------------------*/
  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main column */}
      <div className="flex flex-col flex-1 w-0 overflow-hidden">
        {/* NAVBAR */}
        <nav className="w-full bg-white shadow-sm">
          <div className="w-full px-4 sm:px-6 md:px-8">
            <div className="flex items-center justify-between h-16 py-2">

              {/* ── Mobile / Tablet ────────────────────────────────── */}
              <div className="flex items-center justify-between w-full py-2 lg:hidden">
                <img
                  src={logo}
                  alt="DashMed logo"
                  className="object-cover w-12 h-12 rounded-full"
                />

                <div className="flex items-center space-x-4">
                  <h1 className="text-xl font-semibold text-gray-900">
                    {currentRouteName}
                  </h1>

                  <button
                    type="button"
                    aria-label="Open sidebar"
                    onClick={() => setSidebarOpen(true)}
                    className="inline-flex items-center justify-center p-2 text-gray-500 rounded-md hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                  >
                    <Menu className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* ── Desktop ───────────────────────────────────────── */}
              <div className="hidden w-full lg:flex lg:items-center lg:justify-between">
                <h1 className="text-xl font-semibold text-gray-900">
                  {currentRouteName}
                </h1>
                <UserCircle className="w-8 h-8 text-gray-600" />
              </div>
            </div>
          </div>
        </nav>

        {/* MAIN – scrollable */}
        <main className="relative z-0 flex-1 overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="px-4 mx-auto max-w-7xl">
              <Routes>
                {routeConfig.map(({ path, element }) => (
                  <Route key={path} path={path} element={element} />
                ))}
                {/* 404 fallback */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </main>

        {/* FOOTER */}
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;
