import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, User, X, LogOut, ListPlus, Wallet } from 'lucide-react';
import logo from '../assets/logo.png';
import { toast } from 'react-toastify';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Doctors', href: '/dashboard/doctors', icon: ListPlus },
    { name: 'Appointments', href: '/dashboard/appointment', icon: Wallet },
    { name: 'Profile', href: '/dashboard/profile', icon: User },
  ];

  const handleLogout = () => {
    setIsLoggingOut(true);
  
    try {
      toast.success('Logged out successfully!');
      setTimeout(() => {
        navigate('/login');
        setIsLoggingOut(false);
      }, 1500);
    } catch (error) {
      console.error('Logout failed', error);
      toast.error('An error occurred during logout');
      setIsLoggingOut(false); 
    }
  };

  return (
    <>
      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 flex z-40 lg:hidden ${isOpen ? '' : 'hidden'}`}
        role='dialog'
        aria-modal='true'
      >
        <div
          className={`fixed inset-0 bg-gray-600 bg-opacity-75 ${isOpen ? '' : 'hidden'}`}
          aria-hidden='true'
          onClick={() => setIsOpen(false)}
        ></div>

        <div className='relative flex flex-col flex-1 w-full max-w-xs bg-white'>
          <div className='absolute top-0 right-0 pt-2 mr-3'>
            <button
              type='button'
              className='flex items-center justify-center w-10 h-10 ml-1 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-600'
              onClick={() => setIsOpen(false)}
            >
              <X className='w-6 h-6 text-gray-600' />
            </button>
          </div>

          <div className='flex-1 h-0 pt-5 pb-4 overflow-y-auto'>
            <div className='flex items-center px-4'>
              <img
                className='object-cover h-auto rounded-full w-14'
                src={logo}
                alt='Logo'
              />
            </div>
            <nav className='px-2 mt-10 space-y-4'>
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`${
                      location.pathname === item.href
                        ? 'bg-green-600 text-white'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    } group flex items-center px-2 py-2 text-base font-medium rounded-md`}
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon
                      className={`${
                        location.pathname === item.href
                          ? 'text-white'
                          : 'text-gray-600 group-hover:text-white'
                      } mr-4 flex-shrink-0 h-6 w-6`}
                    />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Logout Button (Mobile) */}
          <div className='p-4 border-t border-gray-200'>
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className='flex items-center w-full px-4 py-2 text-sm font-medium text-red-500 rounded-md hover:bg-gray-100 hover:text-red-600 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {isLoggingOut ? (
                <>
                  <svg
                    className='w-5 h-5 mr-3 text-red-500 animate-spin'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                  >
                    <circle
                      className='opacity-25'
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      strokeWidth='4'
                    ></circle>
                    <path
                      className='opacity-75'
                      fill='currentColor'
                      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                    ></path>
                  </svg>
                  Logging out...
                </>
              ) : (
                <>
                  <LogOut className='w-5 h-5 mr-3 text-red-500' />
                  Logout
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className='hidden lg:flex lg:flex-shrink-0'>
        <div className='flex flex-col w-64'>
          <div className='flex flex-col flex-1 min-h-0 bg-white border-r border-gray-200'>
            <div className='flex flex-col flex-1 pt-5 pb-4 overflow-y-auto'>
              <div className='flex items-center px-4 pl-6'>
                <img
                  className='object-cover h-auto rounded-full w-14'
                  src={logo}
                  alt='Logo'
                />
              </div>
              <nav className='flex-1 px-2 pt-6 space-y-4'>
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`${
                        location.pathname === item.href
                          ? 'bg-green-600 text-white'
                          : 'text-gray-600 hover:bg-green-500 hover:text-white'
                      } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                    >
                      <Icon
                        className={`${
                          location.pathname === item.href
                            ? 'text-white'
                            : 'text-gray-600 group-hover:text-white'
                        } mr-3 flex-shrink-0 h-6 w-6`}
                      />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Logout Button (Desktop) */}
            <div className='p-4 border-t border-gray-200'>
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className='flex items-center w-full px-4 py-2 text-sm font-medium text-red-500 rounded-md hover:bg-gray-100 hover:text-red-600 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                {isLoggingOut ? (
                  <>
                    <svg
                      className='w-5 h-5 mr-3 text-red-500 animate-spin'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                    >
                      <circle
                        className='opacity-25'
                        cx='12'
                        cy='12'
                        r='10'
                        stroke='currentColor'
                        strokeWidth='4'
                      ></circle>
                      <path
                        className='opacity-75'
                        fill='currentColor'
                        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                      ></path>
                    </svg>
                    Logging out...
                  </>
                ) : (
                  <>
                    <LogOut className='w-5 h-5 mr-3 text-red-500' />
                    Logout
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default Sidebar;