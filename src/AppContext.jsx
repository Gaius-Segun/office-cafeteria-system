import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [serveOption, setServeOption] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [lastOrdered, setLastOrdered] = useState([]);
  const [userName, setUserName] = useState('');
  const [totalAllowance, setTotalAllowance] = useState(2500); 
  const [remainingAllowance, setRemainingAllowance] = useState(2500);
  const [topUpHistory, setTopUpHistory] = useState([]); 
  
  // Existing notification state
  const [notification, setNotification] = useState(null);
  
  // NEW: Order ready notification system
  const [orderReadyNotification, setOrderReadyNotification] = useState(null);
  const [activeOrders, setActiveOrders] = useState([]);
  const [orderTimers, setOrderTimers] = useState(new Map());

  // This effect runs once on initial component mount to load data from localStorage
  useEffect(() => {
    const email = localStorage.getItem('loggedInUserEmail');
    const name = localStorage.getItem('loggedInUserName');
    if (email) {
      setUserEmail(email);
      setUserName(name || 'User'); 
      const savedData = JSON.parse(localStorage.getItem(`userData_${email}`)) || {};
      
      setCart(savedData.cart || []);
      setLastOrdered(savedData.lastOrdered || []);
      setTotalAllowance(savedData.totalAllowance || 2500);
      setRemainingAllowance(savedData.remainingAllowance || 2500);
      setQuantities(savedData.quantities || {});
      setServeOption(savedData.serveOption || '');
      setTopUpHistory(savedData.topUpHistory || []); 
    } else {
      setUserName('User');
    }
  }, []);

  // This effect saves all persistent data to localStorage whenever it changes
  useEffect(() => {
    if (userEmail) {
      const existingData = JSON.parse(localStorage.getItem(`userData_${userEmail}`)) || {};
      localStorage.setItem(
        `userData_${userEmail}`,
        JSON.stringify({
          ...existingData,
          cart,
          lastOrdered,
          totalAllowance, 
          remainingAllowance,
          quantities,
          serveOption,
          topUpHistory 
        })
      );
    }
    
    if (userName) {
      localStorage.setItem('loggedInUserName', userName);
    }
    if (userEmail) {
      localStorage.setItem('loggedInUserEmail', userEmail);
    }
  }, [cart, lastOrdered, userEmail, userName, totalAllowance, remainingAllowance, quantities, serveOption, topUpHistory]);

  // NEW: Cleanup timers on unmount
  useEffect(() => {
    return () => {
      orderTimers.forEach(timerId => clearTimeout(timerId));
    };
  }, [orderTimers]);

  const addOrderToHistory = useCallback((newOrder) => {
    setLastOrdered(prevHistory => [...prevHistory, { ...newOrder, status: 'Placed' }]);
  }, []);

  const addTopUpToHistory = useCallback((newTopUp) => {
    setTopUpHistory(prevHistory => [...prevHistory, newTopUp]);
  }, []);
  
  // Existing notification functions
  const showNotification = useCallback((message, type = 'info') => {
    setNotification({ message, type });
  }, []);
  
  const hideNotification = useCallback(() => {
    setNotification(null);
  }, []);

  // NEW: Order ready notification functions
  const showOrderReadyNotification = useCallback((orderData, customMessage = null) => {
    const message = customMessage || `🎉 Order #${orderData.id} is ready for pickup!`;
    setOrderReadyNotification({
      message,
      type: 'success',
      orderData
    });
  }, []);

  const hideOrderReadyNotification = useCallback(() => {
    setOrderReadyNotification(null);
  }, []);

  // NEW: Start order ready timer (call this when order is placed)
  const startOrderReadyTimer = useCallback((orderData, delaySeconds = 30) => {
    const orderId = orderData.id || `order_${Date.now()}`;
    const orderWithId = { ...orderData, id: orderId, timestamp: Date.now() };
    
    // Clear existing timer if any
    if (orderTimers.has(orderId)) {
      clearTimeout(orderTimers.get(orderId));
    }

    // Show immediate order confirmation
    showNotification(`Order #${orderId} placed successfully! You'll be notified when it's ready.`, 'success');

    // Add to active orders
    setActiveOrders(prev => [...prev.filter(order => order.id !== orderId), orderWithId]);

    // Set timer for order ready notification
    const timerId = setTimeout(() => {
      showOrderReadyNotification(orderWithId);
      
      // Remove from active orders
      setActiveOrders(prev => prev.filter(order => order.id !== orderId));
      
      // Clean up timer reference
      setOrderTimers(prev => {
        const newTimers = new Map(prev);
        newTimers.delete(orderId);
        return newTimers;
      });
    }, delaySeconds * 1000);

    // Store timer reference
    setOrderTimers(prev => new Map(prev).set(orderId, timerId));

    return orderId; // Return the order ID for reference
  }, [showNotification, showOrderReadyNotification, orderTimers]);

  // NEW: Cancel order timer (if order is cancelled)
  const cancelOrderTimer = useCallback((orderId) => {
    if (orderTimers.has(orderId)) {
      clearTimeout(orderTimers.get(orderId));
      setOrderTimers(prev => {
        const newTimers = new Map(prev);
        newTimers.delete(orderId);
        return newTimers;
      });
    }
    
    setActiveOrders(prev => prev.filter(order => order.id !== orderId));
  }, [orderTimers]);

  // NEW: Get remaining time for an order
  const getOrderRemainingTime = useCallback((orderId) => {
    const order = activeOrders.find(order => order.id === orderId);
    if (!order) return 0;
    
    const elapsed = Math.floor((Date.now() - order.timestamp) / 1000);
    const remaining = Math.max(0, 30 - elapsed); // Default 30 seconds
    return remaining;
  }, [activeOrders]);

  // Enhanced order completion that includes timer management
  const completeOrderAndDeductBalance = useCallback((total, orderData = null) => {
    if (total <= remainingAllowance) {
      setRemainingAllowance(prev => prev - total);
      
      // If order data is provided, start the ready timer
      if (orderData) {
        const orderId = startOrderReadyTimer(orderData, 30);
        return { success: true, orderId };
      }
      
      return { success: true };
    }
    return { success: false };
  }, [remainingAllowance, startOrderReadyTimer]);

  const resetCart = () => {
    setCart([]);
    setQuantities({});
    setServeOption('');
  };

  const handleAddTopUp = (topUpAmount) => {
    setRemainingAllowance(prev => prev + topUpAmount);
  };
  
  const logout = () => {
    // Clear all order timers on logout
    orderTimers.forEach(timerId => clearTimeout(timerId));
    setOrderTimers(new Map());
    setActiveOrders([]);
    setOrderReadyNotification(null);
    
    if (userEmail) {
      localStorage.removeItem(`userData_${userEmail}`);
    }
    localStorage.removeItem('loggedInUserEmail');
    localStorage.removeItem('loggedInUserName');

    setUserEmail('');
    setUserName('');
    setCart([]);
    setLastOrdered([]);
    setServeOption('');
    setTotalAllowance(1200);
    setRemainingAllowance(1200);
    setTopUpHistory([]); 
  };

  return (
    <AppContext.Provider
      value={{
        // Existing values
        cart,
        setCart,
        quantities,
        setQuantities,
        serveOption,
        setServeOption,
        userEmail,
        setUserEmail,
        lastOrdered,
        setLastOrdered,
        resetCart,
        userName,
        setUserName,
        totalAllowance,
        remainingAllowance,
        completeOrderAndDeductBalance,
        handleAddTopUp,
        logout,
        addOrderToHistory,
        addTopUpToHistory, 
        topUpHistory,
        
        // Existing notification system
        notification,
        showNotification,
        hideNotification,
        
        // NEW: Order ready notification system
        orderReadyNotification,
        showOrderReadyNotification,
        hideOrderReadyNotification,
        activeOrders,
        startOrderReadyTimer,
        cancelOrderTimer,
        getOrderRemainingTime
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);