import React, { useState } from 'react';
import LogoutButton from './LogoutButton';

const MainComponent = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // For example, if initially logged in

  const handleLogout = () => {
    // Clear authentication token, reset user states, and update isLoggedIn to false
    localStorage.removeItem('authToken');
   
    localStorage.removeItem('user');
    localStorage.removeItem('password');
    setIsLoggedIn(false);
  };

  return (
    <div>
      {/* Other components */}
      {isLoggedIn && <LogoutButton handleLogout={handleLogout} />}
    </div>
  );
};

export default MainComponent;
