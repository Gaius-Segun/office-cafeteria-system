import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// This component uses Framer Motion for animations.
// It should be installed with `npm install framer-motion`.
// Ensure you have a global state management solution (like your AppContext)
// to manage and trigger these notifications from other components.

/**
 * Reusable notification component with dynamic styling and animations.
 * @param {object} props - Component properties.
 * @param {string} props.message - The message to display inside the notification.
 * @param {'success' | 'error' | 'info'} props.type - The type of notification to display.
 * @param {function} props.onClose - Function to call when the notification is closed.
 */
export default function Notification({ message, type, onClose }) {
  const [isVisible, setIsVisible] = useState(true);

  // Automatically hide the notification after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose(); // Call the parent's onClose handler
    }, 5000);

    // Cleanup function to clear the timer if the component unmounts
    return () => clearTimeout(timer);
  }, [onClose]);

  // Determine styles and icons based on the notification type
  let icon = '';
  let bgColor = '';
  let borderColor = '';
  let textColor = '';

  switch (type) {
    case 'success':
      icon = (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2l4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
      bgColor = 'bg-green-50';
      borderColor = 'border-green-300';
      textColor = 'text-green-800';
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
      break;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={`fixed bottom-4 right-4 z-50 p-4 rounded-xl shadow-lg flex items-center gap-4 ${bgColor} ${borderColor} border-l-4 transform transition-all duration-300`}
          role="alert"
        >
          {/* Notification Icon */}
          <div className="flex-shrink-0">
            {icon}
          </div>

          {/* Notification Message */}
          <div className="flex-1">
            <p className={`font-semibold text-sm ${textColor}`}>
              {message}
            </p>
          </div>

          {/* Close Button */}
          <button
            onClick={() => {
              setIsVisible(false);
              onClose();
            }}
            className={`p-1 rounded-full text-gray-400 hover:bg-gray-200 transition-all`}
            aria-label="Close notification"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
