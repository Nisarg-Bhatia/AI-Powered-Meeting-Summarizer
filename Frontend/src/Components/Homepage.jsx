import React, { useState, useEffect } from 'react'
import Extension from './Extension.jsx'
import '../index.css'
import Overview from './Overview.jsx'
import AboutUs from './AboutUs.jsx'
import Footer from './Footer.jsx'

function Homepage() {
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    useEffect(() => {
        const justLoggedIn = localStorage.getItem('justLoggedIn');
        if (justLoggedIn === 'true') {
            setShowSuccessAlert(true);
            localStorage.removeItem('justLoggedIn');
            
            // Auto-hide after 5 seconds
            setTimeout(() => {
                setShowSuccessAlert(false);
            }, 5000);
        }
    }, []);

    return (
        <>
            {showSuccessAlert && (
                <div className="fixed top-4 right-4 z-50 animate-slide-in-right">
                    <div className="bg-emerald-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3 max-w-md">
                        <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                            <p className="font-semibold">Successfully logged in!</p>
                            <p className="text-sm text-emerald-100">Welcome back to MeetSmart AI</p>
                        </div>
                        <button 
                            onClick={() => setShowSuccessAlert(false)}
                            className="ml-4 text-white hover:text-emerald-100 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
            <Extension />
            <Overview />
            <AboutUs />
            <Footer />
        </>
    )
}

export default Homepage
