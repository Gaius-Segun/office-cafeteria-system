import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useAppContext } from '../AppContext';

export default function OrderDetails() {
  const { index } = useParams(); // Get the order index from the URL
  const navigate = useNavigate();
  const { userEmail: contextEmail } = useAppContext();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // This effect runs once to load the specific order details
    if (contextEmail) {
      setTimeout(() => {
        try {
          const savedData = JSON.parse(localStorage.getItem(`userData_${contextEmail}`)) || {};
          const orderHistory = Array.isArray(savedData.lastOrdered) ? savedData.lastOrdered : [];
          const orderIndex = parseInt(index, 10);

          if (!isNaN(orderIndex) && orderHistory[orderIndex]) {
            setOrder(orderHistory[orderIndex]);
          } else {
            setOrder(null); // Set to null if order is not found
            console.error("Order not found for index:", index);
          }
        } catch (error) {
          console.error("Failed to parse order history from local storage", error);
          setOrder(null);
        }
        setIsLoading(false);
      }, 300);
    }
  }, [index, contextEmail]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 text-gray-800">
        <Sidebar />
        <div className="flex-1 p-8 text-center flex flex-col justify-center items-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-6"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-purple-200 border-b-purple-600 rounded-full animate-spin-reverse"></div>
          </div>
          <p className="text-xl font-medium text-gray-600 animate-pulse">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-rose-50 text-gray-800 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-1/4 w-24 h-24 bg-red-200/20 rounded-full animate-pulse"></div>
          <div className="absolute bottom-32 right-1/3 w-16 h-16 bg-pink-200/15 rounded-full animate-bounce"></div>
          <div className="absolute top-1/2 right-20 text-red-300 text-3xl animate-float">❌</div>
        </div>

        <Sidebar />
        <div className="flex-1 p-8 text-center flex flex-col justify-center items-center relative z-10">
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-12 shadow-2xl border border-white/30 max-w-md transform hover:scale-105 transition-all duration-500 animate-fade-in-up">
            <div className="text-8xl mb-6 animate-bounce-gentle">😕</div>
            <h1 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
              Order Not Found
            </h1>
            <p className="text-gray-600 mb-8 text-lg">
              The order you're looking for seems to have vanished into thin air!
            </p>
            <button
              onClick={() => navigate('/order-history')}
              className="group bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-xl flex items-center gap-3 mx-auto"
            >
              <span className="text-xl group-hover:animate-bounce">🏠</span>
              Go to Order History
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 text-gray-800 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-16 left-1/4 w-32 h-32 bg-blue-200/20 rounded-full animate-pulse delay-75"></div>
        <div className="absolute top-40 right-1/3 w-24 h-24 bg-indigo-200/15 rounded-full animate-bounce delay-150"></div>
        <div className="absolute bottom-32 left-1/6 w-20 h-20 bg-purple-200/25 rounded-full animate-ping delay-300"></div>
        
        {/* Floating receipt elements */}
        <div className="absolute top-32 right-20 text-blue-300 text-2xl animate-float delay-200">🧾</div>
        <div className="absolute top-1/2 left-16 text-indigo-300 text-xl animate-float delay-700">📋</div>
        <div className="absolute bottom-40 right-32 text-purple-300 text-lg animate-float delay-1000">✅</div>
      </div>

      <Sidebar />
      
      <div className="flex-1 p-8 overflow-y-auto relative z-10">
        {/* Enhanced Back button */}
        <button
          onClick={() => navigate(-1)}
          className="group mb-8 flex items-center gap-3 px-6 py-3 bg-white/60 backdrop-blur-sm hover:bg-white/80 text-gray-700 hover:text-gray-900 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-x-2 shadow-lg hover:shadow-xl animate-fade-in-up"
        >
          <span className="text-2xl group-hover:animate-bounce-x">←</span>
          <span className="font-semibold">Back to History</span>
        </button>

        {/* Enhanced Header */}
        <div className="text-center mb-12 animate-fade-in-down">
          <div className="inline-block relative">
            <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent animate-pulse-gentle">
              Order Details
            </h1>
            <div className="absolute -top-2 -right-2 text-3xl animate-bounce-gentle">🧾</div>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mt-2 animate-width-expand"></div>
          </div>
          <p className="text-gray-600 mt-4 text-lg animate-fade-in-up delay-300">
            Your delicious order breakdown
          </p>
        </div>

        {/* Enhanced Receipt Card */}
        <div className="max-w-2xl mx-auto animate-fade-in-up delay-200">
          <div className="bg-white/80 backdrop-blur-lg p-10 rounded-3xl shadow-2xl border border-white/30 relative overflow-hidden transform hover:scale-[1.02] transition-all duration-500">
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 rounded-3xl"></div>
            
            {/* Receipt Header */}
            <div className="border-b-2 border-dashed border-gray-300 pb-6 mb-8 relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                    <span className="text-2xl">🧾</span>
                    Receipt
                  </h2>
                  <p className="text-sm text-gray-500 mt-2 flex items-center gap-2">
                    <span>📅</span>
                    Order placed on: {new Date().toLocaleString()}
                  </p>
                </div>
                <div className="bg-gradient-to-r from-green-100 to-emerald-100 px-4 py-2 rounded-2xl border border-green-200">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-700 font-semibold text-sm">Completed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="space-y-6 mb-8 relative z-10">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <span>🍽️</span>
                Order Items
              </h3>
              
              {order.items.map((item, idx) => (
                <div 
                  key={idx} 
                  className="group flex justify-between items-center p-6 bg-gradient-to-r from-gray-50/80 to-blue-50/80 backdrop-blur-sm rounded-2xl border border-gray-100/50 transform hover:scale-[1.02] transition-all duration-300 hover:shadow-lg animate-slide-in-right"
                  style={{ animationDelay: `${idx * 100 + 400}ms` }}
                >
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <div className="h-16 w-16 bg-white rounded-2xl flex items-center justify-center shadow-lg overflow-hidden transform group-hover:scale-110 transition-all duration-300">
                        <img
                          src={item.image || item.imageSrc || 'https://placehold.co/64x64/F3F4F6/9CA3AF?text=🍔'}
                          alt={item.name}
                          className="w-full h-full rounded-2xl object-cover"
                        />
                      </div>
                      <div className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                        {item.quantity}
                      </div>
                    </div>
                    
                    <div>
                      <p className="font-bold text-lg text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-600 flex items-center gap-2">
                        <span>📦</span>
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        ₦{item.price} each
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-bold text-xl text-gray-900">
                      ₦{item.price * item.quantity}
                    </p>
                    <div className="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full ml-auto mt-1"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="space-y-4 border-t-2 border-dashed border-gray-300 pt-6 relative z-10">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-4">
                <span>📊</span>
                Order Summary
              </h3>
              
              <div className="bg-gradient-to-r from-purple-50/80 to-pink-50/80 backdrop-blur-sm p-6 rounded-2xl border border-purple-100/50">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🍽️</span>
                    <span className="text-gray-700 font-medium">Serve Option:</span>
                  </div>
                  <span className="font-bold text-lg bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                    {order.serveOption}
                  </span>
                </div>
                
                <div className="border-t border-dashed border-gray-300 pt-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">💰</span>
                      <span className="text-xl font-bold text-gray-900">Total Amount:</span>
                    </div>
                    <span className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                      ₦{order.total}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-4 right-4 text-2xl animate-float">⭐</div>
            <div className="absolute bottom-4 left-4 text-xl animate-float delay-500">✨</div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
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
        
        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }
        
        @keyframes width-expand {
          from { width: 0; }
          to { width: 8rem; }
        }
        
        @keyframes bounce-gentle {
          0%, 100% { 
            transform: translateY(0);
          }
          50% { 
            transform: translateY(-5px);
          }
        }
        
        @keyframes bounce-x {
          0%, 100% { 
            transform: translateX(0);
          }
          50% { 
            transform: translateX(-3px);
          }
        }
        
        @keyframes pulse-gentle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg);
          }
          50% { 
            transform: translateY(-8px) rotate(5deg);
          }
        }
        
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        
        .animate-fade-in-down {
          animation: fade-in-down 0.8s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-width-expand {
          animation: width-expand 0.8s ease-out 0.5s forwards;
          width: 0;
        }
        
        .animate-bounce-gentle {
          animation: bounce-gentle 3s infinite;
        }
        
        .animate-bounce-x {
          animation: bounce-x 0.6s ease-in-out;
        }
        
        .animate-pulse-gentle {
          animation: pulse-gentle 2s infinite;
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-spin-reverse {
          animation: spin-reverse 1s linear infinite;
        }
        
        .delay-75 { animation-delay: 75ms; }
        .delay-150 { animation-delay: 150ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-500 { animation-delay: 500ms; }
        .delay-700 { animation-delay: 700ms; }
        .delay-1000 { animation-delay: 1000ms; }
      `}</style>
    </div>
  );
}