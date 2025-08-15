import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginPage from './Pages/LoginPage';

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

          <Route path="/" element={<LoginPage />} />

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