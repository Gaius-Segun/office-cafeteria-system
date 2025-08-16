import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaHome, FaUtensils, FaHistory, FaUser, FaBell, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { useAppContext } from '../AppContext';
import LogoutConfirmationModal from './LogoutConfirmationModal';

const menuItems = [
  { to: '/dashboard', label: 'Home', icon: <FaHome /> },
  { to: '/menu', label: 'Menu', icon: <FaUtensils /> },
  { to: '/order-history', label: 'Order History', icon: <FaHistory /> },
  { to: '/profile', label: 'Profile', icon: <FaUser /> },
  { to: '/notifications', 'label': 'Notifications', icon: <FaBell /> },
  { to: '/settings', label: 'Settings', icon: <FaCog /> },
];

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAppContext();

  const handleLogoutConfirmation = () => {
    // Call the logout function to clear state and local storage
    logout(); 
    // Navigate immediately after the logout logic to ensure redirection
    navigate('/');
    setShowLogoutModal(false);
  };

  return (
    <>
      <div
        className={`bg-white text-gray-800 border-r h-screen p-4 flex flex-col transition-all duration-300 shadow-md
          ${isExpanded ? 'w-56' : 'w-20'}`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {/* Logo / App Name */}
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold shadow-sm">
            O
          </div>
          {isExpanded && <span className="ml-3 font-bold text-lg text-gray-800" style={{ fontFamily: 'Pacifico, cursive' }} >Office Bites</span>}
        </div>

        {/* Menu Items */}
        <ul className="flex flex-col space-y-2 flex-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200
                ${
                  isActive
                    ? 'bg-yellow-400 text-black font-semibold shadow-sm'
                    : 'hover:bg-yellow-400 hover:text-black'
                }`
              }
            >
              <span className="text-xl">{item.icon}</span>
              {isExpanded && <span className="whitespace-nowrap">{item.label}</span>}
            </NavLink>
          ))}
        </ul>

        {/* Logout Button */}
        <div className="mt-auto pt-4 border-t border-gray-200">
          <button
            onClick={() => setShowLogoutModal(true)} // Open the modal on click
            className="flex items-center w-full gap-3 px-3 py-2 rounded-lg text-red-500 hover:bg-red-100 transition-colors duration-200"
          >
            <span className="text-xl"><FaSignOutAlt /></span>
            {isExpanded && <span className="whitespace-nowrap font-semibold">Logout</span>}
          </button>
        </div>
      </div>
      {showLogoutModal && (
        <LogoutConfirmationModal
          onConfirm={handleLogoutConfirmation}
          onCancel={() => setShowLogoutModal(false)}
        />
      )}
    </>
  );
}
