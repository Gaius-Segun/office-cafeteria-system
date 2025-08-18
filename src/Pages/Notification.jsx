import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// This component uses Framer Motion for animations.
// It should be installed with `npm install framer-motion`.
// Ensure you have a global state management solution (like your AppContext)
// to manage and trigger these notifications from other components.

/**
 * Enhanced reusable notification component with dynamic styling and animations.
 * Now includes special support for "order ready" notifications with celebration effects.
 * @param {object} props - Component properties.
 * @param {string} props.message - The message to display inside the notification.
 * @param {'success' | 'error' | 'info' | 'order-ready'} props.type - The type of notification to display.
 * @param {function} props.onClose - Function to call when the notification is closed.
 * @param {number} [props.duration] - Duration in milliseconds before auto-close (default: 5000).
 * @param {object} [props.orderData] - Additional order data for order-ready notifications.
 */
export default function Notification({ message, type, onClose, duration = 5000, orderData }) {
  const [isVisible, setIsVisible] = useState(true);
  const [showCelebration, setShowCelebration] = useState(false);

  // Special handling for order-ready notifications
  const isOrderReady = type === 'order-ready';
  
  // Trigger celebration animation for order-ready notifications
  useEffect(() => {
    if (isOrderReady) {
      setShowCelebration(true);
      // Remove celebration elements after animation
      const celebrationTimer = setTimeout(() => {
        setShowCelebration(false);
      }, 2000);
      return () => clearTimeout(celebrationTimer);
    }
  }, [isOrderReady]);

  // Automatically hide the notification after specified duration
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onClose(), 300); // Delay to allow exit animation
    }, duration);

    // Cleanup function to clear the timer if the component unmounts
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  // Determine styles and icons based on the notification type
  let icon = '';
  let bgColor = '';
  let borderColor = '';
  let textColor = '';
  let accentColor = '';
  let shadowStyle = '';

  switch (type) {
    case 'order-ready':
      icon = (
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full animate-ping opacity-30"></div>
          <div className="relative bg-gradient-to-r from-emerald-500 to-green-600 rounded-full p-2 shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
        </div>
      );
      bgColor = 'bg-gradient-to-r from-emerald-50 via-green-50 to-teal-50';
      borderColor = 'border-emerald-400';
      textColor = 'text-emerald-800';
      accentColor = 'text-emerald-600';
      shadowStyle = 'shadow-2xl shadow-emerald-500/25';
      break;
    case 'success':
      icon = (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2l4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
      bgColor = 'bg-green-50';
      borderColor = 'border-green-300';
      textColor = 'text-green-800';
      shadowStyle = 'shadow-lg';
      break;
    case 'error':
      icon = (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
      bgColor = 'bg-red-50';
      borderColor = 'border-red-300';
      textColor = 'text-red-800';
      shadowStyle = 'shadow-lg';
      break;
    case 'info':
    default:
      icon = (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
      bgColor = 'bg-blue-50';
      borderColor = 'border-blue-300';
      textColor = 'text-blue-800';
      shadowStyle = 'shadow-lg';
      break;
  }

  // Special animation for order-ready notifications
  const orderReadyAnimation = isOrderReady ? {
    initial: { y: 100, opacity: 0, scale: 0.8, rotate: -5 },
    animate: { 
      y: 0, 
      opacity: 1, 
      scale: 1, 
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 12,
        duration: 0.6
      }
    },
    exit: { 
      y: -50, 
      opacity: 0, 
      scale: 0.9,
      transition: { duration: 0.4 }
    }
  } : {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 50, opacity: 0 },
    transition: { duration: 0.3 }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          {...orderReadyAnimation}
          className={`fixed ${isOrderReady ? 'bottom-6 right-6' : 'bottom-4 right-4'} z-50 ${isOrderReady ? 'p-6' : 'p-4'} rounded-xl ${shadowStyle} flex items-center gap-4 ${bgColor} ${borderColor} ${isOrderReady ? 'border-2' : 'border-l-4'} transform transition-all duration-300 ${isOrderReady ? 'min-w-[350px]' : 'max-w-sm'}`}
          role="alert"
        >
          {/* Celebration particles for order-ready */}
          {isOrderReady && showCelebration && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
              <div className="absolute top-2 left-8 text-yellow-400 text-lg animate-bounce delay-100">🎉</div>
              <div className="absolute top-4 right-12 text-emerald-400 text-sm animate-pulse delay-300">✨</div>
              <div className="absolute bottom-4 left-12 text-green-400 text-base animate-bounce delay-500">🎊</div>
              <div className="absolute bottom-2 right-8 text-teal-400 text-sm animate-pulse delay-700">⭐</div>
            </div>
          )}

          {/* Notification Icon */}
          <div className="flex-shrink-0">
            {icon}
          </div>

          {/* Notification Content */}
          <div className="flex-1">
            {isOrderReady ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <p className={`font-bold text-lg ${textColor}`}>
                    🎉 Order Ready!
                  </p>
                  <div className="flex space-x-1">
                    <div className="w-1 h-1 bg-emerald-500 rounded-full animate-ping"></div>
                    <div className="w-1 h-1 bg-emerald-500 rounded-full animate-ping delay-75"></div>
                    <div className="w-1 h-1 bg-emerald-500 rounded-full animate-ping delay-150"></div>
                  </div>
                </div>
                <p className={`text-sm ${accentColor} font-medium`}>
                  {message || "Your delicious food is ready for pickup!"}
                </p>
                {orderData && (
                  <div className="mt-2 pt-2 border-t border-emerald-200">
                    <p className="text-xs text-emerald-700">
                      Order #{orderData.orderId} • {orderData.items?.length || 0} item(s)
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <p className={`font-semibold text-sm ${textColor}`}>
                {message}
              </p>
            )}
          </div>

          {/* Close Button */}
          <button
            onClick={() => {
              setIsVisible(false);
              setTimeout(() => onClose(), 300);
            }}
            className={`p-1 rounded-full text-gray-400 hover:bg-gray-200 transition-all ${isOrderReady ? 'hover:bg-emerald-100 hover:text-emerald-600' : ''}`}
            aria-label="Close notification"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Special glow effect for order-ready notifications */}
          {isOrderReady && (
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 via-green-400/10 to-teal-400/10 rounded-xl animate-pulse pointer-events-none"></div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}