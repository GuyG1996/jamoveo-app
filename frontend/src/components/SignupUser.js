import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BackToHomepageButton from './BackToHomepageButton';
import styles from '../styles/styles'; 

const SignupUser = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [instrument, setInstrument] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/auth/signup/user`, { username, password, instrument });
      const role = 'player';
      navigate('/PlayerMain',{ state: { role, instrument} });
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div style={styles.container}>
      <img
        src="https://avatars.githubusercontent.com/u/12444626?s=200&v=4"
        alt="Moveo Logo"
        style={styles.logo}
      />
      <div style={styles.content}>
        <BackToHomepageButton />
        <h2 style={styles.title}>Signup as Player</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>
            Username:
            <input 
              type="text" 
              value={username}
              placeholder="Username" 
              onChange={(e) => setUsername(e.target.value)} 
              required 
              style={styles.input}
            />
          </label>
          <label style={styles.label}>
            Password:
            <input 
              type="password" 
              value={password}
              placeholder="Password" 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              style={styles.input}
            />
          </label>
          <label style={styles.label}>
            Instrument:
            <select 
              value={instrument} 
              onChange={(e) => setInstrument(e.target.value)} 
              required
              style={styles.select}
            >
              <option value="">Select an instrument</option>
              <option value="Drums">Drums</option>
              <option value="Guitar">Guitar</option>
              <option value="Bass">Bass</option>
              <option value="Saxophone">Saxophone</option>
              <option value="Keyboards">Keyboards</option>
              <option value="Vocals">Vocals</option>
            </select>
          </label>
          <button type="submit" style={styles.button}>
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupUser;