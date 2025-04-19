import React from 'react';

const Footer = () => {
  return (
    <footer className='py-[24px] bg-white border-t border-gray-200'>
      <div className='px-4 mx-auto max-w-7xl sm:px-6 md:px-8'>
        <div className='text-center text-gray-600'>
          <p className='text-sm'>
            &copy; {new Date().getFullYear()} Doctor Point. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
