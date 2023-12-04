import React from 'react';

const LogoutButton = ({ setIsLoggedIn }) => {
  const handleLogout = () => {
    // Perform logout actions, e.g., clearing tokens, session data, etc.
    // Example:
    localStorage.removeItem('token');
    setIsLoggedIn(false); // Update the login status to false upon logout
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;



