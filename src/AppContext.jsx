import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [serveOption, setServeOption] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [lastOrdered, setLastOrdered] = useState([]);
  const [userName, setUserName] = useState('');
  const [totalAllowance, setTotalAllowance] = useState(1200); 
  const [remainingAllowance, setRemainingAllowance] = useState(1200);
  const [topUpHistory, setTopUpHistory] = useState([]); 

  // This effect runs once on initial component mount to load data from localStorage
  useEffect(() => {
    const email = localStorage.getItem('loggedInUserEmail');
    const name = localStorage.getItem('loggedInUserName');
    if (email) {
      setUserEmail(email);
      // The userName is correctly set here from localStorage,
      // defaulting to 'User' if it doesn't exist.
      setUserName(name || 'User'); 
      const savedData = JSON.parse(localStorage.getItem(`userData_${email}`)) || {};
      
      setCart(savedData.cart || []);
      setLastOrdered(savedData.lastOrdered || []);
      setTotalAllowance(savedData.totalAllowance || 1200);
      setRemainingAllowance(savedData.remainingAllowance || 1200);
      setQuantities(savedData.quantities || {});
      setServeOption(savedData.serveOption || '');
      setTopUpHistory(savedData.topUpHistory || []); 
    } else {
      setUserName('User'); // Default name if no user is logged in
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
    
    // Also save the name and email directly to localStorage for global access
    // This is where the name from your login component will be saved.
    if (userName) {
      localStorage.setItem('loggedInUserName', userName);
    }
    if (userEmail) {
      localStorage.setItem('loggedInUserEmail', userEmail);
    }
  }, [cart, lastOrdered, userEmail, userName, totalAllowance, remainingAllowance, quantities, serveOption, topUpHistory]);

  const addOrderToHistory = useCallback((newOrder) => {
    setLastOrdered(prevHistory => [...prevHistory, { ...newOrder, status: 'Placed' }]);
  }, []);

  const addTopUpToHistory = useCallback((newTopUp) => {
    setTopUpHistory(prevHistory => [...prevHistory, newTopUp]);
  }, []);

  const resetCart = () => {
    setCart([]);
    setQuantities({});
    setServeOption('');
  };

  const completeOrderAndDeductBalance = (total) => {
    if (total <= remainingAllowance) {
      setRemainingAllowance(prev => prev - total);
      return true;
    }
    return false;
  };

  const handleAddTopUp = (topUpAmount) => {
    setRemainingAllowance(prev => prev + topUpAmount);
  };
  
  const logout = () => {
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
        topUpHistory 
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
