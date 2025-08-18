import React from 'react';
import Sidebar from '../Pages/Sidebar';
import { useAppContext } from '../AppContext';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { 
    userName, 
    totalAllowance, 
    remainingAllowance, 
    lastOrdered,
    // 🎯 NEW: Order ready notification system integration
    activeOrders,
    getOrderRemainingTime,
    orderReadyNotification
  } = useAppContext();
  const navigate = useNavigate();

  // Helper function to check if a timestamp is from today
  const isToday = (someDate) => {
    const today = new Date();
    const date = new Date(someDate);
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  // Calculate dynamic statistics
  const totalOrders = lastOrdered.length;
  const ordersToday = lastOrdered.filter(order => isToday(order.timestamp)).length;
  const totalSales = lastOrdered.reduce((sum, order) => sum + order.total, 0);

  // Calculate order status counts and percentages
  const placedOrders = lastOrdered.filter(order => order.status === 'Placed').length;
  const preparingOrders = lastOrdered.filter(order => order.status === 'Preparing').length;
  const readyForPickupOrders = lastOrdered.filter(order => order.status === 'Ready for Pickup').length;
  const completedOrders = lastOrdered.filter(order => order.status === 'Completed').length;
  const totalTrackedOrders = placedOrders + preparingOrders + readyForPickupOrders + completedOrders;

  const placedPercentage = totalTrackedOrders > 0 ? (placedOrders / totalTrackedOrders) * 100 : 0;
  const preparingPercentage = totalTrackedOrders > 0 ? (preparingOrders / totalTrackedOrders) * 100 : 0;
  const readyForPickupPercentage = totalTrackedOrders > 0 ? (readyForPickupOrders / totalTrackedOrders) * 100 : 0;
  const completedPercentage = totalTrackedOrders > 0 ? (completedOrders / totalTrackedOrders) * 100 : 0;

  // 🎯 NEW: Active orders helper functions
  const hasActiveOrders = activeOrders.length > 0;
  const nextOrderReady = activeOrders.length > 0 ? activeOrders[0] : null;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Sidebar />

      <div className="flex-1 p-6 overflow-y-auto">
        {/* 🎯 NEW: Active Order Banner */}
        {hasActiveOrders && (
          <div className="mb-6 animate-fade-in">
            <div className="bg-gradient-to-r from-orange-100 via-amber-50 to-yellow-100 border-2 border-orange-200 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-amber-500 rounded-full flex items-center justify-center animate-pulse">
                      <span className="text-white text-xl">🍳</span>
                    </div>
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">{activeOrders.length}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-orange-800">Your Food is Being Prepared! 🔥</h3>
                    <p className="text-orange-700">
                      {activeOrders.length} order{activeOrders.length > 1 ? 's' : ''} currently being prepared
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  {nextOrderReady && (
                    <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-orange-200">
                      <p className="text-sm text-orange-600 font-medium mb-1">Next Order Ready In:</p>
                      <div className="text-2xl font-bold text-orange-700">
                        {getOrderRemainingTime(nextOrderReady.id)}s
                      </div>
                      <p className="text-xs text-orange-600 mt-1">Order #{nextOrderReady.id}</p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Active Orders List */}
              <div className="mt-4 flex space-x-3 overflow-x-auto">
                {activeOrders.map((order, index) => {
                  const remaining = getOrderRemainingTime(order.id);
                  return (
                    <div key={order.id} className="flex-shrink-0 bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-orange-200 min-w-[200px]">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-orange-800">Order #{order.id}</span>
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse mr-1"></div>
                          <span className="text-xs text-orange-600">{remaining}s</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        {order.items?.slice(0, 2).map((item, i) => (
                          <p key={i} className="text-xs text-gray-700">{item.name} x{item.quantity}</p>
                        ))}
                        {order.items?.length > 2 && (
                          <p className="text-xs text-gray-500">+{order.items.length - 2} more items</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* 🎯 NEW: Order Ready Alert */}
        {orderReadyNotification && (
          <div className="mb-6 animate-bounce">
            <div className="bg-gradient-to-r from-green-100 via-emerald-50 to-teal-100 border-2 border-green-300 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-2xl animate-bounce">🎉</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-green-800 mb-1">Order Ready for Pickup! 🍽️</h3>
                  <p className="text-green-700">{orderReadyNotification.message}</p>
                </div>
                <button 
                  onClick={() => navigate('/order-history')}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl font-medium transition-colors duration-200"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Top Bar with enhanced styling */}
        <div className="flex justify-between items-center mb-8 animate-fade-in">
          <div className="animate-slide-down">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2" style={{ fontFamily: 'Pacifico, cursive' }}>
              Good Morning, {userName} 👋
            </h2>
            <p className="text-gray-600 text-lg">You can manage your orders easily</p>
          </div>
          <div className="flex items-center space-x-6 animate-slide-down">
            <div className="text-right bg-white/80 backdrop-blur-sm border border-green-200 px-6 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative">
              <p className="text-sm text-gray-600 font-medium">Daily Allowance</p>
              <p className="text-2xl font-bold text-green-600">₦{totalAllowance}</p>
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-emerald-400/10 rounded-2xl"></div>
            </div>
            <div className="text-right bg-white/80 backdrop-blur-sm border border-red-200 px-6 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative">
              <p className="text-sm text-gray-600 font-medium">Remaining Balance</p>
              <p className="text-2xl font-bold text-red-500">₦{remainingAllowance}</p>
              <div className="absolute inset-0 bg-gradient-to-r from-red-400/10 to-pink-400/10 rounded-2xl"></div>
            </div>
          </div>
        </div>

        {/* Enhanced Key Metrics Cards with staggered animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="group bg-gradient-to-br from-purple-500 to-purple-700 text-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 animate-slide-up cursor-pointer relative overflow-hidden">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-4xl font-bold mb-2 animate-number-bounce">{ordersToday}</p>
                <p className="text-sm opacity-90 font-medium">Orders Today</p>
              </div>
              <div className="text-5xl group-hover:scale-110 transition-transform duration-300">🛒</div>
            </div>
            <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-white/10 rounded-full"></div>
          </div>

          {/* 🎯 NEW: Active Orders Metric */}
          <div className="group bg-gradient-to-br from-orange-400 to-red-500 text-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 animate-slide-up cursor-pointer relative overflow-hidden" style={{ animationDelay: '0.1s' }}>
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-4xl font-bold mb-2 animate-number-bounce">{activeOrders.length}</p>
                <p className="text-sm opacity-90 font-medium">Preparing Now</p>
              </div>
              <div className="text-5xl group-hover:scale-110 transition-transform duration-300">🍳</div>
            </div>
            {activeOrders.length > 0 && (
              <div className="absolute top-2 right-2 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
            )}
            <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-white/10 rounded-full"></div>
          </div>

          <div className="group bg-gradient-to-br from-pink-500 to-rose-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 animate-slide-up cursor-pointer relative overflow-hidden" style={{ animationDelay: '0.2s' }}>
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-4xl font-bold mb-2 animate-number-bounce">{totalOrders}</p>
                <p className="text-sm opacity-90 font-medium">Total Orders</p>
              </div>
              <div className="text-5xl group-hover:scale-110 transition-transform duration-300">📊</div>
            </div>
            <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-white/10 rounded-full"></div>
          </div>

          <div className="group bg-gradient-to-br from-blue-500 to-cyan-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 animate-slide-up cursor-pointer relative overflow-hidden" style={{ animationDelay: '0.3s' }}>
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-4xl font-bold mb-2 animate-number-bounce">₦{totalSales}</p>
                <p className="text-sm opacity-90 font-medium">Total Sales</p>
              </div>
              <div className="text-5xl group-hover:scale-110 transition-transform duration-300">💵</div>
            </div>
            <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-white/10 rounded-full"></div>
          </div>
        </div>

        {/* Enhanced Order Status & Profile Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Order Status Card with beautiful progress bars */}
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 animate-fade-in-up">
            <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
              📈 Order Status
            </h3>
            {totalTrackedOrders === 0 ? (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4 animate-bounce">📋</div>
                  <p className="text-gray-500 text-lg">No orders to show status for yet.</p>
                </div>
            ) : (
            <div className="space-y-6">
              {/* Placed Status */}
              <div className="group">
                <div className="flex justify-between items-center text-sm mb-2">
                  <div className="flex items-center">
                    <span className="w-3 h-3 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
                    <p className="text-gray-700 font-medium">Placed</p>
                  </div>
                  <p className="font-bold text-gray-800 text-lg">{placedPercentage.toFixed(0)}%</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-blue-400 to-blue-600 h-3 rounded-full transition-all duration-1000 ease-out animate-progress-fill shadow-lg" 
                    style={{ width: `${placedPercentage}%` }}
                  ></div>
                </div>
              </div>

              {/* Preparing Status */}
              <div className="group">
                <div className="flex justify-between items-center text-sm mb-2">
                  <div className="flex items-center">
                    <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2 animate-pulse"></span>
                    <p className="text-gray-700 font-medium">Preparing</p>
                  </div>
                  <p className="font-bold text-gray-800 text-lg">{preparingPercentage.toFixed(0)}%</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-3 rounded-full transition-all duration-1000 ease-out animate-progress-fill shadow-lg" 
                    style={{ width: `${preparingPercentage}%`, animationDelay: '0.2s' }}
                  ></div>
                </div>
              </div>

              {/* Ready for Pickup Status */}
              <div className="group">
                <div className="flex justify-between items-center text-sm mb-2">
                  <div className="flex items-center">
                    <span className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                    <p className="text-gray-700 font-medium">Ready for Pickup</p>
                  </div>
                  <p className="font-bold text-gray-800 text-lg">{readyForPickupPercentage.toFixed(0)}%</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-1000 ease-out animate-progress-fill shadow-lg" 
                    style={{ width: `${readyForPickupPercentage}%`, animationDelay: '0.4s' }}
                  ></div>
                </div>
              </div>

              {/* Completed Status */}
              <div className="group">
                <div className="flex justify-between items-center text-sm mb-2">
                  <div className="flex items-center">
                    <span className="w-3 h-3 bg-gray-600 rounded-full mr-2 animate-pulse"></span>
                    <p className="text-gray-700 font-medium">Completed</p>
                  </div>
                  <p className="font-bold text-gray-800 text-lg">{completedPercentage.toFixed(0)}%</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-gray-600 to-gray-800 h-3 rounded-full transition-all duration-1000 ease-out animate-progress-fill shadow-lg" 
                    style={{ width: `${completedPercentage}%`, animationDelay: '0.6s' }}
                  ></div>
                </div>
              </div>
            </div>
            )}
          </div>

          {/* Enhanced Profile Card */}
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 animate-fade-in-up">
            <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
              👤 Profile
            </h3>
            <div className="flex items-center space-x-6">
              <div className="relative group">
                <img
                  src="/images.jpeg"
                  alt="Profile"
                  className="w-20 h-20 rounded-full shadow-lg border-4 border-white group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400/20 to-pink-400/20 group-hover:animate-pulse"></div>
              </div>
              <div>
                <p className="font-bold text-2xl text-gray-800 mb-1">{userName}</p>
                <p className="text-gray-600 text-lg font-medium">Employee</p>
                <div className="flex items-center mt-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                  <span className="text-green-600 text-sm font-medium">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Today's Menu */}
        <div className="animate-fade-in-up">
          <h3 className="text-3xl font-bold mb-8 text-gray-800 flex items-center">
            🍽️ Today's Menu
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <MealCard name="Jollof Rice" price={500} status="available" imageSrc="/jollof.jpeg" onClick={() => navigate('/menu')} />
            <MealCard name="Amala & Ewedu" price={400} status="available" imageSrc="/amala.jpeg" onClick={() => navigate('/menu')} />
            <MealCard name="Porridge" price={300} status="available" imageSrc="/porridge.jpeg" onClick={() => navigate('/menu')} />
          </div>
          <button
            onClick={() => navigate('/menu')}
            className="mt-8 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 font-semibold text-lg flex items-center space-x-2 group"
          >
            <span>See More</span>
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slide-down {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes slide-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes fade-in-up {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes number-bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-5px); }
          60% { transform: translateY(-3px); }
        }
        
        @keyframes progress-fill {
          from { width: 0%; }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        
        .animate-slide-down {
          animation: slide-down 0.8s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
        
        .animate-number-bounce {
          animation: number-bounce 1s ease-in-out;
        }
        
        .animate-progress-fill {
          animation: progress-fill 1.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

function MealCard({ name, price, status, imageSrc, onClick }) {
  return (
    <div
      className="group bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 text-center cursor-pointer relative overflow-hidden"
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-pink-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="relative z-10">
        {imageSrc ? (
          <div className="relative mb-6">
            <img
              src={imageSrc}
              alt={name}
              className="h-44 w-44 object-cover rounded-xl mx-auto shadow-md group-hover:shadow-lg transition-shadow duration-300"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 rounded-xl transition-colors duration-300"></div>
          </div>
        ) : (
          <div className="h-44 w-44 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl mx-auto mb-6 flex items-center justify-center text-gray-400 text-4xl shadow-inner">
            📷
          </div>
        )}

        <h4 className="font-bold text-xl text-gray-800 mb-2 group-hover:text-purple-700 transition-colors duration-300">{name}</h4>
        <p className="text-gray-600 text-lg font-semibold mb-3">₦{price}</p>

        {status && (
          <div className="flex items-center justify-center">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
              status === 'available' 
                ? 'bg-green-100 text-green-700 border border-green-200' 
                : 'bg-red-100 text-red-700 border border-red-200'
            }`}>
              <span className={`w-2 h-2 rounded-full mr-2 ${
                status === 'available' ? 'bg-green-500 animate-pulse' : 'bg-red-500'
              }`}></span>
              {status}
            </span>
          </div>
        )}
      </div>
      
      <div className="absolute -bottom-16 -right-16 w-24 h-24 bg-gradient-to-r from-purple-200/20 to-pink-200/20 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
    </div>
  );
}