import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from './AuthLayout';

// Reusable Input Field with Icon
const InputField = ({ label, type, placeholder, icon, value, onChange }) => (
    <div className="mb-5 group/field">
        <label className="block text-sm font-medium text-gray-300 mb-2 ml-1 transition-colors duration-300 group-focus-within/field:text-emerald-400">{label}</label>
        <div className="relative group">
            {/* Icon displayed on the left */}
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
const GradientButton = ({ children, type = "button" }) => (
    <button type={type} className="relative group w-full mt-2">
        <div className="relative w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 rounded-md flex items-center justify-center font-bold text-white transition-all duration-300 hover:scale-[1.02] active:scale-95 hover:shadow-lg hover:shadow-emerald-500/50">
            {children}
        </div>
    </button>
);

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Password reset requested for:", email);
        setSubmitted(true);
        // Add password reset logic here (API call, etc.)
    };

    return (
        <AuthLayout title="Reset Password" subtitle="Enter your email to receive a password reset link.">
            {!submitted ? (
                <form onSubmit={handleSubmit}>

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

                    {/* Info Message */}
                    <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-md">
                        <p className="text-sm text-gray-300 leading-relaxed">
                            <span className="text-emerald-400 font-semibold">Note:</span> We'll send you an email with instructions to reset your password. Please check your Email.
                        </p>
                    </div>

                    {/* Submit Button */}
                    <GradientButton type="submit">
                        Send Reset Link
                    </GradientButton>

                    {/* Back to Login Link */}
                    <p className="text-center text-gray-400 mt-8 text-sm">
                        Remember your password?{' '}
                        <Link to="/login" className="text-emerald-400 font-semibold hover:text-emerald-300 transition-all duration-300 ml-1 hover:underline underline-offset-2 inline-block hover:scale-105">
                            Back to Login
                        </Link>
                    </p>

                </form>
            ) : (
                <div className="text-center py-8 animate-fade-in">
                    {/* Success Icon */}
                    <div className="mb-6 flex justify-center">
                        <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center border-2 border-emerald-500 animate-bounce">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                <polyline points="22 4 12 14.01 9 11.01" />
                            </svg>
                        </div>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3">Check Your Email!</h3>
                    <p className="text-gray-400 mb-6 leading-relaxed">
                        We've sent a password reset link to <span className="text-emerald-400 font-semibold">{email}</span>
                    </p>

                    <div className="space-y-3">
                        <GradientButton type="button" onClick={() => setSubmitted(false)}>
                            Send Again
                        </GradientButton>

                        <Link to="/login" className="block w-full py-3.5 text-center text-gray-300 hover:text-white transition-all duration-300 hover:scale-105">
                            Back to Login
                        </Link>
                    </div>
                </div>
            )}
        </AuthLayout>
    );
};

export default ForgotPasswordPage;
