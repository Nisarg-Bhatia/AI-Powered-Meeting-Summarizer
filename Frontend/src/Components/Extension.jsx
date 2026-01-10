"use client"

import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Extension() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('justLoggedIn');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white overflow-hidden relative z-0 flex flex-col">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1a1a1a] via-[#1a1a1a] to-[#1a1a1a] -z-20"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-emerald-500/5 blur-[100px] -z-10"></div>

      <nav className="w-full relative z-50 bg-[#1a1a1a]/95 backdrop-blur-sm border-b border-gray-700">
        <div className="container mx-auto px-6 py-6 flex justify-between items-center">
          <div className="flex items-center">
            <div className="text-xl md:text-2xl font-extrabold tracking-tight cursor-pointer">
              <span className="text-emerald-400">
                MeetSmart
              </span>
              <span className="text-white">AI</span>
            </div>
          </div>

          <div className="flex items-center space-x-4 md:space-x-8">
            {isLoggedIn ? (
              <button 
                onClick={handleLogout}
                className="text-sm md:text-base font-medium text-gray-300 hover:text-white transition-all duration-300 hover:scale-110 active:scale-95"
              >
                Log Out
              </button>
            ) : (
              <>
                <Link to="/login" className="text-sm md:text-base font-medium text-gray-300 hover:text-white transition-all duration-300 hover:scale-110 active:scale-95">
                  Log In
                </Link>

                <Link to="/signup" className="relative group px-6 py-2.5 rounded-md text-sm font-semibold text-white bg-emerald-500 hover:bg-emerald-600 transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-emerald-500/50">
                  Sign Up Free
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 flex-grow flex items-center relative z-10 pt-10 pb-20 md:py-0">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-8 w-full">
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left space-y-6">
            <span className="inline-block py-1 px-3 rounded-md bg-emerald-500/10 text-emerald-400 font-semibold text-sm tracking-wider uppercase mb-2 border border-emerald-500/30">
              AI-Powered Meeting Intelligence
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-white">
              Stop Taking Notes in <br className="hidden md:block" />
              <span className="text-emerald-400">
                Google Meet
              </span>
            </h1>

            <p className="text-lg text-gray-400 max-w-lg leading-relaxed font-light">
              Focus on the conversation, not the minutes. Our extension automatically generates accurate transcripts,
              concise AI summaries, and actionable key points from every call.
            </p>

            <div className="pt-6">
              <button className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-300 bg-emerald-500 hover:bg-emerald-600 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-[#1a1a1a] hover:scale-105 active:scale-95 hover:shadow-xl hover:shadow-emerald-500/50 animate-pulse-slow">
                <span className="tracking-wide">Add to Chrome — It's Free</span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="ml-3 -mr-1 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-110"
                >
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 4c1.489 0 2.874.407 4.078 1.108l-2.818 4.882h-5.881l3.193-5.527c.459-.302.95-.463 1.428-.463zm-5.62 2.293l2.681 4.639-3.188 5.52c-1.192-1.415-1.909-3.252-1.909-5.254 0-1.998.716-3.835 1.907-5.246.163.122.336.233.509.341zm9.562 11.105l-2.685-4.643 3.194-5.53c1.185 1.413 1.897 3.242 1.897 5.236 0 1.993-.711 3.822-1.894 5.233-.169-.117-.346-.224-.512-.33zm-9.454-1.028l2.819-4.882h5.895l-3.206 5.556c-.456.296-.943.456-1.414.456-1.474 0-2.849-.402-4.052-1.096.002-.002-.023-.018-.042-.034zm5.512-2.37c-1.104 0-2-.896-2-2s.896-2 2-2 2 .896 2 2-.896 2-2 2z" />
                </svg>
              </button>
              <p className="text-xs text-gray-500 mt-4 tracking-wider uppercase font-semibold">
                Compatible with Google Meet on Chrome & Edge.
              </p>
            </div>
          </div>

          <div className="w-full md:w-1/2 flex justify-center items-center relative mt-16 md:mt-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-96 md:h-96 bg-emerald-500/5 rounded-full blur-[80px] md:blur-[120px] -z-10"></div>

            <div className="relative z-10 animate-float-slow">
              <svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M160 40H240C251.046 40 260 48.9543 260 60V240C260 251.046 251.046 260 240 260H160"
                  stroke="url(#paint_notes)"
                  strokeWidth="12"
                  strokeLinecap="round"
                />
                <line
                  x1="180"
                  y1="100"
                  x2="230"
                  y2="100"
                  stroke="url(#paint_notes)"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                <line
                  x1="180"
                  y1="140"
                  x2="230"
                  y2="140"
                  stroke="url(#paint_notes)"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                <line
                  x1="180"
                  y1="180"
                  x2="230"
                  y2="180"
                  stroke="url(#paint_notes)"
                  strokeWidth="8"
                  strokeLinecap="round"
                />

                <rect
                  x="40"
                  y="80"
                  width="160"
                  height="140"
                  rx="20"
                  fill="url(#paint_camera_bg)"
                  stroke="url(#paint_camera_stroke)"
                  strokeWidth="4"
                />
                <path
                  d="M140 150L180 120V180L140 150Z"
                  fill="#000000"
                  stroke="url(#paint_camera_stroke)"
                  strokeWidth="4"
                  strokeLinejoin="round"
                />
                <circle cx="100" cy="150" r="25" stroke="url(#paint_camera_stroke)" strokeWidth="4" />

                <defs>
                  <linearGradient id="paint_notes" x1="160" y1="40" x2="260" y2="260" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#10b981" />
                    <stop offset="1" stopColor="#059669" />
                  </linearGradient>
                  <linearGradient id="paint_camera_bg" x1="40" y1="80" x2="200" y2="220" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#10b981" stopOpacity="0.15" />
                    <stop offset="1" stopColor="#10b981" stopOpacity="0.05" />
                  </linearGradient>
                  <linearGradient
                    id="paint_camera_stroke"
                    x1="40"
                    y1="80"
                    x2="200"
                    y2="220"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#10b981" />
                    <stop offset="1" stopColor="#059669" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Extension
