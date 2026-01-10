import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import authService from "../services/authService";


const InputField = ({ label, type, placeholder, icon, value, onChange }) => (
  <div className="mb-3">
    <label className="block text-xs font-medium text-gray-300 mb-1.5 ml-1">{label}</label>
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 group-focus-within:text-emerald-400 transition-colors">
        {icon}
      </div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full pl-10 pr-3 py-2.5 bg-[#262626] border border-gray-700 rounded-md focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-white placeholder-gray-500 transition-all duration-200 outline-none text-sm"
      />
    </div>
  </div>
);

const GradientButton = ({ children, type = "button" }) => (
  <button type={type} className="relative group w-full mt-1">
    <div className="relative w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 rounded-md flex items-center justify-center font-semibold text-white transition-all duration-300 hover:scale-[1.02] active:scale-95 hover:shadow-lg hover:shadow-emerald-500/50 text-sm">
      {children}
    </div>
  </button>
);

// --- MAIN COMPONENT ---

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setSuccess('');

  if (password !== confirmPassword) {
    setError("Passwords don't match!");
    return;
  }

  // Validate password length
  if (password.length < 6) {
    setError("Password must be at least 6 characters long");
    return;
  }

  try {
    const response = await authService.register({
      name,
      email,
      password,
    });

    // Store the token
    if (response.access_token) {
      localStorage.setItem("authToken", response.access_token);
      localStorage.setItem("justLoggedIn", "true");
    }

    setSuccess("Account created successfully! Redirecting...");
    setTimeout(() => {
      window.location.href = "/";
    }, 1500);
  } catch (err) {
    const errorMessage = err.response?.data?.detail || 
                        err.response?.data?.message || 
                        err.message || 
                        "Signup failed. Please try again.";
    setError(errorMessage);
  }
};

const handleGoogleLogin = () => {
  authService.googleLoginRedirect();
};

  return (
    <AuthLayout title="Create Account" subtitle="Start supercharging your meetings today.">
      {/* Error Toast */}
      {error && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in-right">
          <div className="bg-red-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3 max-w-md">
            <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="flex-1">
              <p className="font-semibold">Signup Failed</p>
              <p className="text-sm text-red-100">{error}</p>
            </div>
            <button 
              onClick={() => setError('')}
              className="ml-4 text-white hover:text-red-100 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Success Toast */}
      {success && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in-right">
          <div className="bg-emerald-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3 max-w-md">
            <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="flex-1">
              <p className="font-semibold">Success!</p>
              <p className="text-sm text-emerald-100">{success}</p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit}>

        {/* Name Input */}
        <InputField
          label="Full Name"
          type="text"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          icon={
            // User Icon
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
          }
        />

        {/* Email Input */}
        <InputField
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={
            // Mail Icon
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
          }
        />

        {/* Password Input */}
        <InputField
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon={
            // Lock Icon
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
          }
        />

        {/* Confirm Password Input */}
        <InputField
          label="Confirm Password"
          type="password"
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          icon={
            // Lock Check Icon
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
          }
        />

        <div className="mb-3 text-xs text-gray-400 text-center px-4">
          By signing up, you agree to our <button type="button" className="text-emerald-400 hover:text-emerald-300 hover:underline transition-all duration-300 hover:scale-105 inline-block">Terms</button> and <button type="button" className="text-emerald-400 hover:text-emerald-300 hover:underline transition-all duration-300 hover:scale-105 inline-block">Privacy Policy</button>.
        </div>

        {/* Submit Button */}
        <GradientButton type="submit">
          Create Account
        </GradientButton>

        {/* Divider */}
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-3 bg-[#262626] text-gray-400">Or continue with</span>
          </div>
        </div>

        {/* Google Sign-In Button */}
        <button
          type="button"
          onClick={() => handleGoogleLogin()}
          className="cursor-pointer w-full py-2.5 bg-black hover:bg-gray-900 text-white font-semibold rounded-md border border-gray-600 hover:border-gray-500 flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] active:scale-95 hover:shadow-md text-sm"
        >
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.8055 10.2292C19.8055 9.55056 19.7501 8.86667 19.6306 8.19861H10.2V12.0486H15.6014C15.3773 13.2911 14.6571 14.3898 13.6025 15.0875V17.5861H16.8251C18.7173 15.8444 19.8055 13.2722 19.8055 10.2292Z" fill="#4285F4" />
            <path d="M10.2 20C12.9571 20 15.2715 19.1044 16.8294 17.5861L13.6068 15.0875C12.7023 15.6972 11.5467 16.0433 10.2043 16.0433C7.54165 16.0433 5.29051 14.2828 4.50115 11.9167H1.17773V14.4917C2.77051 17.6583 6.31158 20 10.2 20Z" fill="#34A853" />
            <path d="M4.49681 11.9167C4.04681 10.6742 4.04681 9.33056 4.49681 8.08806V5.51306H1.17773C-0.193939 8.23889 -0.193939 11.7656 1.17773 14.4917L4.49681 11.9167Z" fill="#FBBC04" />
            <path d="M10.2 3.95722C11.6254 3.93556 13.0029 4.47222 14.0401 5.45889L16.8945 2.60444C15.1859 0.990556 12.9311 0.0949998 10.2 0.116667C6.31158 0.116667 2.77051 2.45833 1.17773 5.51306L4.49681 8.08806C5.28165 5.71667 7.53722 3.95722 10.2 3.95722Z" fill="#EA4335" />
          </svg>
          Sign up with Google
        </button>

        {/* Log In Link */}
        <p className="text-center text-gray-400 mt-5 text-xs">
          Already have an account?{' '}
          <Link to="/login" className="text-emerald-400 font-semibold hover:text-emerald-300 transition-all duration-300 ml-1 hover:underline underline-offset-2 inline-block hover:scale-110">
            Log In
          </Link>
        </p>

      </form>
    </AuthLayout>
  );
};

export default SignupPage;