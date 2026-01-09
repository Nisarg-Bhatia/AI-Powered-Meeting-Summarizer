import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from './AuthLayout'; 

const InputField = ({ label, type, placeholder, icon, value, onChange }) => (
  <div className="mb-5">
    <label className="block text-sm font-medium text-gray-300 mb-2 ml-1">{label}</label>
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-emerald-400 transition-colors">
        {icon}
      </div>
      <input 
        type={type} 
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full pl-12 pr-4 py-3.5 bg-[#262626] border border-gray-700 rounded-md focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-white placeholder-gray-500 transition-all duration-200 outline-none"
      />
    </div>
  </div>
);

const GradientButton = ({ children, type="button" }) => (
    <button type={type} className="relative group w-full mt-2">
        <div className="relative w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 rounded-md flex items-center justify-center font-bold text-white transition-all duration-200 active:scale-95">
            {children}
        </div>
    </button>
);

// --- MAIN COMPONENT ---

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup attempt:", { name, email, password });
    // Add registration logic here
  };

  return (
    <AuthLayout title="Create Account" subtitle="Start supercharging your meetings today.">
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
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
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
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
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
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            }
        />

        <div className="mb-6 text-xs text-gray-400 text-center px-4">
            By signing up, you agree to our <button className="text-emerald-400 hover:underline">Terms</button> and <button className="text-emerald-400 hover:underline">Privacy Policy</button>.
        </div>

        {/* Submit Button */}
        <GradientButton type="submit">
            Create Account
        </GradientButton>

        {/* Log In Link */}
        <p className="text-center text-gray-400 mt-8 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-emerald-400 font-semibold hover:text-emerald-300 transition-colors ml-1">
                Log In
            </Link>
        </p>

      </form>
    </AuthLayout>
  );
};

export default SignupPage;