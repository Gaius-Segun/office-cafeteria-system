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
    // Clear the cart
    setCart([]);
    
    // Navigate to OrderSuccess and pass the order data in the state
    navigate('/ordersuccess', { // Updated path to lowercase
      state: {
        items: cart,
        serveOption: serveOption,
        total: total,
        userEmail: userEmail,
      },
    });
  };

  return (
    <div className="flex min-h-screen bg-white text-gray-900">
      <Sidebar />
      <div className="flex-1 p-6 overflow-y-auto">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg shadow-sm transition"
        >
          ← Back
        </button>

        {/* Page Title */}
        <h1 className="text-4xl font-bold mb-8 text-center">📝 Order Summary</h1>

        {/* Meal Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {cart?.map((item, idx) => (
            <MealCard
              key={idx}
              name={item.name}
              price={item.price}
              quantity={item.quantity}
              imageSrc={item.image || item.imageSrc}
              onClick={() => navigate('/menu')}
            />
          ))}
        </div>

        {/* Serve Option & Total */}
        <p className="text-lg mb-2">
          Serve Option: <span className="text-pink-500 font-semibold">{serveOption}</span>
        </p>
        <p className="text-lg">
          Total: <span className="text-green-600 font-bold">₦{total}</span>
        </p>

        {/* Place Order Button */}
        <button
          onClick={handlePlaceOrder}
          className="mt-6 w-full bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold text-lg shadow"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}

function MealCard({ name, price, quantity, status, imageSrc, onClick }) {
  return (
    <div
      className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition transform hover:scale-[1.02] text-center cursor-pointer"
      onClick={onClick}
    >
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={name}
          className="h-32 w-32 object-cover rounded-full mx-auto mb-4"
        />
      ) : (
        <div className="h-32 w-32 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center text-gray-400">
          📷
        </div>
      )}

      <p className="font-bold text-lg">{name}</p>
      <p className="text-gray-500">₦{price}</p>
      {quantity && <p className="text-gray-500">Qty: {quantity}</p>}
      {status && (
        <p
          className={`mt-1 text-sm font-semibold ${
            status === 'available' ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {status}
        </p>
      )}
    </div>
  );
}
