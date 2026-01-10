import React from 'react';
import { Link } from 'react-router-dom';

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white flex items-center justify-center relative overflow-hidden p-4">

      {/* Enhanced Animated Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/15 rounded-full blur-[150px] animate-pulse"></div>
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-emerald-400/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-emerald-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>

      {/* Floating Particles */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-emerald-400/30 rounded-full animate-float" style={{ animationDuration: '6s' }}></div>
      <div className="absolute top-40 right-20 w-3 h-3 bg-emerald-500/20 rounded-full animate-float" style={{ animationDuration: '8s', animationDelay: '1s' }}></div>
      <div className="absolute bottom-32 left-1/3 w-2 h-2 bg-emerald-300/25 rounded-full animate-float" style={{ animationDuration: '7s', animationDelay: '2s' }}></div>
      <div className="absolute top-1/3 right-10 w-1.5 h-1.5 bg-emerald-400/40 rounded-full animate-float" style={{ animationDuration: '9s', animationDelay: '0.5s' }}></div>

      <div className="w-full max-w-md relative z-10 animate-fade-in-up">

        <div className="text-center mb-8 animate-fade-in" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
          <Link to="/" className="inline-block text-3xl font-extrabold tracking-tight hover:scale-110 transition-transform duration-300 group">
            <span className="text-emerald-400 group-hover:drop-shadow-[0_0_10px_rgba(16,185,129,0.5)] transition-all duration-300">MeetSmart</span>
            <span className="text-white">AI</span>
          </Link>
        </div>

        <div className="bg-[#262626] border border-gray-700 rounded-xl p-8 relative overflow-hidden shadow-2xl hover:border-emerald-500/40 hover:shadow-emerald-500/10 transition-all duration-500 animate-fade-in-up backdrop-blur-sm" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>

          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-emerald-400/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

          <div className="absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/20 via-emerald-400/20 to-emerald-500/20 blur-sm animate-pulse"></div>
          </div>

          <div className="mb-8 relative z-10 animate-fade-in" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
            <h2 className="text-2xl font-bold mb-2 text-white">{title}</h2>
            <p className="text-gray-400 text-sm">{subtitle}</p>
          </div>

          <div className="animate-fade-in relative z-10" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
            {children}
          </div>

        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
          50% { transform: translateY(-30px) translateX(10px); opacity: 0.8; }
        }
        
        @keyframes bounce-in {
          0% { opacity: 0; transform: scale(0.3); }
          50% { transform: scale(1.05); }
          70% { transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }
        
        .animate-fade-in-up { animation: fade-in-up 0.7s ease-out; }
        .animate-fade-in { animation: fade-in 0.7s ease-out; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-bounce-in { animation: bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55); }
        .animate-pulse-slow { animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
      `}</style>
    </div>
  );
};

export default AuthLayout;