import React, { createContext, useContext, useState, useEffect } from 'react';

// Create context
export const RightClickContext = createContext();



// Provider component
export const RightClickProvider = ({ children }) => {
  const [isRightClickDisabled, setIsRightClickDisabled] = useState(true);

  useEffect(() => {
    const handleContextMenu = (e) => {
      if (isRightClickDisabled) {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, [isRightClickDisabled]);

  // Functions to enable or disable right click
  const enableRightClick = () => setIsRightClickDisabled(false);
  const disableRightClick = () => setIsRightClickDisabled(true);
  const toggleRightClick = () => setIsRightClickDisabled(prev => !prev);

  const value = {
    isRightClickDisabled,
    enableRightClick,
    disableRightClick,
    toggleRightClick
  };

  return (
    <RightClickContext.Provider value={value}>
      {children}
    </RightClickContext.Provider>
  );
};