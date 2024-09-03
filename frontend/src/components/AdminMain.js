import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import DisconnectButton from './DisconnectButton';

const AdminMain = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { role, instrument } = location.state;
  console.log("role: ", role);
  console.log("instrument: ", instrument);

  const handleSearch = async () => {
    
    try {
      const response = await axios.get(`http://localhost:5000/api/songs/search?query=${searchQuery}`);
      const results = response.data;

      if (results.length === 0) {
        alert('No results found. Please try a different search.');
      } else {
        navigate('/results', { state: { results, role, instrument} });
      }
    } catch (error) {
      console.error('Search failed:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Search any song...</h2>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Enter song name or lyrics"
      />
      <button onClick={handleSearch}>Search</button>
      <DisconnectButton />
    </div>
  );
};

export default AdminMain;
