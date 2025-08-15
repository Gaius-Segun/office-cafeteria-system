import React from 'react';

export default function LogoutConfirmationModal({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96 text-center">
        <h3 className="text-xl font-bold mb-4">Logout Confirmation</h3>
        <p className="text-gray-700 mb-6">Are you sure you want to log out?</p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={onCancel}
            className="px-6 py-2 rounded-lg font-semibold border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 rounded-lg font-semibold bg-red-500 text-white hover:bg-red-600 transition"
          >
            Yes, Logout
          </button>
        </div>
      </div>
    </div>
  );
}
