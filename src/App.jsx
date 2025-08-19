import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import LandingPage from './Pages/LandingPage';
import Dashboard from './Pages/Dashboard';
import Sidebar from './Pages/Sidebar';
import Menu from './Pages/Menu';
import Profile from './Pages/Profile';
import OrderSummary from './Pages/OrderSummary';
import OrderSuccess from './Pages/OrderSuccess';
import OrderHistory from './Pages/OrderHistory';
import OrderDetails from './Pages/OrderDetails';
import Notification from './Pages/Notification';
import { AppProvider, useAppContext } from './AppContext';
import AdminDashboard from './Pages/AdminDashboard'

// Enhanced AppContent with support for order ready notifications
function AppContent() {
  const { 
    notification, 
    hideNotification,
    // Add these new context values for order ready notifications
    orderReadyNotification,
    hideOrderReadyNotification,
    activeOrders
  } = useAppContext();

  return (
    <div className="app-container">
      <Routes>
        {/* Landing page is now the default route */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/ordersummary" element={<OrderSummary />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/ordersuccess" element={<OrderSuccess />} />
        <Route path="/order-history" element={<OrderHistory />} />
        {/* This is the corrected route with a dynamic parameter */}
        <Route path="/order/:index" element={<OrderDetails />} />
        <Route path="/admindashboard" element={<AdminDashboard/>}/>
      </Routes>

      {/* Regular notifications (login errors, form validations, etc.) */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={hideNotification}
        />
      )}

      {/* Order ready notifications (30-second delayed, high priority) */}
      {orderReadyNotification && (
        <Notification
          message={orderReadyNotification.message}
          type={orderReadyNotification.type}
          onClose={hideOrderReadyNotification}
          isOrderReady={true} // Special styling for order ready notifications
          priority="high" // Higher z-index, different positioning
        />
      )}

      {/* Optional: Active orders indicator (shows countdown for pending orders) */}
      {activeOrders && activeOrders.length > 0 && (
        <div className="fixed bottom-4 left-4 z-40">
          {activeOrders.map((order, index) => (
            <OrderCountdownIndicator 
              key={order.id} 
              order={order} 
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Optional component to show countdown for active orders
function OrderCountdownIndicator({ order, index }) {
  const { getOrderRemainingTime } = useAppContext();
  const [remainingTime, setRemainingTime] = React.useState(30);

  React.useEffect(() => {
    const timer = setInterval(() => {
      const remaining = getOrderRemainingTime(order.id);
      setRemainingTime(remaining);
      
      if (remaining <= 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [order.id, getOrderRemainingTime]);

  if (remainingTime <= 0) return null;

  return (
    <div 
      className={`bg-blue-600 text-white px-3 py-2 rounded-lg shadow-lg text-sm mb-2 transform transition-all duration-300`}
      style={{ transform: `translateY(-${index * 60}px)` }}
    >
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        <span>Order #{order.id} ready in {remainingTime}s</span>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Router>
        <AppContent />
      </Router>
    </AppProvider>
  );
}