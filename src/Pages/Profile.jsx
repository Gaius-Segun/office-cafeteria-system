import React from 'react';
import { useAppContext } from '../AppContext'; // Corrected import path
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const { userName, userEmail } = useAppContext();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-6 relative">
        {/* Header with back button */}
        <div className="flex items-center justify-between mb-8">
          <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-gray-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h1 className="text-xl font-bold">Edit Profile</h1>
          <button className="text-green-500 hover:text-green-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </button>
        </div>

        {/* Profile picture */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            <img
              src="https://placehold.co/100x100/A3E635/FFFFFF?text=P" // Using a placeholder for the profile picture
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
            />
            <div className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md border border-gray-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.86-1.503A2 2 0 0110.455 4H13a2 2 0 011.664.89l.86 1.503A2 2 0 0017.07 7H18a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
          </div>
          <p className="mt-4 text-xl font-semibold">{userName}</p>
        </div>

        {/* Profile information fields */}
        <div className="space-y-6">
          {/* Email Address field */}
          <div>
            <label className="block text-gray-500 text-sm font-medium mb-1">E-mail address</label>
            <div className="w-full bg-gray-100 text-gray-700 p-4 rounded-xl font-medium">
              {userEmail}
            </div>
          </div>

          {/* User Name field */}
          <div>
            <label className="block text-gray-500 text-sm font-medium mb-1">User name</label>
            <div className="w-full bg-gray-100 text-gray-700 p-4 rounded-xl font-medium">
              @{userName ? userName.replace(/\s/g, '').toLowerCase() : 'loading'}
            </div>
          </div>
          
          {/* Phone Number field */}
          <div>
            <label className="block text-gray-500 text-sm font-medium mb-1">Phone number</label>
            <div className="w-full bg-gray-100 text-gray-700 p-4 rounded-xl font-medium">
              +91 6895312
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
