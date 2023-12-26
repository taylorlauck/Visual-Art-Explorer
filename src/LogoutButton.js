import React from 'react';

const LogoutButton = ({ setIsLoggedIn }) => {
  const handleLogout = () => {
    // Perform logout actions, e.g., clearing tokens, session data, etc.
    // Example:
    localStorage.removeItem('token');
    setIsLoggedIn(false); // Update the login status to false upon logout
  };

  if (typeof document !== 'undefined') {
    // Render the button only in a browser environment
    return <button onClick={handleLogout}>Logout</button>;
  } else {
    // Handle the case where the component is not rendered in a browser environment
    return null;
  }
};

export default LogoutButton;




