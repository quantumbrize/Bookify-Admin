// src/pages/NotFound.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800 p-4">
      <h1 className="text-9xl font-bold text-blue-600">404</h1>
      <h2 className="text-4xl font-semibold mt-4">Page Not Found</h2>
      <p className="text-gray-600 mt-2">Oops! The page you're looking for doesn't exist.</p>
      <button
        onClick={handleGoHome}
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
      >
        Go to Home
      </button>
    </div>
  );
};

export default NotFound;
