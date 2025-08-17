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
import Notification from './Pages/Notification'; // Import the Notification component
import { AppProvider, useAppContext } from './AppContext'; // Import useAppContext

// A new component to wrap the content and access the context
function AppContent() {
  const { notification, hideNotification } = useAppContext();

  return (
    <>
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
        <Route path="/order-history" element={<OrderHistory/>} />
        {/* This is the corrected route with a dynamic parameter */}
        <Route path="/order/:index" element={<OrderDetails/>}/>
      </Routes>
      {/* Conditionally render the notification based on context state */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={hideNotification}
        />
      )}
    </>
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
