import React from 'react';

const Welcome = () => {
  const user = JSON.parse(localStorage.getItem('userData'))
  return (
    <div className='w-full p-4 my-4 text-center text-black bg-white rounded-lg shadow-md'>
      <h1 className='text-2xl font-semibold md:text-xl'>Welcome to Doctor point, {user.user_name}!</h1>
      <p className='my-5 '>
        We are glad to have you here. Let&apos;s make today a health one!
      </p>
    </div>
  );
};

export default Welcome;
