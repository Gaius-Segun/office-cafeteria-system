import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { useAppContext } from '../AppContext';
import { useNavigate } from 'react-router-dom';

export default function OrderHistory() {
  const { setCart, userEmail: contextEmail } = useAppContext();
  const [orderHistory, setOrderHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadOrderHistory = () => {
      if (contextEmail) {
        console.log('Attempting to load order history for user:', contextEmail);
        try {
          const savedData = JSON.parse(localStorage.getItem(`userData_${contextEmail}`)) || {};
          setOrderHistory(Array.isArray(savedData.lastOrdered) ? savedData.lastOrdered : []);
        } catch (error) {
          console.error("Failed to parse order history from local storage", error);
          setOrderHistory([]);
        }
      } else {
        console.log('User email not available yet. Waiting for context...');
        setOrderHistory([]);
      }
      setIsLoading(false);
    };

    // Add a small delay to show loading state
    setTimeout(loadOrderHistory, 300);
    window.addEventListener('storage', loadOrderHistory);

    return () => {
      window.removeEventListener('storage', loadOrderHistory);
    };
  }, [contextEmail]);

  const handleReorder = (order) => {
    setCart(order.items);
    navigate('/OrderSummary', {
      state: { serveOption: order.serveOption, total: order.total }
    });
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 text-gray-800 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-32 h-32 bg-blue-200/20 rounded-full animate-pulse delay-75"></div>
        <div className="absolute top-40 right-1/3 w-24 h-24 bg-indigo-200/15 rounded-full animate-bounce delay-150"></div>
        <div className="absolute bottom-32 left-1/6 w-20 h-20 bg-purple-200/25 rounded-full animate-ping delay-300"></div>
        <div className="absolute bottom-20 right-1/4 w-16 h-16 bg-blue-300/20 rounded-full animate-pulse delay-500"></div>
        
        {/* Floating icons */}
        <div className="absolute top-32 right-20 text-blue-300 text-2xl animate-float delay-200">📋</div>
        <div className="absolute top-1/2 left-20 text-indigo-300 text-xl animate-float delay-700">🍽️</div>
        <div className="absolute bottom-40 right-32 text-purple-300 text-lg animate-float delay-1000">⭐</div>
      </div>

      <Sidebar />
      
      <div className="flex-1 p-8 overflow-y-auto relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-12 animate-fade-in-down">
          <div className="inline-block relative">
            <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent animate-pulse-gentle">
              Order History
            </h1>
            <div className="absolute -top-2 -right-2 text-3xl animate-bounce-gentle">📜</div>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mt-2 animate-width-expand"></div>
          </div>
          <p className="text-gray-600 mt-4 text-lg animate-fade-in-up delay-300">
            Track your delicious journey through time
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-20 animate-fade-in-up">
            <div className="inline-block relative">
              <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
              <div className="absolute inset-0 w-16 h-16 border-4 border-purple-200 border-b-purple-600 rounded-full animate-spin-reverse mx-auto"></div>
            </div>
            <p className="text-xl font-medium text-gray-600 animate-pulse">Loading your order history...</p>
          </div>
        ) : orderHistory.length === 0 ? (
          <div className="text-center py-20 animate-fade-in-up">
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-white/30 max-w-md mx-auto transform hover:scale-105 transition-all duration-500">
              <div className="relative">
                <p className="text-8xl mb-6 animate-bounce-gentle">🤷</p>
                <div className="absolute -top-2 -right-8 text-2xl animate-float delay-300">💨</div>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">No Orders Yet</h2>
              <p className="text-gray-600 mb-6">Your culinary adventure awaits!</p>
              <button
                onClick={() => navigate('/menu')}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-2xl font-semibold shadow-lg transform hover:scale-105 hover:-translate-y-1 transition-all duration-300"
              >
                Explore Menu
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6 max-w-4xl mx-auto">
            {orderHistory.map((order, index) => {
              const firstItemName = order.items && order.items.length > 0 ? order.items[0].name : 'Unknown Meal';
              const totalItems = order.items ? order.items.reduce((sum, item) => sum + item.quantity, 0) : 0;
              return (
                <div
                  key={index}
                  className={`group relative bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/30 transition-all duration-500 transform hover:scale-[1.02] hover:shadow-2xl animate-slide-in-right overflow-hidden ${
                    hoveredCard === index ? 'ring-2 ring-blue-300' : ''
                  }`}
                  style={{ animationDelay: `${index * 150}ms` }}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Animated background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Floating order number */}
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold animate-pulse-gentle">
                    {index + 1}
                  </div>

                  <div className="flex justify-between items-start mb-6 relative z-10">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
                        <h3 className="font-bold text-xl text-gray-900">Order #{index + 1}</h3>
                        <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                          Completed
                        </div>
                      </div>
                      <p className="text-gray-600 flex items-center gap-2">
                        <span className="text-lg">🍽️</span>
                        <span className="font-medium">{firstItemName}</span>
                        {totalItems > 1 && (
                          <span className="text-blue-600 font-semibold">
                            +{totalItems - 1} more items
                          </span>
                        )}
                      </p>
                      <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                        <span>📦</span>
                        <span>{totalItems} total items</span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-sm text-gray-500 mb-1">Total Amount</p>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">💰</span>
                        <p className="font-bold text-2xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                          ₦{order.total}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced buttons */}
                  <div className="flex gap-4 relative z-10">
                    <button
                      onClick={() => navigate(`/order/${index}`)}
                      className="group/btn flex-1 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-800 px-6 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                    >
                      <span className="text-lg group-hover/btn:animate-bounce">📋</span>
                      <span>View Details</span>
                    </button>
                    
                    <button
                      onClick={() => handleReorder(order)}
                      className="group/btn flex-1 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-6 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-white/20 transform translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-500"></div>
                      <span className="text-lg group-hover/btn:animate-bounce">🔄</span>
                      <span className="relative">Re-Order</span>
                    </button>
                  </div>
                  
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10"></div>
                </div>
              );
            })}
          </div>
        )}
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
        
        @keyframes pulse-gentle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg);
          }
          50% { 
            transform: translateY(-10px) rotate(5deg);
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