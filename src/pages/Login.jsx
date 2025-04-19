/**
 * Login page (demo‑only)
 * ‑ Client‑side auth with localStorage for illustrative purposes.
 * ‑ In production, move auth to a secure backend + hashed passwords.
 */
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import logo from '../assets/logo.png';

const Login = () => {
  /* ----------------------------------------------------------------
     Local state
  -----------------------------------------------------------------*/
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const emailInputRef = useRef(null);

  useEffect(() => { emailInputRef.current?.focus(); }, []);

  /* ----------------------------------------------------------------
     Submit handler
  -----------------------------------------------------------------*/
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    /* Basic empty‑field validation */
    if (!credentials.email || !credentials.password) {
      const msg = 'Please fill in all fields';
      setError(msg);
      toast.error(msg, { role: 'alert' });
      setLoading(false);
      emailInputRef.current?.focus();
      return;
    }

    try {
      /* Safe parse of stored users */
      let users = [];
      try {
        users = JSON.parse(localStorage.getItem('users') || '[]');
      } catch {
        /* corrupted storage */
        users = [];
      }

      const user = users.find(
        (u) => u.email === credentials.email && u.password === credentials.password
      );

      if (!user) {
        const msg = 'Invalid email or password';
        setError(msg);
        toast.error(msg, { role: 'alert' });
        setLoading(false);
        emailInputRef.current?.focus();
        return;
      }

      /* NOTE: For demo only – do not store tokens in localStorage in prod */
      localStorage.setItem('accessToken', JSON.stringify(`access_${user.id}`));
      localStorage.setItem('userData', JSON.stringify(user));

      toast.success('Login successful!', { role: 'alert' });
      setTimeout(() => {
        navigate('/dashboard');
        setLoading(false);
      }, 1000);
    } catch {
      const msg = 'An error occurred during login';
      setError(msg);
      toast.error(msg, { role: 'alert' });
      setLoading(false);
      emailInputRef.current?.focus();
    }
  };

  /* ----------------------------------------------------------------
     Render
  -----------------------------------------------------------------*/
  return (
    <div className="relative flex flex-col justify-center min-h-screen px-6 py-12 bg-gray-50 lg:px-8">
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
        <p className="pt-3 text-center">Welcome back to Doctor Point</p>
        <h2
          id="login-form-title"
          className="mt-3 text-lg font-extrabold text-center text-gray-900"
        >
          Sign in to your account
        </h2>
      </div>

      {/* Form card */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="px-4 py-8 bg-white rounded-lg shadow sm:px-10">
          <form
            aria-labelledby="login-form-title"
            data-testid="login-form"
            className="space-y-6"
            onSubmit={handleSubmit}
          >
            {/* inline error region */}
            <div
              role="alert"
              aria-live="assertive"
              className={`text-sm text-red-600 ${!error && 'invisible'}`}
            >
              {error || 'Placeholder'}
            </div>

            {/* Email field */}
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
                  tabIndex={1}
                  className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  value={credentials.email}
                  onChange={(e) =>
                    setCredentials((prev) => ({ ...prev, email: e.target.value }))
                  }
                  ref={emailInputRef}
                />
              </div>
            </div>

            {/* Password field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative mt-1">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  aria-required="true"
                  tabIndex={2}
                  className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  value={credentials.password}
                  onChange={(e) =>
                    setCredentials((prev) => ({ ...prev, password: e.target.value }))
                  }
                />
                <button
                  type="button"
                  tabIndex={3}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <div>
              <button
                type="submit"
                tabIndex={4}
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
                  'Sign in'
                )}
              </button>
            </div>
          </form>

          {/* Register link */}
          <div className="mt-6 text-center text-sm">
            Don&#39;t have an account?{' '}
            <Link
              to="/register"
              tabIndex={5}
              className="font-medium text-green-600 hover:text-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
