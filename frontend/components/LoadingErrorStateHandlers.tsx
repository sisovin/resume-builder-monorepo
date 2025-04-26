import React from 'react';

const LoadingErrorStateHandlers = ({ isLoading, isError, children }) => {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred. Please try again later.</div>;
  }

  return <>{children}</>;
};

export default LoadingErrorStateHandlers;
