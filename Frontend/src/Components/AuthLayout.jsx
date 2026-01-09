import React from 'react';
import { Link } from 'react-router-dom';

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    // Main Container with dark background and overflow hidden for glow effects
    <div className="min-h-screen bg-[#1a1a1a] text-white flex items-center justify-center relative overflow-hidden p-4">
      
      {/* === MAIN CARD CONTAINER === */}
      <div className="w-full max-w-md relative z-10">
        
        {/* Brand Logo Header */}
        <div className="text-center mb-8">
            {/* Replace to="/" with your homepage route */}
            <Link to="/" className="inline-block text-3xl font-extrabold tracking-tight">
                <span className="text-emerald-400">MeetSmart</span>
                <span className="text-white">AI</span>
            </Link>
        </div>

        {/* Form Card */}
        <div className="bg-[#262626] border border-gray-700 rounded-md p-8 relative overflow-hidden">
          
          {/* Form Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2 text-white">{title}</h2>
            <p className="text-gray-400 text-sm">{subtitle}</p>
          </div>

          {/* The actual form content goes here */}
          {children}

        </div>
      </div>
    </div>
  );
};

export default AuthLayout;