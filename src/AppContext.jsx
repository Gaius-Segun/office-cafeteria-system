import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// Create a new context for our application state
const AppContext = createContext();

// This is the provider component that will wrap your entire application
export const AppProvider = ({ children }) => {
  // We'll store all our global state here
  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [serveOption, setServeOption] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [lastOrdered, setLastOrdered] = useState([]);
  const [userName, setUserName] = useState('');
  const [totalAllowance, setTotalAllowance] = useState(2500); 
  const [remainingAllowance, setRemainingAllowance] = useState(2500);
  const [topUpHistory, setTopUpHistory] = useState([]); 
  
  // NEW: Admin-specific state
  const [userRole, setUserRole] = useState('user'); // Default to 'user'

  const [notification, setNotification] = useState(null);
  const [orderReadyNotification, setOrderReadyNotification] = useState(null);
  const [activeOrders, setActiveOrders] = useState([]);
  const [orderTimers, setOrderTimers] = useState(new Map());

  // Effect to load user data from localStorage on initial render
  useEffect(() => {
    const email = localStorage.getItem('loggedInUserEmail');
    const name = localStorage.getItem('loggedInUserName');
    const role = localStorage.getItem('loggedInUserRole'); // NEW: Load user role
    
    if (email) {
      setUserEmail(email);
      setUserName(name || 'User'); 
      setUserRole(role || 'user'); // NEW: Set user role from localStorage
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

  // Effect to save user data to localStorage whenever a relevant state changes
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
    
    // Save user credentials separately for quick access on reload
    if (userName) {
      localStorage.setItem('loggedInUserName', userName);
    }
    if (userEmail) {
      localStorage.setItem('loggedInUserEmail', userEmail);
    }
    if (userRole) { // NEW: Save user role to localStorage
      localStorage.setItem('loggedInUserRole', userRole);
    }
  }, [cart, lastOrdered, userEmail, userName, userRole, totalAllowance, remainingAllowance, quantities, serveOption, topUpHistory]);

  // Clean up any active timers when the component unmounts
  useEffect(() => {
    return () => {
      orderTimers.forEach(timerId => clearTimeout(timerId));
    };
  }, [orderTimers]);

  // Adds a new order to the user's order history
  const addOrderToHistory = useCallback((newOrder) => {
    setLastOrdered(prevHistory => [...prevHistory, { ...newOrder, status: 'Placed' }]);
  }, []);

  // Adds a new top-up transaction to the history
  const addTopUpToHistory = useCallback((newTopUp) => {
    setTopUpHistory(prevHistory => [...prevHistory, newTopUp]);
  }, []);
  
  // Displays a general notification
  const showNotification = useCallback((messageOrConfig, type = 'info', duration = 5000) => {
    if (typeof messageOrConfig === 'string') {
      setNotification({ 
        message: messageOrConfig, 
        type,
        duration,
        orderData: null
      });
    } else {
      setNotification({
        duration: 5000,
        orderData: null,
        ...messageOrConfig
      });
    }
  }, []);
  
  // Hides the general notification
  const hideNotification = useCallback(() => {
    setNotification(null);
  }, []);

  // Displays a specific "Order Ready" notification
  const showOrderReadyNotification = useCallback((orderData, customMessage = null) => {
    const message = customMessage || "Your delicious food is ready for pickup!";
    
    setOrderReadyNotification({
      message,
      type: 'order-ready',
      duration: 8000,
      orderData: {
        orderId: orderData.orderId || orderData.id,
        items: orderData.items || [],
        total: orderData.total,
        restaurantName: orderData.restaurantName || 'Food Court'
      }
    });
    
    console.log('Order ready notification shown for order:', orderData.orderId || orderData.id);
  }, []);

  // Hides the "Order Ready" notification
  const hideOrderReadyNotification = useCallback(() => {
    setOrderReadyNotification(null);
  }, []);

  // Starts a timer for a new order and shows a confirmation
  const startOrderReadyTimer = useCallback((orderData, delaySeconds = 30) => {
    const orderId = orderData.orderId || orderData.id || `order_${Date.now()}`;
    const orderWithId = { 
      ...orderData, 
      id: orderId, 
      orderId: orderId,
      timestamp: Date.now() 
    };
    
    if (orderTimers.has(orderId)) {
      clearTimeout(orderTimers.get(orderId));
    }

    showNotification({
      message: `Order placed successfully! Your food will be ready in ${delaySeconds} seconds.`,
      type: 'success',
      duration: 5000
    });

    setActiveOrders(prev => [...prev.filter(order => order.id !== orderId), orderWithId]);

    const timerId = setTimeout(() => {
      showOrderReadyNotification(orderWithId);
      
      setActiveOrders(prev => prev.filter(order => order.id !== orderId));
      
      setOrderTimers(prev => {
        const newTimers = new Map(prev);
        newTimers.delete(orderId);
        return newTimers;
      });
      
      console.log(`Order ${orderId} is now ready!`);
    }, delaySeconds * 1000);

    setOrderTimers(prev => new Map(prev).set(orderId, timerId));
    console.log(`Started ${delaySeconds}s timer for order ${orderId}`);
    return orderId;
  }, [showNotification, showOrderReadyNotification, orderTimers]);

  // Cancels a specific order timer
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

  // Calculates the remaining time for an order
  const getOrderRemainingTime = useCallback((orderId) => {
    const order = activeOrders.find(order => order.id === orderId || order.orderId === orderId);
    if (!order) return 0;
    
    const elapsed = Math.floor((Date.now() - order.timestamp) / 1000);
    const remaining = Math.max(0, 30 - elapsed);
    return remaining;
  }, [activeOrders]);

  // Deducts the order total from the user's remaining allowance
  const completeOrderAndDeductBalance = useCallback((total, orderData = null) => {
    if (total <= remainingAllowance) {
      setRemainingAllowance(prev => prev - total);
      
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

  // Resets the shopping cart
  const resetCart = () => {
    setCart([]);
    setQuantities({});
    setServeOption('');
  };

  // Adds a specified amount to the remaining allowance
  const handleAddTopUp = (topUpAmount) => {
    setRemainingAllowance(prev => prev + topUpAmount);
  };
  
  // NEW: Login function that sets user data and role and saves to localStorage
  const login = (email, name, role = 'user') => {
    localStorage.setItem('loggedInUserEmail', email);
    localStorage.setItem('loggedInUserName', name);
    localStorage.setItem('loggedInUserRole', role); // Save the role
    setUserEmail(email);
    setUserName(name);
    setUserRole(role);
  };

  // NEW: Logout function that clears all user data and state
  const logout = () => {
    orderTimers.forEach(timerId => clearTimeout(timerId));
    setOrderTimers(new Map());
    setActiveOrders([]);
    setOrderReadyNotification(null);
    setNotification(null);
    
    if (userEmail) {
      localStorage.removeItem(`userData_${userEmail}`);
    }
    localStorage.removeItem('loggedInUserEmail');
    localStorage.removeItem('loggedInUserName');
    localStorage.removeItem('loggedInUserRole'); // NEW: Clear user role on logout

    setUserEmail('');
    setUserName('');
    setUserRole('user'); // Reset role to default
    setCart([]);
    setLastOrdered([]);
    setServeOption('');
    setTotalAllowance(2500);
    setRemainingAllowance(2500);
    setTopUpHistory([]); 
  };

  // The context value, exposing all relevant state and functions
  const value = {
    cart,
    setCart,
    quantities,
    setQuantities,
    serveOption,
    setServeOption,
    userEmail,
    setUserEmail,
    userRole, // NEW: Expose userRole
    lastOrdered,
    setLastOrdered,
    resetCart,
    userName,
    setUserName,
    totalAllowance,
    remainingAllowance,
    completeOrderAndDeductBalance,
    handleAddTopUp,
    login, // NEW: Expose login function
    logout,
    addOrderToHistory,
    addTopUpToHistory, 
    topUpHistory,
    notification,
    showNotification,
    hideNotification,
    orderReadyNotification,
    showOrderReadyNotification,
    hideOrderReadyNotification,
    activeOrders,
    startOrderReadyTimer,
    cancelOrderTimer,
    getOrderRemainingTime
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to easily access the context
export const useAppContext = () => useContext(AppContext);
