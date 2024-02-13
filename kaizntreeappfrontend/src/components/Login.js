// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
// import titleImage from './src/images/title.png';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://manjju12.pythonanywhere.com/api/login/', { username, password });
      // Save the received token to local storage or context
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard'); // Navigate to the dashboard or home page
    } catch (error) {
      console.error('Login error', error);
      // Handle errors, such as showing an error message to the user
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleLogin}>
        <img src="title.png" alt="Kaizntree" className="logo" />
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Log In</button>
      </form>
      <p>Don't have an account? <Link to="/create-account">Create Account</Link></p>
      <p><Link to="/forgot-password">Forgot Password?</Link></p>
    </div>
  );
};

export default Login;
