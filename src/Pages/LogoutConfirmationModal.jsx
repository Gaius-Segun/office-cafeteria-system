import React, { useState, useEffect } from 'react';

export default function LogoutConfirmationModal({ onConfirm, onCancel }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Trigger the animation after component mounts
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  const handleCancel = () => {
    setIsClosing(true);
    setTimeout(onCancel, 300);
  };

  const handleConfirm = () => {
    setIsClosing(true);
    setTimeout(onConfirm, 300);
  };

  return (
    <div 
      className={`fixed inset-0 bg-gradient-to-br from-gray-900/60 via-slate-800/50 to-gray-900/60 backdrop-blur-sm overflow-y-auto h-full w-full flex items-center justify-center z-50 transition-all duration-300 ${
        isVisible && !isClosing ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleCancel}
    >
      <div 
        className={`relative bg-white/95 backdrop-blur-lg p-10 rounded-3xl shadow-2xl w-96 text-center border border-white/20 transform transition-all duration-500 ease-out ${
          isVisible && !isClosing ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Animated background gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-pink-500/5 rounded-3xl"></div>
        
        {/* Floating warning elements */}
        <div className="absolute top-4 right-4 w-2 h-2 bg-red-400 rounded-full animate-ping opacity-60"></div>
        <div className="absolute top-6 left-6 w-1 h-1 bg-orange-400 rounded-full animate-pulse opacity-40"></div>
        <div className="absolute bottom-6 right-8 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-bounce opacity-50"></div>

        {/* Icon with enhanced styling */}
        <div className="relative mb-6 animate-fade-in-up">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-red-100 to-pink-100 rounded-full flex items-center justify-center relative overflow-hidden">
            {/* Rotating ring */}
            <div className="absolute inset-0 border-4 border-red-300 rounded-full animate-spin-slow opacity-30"></div>
            <div className="relative text-4xl animate-bounce-gentle">⚠️</div>
          </div>
          {/* Glow effect */}
          <div className="absolute inset-0 w-20 h-20 mx-auto bg-red-400 rounded-full opacity-20 blur-lg animate-pulse"></div>
        </div>

        {/* Enhanced heading */}
        <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent animate-fade-in-up delay-100">
          Logout Confirmation
        </h3>
        
        {/* Subtitle with icon */}
        <div className="flex items-center justify-center gap-2 mb-6 animate-fade-in-up delay-200">
          <span className="text-lg">🚪</span>
          <p className="text-gray-600 text-lg">Are you sure you want to log out?</p>
        </div>

        {/* Additional context */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl p-4 mb-8 animate-fade-in-up delay-300">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-xl">💡</span>
            <p className="text-yellow-800 font-semibold text-sm">Just so you know...</p>
          </div>
          <p className="text-yellow-700 text-sm">
            You'll need to sign in again to access your account and order history.
          </p>
        </div>

        {/* Enhanced buttons */}
        <div className="flex justify-center space-x-4 animate-fade-in-up delay-400">
          <button
            onClick={handleCancel}
            className="group relative px-8 py-3 rounded-2xl font-semibold border-2 border-gray-300 text-gray-700 bg-white hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-slate-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
            <div className="relative flex items-center gap-2">
              <span className="text-lg group-hover:animate-wiggle">↩️</span>
              <span>Stay Logged In</span>
            </div>
          </button>
          
          <button
            onClick={handleConfirm}
            className="group relative px-8 py-3 rounded-2xl font-semibold bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-rose-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl"></div>
            <div className="relative flex items-center gap-2">
              <span className="text-lg group-hover:animate-wiggle">🚪</span>
              <span>Yes, Logout</span>
            </div>
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-white/20 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
          </button>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-red-400 to-pink-400 rounded-full"></div>
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-gray-300 to-slate-300 rounded-full"></div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes bounce-gentle {
          0%, 100% { 
            transform: translateY(0) scale(1);
          }
          50% { 
            transform: translateY(-3px) scale(1.05);
          }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg) scale(1); }
          25% { transform: rotate(-5deg) scale(1.1); }
          75% { transform: rotate(5deg) scale(1.1); }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
        
        .animate-bounce-gentle {
          animation: bounce-gentle 2s infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        
        .animate-wiggle {
          animation: wiggle 0.5s ease-in-out;
        }
        
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-400 { animation-delay: 400ms; }
      `}</style>
    </div>
  );
}