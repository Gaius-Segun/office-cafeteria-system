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
  // The 'Notifications' item will be handled with a different component type below
  { to: '/notifications', label: 'Notifications', icon: <FaBell />, isSpecial: true },
  { to: '/settings', label: 'Settings', icon: <FaCog /> },
];

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const navigate = useNavigate();
  const { logout, showNotification } = useAppContext(); // Destructure showNotification from context

  const handleLogoutConfirmation = () => {
    // Call the logout function to clear state and local storage
    logout(); 
    // Navigate immediately after the logout logic to ensure redirection
    navigate('/');
    setShowLogoutModal(false);
  };
  
  // New handler function for the notification button click
  const handleShowNotification = () => {
    // You can customize the message and type here
    showNotification('You have a new message!', 'info');
  };

  return (
    <>
      <div
        className={`bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white border-r border-slate-700/50 h-screen p-6 flex flex-col transition-all duration-500 ease-out shadow-2xl backdrop-blur-xl relative overflow-hidden
          ${isExpanded ? 'w-72' : 'w-24'}`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {/* Animated background gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-purple-600/10 opacity-50"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-flow"></div>
        
        {/* Floating particles */}
        <div className="absolute top-8 right-4 w-1 h-1 bg-blue-400 rounded-full animate-ping opacity-60"></div>
        <div className="absolute top-20 right-6 w-0.5 h-0.5 bg-purple-400 rounded-full animate-pulse opacity-40 delay-300"></div>
        <div className="absolute bottom-32 right-3 w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce opacity-50 delay-700"></div>

        {/* Logo / App Name with enhanced styling */}
        <div className="flex items-center mb-10 relative z-10">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-2xl blur-lg opacity-60 animate-pulse"></div>
            <div className="relative w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center text-slate-900 font-bold shadow-2xl transform hover:scale-110 transition-all duration-300 hover:rotate-6">
              <span className="text-xl animate-bounce-subtle">O</span>
            </div>
          </div>
          {isExpanded && (
            <div className="ml-4 overflow-hidden">
              <span 
                className="font-bold text-2xl bg-gradient-to-r from-yellow-400 via-orange-300 to-yellow-400 bg-clip-text text-transparent animate-fade-slide-in" 
                style={{ fontFamily: 'Pacifico, cursive' }}
              >
                Office Bites
              </span>
              <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent mt-1 animate-width-expand"></div>
            </div>
          )}
        </div>

        {/* Menu Items with enhanced styling */}
        <ul className="flex flex-col space-y-3 flex-1 relative z-10">
          {menuItems.map((item, index) => {
            // Conditionally render a NavLink or a button for the 'Notifications' item
            if (item.isSpecial) {
              return (
                <div 
                  key={item.label}
                  onClick={handleShowNotification} // Add the onClick handler
                  className={`group relative flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden
                    hover:bg-white/10 hover:shadow-lg backdrop-blur-sm border border-transparent hover:border-white/20 cursor-pointer`}
                  onMouseEnter={() => setHoveredItem(index)}
                  onMouseLeave={() => setHoveredItem(null)}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Hover glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                  
                  {/* Icon with enhanced styling */}
                  <div className="relative z-10">
                    <span className={`text-xl transition-all duration-300 text-slate-300 group-hover:text-white group-hover:scale-110 ${hoveredItem === index ? 'animate-wiggle' : ''}`}>
                      {item.icon}
                    </span>
                  </div>
                  
                  {/* Label with stagger animation */}
                  {isExpanded && (
                    <span className={`whitespace-nowrap relative z-10 transition-all duration-300 animate-fade-slide-in text-slate-200 group-hover:text-white font-medium`}>
                      {item.label}
                    </span>
                  )}
                </div>
              );
            } else {
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `group relative flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden
                    ${
                      isActive
                        ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-slate-900 font-semibold shadow-xl shadow-yellow-500/30 scale-105'
                        : 'hover:bg-white/10 hover:shadow-lg backdrop-blur-sm border border-transparent hover:border-white/20'
                    }`
                  }
                  onMouseEnter={() => setHoveredItem(index)}
                  onMouseLeave={() => setHoveredItem(null)}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {({ isActive }) => (
                    <>
                      {/* Hover glow effect */}
                      <div className={`absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isActive ? 'opacity-0' : ''}`}></div>
                      
                      {/* Icon with enhanced styling */}
                      <div className="relative z-10">
                        <span className={`text-xl transition-all duration-300 ${
                          isActive 
                            ? 'text-slate-900 animate-bounce-gentle' 
                            : `text-slate-300 group-hover:text-white group-hover:scale-110 ${hoveredItem === index ? 'animate-wiggle' : ''}`
                        }`}>
                          {item.icon}
                        </span>
                      </div>
                      
                      {/* Label with stagger animation */}
                      {isExpanded && (
                        <span className={`whitespace-nowrap relative z-10 transition-all duration-300 animate-fade-slide-in ${
                          isActive 
                            ? 'text-slate-900 font-bold' 
                            : 'text-slate-200 group-hover:text-white font-medium'
                        }`}>
                          {item.label}
                        </span>
                      )}
                      
                      {/* Active indicator */}
                      {isActive && (
                        <div className="absolute right-2 w-2 h-2 bg-slate-900 rounded-full animate-pulse"></div>
                      )}
                    </>
                  )}
                </NavLink>
              );
            }
          })}
        </ul>

        {/* Enhanced Logout Button */}
        <div className="mt-auto pt-6 border-t border-slate-700/50 relative z-10">
          <button
            onClick={() => setShowLogoutModal(true)}
            className="group relative flex items-center w-full gap-4 px-4 py-3 rounded-2xl text-red-400 hover:text-white transition-all duration-300 transform hover:scale-105 overflow-hidden hover:bg-red-500/20 backdrop-blur-sm border border-transparent hover:border-red-500/30"
          >
            {/* Hover glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <span className="text-xl relative z-10 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
              <FaSignOutAlt />
            </span>
            {isExpanded && (
              <span className="whitespace-nowrap font-semibold relative z-10 animate-fade-slide-in">
                Logout
              </span>
            )}
            
            {/* Danger indicator */}
            <div className="absolute right-2 w-1 h-1 bg-red-400 rounded-full animate-pulse opacity-60"></div>
          </button>
        </div>
      </div>

      {showLogoutModal && (
        <LogoutConfirmationModal
          onConfirm={handleLogoutConfirmation}
          onCancel={() => setShowLogoutModal(false)}
        />
      )}

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes gradient-flow {
          0% { background-position: 0% 0%; }
          50% { background-position: 100% 0%; }
          100% { background-position: 0% 0%; }
        }
        
        @keyframes fade-slide-in {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes width-expand {
          from { width: 0; }
          to { width: 100%; }
        }
        
        @keyframes bounce-gentle {
          0%, 100% { 
            transform: translateY(0) scale(1);
          }
          50% { 
            transform: translateY(-2px) scale(1.05);
          }
        }
        
        @keyframes bounce-subtle {
          0%, 100% { 
            transform: translateY(0);
          }
          50% { 
            transform: translateY(-1px);
          }
        }
        
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg) scale(1); }
          25% { transform: rotate(-3deg) scale(1.1); }
          75% { transform: rotate(3deg) scale(1.1); }
        }
        
        .animate-gradient-flow {
          background-size: 200% 200%;
          animation: gradient-flow 3s ease infinite;
        }
        
        .animate-fade-slide-in {
          animation: fade-slide-in 0.4s ease-out;
        }
        
        .animate-width-expand {
          animation: width-expand 0.6s ease-out 0.2s forwards;
          width: 0;
        }
        
        .animate-bounce-gentle {
          animation: bounce-gentle 2s infinite;
        }
        
        .animate-bounce-subtle {
          animation: bounce-subtle 3s infinite;
        }
        
        .animate-wiggle {
          animation: wiggle 0.5s ease-in-out;
        }
      `}</style>
    </>
  );
}
