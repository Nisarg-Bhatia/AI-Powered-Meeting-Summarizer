import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const GoogleSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    
    if (token) {
      // Store the token in localStorage
      localStorage.setItem('authToken', token);
      localStorage.setItem('justLoggedIn', 'true');
      
      // Redirect to homepage
      navigate('/', { replace: true });
    } else {
      // If no token, redirect to login
      navigate('/login', { replace: true });
    }
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500 mb-4"></div>
        <p className="text-gray-300 text-lg">Completing sign in...</p>
      </div>
    </div>
  );
};

export default GoogleSuccess;
