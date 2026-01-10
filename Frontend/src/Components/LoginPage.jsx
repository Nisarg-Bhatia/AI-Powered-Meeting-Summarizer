import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import authService from '../services/authService';

// Reusable Input Field with Icon
const InputField = ({ label, type, placeholder, icon, value, onChange }) => (
  <div className="mb-5 group/field">
    <label className="block text-sm font-medium text-gray-300 mb-2 ml-1 transition-colors duration-300 group-focus-within/field:text-emerald-400">{label}</label>
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-emerald-400 transition-all duration-300 group-focus-within:scale-110">
        {icon}
      </div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full pl-12 pr-4 py-3.5 bg-[#262626] border border-gray-700 rounded-md focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/50 focus:shadow-lg focus:shadow-emerald-500/20 text-white placeholder-gray-500 transition-all duration-300 outline-none hover:border-gray-600 transform focus:scale-[1.01]"
      />
    </div>
  </div>
);

// Reusable Glowing Button
const GradientButton = ({ children, type = "button", disabled = false }) => (
  <button type={type} disabled={disabled} className="relative group w-full mt-2">
    <div className={`relative w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 rounded-md flex items-center justify-center font-bold text-white transition-all duration-300 hover:scale-[1.02] active:scale-95 hover:shadow-lg hover:shadow-emerald-500/50 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
      {children}
    </div>
  </button>
);

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Auto-hide error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');

  try {
    const data = await authService.login({ email, password });
    localStorage.setItem("authToken", data.access_token);
    localStorage.setItem("justLoggedIn", "true");

    navigate('/');
  } catch (err) {
    setError(err.response?.data?.detail || 'Login failed.');
  } finally {
    setLoading(false);
  }
};


  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await authService.forgotPassword(resetEmail);
      setResetSent(true);
      setTimeout(() => {
        setShowForgotPassword(false);
        setResetSent(false);
        setResetEmail('');
      }, 3000);
    } catch (err) {
      console.error('Password reset failed:', err);
      setError(err.response?.data?.detail || 'Failed to send reset email.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8000/api/auth/google/login";
  };
  return (
    <AuthLayout title={showForgotPassword ? "Reset Password" : "Welcome Back"} subtitle={showForgotPassword ? "Enter your email to receive a reset link." : "Sign in to continue to your dashboard."}>
      {/* Error Toast */}
      {error && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in-right">
          <div className="bg-red-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3 max-w-md">
            <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="flex-1">
              <p className="font-semibold">Login Failed</p>
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

      {!showForgotPassword ? (
        <form onSubmit={handleSubmit}>

          <InputField
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>}
          />

          <InputField
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>}
          />

          <div className="flex justify-end mb-6">
            <button
              type="button"
              onClick={() => setShowForgotPassword(true)}
              className="text-sm text-emerald-400 hover:text-emerald-300 transition-all duration-300 font-medium hover:scale-110 hover:underline underline-offset-2"
            >
              Forgot Password?
            </button>
          </div>

          <GradientButton type="submit">Log In</GradientButton>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-[#262626] text-gray-400">Or continue with</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => { handleGoogleLogin() }}
            className="w-full py-3.5 bg-black hover:bg-gray-900 text-white font-semibold rounded-md border border-gray-600 hover:border-gray-500 flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.02] active:scale-95 hover:shadow-md"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.8055 10.2292C19.8055 9.55056 19.7501 8.86667 19.6306 8.19861H10.2V12.0486H15.6014C15.3773 13.2911 14.6571 14.3898 13.6025 15.0875V17.5861H16.8251C18.7173 15.8444 19.8055 13.2722 19.8055 10.2292Z" fill="#4285F4" />
              <path d="M10.2 20C12.9571 20 15.2715 19.1044 16.8294 17.5861L13.6068 15.0875C12.7023 15.6972 11.5467 16.0433 10.2043 16.0433C7.54165 16.0433 5.29051 14.2828 4.50115 11.9167H1.17773V14.4917C2.77051 17.6583 6.31158 20 10.2 20Z" fill="#34A853" />
              <path d="M4.49681 11.9167C4.04681 10.6742 4.04681 9.33056 4.49681 8.08806V5.51306H1.17773C-0.193939 8.23889 -0.193939 11.7656 1.17773 14.4917L4.49681 11.9167Z" fill="#FBBC04" />
              <path d="M10.2 3.95722C11.6254 3.93556 13.0029 4.47222 14.0401 5.45889L16.8945 2.60444C15.1859 0.990556 12.9311 0.0949998 10.2 0.116667C6.31158 0.116667 2.77051 2.45833 1.17773 5.51306L4.49681 8.08806C5.28165 5.71667 7.53722 3.95722 10.2 3.95722Z" fill="#EA4335" />
            </svg>
            Sign in with Google
          </button>

          <p className="text-center text-gray-400 mt-8 text-sm">
            Don't have an account?{' '}
            <Link to="/signup" className="text-emerald-400 font-semibold hover:text-emerald-300 transition-all duration-300 ml-1 hover:underline underline-offset-2 inline-block hover:scale-110">
              Sign Up Free
            </Link>
          </p>

        </form>
      ) : (
        <div className="animate-fade-in">
          {!resetSent ? (
            <form onSubmit={handleForgotPassword}>
              <InputField
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>}
              />

              <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-md animate-pulse-slow">
                <p className="text-sm text-gray-300 leading-relaxed">
                  <span className="text-emerald-400 font-semibold">Note:</span> We'll send you an email with instructions to reset your password.
                </p>
              </div>

              <GradientButton type="submit">Send Reset Link</GradientButton>

              <button
                type="button"
                onClick={() => setShowForgotPassword(false)}
                className="w-full mt-4 py-3 text-center text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 font-medium"
              >
                Back to Login
              </button>
            </form>
          ) : (
            <div className="text-center py-8 animate-bounce-in">
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center border-2 border-emerald-500 animate-bounce">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Check Your Email!</h3>
              <p className="text-gray-400 leading-relaxed">
                Reset link sent to <span className="text-emerald-400 font-semibold">{resetEmail}</span>
              </p>
            </div>
          )}
        </div>
      )}
    </AuthLayout>
  );
};

export default LoginPage;