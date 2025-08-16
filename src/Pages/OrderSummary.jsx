import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useAppContext } from '../AppContext';

// The new CSS animations
const animations = `
.fade-in-up {
  animation: fadeInUp 0.5s ease-out;
}
.slide-in-right {
  animation: slideInRight 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
`;

export default function OrderSummary() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { cart, setCart, userEmail } = useAppContext();
  const { serveOption, total } = state || {};

  const handlePlaceOrder = () => {
    // Clear the cart
    setCart([]);

    // Navigate to OrderSuccess and pass the order data in the state
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
    <>
      <style>{animations}</style>
      <div className="flex min-h-screen bg-gray-50 text-gray-800">
        <Sidebar />
        <div className="flex-1 p-8 overflow-y-auto">
          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            className="mb-8 flex items-center gap-2 text-gray-600 hover:text-gray-800 transition transform hover:-translate-x-1 fade-in-up"
          >
            <span className="text-xl">←</span> Back
          </button>

          {/* Page Title */}
          <h1 className="text-4xl font-extrabold mb-10 text-center text-gray-900 fade-in-up">📝 Your Order Summary</h1>

          {/* Meal Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {cart?.map((item, idx) => (
              <div key={idx} className="slide-in-right" style={{ animationDelay: `${idx * 0.1}s` }}>
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

          {/* Order Details Container */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 fade-in-up">
            <h2 className="text-2xl font-bold mb-4">Order Details</h2>
            <div className="flex justify-between items-center text-lg mb-2 border-b border-gray-100 pb-2">
              <span>Serve Option:</span>
              <span className="text-pink-600 font-semibold">{serveOption}</span>
            </div>
            <div className="flex justify-between items-center text-xl font-bold">
              <span>Total:</span>
              <span className="text-green-600">₦{total}</span>
            </div>
          </div>

          {/* Place Order Button */}
          <button
            onClick={handlePlaceOrder}
            className="mt-8 w-full bg-pink-600 hover:bg-pink-700 text-white px-8 py-4 rounded-xl font-bold text-xl shadow-lg transition transform hover:scale-105"
          >
            Place Order
          </button>
        </div>
      </div>
    </>
  );
}

function MealCard({ name, price, quantity, status, imageSrc, onClick }) {
  return (
    <div
      className="bg-white p-6 rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition transform hover:scale-[1.02] text-center cursor-pointer"
      onClick={onClick}
    >
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={name}
          className="h-32 w-32 object-cover rounded-full mx-auto mb-4 border-2 border-pink-200"
        />
      ) : (
        <div className="h-32 w-32 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl text-gray-400">
          📷
        </div>
      )}

      <p className="font-extrabold text-xl text-gray-900">{name}</p>
      <p className="text-gray-500 font-medium">₦{price}</p>
      {quantity && <p className="text-gray-500 font-medium">Qty: {quantity}</p>}
      {status && (
        <p
          className={`mt-2 text-sm font-semibold ${
            status === 'available' ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {status}
        </p>
      )}
    </div>
  );
}