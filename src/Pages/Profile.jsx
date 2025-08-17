import React from 'react';
import { useAppContext } from '../AppContext';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar'; // Import the Sidebar component

// Combined animations into a single style block for consistency
const animations = `
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slide-up {
  from { 
    opacity: 0;
    transform: translateY(30px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes width-expand {
  from { width: 0; }
  to { width: 4rem; }
}

@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out;
}

.animate-slide-up {
  animation: slide-up 0.6s ease-out;
}

.animate-fade-in-up {
  animation: fade-in-up 0.6s ease-out forwards;
  opacity: 0;
}

.animate-width-expand {
  animation: width-expand 0.8s ease-out 0.5s forwards;
  width: 0;
}

.animate-spin-slow {
  animation: spin-slow 3s linear infinite;
}
`;

export default function Profile() {
  const { userName, userEmail } = useAppContext();
  const navigate = useNavigate();

  return (
    <>
      <style>{animations}</style>
      {/* Main container for sidebar and content */}
      <div className="flex min-h-screen bg-gray-50 text-gray-800">
        <Sidebar />
        
        {/* Profile content area */}
        <div className="flex-1 p-8 flex flex-col items-center justify-center overflow-y-auto">
          <div className="w-full max-w-xl bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 relative overflow-hidden transform hover:scale-[1.02] transition-all duration-500 ease-out animate-slide-up">
            {/* Animated background gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-3xl"></div>
            
            {/* Floating particles effect */}
            <div className="absolute top-4 left-4 w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
            <div className="absolute top-8 right-6 w-1 h-1 bg-purple-400 rounded-full animate-pulse"></div>
            <div className="absolute bottom-10 left-6 w-1.5 h-1.5 bg-indigo-400 rounded-full animate-ping"></div>

            {/* Header with back button */}
            <div className="flex items-center justify-between mb-8 relative z-10">
              <button 
                onClick={() => navigate(-1)} 
                className="text-gray-600 hover:text-indigo-600 p-2 rounded-full hover:bg-indigo-50 transition-all duration-300 transform hover:scale-110 active:scale-95"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent animate-pulse">
                Profile
              </h1>
              <button className="text-emerald-500 hover:text-emerald-600 p-2 rounded-full hover:bg-emerald-50 transition-all duration-300 transform hover:scale-110 active:scale-95">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </button>
            </div>

            {/* Profile picture with enhanced styling */}
            <div className="flex flex-col items-center mb-10 relative z-10">
              <div className="relative group">
                {/* Animated ring around profile picture */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-spin-slow opacity-75"></div>
                <div className="absolute inset-1 bg-white rounded-full"></div>
                
                <img
                  src="/images.jpeg"
                  alt="Profile"
                  className="relative w-28 h-28 rounded-full border-4 border-white shadow-2xl transform group-hover:scale-105 transition-all duration-500 z-10"
                />
                
                {/* Camera icon with enhanced styling */}
                <div className="absolute bottom-1 right-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full p-2 shadow-lg border-2 border-white transform hover:scale-110 transition-all duration-300 cursor-pointer group-hover:rotate-12">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.86-1.503A2 2 0 0110.455 4H13a2 2 0 011.664.89l.86 1.503A2 2 0 0017.07 7H18a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-20 blur-lg animate-pulse"></div>
              </div>
              
              <p className="mt-6 text-2xl font-bold text-gray-800 animate-fade-in-up">
                {userName}
              </p>
              <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mt-2 animate-width-expand"></div>
            </div>

            {/* Profile information fields with stagger animation */}
            <div className="space-y-6 relative z-10">
              {/* Email Address field */}
              <div className="transform hover:translate-x-2 transition-all duration-300 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
                <label className="block text-gray-600 text-sm font-semibold mb-2 flex items-center">
                  <svg className="w-4 h-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                  </svg>
                  E-mail address
                </label>
                <div className="w-full bg-gradient-to-r from-gray-50 to-blue-50 text-gray-700 p-4 rounded-2xl font-medium border border-gray-200/50 backdrop-blur-sm hover:shadow-lg hover:border-blue-300 transition-all duration-300 transform hover:-translate-y-1">
                  {userEmail}
                </div>
              </div>

              {/* User Name field */}
              <div className="transform hover:translate-x-2 transition-all duration-300 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                <label className="block text-gray-600 text-sm font-semibold mb-2 flex items-center">
                  <svg className="w-4 h-4 mr-2 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                  </svg>
                  User name
                </label>
                <div className="w-full bg-gradient-to-r from-gray-50 to-purple-50 text-gray-700 p-4 rounded-2xl font-medium border border-gray-200/50 backdrop-blur-sm hover:shadow-lg hover:border-purple-300 transition-all duration-300 transform hover:-translate-y-1">
                  @{userName ? userName.replace(/\s/g, '').toLowerCase() : 'loading'}
                </div>
              </div>
              
              {/* Phone Number field */}
              <div className="transform hover:translate-x-2 transition-all duration-300 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
                <label className="block text-gray-600 text-sm font-semibold mb-2 flex items-center">
                  <svg className="w-4 h-4 mr-2 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                  </svg>
                  Phone number
                </label>
                <div className="w-full bg-gradient-to-r from-gray-50 to-emerald-50 text-gray-700 p-4 rounded-2xl font-medium border border-gray-200/50 backdrop-blur-sm hover:shadow-lg hover:border-emerald-300 transition-all duration-300 transform hover:-translate-y-1">
                  08101137307
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
