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
  
  // 🎯 UPDATED: Enhanced notification function with object support
  const showNotification = useCallback((messageOrConfig, type = 'info', duration = 5000) => {
    // Support both old string format and new object format
    if (typeof messageOrConfig === 'string') {
      setNotification({ 
        message: messageOrConfig, 
        type,
        duration,
        orderData: null
      });
    } else {
      // New object format: { message, type, duration, orderData }
      setNotification({
        duration: 5000,
        orderData: null,
        ...messageOrConfig // Spread the config object
      });
    }
  }, []);
  
  const hideNotification = useCallback(() => {
    setNotification(null);
  }, []);

  // 🎯 UPDATED: Enhanced order ready notification with proper structure
  const showOrderReadyNotification = useCallback((orderData, customMessage = null) => {
    const message = customMessage || "Your delicious food is ready for pickup!";
    
    // Use the new notification structure for order-ready type
    setOrderReadyNotification({
      message,
      type: 'order-ready', // 🎯 NEW: Use special order-ready type
      duration: 8000, // Longer duration for important notifications
      orderData: {
        orderId: orderData.orderId || orderData.id,
        items: orderData.items || [],
        total: orderData.total,
        restaurantName: orderData.restaurantName || 'Food Court'
      }
    });
    
    console.log('Order ready notification shown for order:', orderData.orderId || orderData.id);
  }, []);

  const hideOrderReadyNotification = useCallback(() => {
    setOrderReadyNotification(null);
  }, []);

  // 🎯 UPDATED: Enhanced timer start with better order ID handling
  const startOrderReadyTimer = useCallback((orderData, delaySeconds = 30) => {
    const orderId = orderData.orderId || orderData.id || `order_${Date.now()}`;
    const orderWithId = { 
      ...orderData, 
      id: orderId, 
      orderId: orderId, // Ensure both formats are available
      timestamp: Date.now() 
    };
    
    // Clear existing timer if any
    if (orderTimers.has(orderId)) {
      clearTimeout(orderTimers.get(orderId));
    }

    // 🎯 UPDATED: Show immediate order confirmation with new format
    showNotification({
      message: `Order placed successfully! Your food will be ready in ${delaySeconds} seconds.`,
      type: 'success',
      duration: 5000
    });

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
      
      console.log(`Order ${orderId} is now ready!`);
    }, delaySeconds * 1000);

    // Store timer reference
    setOrderTimers(prev => new Map(prev).set(orderId, timerId));

    console.log(`Started ${delaySeconds}s timer for order ${orderId}`);
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
      console.log(`Cancelled timer for order ${orderId}`);
    }
    
    setActiveOrders(prev => prev.filter(order => order.id !== orderId));
  }, [orderTimers]);

  // NEW: Get remaining time for an order
  const getOrderRemainingTime = useCallback((orderId) => {
    const order = activeOrders.find(order => order.id === orderId || order.orderId === orderId);
    if (!order) return 0;
    
    const elapsed = Math.floor((Date.now() - order.timestamp) / 1000);
    const remaining = Math.max(0, 30 - elapsed); // Default 30 seconds
    return remaining;
  }, [activeOrders]);

  // 🎯 UPDATED: Enhanced order completion with better error handling
  const completeOrderAndDeductBalance = useCallback((total, orderData = null) => {
    if (total <= remainingAllowance) {
      setRemainingAllowance(prev => prev - total);
      
      // If order data is provided, start the ready timer
      if (orderData) {
        try {
          const orderId = startOrderReadyTimer(orderData, 30);
          return { success: true, orderId };
        } catch (error) {
          console.error('Error starting order timer:', error);
          return { success: true, orderId: null };
        }
      }
      
      return { success: true };
    }
    return { success: false, error: 'Insufficient balance' };
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
    setNotification(null); // Clear regular notifications too
    
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
    // 🎯 FIXED: Changed from 1200 to 2500 to match initial allowance
    setTotalAllowance(2500);
    setRemainingAllowance(2500);
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
        
        // 🎯 UPDATED: Enhanced notification system
        notification,
        showNotification,
        hideNotification,
        
        // 🎯 UPDATED: Enhanced order ready notification system
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