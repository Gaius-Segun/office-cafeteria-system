import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { useAppContext } from '../AppContext';
import { useNavigate } from 'react-router-dom';

export default function OrderHistory() {
  const { setCart, userEmail: contextEmail } = useAppContext();
  const [orderHistory, setOrderHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // This effect now runs only when contextEmail is a non-empty string.
    const loadOrderHistory = () => {
      if (contextEmail) {
        console.log('Attempting to load order history for user:', contextEmail);
        try {
          const savedData = JSON.parse(localStorage.getItem(`userData_${contextEmail}`)) || {};
          // Ensure that savedData.lastOrdered is an array before setting the state
          setOrderHistory(Array.isArray(savedData.lastOrdered) ? savedData.lastOrdered : []);
        } catch (error) {
          console.error("Failed to parse order history from local storage", error);
          setOrderHistory([]);
        }
      } else {
        console.log('User email not available yet. Waiting for context...');
        setOrderHistory([]);
      }
    };
    
    loadOrderHistory();
    // Listen for changes in local storage from other tabs/windows
    window.addEventListener('storage', loadOrderHistory);

    return () => {
      window.removeEventListener('storage', loadOrderHistory);
    };
  }, [contextEmail]); // The effect now depends directly on contextEmail

  const handleReorder = (order) => {
    setCart(order.items);
    navigate('/OrderSummary', {
      state: { serveOption: order.serveOption, total: order.total }
    });
  };

  return (
    <div className="flex min-h-screen bg-[#0B0F24] text-white">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-8 text-center">📜 Order History</h1>

        {orderHistory.length === 0 ? (
          <p className="text-center text-gray-400 italic">You have no past orders.</p>
        ) : (
          <div className="space-y-4">
            {orderHistory.map((order, index) => {
              // Safely access the first item's name
              const firstItemName = order.items && order.items.length > 0 ? order.items[0].name : 'Unknown Meal';
              return (
                <div
                  key={index}
                  className="bg-[#1C2038] rounded-lg p-4 shadow-md border border-gray-700"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-lg">{firstItemName}</p>
                      <p className="text-sm text-green-400">Delivered</p>
                    </div>
                    {/* Updated currency symbol */}
                    <p className="font-bold text-lg text-green-400">₦{order.total}</p>
                  </div>

                  <div className="flex mt-4 gap-3">
                    <button
                      onClick={() => navigate(`/order/${index}`)}
                      className="flex-1 bg-gray-600 hover:bg-gray-500 px-4 py-2 rounded-md"
                    >
                      Order Details
                    </button>
                    <button
                      onClick={() => handleReorder(order)}
                      className="flex-1 bg-pink-500 hover:bg-pink-600 px-4 py-2 rounded-md"
                    >
                      Re-Order
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
