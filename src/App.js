import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Artworks from './Artworks';
import LogoutButton from './LogoutButton'; // Import the LogoutButton component

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSignup = () => {
    console.log('Handling signup...');
    localStorage.removeItem('token');
    setIsLoggedIn(false);// Add logic for signup if needed
  };

  //const checkLoginStatus = () => {
    // Logic to determine user login status
    // For example, check session data, tokens, or any authentication mechanism
    // Return true if logged in, false otherwise
    // Example:
   // return localStorage.getItem('token') !== null;
  

  return (
    <Router>
      <div>
        <nav>
          <ul>
            {!isLoggedIn ? (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/signup">Signup</Link>
                </li>
              </>
            ) : (
              <li>
                {/* Render LogoutButton component when logged in */}
                <LogoutButton setIsLoggedIn={setIsLoggedIn}/>
              </li>
            )}
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Artworks />} />
          <Route path="/signup" element={<Signup handleSignup={handleSignup} />} />
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />} // Pass setIsLoggedIn as a prop
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;





