//App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Artworks from './Artworks';

const App = () => {
  const handleSignup = () => {
    // Logic for handling signup, if needed
    // For example, setting a flag or updating state
    console.log('Handling signup...');
  };


 const IsLoggedIn = ()  =>{

  console.log('Handling login...');
 };// Replace this with your logic to determine user login status

  return (
    <Router>
      <div>
        <nav>
          <ul>
           
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Artworks />} />
          <Route path="/login" element={<Login IsLoggedIn={IsLoggedIn} />} />
          <Route path="/signup" element={<Signup handleSignup={handleSignup} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;




