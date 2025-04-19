/**
 * Register page (demo‑only)
 * — Creates a new user record in localStorage.
 * — For production, move all auth logic to a secure backend and never store raw passwords client‑side.
 */
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import logo from '../assets/logo.png';

const Register = () => {
  /* ----------------------------------------------------------------
     State
  -----------------------------------------------------------------*/
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user',
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const nameInputRef = useRef(null);

  useEffect(() => { nameInputRef.current?.focus(); }, []);

  /* ----------------------------------------------------------------
     Submit
  -----------------------------------------------------------------*/
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { userName, email, password, confirmPassword, role } = formData;

    /* Empty‑field validation */
    if (!userName || !email || !password || !confirmPassword) {
      const msg = 'Please fill in all fields';
      setError(msg);
      toast.error(msg, { role: 'alert' });
      setLoading(false);
      nameInputRef.current?.focus();
      return;
    }

    /* Password match */
    if (password !== confirmPassword) {
      const msg = 'Passwords do not match';
      setError(msg);
      toast.error(msg, { role: 'alert' });
      setLoading(false);
      nameInputRef.current?.focus();
      return;
    }

    try {
      /* Safe parse of users */
      let users = [];
      try {
        users = JSON.parse(localStorage.getItem('users') || '[]');
      } catch {
        users = [];
      }

      if (users.some((u) => u.email === email)) {
        const msg = 'User with this email already exists';
        setError(msg);
        toast.error(msg, { role: 'alert' });
        setLoading(false);
        nameInputRef.current?.focus();
        return;
      }

      const newUser = {
        id: Date.now(),
        userName,
        email,
        password,        // ⚠️ demo only
        role,
      };

      localStorage.setItem('users', JSON.stringify([...users, newUser]));
      localStorage.setItem('userData', JSON.stringify(newUser));

      toast.success('Registration successful!', { role: 'alert' });
      setTimeout(() => {
        navigate('/login');
        setLoading(false);
      }, 1000);
    } catch {
      const msg = 'An error occurred during registration';
      setError(msg);
      toast.error(msg, { role: 'alert' });
      setLoading(false);
      nameInputRef.current?.focus();
    }
  };

  /* ----------------------------------------------------------------
     Render
  -----------------------------------------------------------------*/
  return (
    <div className="relative flex flex-col justify-center min-h-screen px-4 py-5 bg-gray-50">
      <ToastContainer aria-live="polite" />

      {/* Logo + heading */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <img
            src={logo}
            alt="Doctor Point logo"
            className="object-cover w-20 h-auto rounded-full"
          />
        </div>
        <p className="py-3 text-center">Welcome to Doctor Point</p>
        <h2
          id="register-form-title"
          className="mt-3 text-lg font-extrabold text-center text-gray-900"
        >
          Create your account
        </h2>
      </div>

      {/* Form */}
      <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="px-4 py-4 bg-white rounded-lg shadow sm:px-10">
          <form
            aria-labelledby="register-form-title"
            data-testid="register-form"
            className="space-y-3"
            onSubmit={handleSubmit}
          >
            {/* Error region */}
            <div
              role="alert"
              aria-live="assertive"
              className={`text-sm text-red-600 ${!error && 'invisible'}`}
            >
              {error || 'Placeholder'}
            </div>

            {/* Name */}
            <div>
              <label htmlFor="userName" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <div className="mt-1">
                <input
                  id="userName"
                  name="userName"
                  type="text"
                  autoComplete="name"
                  required
                  aria-required="true"
                  tabIndex={1}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  value={formData.userName}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, userName: e.target.value }))
                  }
                  ref={nameInputRef}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  aria-required="true"
                  tabIndex={2}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  aria-required="true"
                  tabIndex={3}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, password: e.target.value }))
                  }
                />
                <button
                  type="button"
                  tabIndex={4}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword1 ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  aria-required="true"
                  tabIndex={5}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))
                  }
                />
                <button
                  type="button"
                  tabIndex={6}
                  aria-label={
                    showPassword1 ? 'Hide confirm password' : 'Show confirm password'
                  }
                  onClick={() => setShowPassword1((s) => !s)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
                >
                  {showPassword1 ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <div>
              <button
                type="submit"
                tabIndex={7}
                disabled={loading}
                aria-busy={loading}
                className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
              >
                {loading ? (
                  <svg
                    className="w-5 h-5 mr-3 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                ) : (
                  'Register'
                )}
              </button>
            </div>
          </form>

          {/* Switch to login */}
          <div className="mt-3 text-center text-sm">
            Already have an account?{' '}
            <Link
              to="/login"
              tabIndex={8}
              className="font-medium text-green-600 hover:text-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
