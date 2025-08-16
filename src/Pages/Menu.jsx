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
    completeOrderAndDeductBalance // We now need this function
  } = useAppContext();

  // State to hold the error message
  const [errorMessage, setErrorMessage] = useState('');

  // Menu items array (easily editable later)
  const [menuItems] = useState([
    { name: 'Jollof Rice', price: 500, status: 'available', image: '/jollof.jpeg' },
    { name: 'Amala & Ewedu', price: 400, status: 'unavailable', image: '/amala.jpeg' },
    { name: 'Grilled Fish', price: 300, status: 'available', image: '/fish (2).jpeg' },
    { name: 'Porridge', price: 400, status: 'available', image: '/porridge.jpeg' },
    {name: 'Rice and Beans', price: 600, status:'available',image:'/RRice and beans.jpeg'},
    {name: 'Spaghetti',price:500, status:'unavailable',image:'Spaghetti.jpeg'},
    {name:'Yam & Egg',price:400, status:'available',image:'Yam and Egg.jpeg'},
    
  ]);

  const [quantities, setQuantities] = useState({});

  // Load cart quantities on mount
  useEffect(() => {
    const saved = {};
    cart.forEach(item => {
      saved[item.name] = item.quantity;
    });
    setQuantities(saved);
  }, [cart]);

  // Add item to plate
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

  // Remove from plate
  const removeFromPlate = (itemName) => {
    setCart(cart.filter(item => item.name !== itemName));
  };

  // Calculate total
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Handle order
  const handleOrder = () => {
    // Check if cart is empty
    if (cart.length === 0) {
      setErrorMessage("Your plate is empty.");
      return;
    }
    // Check if serve option is selected
    if (!serveOption) {
      setErrorMessage("Please select how you want your meal served.");
      return;
    }
    // Check if the order total exceeds the remaining allowance
    if (total > remainingAllowance) {
      setErrorMessage("Your order total exceeds your remaining allowance.");
      return;
    }

    // If all checks pass, clear any previous error messages and complete the order
    setErrorMessage(''); 
    const orderCompleted = completeOrderAndDeductBalance(total);
    if (orderCompleted) {
      navigate('/OrderSummary', { state: { cart, serveOption, total } });
    }
  };

  return (
    <div className="flex min-h-screen bg-white text-gray-900">
      <Sidebar />

      <div className="flex-1 p-6 overflow-y-auto">
        {/* Top bar allowance cards */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">🍽 Today's Menu</h1>
          <div className="flex items-center space-x-6">
            <div className="text-right bg-white border px-4 py-2 rounded-xl shadow">
              <p className="text-sm text-gray-500">Today's Allowance</p>
              <p className="text-xl font-bold text-green-600">₦{totalAllowance}</p>
            </div>
            <div className="text-right bg-white border px-4 py-2 rounded-xl shadow">
              <p className="text-sm text-gray-500">Remaining Allowance</p>
              <p className="text-xl font-bold text-red-500">₦{remainingAllowance}</p>
              
            </div>
          </div>
        </div>

        {/* Available Meals */}
        <h2 className="text-2xl font-semibold mb-4">Available Meals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {menuItems.map(item => (
            <MealCard
              key={item.name}
              {...item}
              quantity={quantities[item.name] || 1}
              onQuantityChange={(qty) => setQuantities(prev => ({ ...prev, [item.name]: qty }))}
              onAdd={() => addToPlate(item)}
            />
          ))}
        </div>

        {/* My Plate */}
        <h2 className="text-2xl font-semibold mb-4">My Plate</h2>
        {cart.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {cart.map(item => (
              <div key={item.name} className="bg-white p-6 rounded-xl border shadow-sm text-center">
                <img src={item.image} alt={item.name} className="h-24 w-24 object-cover rounded-full mx-auto mb-4" />
                <p className="font-bold text-lg">{item.name}</p>
                <p>₦{item.price}</p>
                <p className="text-gray-500">Qty: {item.quantity}</p>
                <button
                  onClick={() => removeFromPlate(item.name)}
                  className="mt-4 bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded-lg shadow"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic mb-10">Your plate is empty.</p>
        )}

        {/* Total & Serve Option */}
        <p className="text-lg mb-4">
          Total = <span className="text-green-600 font-bold">₦{total}</span>
        </p>
        <div className="mb-6">
          <p className="mb-3">How would you like your meal served?</p>
          <label className="flex items-center mb-2">
            <input
              type="radio"
              name="serveOption"
              value="plate"
              onChange={(e) => setServeOption(e.target.value)}
              checked={serveOption === "plate"}
              className="mr-3"
            />
            Plate (Eat In Kitchen)
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="serveOption"
              value="takeout"
              onChange={(e) => setServeOption(e.target.value)}
              checked={serveOption === "takeout"}
              className="mr-3"
            />
            Take Out (Pickup)
          </label>
        </div>

        {/* Error Message Box */}
        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-6" role="alert">
            <span className="block sm:inline">{errorMessage}</span>
          </div>
        )}

        {/* Proceed Button */}
        <button
          onClick={handleOrder}
          className="w-full bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold text-lg shadow"
        >
          Proceed to Order
        </button>
      </div>
    </div>
  );
}

// MealCard (same design style as Dashboard)
function MealCard({ name, price, status, image, quantity, onQuantityChange, onAdd }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition transform hover:scale-[1.02] text-center">
      {image ? (
        <img src={image} alt={name} className="h-24 w-24 object-cover rounded-full mx-auto mb-4" />
      ) : (
        <div className="h-24 w-24 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center text-gray-400">
          📷
        </div>
      )}
      <p className="font-bold text-lg">{name}</p>
      <p className="text-gray-500">₦{price}</p>
      <p className={`mt-1 text-sm font-semibold ${status === 'available' ? 'text-green-500' : 'text-red-500'}`}>
        {status}
      </p>

      {/* Quantity controls */}
      <div className="flex justify-center items-center gap-3 mt-4">
        <button
          onClick={() => onQuantityChange(Math.max(quantity - 1, 1))}
          className="bg-gray-200 text-gray-800 px-3 py-1 rounded-lg hover:bg-gray-300"
        >
          -
        </button>
        <span className="font-semibold">{quantity}</span>
        <button
          onClick={() => onQuantityChange(quantity + 1)}
          className="bg-gray-200 text-gray-800 px-3 py-1 rounded-lg hover:bg-gray-300"
        >
          +
        </button>
      </div>

      {/* Add button */}
      <button
        disabled={status !== 'available'}
        onClick={onAdd}
        className={`mt-4 w-full px-4 py-2 rounded-lg font-semibold shadow-sm transition ${
          status === 'available'
            ? 'bg-pink-500 text-white hover:bg-pink-600'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        Add to Plate
      </button>
    </div>
  );
}
