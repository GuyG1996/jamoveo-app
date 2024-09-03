import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BackToHomepageButton from './BackToHomepageButton';


const SignupUser = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [instrument, setInstrument] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("api_url", process.env.REACT_APP_API_URL);
      await axios.post(`${process.env.REACT_APP_API_URL}/auth/signup/user`, { username, password, instrument });
      const role = 'player';
      navigate('/PlayerMain',{ state: { role, instrument} });
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <BackToHomepageButton />
      <h2>Sign Up as User</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </label>
        <label>
          Password:
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </label>
        <label>
          Instrument:
          <select 
            value={instrument} 
            onChange={(e) => setInstrument(e.target.value)} 
            required
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupUser;