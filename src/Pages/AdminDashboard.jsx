import React, { useState, useMemo } from 'react';

// 🎯 Since we cannot access your specific file path, we'll create a simple,
// self-contained Sidebar component for this example. You should replace
// this with your actual Sidebar component.
function Sidebar() {
  const handleLinkClick = () => {
    // This function will handle view changes in a real application
    // using a router or state management.
    console.log("Navigation button clicked.");
  };

  return (
    <div className="w-64 bg-slate-900 text-white p-6 shadow-xl flex flex-col items-center">
      <div className="mb-8">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          Admin Panel
        </h1>
      </div>
      <nav className="flex flex-col space-y-4 w-full">
        <button onClick={handleLinkClick} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-800 transition-colors duration-200" role="link">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-10v10a1 1 0 01-1 1h-3m-6 0h6"></path></svg>
          <span className="font-medium">Dashboard</span>
        </button>
        <button onClick={handleLinkClick} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-800 transition-colors duration-200" role="link">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
          <span className="font-medium">Orders</span>
        </button>
        <button onClick={handleLinkClick} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-800 transition-colors duration-200" role="link">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h2a2 2 0 002-2V7a2 2 0 00-2-2h-2m-2 3h-2m-3 0h-2m-3 0H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2v-2"></path></svg>
          <span className="font-medium">Users</span>
        </button>
      </nav>
    </div>
  );
}

// 🎯 Mock data for an admin dashboard. In a real application, you would fetch
// this data from a database or API. This mimics the data an admin would need.
const mockAdminData = {
  // Mock data for all users and all orders
  allUsers: [
    { id: 'user1', name: 'John Doe', status: 'Active', lastLogin: new Date(Date.now() - 3600000) },
    { id: 'user2', name: 'Jane Smith', status: 'Active', lastLogin: new Date(Date.now() - 7200000) },
    { id: 'user3', name: 'Sam Wilson', status: 'Inactive', lastLogin: new Date(Date.now() - 86400000) },
  ],
  allOrders: [
    { id: 'ORD-101', customerName: 'John Doe', total: 1250, status: 'Placed', items: [{ name: 'Jollof Rice', quantity: 1 }], timestamp: new Date(Date.now() - 120000) },
    { id: 'ORD-102', customerName: 'Jane Smith', total: 800, status: 'Preparing', items: [{ name: 'Amala & Ewedu', quantity: 2 }], timestamp: new Date(Date.now() - 360000) },
    { id: 'ORD-103', customerName: 'Sam Wilson', total: 500, status: 'Ready for Pickup', items: [{ name: 'Porridge', quantity: 1 }], timestamp: new Date(Date.now() - 720000) },
    { id: 'ORD-104', customerName: 'John Doe', total: 950, status: 'Completed', items: [{ name: 'Amala & Ewedu', quantity: 1 }], timestamp: new Date(Date.now() - 1000000) },
    { id: 'ORD-105', customerName: 'Jane Smith', total: 2000, status: 'Placed', items: [{ name: 'Jollof Rice', quantity: 2 }, { name: 'Amala & Ewedu', quantity: 1 }], timestamp: new Date(Date.now() - 60000) },
    { id: 'ORD-106', customerName: 'Sam Wilson', total: 600, status: 'Placed', items: [{ name: 'Porridge', quantity: 2 }], timestamp: new Date(Date.now() - 30000) },
    { id: 'ORD-107', customerName: 'John Doe', total: 1000, status: 'Placed', items: [{ name: 'Jollof Rice', quantity: 1 }, { name: 'Amala & Ewedu', quantity: 1 }], timestamp: new Date(Date.now() - 10000) },
  ],
};

// AdminDashboard component
export default function AdminDashboard() {
  const [orders, setOrders] = useState(mockAdminData.allOrders);
  const [users] = useState(mockAdminData.allUsers);

  // Helper function to update order status
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prevOrders => prevOrders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  // Helper function to check if a timestamp is from today
  const isToday = (someDate) => {
    const today = new Date();
    const date = new Date(someDate);
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  // Memoized calculations to prevent re-renders
  const memoizedStats = useMemo(() => {
    const ordersToday = orders.filter(order => isToday(order.timestamp)).length;
    const totalOrders = orders.length;
    const totalSales = orders.reduce((sum, order) => sum + order.total, 0);

    const placedOrders = orders.filter(order => order.status === 'Placed').length;
    const preparingOrders = orders.filter(order => order.status === 'Preparing').length;
    const readyForPickupOrders = orders.filter(order => order.status === 'Ready for Pickup').length;
    const completedOrders = orders.filter(order => order.status === 'Completed').length;
    const totalTrackedOrders = orders.length;

    const placedPercentage = totalTrackedOrders > 0 ? (placedOrders / totalTrackedOrders) * 100 : 0;
    const preparingPercentage = totalTrackedOrders > 0 ? (preparingOrders / totalTrackedOrders) * 100 : 0;
    const readyForPickupPercentage = totalTrackedOrders > 0 ? (readyForPickupOrders / totalTrackedOrders) * 100 : 0;
    const completedPercentage = totalTrackedOrders > 0 ? (completedOrders / totalTrackedOrders) * 100 : 0;

    const activeUsers = users.filter(user => user.status === 'Active').length;

    return {
      ordersToday,
      totalOrders,
      totalSales,
      placedPercentage,
      preparingPercentage,
      readyForPickupPercentage,
      completedPercentage,
      activeUsers,
      placedOrders,
      preparingOrders,
      readyForPickupOrders,
      completedOrders
    };
  }, [orders, users]);

  const {
    ordersToday,
    totalOrders,
    totalSales,
    placedPercentage,
    preparingPercentage,
    readyForPickupPercentage,
    completedPercentage,
    activeUsers,
    placedOrders,
    preparingOrders,
    readyForPickupOrders,
    completedOrders
  } = memoizedStats;

  const newOrders = orders.filter(order => order.status === 'Placed');

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 font-sans">
      <Sidebar />

      <div className="flex-1 p-6 overflow-y-auto">
        {/* Top Bar with enhanced styling */}
        <div className="flex justify-between items-center mb-8 animate-fade-in">
          <div className="animate-slide-down">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2" style={{ fontFamily: 'Pacifico, cursive' }}>
              Welcome, Admin 👋
            </h2>
            <p className="text-gray-600 text-lg">Dashboard Overview & Order Management</p>
          </div>
          <div className="flex items-center space-x-6 animate-slide-down">
            <div className="text-right bg-white/80 backdrop-blur-sm border border-green-200 px-6 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative">
              <p className="text-sm text-gray-600 font-medium">Total Revenue</p>
              <p className="text-2xl font-bold text-green-600">₦{totalSales}</p>
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-emerald-400/10 rounded-2xl"></div>
            </div>
            <div className="text-right bg-white/80 backdrop-blur-sm border border-red-200 px-6 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative">
              <p className="text-sm text-gray-600 font-medium">Active Users</p>
              <p className="text-2xl font-bold text-red-500">{activeUsers}</p>
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

          <div className="group bg-gradient-to-br from-orange-400 to-red-500 text-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 animate-slide-up cursor-pointer relative overflow-hidden" style={{ animationDelay: '0.1s' }}>
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-4xl font-bold mb-2 animate-number-bounce">{preparingOrders}</p>
                <p className="text-sm opacity-90 font-medium">Preparing Now</p>
              </div>
              <div className="text-5xl group-hover:scale-110 transition-transform duration-300">🍳</div>
            </div>
            {preparingOrders > 0 && (
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

        {/* Enhanced Order Status & User/Order Management Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Order Status Card with beautiful progress bars */}
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 animate-fade-in-up">
            <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
              📈 Order Status
            </h3>
            {totalOrders === 0 ? (
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
                    <p className="text-gray-700 font-medium">Placed ({placedOrders})</p>
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
                    <p className="text-gray-700 font-medium">Preparing ({preparingOrders})</p>
                  </div>
                  <p className="font-bold text-gray-800 text-lg">{preparingPercentage.toFixed(0)}%</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-3 rounded-full transition-all duration-1000 ease-out animate-progress-fill shadow-lg"
                    style={{ width: `${preparingPercentage}%` }}
                  ></div>
                </div>
              </div>

              {/* Ready for Pickup Status */}
              <div className="group">
                <div className="flex justify-between items-center text-sm mb-2">
                  <div className="flex items-center">
                    <span className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                    <p className="text-gray-700 font-medium">Ready for Pickup ({readyForPickupOrders})</p>
                  </div>
                  <p className="font-bold text-gray-800 text-lg">{readyForPickupPercentage.toFixed(0)}%</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-1000 ease-out animate-progress-fill shadow-lg"
                    style={{ width: `${readyForPickupPercentage}%` }}
                  ></div>
                </div>
              </div>

              {/* Completed Status */}
              <div className="group">
                <div className="flex justify-between items-center text-sm mb-2">
                  <div className="flex items-center">
                    <span className="w-3 h-3 bg-gray-600 rounded-full mr-2 animate-pulse"></span>
                    <p className="text-gray-700 font-medium">Completed ({completedOrders})</p>
                  </div>
                  <p className="font-bold text-gray-800 text-lg">{completedPercentage.toFixed(0)}%</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-gray-600 to-gray-800 h-3 rounded-full transition-all duration-1000 ease-out animate-progress-fill shadow-lg"
                    style={{ width: `${completedPercentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
            )}
          </div>

          {/* New Orders Card */}
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 animate-fade-in-up">
            <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
              📥 New Orders
            </h3>
            {newOrders.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">✅</div>
                <p className="text-gray-500 text-lg">All new orders have been processed!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {newOrders.map((order) => (
                  <div key={order.id} className="bg-blue-50 p-4 rounded-xl shadow-inner border border-blue-200">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold text-lg text-blue-800">Order #{order.id}</h4>
                      <span className="text-sm text-gray-500">{new Date(order.timestamp).toLocaleTimeString()}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Customer: <span className="font-medium text-blue-900">{order.customerName}</span></p>
                    <div className="flex items-center space-x-2 flex-wrap">
                      {order.items.map((item, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                          {item.name} x{item.quantity}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 flex space-x-2 justify-end">
                      <button
                        onClick={() => updateOrderStatus(order.id, 'Preparing')}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded-full font-medium transition-colors duration-200"
                      >
                        Start Prep
                      </button>
                      <button
                        onClick={() => updateOrderStatus(order.id, 'Ready for Pickup')}
                        className="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1 rounded-full font-medium transition-colors duration-200"
                      >
                        Mark Ready
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        /* These keyframes are for the animations, enhancing the UI experience.
          They are reused from the original component.
        */
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
