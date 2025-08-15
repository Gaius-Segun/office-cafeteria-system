import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import LandingPage from './Pages/LandingPage'; // Import the new component
import Dashboard from './Pages/Dashboard';
import Sidebar from './Pages/Sidebar';
import Menu from './Pages/Menu';
import Profile from './Pages/Profile';
import OrderSummary from './Pages/OrderSummary';
import OrderSuccess from './Pages/OrderSuccess';
import OrderHistory from './Pages/OrderHistory';
import { AppProvider } from './AppContext';

export default function App() {
  return (
    <AppProvider>
      <Router>
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
        </Routes>
      </Router>
    </AppProvider>
  );
}
