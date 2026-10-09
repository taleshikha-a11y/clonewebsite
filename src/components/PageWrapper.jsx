import React from 'react';

const PageWrapper = ({ children, className = '' }) => {
  return (
    <div className={`w-full min-h-[calc(100vh-64px)] pb-12 pt-4 transition-all duration-300 ${className}`}>
      {children}
    </div>
  );
};

export default PageWrapper;
