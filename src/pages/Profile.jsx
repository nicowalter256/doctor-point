import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * Profile component
 * – Allows a user to view and edit their basic profile information.
 * – For security, passwords are **not** stored in localStorage; handle them on a secure endpoint instead.
 */
const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userDetails, setUserDetails] = useState({
    userName: '',
    email: '',
    role: 'user',
  });

  /* ---------------------------------------------------------------
     Load profile (minus password) from localStorage on mount
  ----------------------------------------------------------------*/
  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem('userData')) ?? {
        userName: 'John Doe',
        email: 'john.doe@example.com',
        role: 'user',
      };
    setUserDetails(stored);
  }, []);

  /* ---------------------------------------------------------------
     Handlers
  ----------------------------------------------------------------*/
  const handleInputChange = ({ target: { name, value } }) =>
    setUserDetails((prev) => ({ ...prev, [name]: value }));

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('userData', JSON.stringify(userDetails));
    setIsEditing(false);
    // TODO: toast / alert: "Profile updated"
  };

  /* ---------------------------------------------------------------
     Render
  ----------------------------------------------------------------*/
  return (
    <div className="flex items-center justify-center min-h-[72vh] p-4">
      <div className="w-full max-w-xl p-4 overflow-hidden bg-white rounded-lg shadow-md">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
          {!isEditing && (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              aria-label="Edit profile"
            >
              Edit
            </button>
          )}
        </div>

        {/* Avatar + name */}
        <div className="flex items-center mb-6">
          <img
            src="https://randomuser.me/api/portraits/men/75.jpg"
            alt="User avatar"
            className="object-cover w-16 h-16 mr-4 rounded-full"
            width={64}
            height={64}
            loading="lazy"
          />
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              {userDetails.userName}
            </h2>
            <p className="text-gray-600">{userDetails.email}</p>
          </div>
        </div>

        {/* Details / Edit form */}
        <div className="pt-4 border-t border-gray-200">
          {isEditing ? (
            <form onSubmit={handleSave} className="space-y-4">
              {/* Full name */}
              <div>
                <label htmlFor="userName" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  id="userName"
                  name="userName"
                  type="text"
                  value={userDetails.userName}
                  onChange={handleInputChange}
                  className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={userDetails.email}
                  onChange={handleInputChange}
                  className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* Role (read‑only) */}
              <div>
                <p className="text-sm font-medium text-gray-700">Role</p>
                <p className="text-gray-900">{userDetails.role}</p>
              </div>

              {/* Action buttons */}
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  aria-label="Cancel editing"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                  aria-label="Save profile changes"
                >
                  Save
                </button>
              </div>
            </form>
          ) : (
            /* Read‑only details */
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-700">Full Name</p>
                <p className="text-gray-900">{userDetails.userName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Email Address</p>
                <p className="text-gray-900">{userDetails.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Role</p>
                <p className="text-gray-900">{userDetails.role}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* PropTypes (currently no incoming props, but included for future extensibility) */
Profile.propTypes = {};

export default Profile;
