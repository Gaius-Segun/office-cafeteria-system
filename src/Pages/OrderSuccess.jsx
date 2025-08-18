import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import Sidebar from './Sidebar';
import { useAppContext } from '../AppContext';

export default function OrderSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  // Get the new functions from context, including the order ready timer
  const { 
    userEmail, 
    addOrderToHistory, 
    startOrderReadyTimer,
    showNotification 
  } = useAppContext();
  const [fadeIn, setFadeIn] = useState(false);
  const [latestOrder, setLatestOrder] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  // Use a ref to ensure the order is processed only once
  const hasProcessedOrder = useRef(false);

  useEffect(() => {
    // Check if the order has already been processed to prevent duplication
    if (hasProcessedOrder.current) {
        return;
    }

    const orderDetails = location.state;

    if (userEmail && orderDetails) {
      // Create a unique order ID using a timestamp
      const newOrder = { ...orderDetails, orderId: Date.now() };

      // Use the context function to add the new order to the history
      if (typeof addOrderToHistory === 'function') {
        addOrderToHistory(newOrder);
      } else {
        // Fallback for cases where addOrderToHistory is not yet available
        console.error('addOrderToHistory function not found in AppContext.');
      }
      
      // 🎯 NEW: Start the 30-second order ready timer
      if (typeof startOrderReadyTimer === 'function') {
        const orderData = {
          orderId: newOrder.orderId,
          items: newOrder.items,
          total: newOrder.total,
          restaurantName: newOrder.items.length > 0 ? 'Food Court' : 'Restaurant'
        };
        
        // Start the 30-second timer for "order ready" notification
        startOrderReadyTimer(orderData, 30); // 30 seconds
        
        console.log('Order ready timer started for order:', newOrder.orderId);
      } else {
        console.error('startOrderReadyTimer function not found in AppContext.');
      }
      
      // 🎯 NEW: Show immediate success notification
      if (typeof showNotification === 'function') {
        showNotification({
          type: 'success',
          message: `Order placed successfully! Your food will be ready in 30 seconds.`,
          duration: 5000
        });
      }
      
      // Set the state to display the order that was just placed
      setLatestOrder(newOrder);
      // Set the flag to true so the logic won't run again
      hasProcessedOrder.current = true;
    }
    
    // A small delay for the fade-in animation and confetti
    setTimeout(() => {
      setFadeIn(true);
      setShowConfetti(true);
    }, 100);
  }, [userEmail, location.state, addOrderToHistory, startOrderReadyTimer, showNotification]); // Add new dependencies

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 text-gray-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-emerald-200/30 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-16 w-16 h-16 bg-teal-200/20 rounded-full animate-bounce delay-75"></div>
        <div className="absolute bottom-24 left-1/4 w-12 h-12 bg-cyan-200/25 rounded-full animate-ping delay-150"></div>
        <div className="absolute bottom-40 right-1/3 w-8 h-8 bg-emerald-300/20 rounded-full animate-pulse delay-300"></div>
        
        {/* Floating success elements */}
        {showConfetti && (
          <>
            <div className="absolute top-1/4 left-1/4 text-emerald-400 text-2xl animate-bounce delay-200">🎉</div>
            <div className="absolute top-1/3 right-1/4 text-teal-400 text-xl animate-pulse delay-500">✨</div>
            <div className="absolute top-1/2 left-1/6 text-cyan-400 text-lg animate-bounce delay-700">🎊</div>
            <div className="absolute bottom-1/3 right-1/6 text-emerald-500 text-xl animate-pulse delay-1000">⭐</div>
          </>
        )}
      </div>

      <Sidebar />
      
      <div className="flex-1 flex flex-col justify-center items-center p-6 relative z-10">
        {/* Success Card with enhanced styling */}
        <div
          className={`bg-white/80 backdrop-blur-lg border border-white/30 rounded-3xl p-12 flex flex-col items-center shadow-2xl max-w-lg w-full transform transition-all duration-1000 ease-out relative overflow-hidden ${
            fadeIn ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'
          }`}
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-teal-500/5 to-cyan-500/5 rounded-3xl"></div>
          
          {/* Animated success ring */}
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full animate-spin-slow opacity-20"></div>
            <div className="relative bg-white rounded-full p-4 shadow-lg">
              <CheckCircle 
                size={80} 
                className="text-emerald-500 animate-bounce-gentle" 
                style={{
                  filter: 'drop-shadow(0 4px 8px rgba(16, 185, 129, 0.3))'
                }}
              />
            </div>
            
            {/* Success glow effect */}
            <div className="absolute inset-0 bg-emerald-400 rounded-full opacity-20 blur-xl animate-pulse"></div>
          </div>

          <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent mb-6 text-center animate-fade-in-up">
            Order Placed Successfully!
          </h2>

          {/* 🎯 NEW: Order preparation status indicator */}
          <div className="mb-6 text-center animate-fade-in-up delay-200">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-100 to-amber-100 rounded-full border border-orange-200">
              <div className="w-2 h-2 bg-orange-500 rounded-full mr-2 animate-pulse"></div>
              <span className="text-orange-700 font-medium text-sm">
                🍳 Preparing your order... Ready in ~30 seconds!
              </span>
            </div>
          </div>

          {latestOrder ? (
            <div className="text-gray-700 w-full animate-fade-in-up delay-300">
              <div className="text-center mb-6 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100">
                <p className="text-lg">
                  Your order of{' '}
                  <span className="font-bold text-emerald-700">
                    {latestOrder.items.map(item => item.name).join(', ')}
                  </span>{' '}
                  has been placed successfully!
                </p>
                <p className="text-sm text-emerald-600 mt-2 font-medium">
                  💫 You'll be notified when it's ready for pickup!
                </p>
              </div>
              
              <div className="bg-gray-50/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></div>
                  Order Details
                </h3>
                
                <div className="space-y-3 mb-4">
                  {latestOrder.items.map((item, index) => (
                    <div 
                      key={index} 
                      className="flex justify-between items-center p-3 bg-white/60 rounded-xl border border-gray-100 transform hover:scale-[1.02] transition-all duration-300"
                      style={{animationDelay: `${index * 100}ms`}}
                    >
                      <span className="font-medium text-gray-800">{item.name}</span>
                      <span className="text-gray-600">
                        ₦{item.price} × {item.quantity}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-gray-300 pt-4 space-y-2">
                  <div className="flex justify-between items-center text-lg">
                    <span className="font-bold text-gray-800">Total Amount:</span>
                    <span className="font-bold text-emerald-600 text-xl">₦{latestOrder.total}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700">Status:</span>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mr-2 animate-pulse"></div>
                      <span className="text-orange-600 font-semibold">Preparing</span>
                    </div>
                  </div>
                  
                  {/* 🎯 NEW: Order ID for reference */}
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700">Order ID:</span>
                    <span className="text-gray-600 font-mono text-sm">#{latestOrder.orderId}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center p-8 animate-fade-in-up delay-300">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              </div>
              <p className="text-gray-500 text-lg">Loading order details...</p>
            </div>
          )}
        </div>

        {/* Enhanced Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 mt-8 animate-fade-in-up delay-500">
          <button
            onClick={() => navigate('/dashboard')}
            className="group relative bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 px-8 py-4 rounded-2xl text-white font-bold shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 active:scale-95 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            <div className="relative flex items-center space-x-2">
              <svg className="w-5 h-5 transform group-hover:rotate-12 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              <span>Return to Dashboard</span>
            </div>
          </button>
          
          <button
            onClick={() => navigate('/order-history')}
            className="group relative bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 px-8 py-4 rounded-2xl text-white font-bold shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 active:scale-95 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-rose-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            <div className="relative flex items-center space-x-2">
              <svg className="w-5 h-5 transform group-hover:rotate-12 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
              <span>Check Order History</span>
            </div>
          </button>
        </div>
      </div>

      {/* Custom CSS for additional animations */}
      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes bounce-gentle {
          0%, 100% { 
            transform: translateY(0) scale(1);
            animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
          }
          50% { 
            transform: translateY(-5px) scale(1.05);
            animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
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
        
        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }
        
        .animate-bounce-gentle {
          animation: bounce-gentle 2s infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .delay-200 {
          animation-delay: 200ms;
        }
        
        .delay-300 {
          animation-delay: 300ms;
        }
        
        .delay-500 {
          animation-delay: 500ms;
        }
      `}</style>
    </div>
  );
}