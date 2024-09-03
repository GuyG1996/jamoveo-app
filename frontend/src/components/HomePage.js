import React from 'react';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>JaMoveo Web App</h1>
      <p>Welcome to JaMoveo web app, please select your desired action:</p>
      <div>
        <button onClick={() => handleNavigate('/signup-admin')} style={{ margin: '10px' }}>
          Signup as Admin
        </button>
        <button onClick={() => handleNavigate('/signup-user')} style={{ margin: '10px' }}>
          Signup as User
        </button>
        <button onClick={() => handleNavigate('/login')} style={{ margin: '10px' }}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Homepage;
