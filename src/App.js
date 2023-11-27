import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './Login';
import Artworks from './artworks';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/login">Login/Sign Up</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Artworks />} />
          {/* Pass setIsLoggedIn to Login component */}
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;












   
 


