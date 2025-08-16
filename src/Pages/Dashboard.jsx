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
    topUpHistory,
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
  const totalTopUps = topUpHistory.length;
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

  return (
    <div className="flex min-h-screen bg-white text-gray-900">
      <Sidebar />

      <div className="flex-1 p-6 overflow-y-auto">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold" style={{ fontFamily: 'Pacifico, cursive' }}>Good Morning, {userName} 👋</h2>
            <p className="text-sm text-gray-500">You can manage your orders easily</p>
          </div>
          <div className="flex items-center space-x-6">
            <div className="text-right bg-white border px-4 py-2 rounded-xl shadow">
              <p className="text-sm text-gray-500">Daily Allowance</p>
              <p className="text-xl font-bold text-green-600">₦{totalAllowance}</p>
            </div>
            <div className="text-right bg-white border px-4 py-2 rounded-xl shadow">
              <p className="text-sm text-gray-500">Remaining Balance</p>
              <p className="text-xl font-bold text-red-500">₦{remainingAllowance}</p>
              <button
                className="mt-1 bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-lg shadow"
                onClick={() => navigate('/Topup')}
              >
                Add Top-up
              </button>
            </div>
          </div>
        </div>

        {/* Key Metrics Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-purple-600 text-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold">{ordersToday}</p>
                <p className="text-sm opacity-80">Orders Today</p>
              </div>
              <span className="text-4xl">🛒</span>
            </div>
          </div>
          <div className="bg-yellow-500 text-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold">{totalTopUps}</p>
                <p className="text-sm opacity-80">Top-ups</p>
              </div>
              <span className="text-4xl">💰</span>
            </div>
          </div>
          <div className="bg-pink-500 text-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold">{totalOrders}</p>
                <p className="text-sm opacity-80">Total Orders</p>
              </div>
              <span className="text-4xl">📊</span>
            </div>
          </div>
          <div className="bg-blue-500 text-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold">₦{totalSales}</p>
                <p className="text-sm opacity-80">Total Sales</p>
              </div>
              <span className="text-4xl">💲</span>
            </div>
          </div>
        </div>

        {/* Order Status & Profile Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Order Status Card */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-4">Order Status</h3>
            {totalTrackedOrders === 0 ? (
                <p className="text-gray-500 text-center">No orders to show status for yet.</p>
            ) : (
            <div>
              {/* Placed Status */}
              <div className="mb-4">
                <div className="flex justify-between items-center text-sm mb-1">
                  <p className="text-gray-600">Placed</p>
                  <p className="font-semibold text-gray-800">{placedPercentage.toFixed(0)}%</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${placedPercentage}%` }}></div>
                </div>
              </div>
              {/* Preparing Status */}
              <div className="mb-4">
                <div className="flex justify-between items-center text-sm mb-1">
                  <p className="text-gray-600">Preparing</p>
                  <p className="font-semibold text-gray-800">{preparingPercentage.toFixed(0)}%</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: `${preparingPercentage}%` }}></div>
                </div>
              </div>
              {/* Ready for Pickup Status */}
              <div className="mb-4">
                <div className="flex justify-between items-center text-sm mb-1">
                  <p className="text-gray-600">Ready for Pickup</p>
                  <p className="font-semibold text-gray-800">{readyForPickupPercentage.toFixed(0)}%</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${readyForPickupPercentage}%` }}></div>
                </div>
              </div>
              {/* Completed Status */}
              <div>
                <div className="flex justify-between items-center text-sm mb-1">
                  <p className="text-gray-600">Completed</p>
                  <p className="font-semibold text-gray-800">{completedPercentage.toFixed(0)}%</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-gray-800 h-2.5 rounded-full" style={{ width: `${completedPercentage}%` }}></div>
                </div>
              </div>
            </div>
            )}
          </div>

          {/* Profile Card */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-4">Profile</h3>
            <div className="flex items-center space-x-4">
              <img
                src="https://via.placeholder.com/60"
                alt="Profile"
                className="w-16 h-16 rounded-full"
              />
              <div>
                <p className="font-bold text-lg">{userName}</p>
                <p className="text-gray-500">Employee</p>
              </div>
            </div>
          </div>
        </div>

        {/* Today's Menu */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">Today's Menu</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <MealCard name="Jollof Rice" price={500} status="available" imageSrc="/jollof.jpeg" onClick={() => navigate('/menu')} />
            <MealCard name="Amala & Ewedu" price={800} status="available" imageSrc="/amala.jpeg" onClick={() => navigate('/menu')} />
            <MealCard name="Porridge" price={1000} status="available" imageSrc="/porridge.jpeg" onClick={() => navigate('/menu')} />
          </div>
          <button
            onClick={() => navigate('/menu')}
            className="mt-4 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg shadow"
          >
            See More
          </button>
        </div>
      </div>
    </div>
  );
}

function MealCard({ name, price, status, imageSrc, onClick }) {
  return (
    <div
      className="bg-white p-6 rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition transform hover:scale-[1.02] text-center cursor-pointer"
      onClick={onClick}
    >
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={name}
          className="h-40 w-40 object-cover rounded-lg mx-auto mb-4"
        />
      ) : (
        <div className="h-40 w-40 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center text-gray-400">
          📷
        </div>
      )}

      <p className="font-bold text-lg">{name}</p>
      <p className="text-gray-500">₦{price}</p>

      {status && (
        <p
          className={`mt-1 text-sm font-semibold ${status === 'available' ? 'text-green-500' : 'text-red-500'}`}
        >
          {status}
        </p>
      )}
    </div>
  );
}
