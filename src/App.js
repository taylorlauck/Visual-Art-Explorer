//App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Artworks from './Artworks';
import Login from './Login';
import Signup from './Signup';
import LogoutButton from './LogoutButton';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
  };

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
                <LogoutButton handleLogout={handleLogout} />
              </li>
            )}
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Artworks />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;




