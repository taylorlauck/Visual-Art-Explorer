//it was weird because I got the adduser and Signup mixed up so this is my Signup page now lol
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = ({ handleSignup }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/adduser', {
        username,
        password,
      });

      if (response.data.success) {
        handleSignup(); // Call the handleSignup function after successful signup
        setSignupSuccess(true); // Set signup success state to display message
        console.log('Signup successful');
      } else {
        console.log('Signup failed:', response.data);
      }

      console.log('Response Data:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      {signupSuccess ? (
        <div>
          <p>Signup successful! Proceed to Artworks</p>
          <button onClick={() => navigate('/')}>Home</button>
        </div>
      ) : (
        <div>
          <h2>Signup</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Signup</button>
          </form>
          <button onClick={() => navigate('/')}>Home</button> {/* Add a Home button */}
        </div>
      )}
    </div>
  );
};

export default Signup;









