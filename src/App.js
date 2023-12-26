//app.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Artworks from './Artworks';
import LogoutButton from './LogoutButton'; // Import the LogoutButton component
import { FavoritesProvider  } from './FavoritesContext';
import FavoritesPage from './FavoritesPage';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSignup = () => {
    console.log('Handling signup...');
   
    setIsLoggedIn(false);// Add logic for signup if needed
  };



  return (
    <Router>
       <FavoritesProvider> {/* Wrap entire app with FavoritesProvider */}
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
              <> 
               <li>
          <Link to="/favorites">Favorites</Link>
        </li>
              <li>
                {/* Render LogoutButton component when logged in */}
                <LogoutButton setIsLoggedIn={setIsLoggedIn}/>
              </li>
              </>
            )}
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Artworks />} />
          <Route path="/signup" element={<Signup handleSignup={handleSignup} />} />
          <Route path="/favorites" element={<FavoritesPage setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} /> 
        
          
        </Routes>
      </div>
      </FavoritesProvider>
    </Router>
  );
};

export default App;