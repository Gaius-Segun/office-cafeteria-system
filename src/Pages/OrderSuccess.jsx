import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import Sidebar from './Sidebar';
import { useAppContext } from '../AppContext';

export default function OrderSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  // Get the new function from context, which will handle adding the order to history
  const { userEmail, addOrderToHistory } = useAppContext();
  const [fadeIn, setFadeIn] = useState(false);
  const [latestOrder, setLatestOrder] = useState(null);
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
      
      // Set the state to display the order that was just placed
      setLatestOrder(newOrder);
      // Set the flag to true so the logic won't run again
      hasProcessedOrder.current = true;
    }
    
    // A small delay for the fade-in animation
    setTimeout(() => setFadeIn(true), 100);
  }, [userEmail, location.state, addOrderToHistory]); // Add addOrderToHistory to dependencies

  return (
    <div className="flex min-h-screen bg-white text-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col justify-center items-center p-6">

        {/* Success Card */}
        <div
          className={`bg-white border rounded-2xl p-10 flex flex-col items-center shadow-lg max-w-md w-full transform transition-all duration-700 ${
            fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <CheckCircle size={100} className="text-green-500 mb-4 animate-bounce" />
          <h2 className="text-3xl font-bold text-green-600 mb-4 text-center">
            Order Placed Successfully
          </h2>

          {latestOrder ? (
            <div className="text-gray-700 w-full">
              <p className="text-center mb-4">
                Your order of{' '}
                <span className="font-semibold">
                  {latestOrder.items.map(item => item.name).join(', ')}
                </span>{' '}
                is completed.
              </p>
              <div className="border-t border-gray-300 pt-4">
                {latestOrder.items.map((item, index) => (
                  <p key={index} className="text-sm">
                    {item.name} — ₦{item.price} × {item.quantity}
                  </p>
                ))}
                <p className="mt-2 font-bold">Total: ₦{latestOrder.total}</p>
                <p className="text-green-500 font-medium mt-1">Status: Completed</p>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">No order details available.</p>
          )}
        </div>

        {/* Navigation Button */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg text-white font-semibold shadow-lg transition-transform transform hover:scale-105"
          >
            Return to Dashboard
          </button>
          <button
            onClick={() => navigate('/order-history')}
            className="bg-pink-500 hover:bg-pink-600 px-6 py-3 rounded-lg text-white font-semibold shadow-lg transition-transform transform hover:scale-105"
          >
            Check Your Order History
          </button>
        </div>
      </div>
    </div>
  );
}
