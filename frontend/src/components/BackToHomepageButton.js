import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackToHomepageButton = () => {
  const navigate = useNavigate();

  return (
    <button 
      onClick={() => navigate('/')} 
      style={{
        position: 'fixed',
        top: '10px',
        right: '10px',
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
      }}
    >
      Back to Homepage
    </button>
  );
};

export default BackToHomepageButton;
