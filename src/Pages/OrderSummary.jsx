import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useAppContext } from '../AppContext';

export default function OrderSummary() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { cart, setCart, userEmail } = useAppContext();
  const { serveOption, total } = state || {};

  const handlePlaceOrder = () => {
    setCart([]);
    navigate('/ordersuccess', {
      state: {
        items: cart,
        serveOption: serveOption,
        total: total,
        userEmail: userEmail,
      },
    });
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Sidebar />
      
      <div className="flex-1 p-8 overflow-y-auto">
        {/* Back button with enhanced styling */}
        <button
          onClick={() => navigate(-1)}
          className="mb-10 flex items-center gap-3 text-gray-600 hover:text-purple-600 transition-all duration-300 transform hover:-translate-x-2 hover:scale-105 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl animate-fade-in group"
        >
          <span className="text-2xl group-hover:animate-bounce">←</span> 
          <span className="font-semibold">Back to Menu</span>
        </button>

        {/* Enhanced Page Title */}
        <div className="text-center mb-12 animate-slide-down">
          <div className="inline-block">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent mb-4 flex items-center justify-center space-x-4">
              <span className="text-6xl animate-bounce">📝</span>
              <span>Order Summary</span>
            </h1>
            <p className="text-gray-600 text-lg font-medium">Review your delicious selection</p>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mt-4 animate-expand"></div>
        </div>

        {/* Order Status Bar */}
        <div className="flex items-center justify-center mb-12 animate-fade-in-up">
          <div className="flex items-center space-x-8 bg-white/80 backdrop-blur-sm px-8 py-4 rounded-2xl shadow-lg">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold animate-pulse">
                ✓
              </div>
              <span className="text-gray-700 font-medium">Items Selected</span>
            </div>
            <div className="w-12 h-1 bg-gradient-to-r from-green-400 to-purple-400 rounded-full animate-progress"></div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold animate-pulse">
                2
              </div>
              <span className="text-purple-600 font-semibold">Review Order</span>
            </div>
            <div className="w-12 h-1 bg-gray-200 rounded-full"></div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 text-sm font-bold">
                3
              </div>
              <span className="text-gray-400 font-medium">Order Placed</span>
            </div>
          </div>
        </div>

        {/* Enhanced Meal Cards */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center animate-slide-in-left">
            <span className="text-4xl mr-3">🍽️</span>
            Your Selected Items
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {cart?.map((item, idx) => (
              <div 
                key={idx} 
                className="animate-slide-in-up"
                style={{ animationDelay: `${idx * 0.15}s` }}
              >
                <MealCard
                  name={item.name}
                  price={item.price}
                  quantity={item.quantity}
                  imageSrc={item.image || item.imageSrc}
                  onClick={() => navigate('/menu')}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Order Details Container */}
        <div className="bg-white/90 backdrop-blur-sm p-10 rounded-3xl shadow-2xl border border-white/20 mb-12 relative overflow-hidden animate-fade-in-up">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-pink-50/50"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-200/20 to-indigo-200/20 rounded-full translate-y-12 -translate-x-12"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-8 text-gray-800 flex items-center">
              <span className="text-4xl mr-3">📋</span>
              Order Details
            </h2>
            
            {/* Order breakdown */}
            <div className="space-y-6 mb-8">
              {cart?.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={item.image || item.imageSrc} 
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-full border-2 border-white shadow-md"
                    />
                    <div>
                      <p className="font-semibold text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-500">₦{item.price} × {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-bold text-lg text-purple-600">₦{item.price * item.quantity}</p>
                </div>
              ))}
            </div>

            {/* Serve option */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl mb-6 border border-purple-100">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">
                    {serveOption === 'plate' ? '🍽️' : '🥡'}
                  </span>
                  <div>
                    <p className="font-semibold text-gray-800">Serving Option</p>
                    <p className="text-sm text-gray-600">
                      {serveOption === 'plate' ? 'Dine in the kitchen area' : 'Take out pickup'}
                    </p>
                  </div>
                </div>
                <span className="text-purple-600 font-bold text-lg capitalize">
                  {serveOption === 'plate' ? 'Dine In' : 'Take Out'}
                </span>
              </div>
            </div>

            {/* Total section */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-100">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">💰</span>
                  <div>
                    <p className="font-semibold text-gray-800">Total Amount</p>
                    <p className="text-sm text-gray-600">Including all items</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    ₦{total}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Place Order Button */}
        <div className="text-center animate-bounce-in">
          <button
            onClick={handlePlaceOrder}
            className="group relative bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 text-white px-12 py-5 rounded-3xl font-bold text-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 overflow-hidden"
          >
            {/* Button shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:animate-shine"></div>
            
            {/* Button content */}
            <div className="relative z-10 flex items-center justify-center space-x-4">
              <span className="text-3xl group-hover:animate-bounce">🚀</span>
              <span>Place Order</span>
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </div>
            
            {/* Button glow */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500"></div>
          </button>
          
          <p className="text-gray-500 text-sm mt-4 animate-fade-in">
            Click to confirm and place your order
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slide-down {
          from { transform: translateY(-30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes fade-in-up {
          from { transform: translateY(40px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes slide-in-left {
          from { transform: translateX(-30px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slide-in-up {
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes bounce-in {
          0% { transform: scale(0.8); opacity: 0; }
          60% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        
        @keyframes expand {
          from { width: 0; }
          to { width: 6rem; }
        }
        
        @keyframes progress {
          0% { background: linear-gradient(to right, #10b981, #10b981); }
          50% { background: linear-gradient(to right, #10b981, #8b5cf6); }
          100% { background: linear-gradient(to right, #10b981, #a855f7); }
        }
        
        @keyframes shine {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        
        .animate-slide-down {
          animation: slide-down 0.8s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
        
        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out;
        }
        
        .animate-slide-in-up {
          animation: slide-in-up 0.6s ease-out;
        }
        
        .animate-bounce-in {
          animation: bounce-in 1s ease-out;
        }
        
        .animate-expand {
          animation: expand 1s ease-out;
        }
        
        .animate-progress {
          animation: progress 2s ease-in-out infinite;
        }
        
        .animate-shine {
          animation: shine 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}

function MealCard({ name, price, quantity, imageSrc, onClick }) {
  return (
    <div
      className="group bg-white/90 backdrop-blur-sm p-6 rounded-2xl border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 text-center cursor-pointer relative overflow-hidden"
      onClick={onClick}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 to-pink-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Quantity badge */}
      <div className="absolute -top-2 -right-2 z-20">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center shadow-lg animate-pulse">
          {quantity}
        </div>
      </div>
      
      <div className="relative z-10">
        {/* Image */}
        <div className="relative mb-6">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={name}
              className="h-28 w-28 object-cover rounded-2xl mx-auto shadow-lg border-4 border-white group-hover:shadow-xl transition-all duration-300"
            />
          ) : (
            <div className="h-28 w-28 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl mx-auto shadow-inner flex items-center justify-center text-gray-400 text-4xl">
              📷
            </div>
          )}
        </div>

        {/* Content */}
        <h3 className="font-bold text-xl text-gray-800 mb-2 group-hover:text-purple-700 transition-colors duration-300">
          {name}
        </h3>
        <p className="text-gray-600 text-lg font-semibold mb-2">₦{price} each</p>
        
        {/* Quantity and subtotal */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-3 mt-4 border border-purple-100">
          <p className="text-sm text-gray-600 mb-1">Quantity: <span className="font-semibold text-purple-600">{quantity}</span></p>
          <p className="font-bold text-lg text-gray-800">
            Subtotal: <span className="text-green-600">₦{price * quantity}</span>
          </p>
        </div>
      </div>
      
      {/* Decorative element */}
      <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-gradient-to-r from-purple-200/20 to-pink-200/20 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
    </div>
  );
}