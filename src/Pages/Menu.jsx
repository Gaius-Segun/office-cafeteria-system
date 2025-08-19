import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useAppContext } from '../AppContext';

export default function Menu() {
  const navigate = useNavigate();
  const { 
    cart, 
    setCart, 
    serveOption, 
    setServeOption, 
    totalAllowance, 
    remainingAllowance,
    completeOrderAndDeductBalance
  } = useAppContext();

  const [errorMessage, setErrorMessage] = useState('');

  const [menuItems] = useState([
    { name: 'Jollof Rice', price: 500, status: 'available', image: '/jollof.jpeg' },
    { name: 'Amala & Ewedu', price: 400, status: 'unavailable', image: '/amala.jpeg' },
    { name: 'Grilled Fish', price: 300, status: 'available', image: '/fish (2).jpeg' },
    { name: 'Porridge', price: 400, status: 'available', image: '/porridge.jpeg' },
    { name: 'Rice and Beans', price: 600, status: 'available', image: '/RRice and beans.jpeg' },
    { name: 'Spaghetti', price: 500, status: 'unavailable', image: 'Spaghetti.jpeg' },
    { name: 'Yam & Egg', price: 600, status: 'available', image: 'Yam and Egg.jpeg' },
    {name: 'Beef',price: 400,status:'available', image:'/Meatt.jpeg'},
  ]);

  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const saved = {};
    cart.forEach(item => {
      saved[item.name] = item.quantity;
    });
    setQuantities(saved);
  }, [cart]);

  const addToPlate = (item) => {
    const qty = quantities[item.name] || 1;
    const existing = cart.find(c => c.name === item.name);

    if (existing) {
      setCart(cart.map(c =>
        c.name === item.name ? { ...c, quantity: c.quantity + qty } : c
      ));
    } else {
      setCart([...cart, { ...item, quantity: qty }]);
    }
  };

  const removeFromPlate = (itemName) => {
    setCart(cart.filter(item => item.name !== itemName));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleOrder = () => {
    if (cart.length === 0) {
      setErrorMessage("Your plate is empty.");
      return;
    }
    if (!serveOption) {
      setErrorMessage("Please select how you want your meal served.");
      return;
    }
    if (total > remainingAllowance) {
      setErrorMessage("Your order total exceeds your remaining allowance.");
      return;
    }

    setErrorMessage(''); 
    const orderCompleted = completeOrderAndDeductBalance(total);
    if (orderCompleted) {
      navigate('/OrderSummary', { state: { cart, serveOption, total } });
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
      <Sidebar />

      <div className="flex-1 p-8 overflow-y-auto">
        {/* Enhanced Top Bar */}
        <div className="flex justify-between items-center mb-10 animate-fade-in">
          <div className="animate-slide-down">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent flex items-center space-x-3">
              <span className="text-5xl animate-bounce">🍽</span>
              <span>Today's Menu</span>
            </h1>
            <p className="text-gray-600 text-lg mt-2">Discover delicious meals crafted just for you</p>
          </div>
          <div className="flex items-center space-x-6 animate-slide-down">
            <div className="text-right bg-white/80 backdrop-blur-sm border border-green-200 px-6 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-emerald-400/10"></div>
              <div className="relative z-10">
                <p className="text-sm text-gray-600 font-medium">Today's Allowance</p>
                <p className="text-2xl font-bold text-green-600">₦{totalAllowance}</p>
              </div>
            </div>
            <div className="text-right bg-white/80 backdrop-blur-sm border border-red-200 px-6 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-red-400/10 to-pink-400/10"></div>
              <div className="relative z-10">
                <p className="text-sm text-gray-600 font-medium">Remaining Allowance</p>
                <p className="text-2xl font-bold text-red-500">₦{remainingAllowance}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Available Meals Section */}
        <div className="mb-12 animate-fade-in-up">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-800 flex items-center">
              <span className="text-4xl mr-3">🥘</span>
              Available Meals
            </h2>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
              <span>Fresh & Ready</span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {menuItems.map((item, index) => (
              <div key={item.name} style={{ animationDelay: `${index * 0.1}s` }}>
                <MealCard
                  {...item}
                  quantity={quantities[item.name] || 1}
                  onQuantityChange={(qty) => setQuantities(prev => ({ ...prev, [item.name]: qty }))}
                  onAdd={() => addToPlate(item)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* My Plate Section */}
        <div className="mb-10 animate-fade-in-up">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-800 flex items-center">
              <span className="text-4xl mr-3">🍽️</span>
              My Plate
            </h2>
            {cart.length > 0 && (
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold animate-pulse">
                {cart.length} item{cart.length !== 1 ? 's' : ''}
              </div>
            )}
          </div>
          
          {cart.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cart.map((item, index) => (
                <div 
                  key={item.name} 
                  className="group bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-slide-in-plate relative overflow-hidden"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-pink-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative z-10 text-center">
                    <div className="relative mb-4">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="h-20 w-20 object-cover rounded-full mx-auto shadow-lg border-4 border-white group-hover:scale-110 transition-transform duration-300" 
                      />
                      <div className="absolute -top-1 -right-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-bounce">
                        {item.quantity}
                      </div>
                    </div>
                    
                    <h3 className="font-bold text-lg text-gray-800 mb-2">{item.name}</h3>
                    <p className="text-gray-600 font-semibold mb-1">₦{item.price} each</p>
                    <p className="text-sm text-purple-600 font-medium mb-4">
                      Subtotal: ₦{item.price * item.quantity}
                    </p>
                    
                    <button
                      onClick={() => removeFromPlate(item.name)}
                      className="bg-gradient-to-r from-red-400 to-red-600 text-white hover:from-red-500 hover:to-red-700 px-6 py-2 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 font-medium group-hover:animate-pulse"
                    >
                      Remove from Plate
                    </button>
                  </div>
                  
                  <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-gradient-to-r from-red-200/20 to-pink-200/20 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 animate-fade-in">
              <div className="text-8xl mb-6 animate-float">🍽️</div>
              <p className="text-gray-500 text-xl font-medium">Your plate is empty</p>
              <p className="text-gray-400 text-sm mt-2">Start adding delicious meals from above!</p>
            </div>
          )}
        </div>

        {/* Order Summary Section */}
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20 mb-8 animate-fade-in-up">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-800 flex items-center">
              <span className="text-3xl mr-3">💰</span>
              Order Summary
            </h3>
            <div className="text-right">
              <p className="text-sm text-gray-600">Total Amount</p>
              <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                ₦{total}
              </p>
            </div>
          </div>

          {/* Serve Option Selection */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <span className="text-2xl mr-2">🚀</span>
              How would you like your meal served?
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className={`group relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                serveOption === "plate" 
                  ? 'border-purple-500 bg-gradient-to-r from-purple-50 to-pink-50 shadow-lg' 
                  : 'border-gray-200 bg-white/50 hover:border-purple-300 hover:shadow-md'
              }`}>
                <input
                  type="radio"
                  name="serveOption"
                  value="plate"
                  onChange={(e) => setServeOption(e.target.value)}
                  checked={serveOption === "plate"}
                  className="sr-only"
                />
                <div className="flex items-center space-x-4">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-200 ${
                    serveOption === "plate" ? 'border-purple-500 bg-purple-500' : 'border-gray-300'
                  }`}>
                    {serveOption === "plate" && (
                      <div className="w-2 h-2 bg-white rounded-full animate-scale-in"></div>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-lg">🍽️ Dine In</p>
                    <p className="text-gray-600 text-sm">Eat in the kitchen area</p>
                  </div>
                </div>
              </label>

              <label className={`group relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                serveOption === "takeout" 
                  ? 'border-purple-500 bg-gradient-to-r from-purple-50 to-pink-50 shadow-lg' 
                  : 'border-gray-200 bg-white/50 hover:border-purple-300 hover:shadow-md'
              }`}>
                <input
                  type="radio"
                  name="serveOption"
                  value="takeout"
                  onChange={(e) => setServeOption(e.target.value)}
                  checked={serveOption === "takeout"}
                  className="sr-only"
                />
                <div className="flex items-center space-x-4">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-200 ${
                    serveOption === "takeout" ? 'border-purple-500 bg-purple-500' : 'border-gray-300'
                  }`}>
                    {serveOption === "takeout" && (
                      <div className="w-2 h-2 bg-white rounded-full animate-scale-in"></div>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-lg">🥡 Take Out</p>
                    <p className="text-gray-600 text-sm">Pick up your order</p>
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 text-red-700 px-6 py-4 rounded-2xl relative mb-6 animate-shake" role="alert">
              <div className="flex items-center">
                <span className="text-2xl mr-3">⚠️</span>
                <div>
                  <p className="font-semibold">Oops!</p>
                  <p>{errorMessage}</p>
                </div>
              </div>
            </div>
          )}

          {/* Proceed Button */}
          <button
            onClick={handleOrder}
            className="group w-full bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 text-white px-8 py-4 rounded-2xl font-bold text-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center space-x-3 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></div>
            <span className="relative z-10">🚀</span>
            <span className="relative z-10">Proceed to Order</span>
            <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">→</span>
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
        
        @keyframes fade-in-up {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes slide-in-plate {
          from { transform: translateX(-30px) scale(0.8); opacity: 0; }
          to { transform: translateX(0) scale(1); opacity: 1; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes scale-in {
          from { transform: scale(0); }
          to { transform: scale(1); }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
          20%, 40%, 60%, 80% { transform: translateX(2px); }
        }
        
        @keyframes slide-up-stagger {
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
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
        
        .animate-slide-in-plate {
          animation: slide-in-plate 0.6s ease-out;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-scale-in {
          animation: scale-in 0.2s ease-out;
        }
        
        .animate-shake {
          animation: shake 0.5s ease-out;
        }
        
        .animate-slide-up-stagger {
          animation: slide-up-stagger 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}

function MealCard({ name, price, status, image, quantity, onQuantityChange, onAdd }) {
  return (
    <div className={`group bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 text-center relative overflow-hidden animate-slide-up-stagger ${
      status !== 'available' ? 'opacity-75' : ''
    }`}>
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-pink-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Status indicator */}
      <div className="absolute top-4 right-4 z-20">
        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
          status === 'available' 
            ? 'bg-green-100 text-green-700 border border-green-200' 
            : 'bg-red-100 text-red-700 border border-red-200'
        }`}>
          <span className={`w-2 h-2 rounded-full mr-1 ${
            status === 'available' ? 'bg-green-500 animate-pulse' : 'bg-red-500'
          }`}></span>
          {status}
        </div>
      </div>
      
      <div className="relative z-10">
        {/* Image */}
        <div className="relative mb-6">
          {image ? (
            <img
              src={image}
              alt={name}
              className="h-28 w-28 object-cover rounded-2xl mx-auto shadow-lg border-4 border-white group-hover:shadow-xl transition-all duration-300"
            />
          ) : (
            <div className="h-28 w-28 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl mx-auto shadow-inner flex items-center justify-center text-gray-400 text-3xl">
              📷
            </div>
          )}
          {status !== 'available' && (
            <div className="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center">
              <span className="text-white text-sm font-semibold bg-black/60 px-3 py-1 rounded-lg">
                Sold Out
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <h3 className="font-bold text-xl text-gray-800 mb-2 group-hover:text-purple-700 transition-colors duration-300">
          {name}
        </h3>
        <p className="text-gray-600 text-lg font-semibold mb-4">₦{price}</p>

        {/* Quantity controls */}
        <div className="flex justify-center items-center gap-4 mb-6">
          <button
            onClick={() => onQuantityChange(Math.max(quantity - 1, 1))}
            className="bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-800 w-10 h-10 rounded-xl font-bold transition-all duration-200 transform hover:scale-110 shadow-md"
            disabled={status !== 'available'}
          >
            -
          </button>
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-xl shadow-inner">
            <span className="font-bold text-lg text-purple-700">{quantity}</span>
          </div>
          <button
            onClick={() => onQuantityChange(quantity + 1)}
            className="bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-800 w-10 h-10 rounded-xl font-bold transition-all duration-200 transform hover:scale-110 shadow-md"
            disabled={status !== 'available'}
          >
            +
          </button>
        </div>

        {/* Add button */}
        <button
          disabled={status !== 'available'}
          onClick={onAdd}
          className={`w-full px-6 py-3 rounded-xl font-bold transition-all duration-300 transform shadow-lg ${
            status === 'available'
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white hover:scale-105 hover:shadow-xl'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {status === 'available' ? '🍽️ Add to Plate' : '❌ Unavailable'}
        </button>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-gradient-to-r from-purple-200/20 to-pink-200/20 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
    </div>
  );
}