import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './CreateAccount.css'; // Make sure the path to your CSS file is correct

const CreateAccount = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleCreateAccount = async (event) => {
    event.preventDefault();
    try {
      // Replace with the actual endpoint you have for account creation
      const response = await axios.post('https://manjju12.pythonanywhere.com/api/create-account/', { username, email, password });
      console.log(response.data);
      // Handle account creation success
      // Redirect to login page or dashboard as needed
      navigate('/login');
    } catch (error) {
      console.error('Account creation error', error.response || error);
      // Handle account creation error here
    }
  };

  return (
    <div className="create-account-container">
      <form onSubmit={handleCreateAccount}>
        <img src="title.png" alt="Kaizntree Logo" className="logo" />
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit" className="create-account-button">Create Account</button>
      </form>
      <p className="login-link">
        Already have an account? <Link to="/login">Log In</Link>
      </p>
    </div>
  );
};

export default CreateAccount;
