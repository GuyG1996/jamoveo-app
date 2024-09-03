// src/components/Homepage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/styles'; 

const Homepage = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div style={styles.container}>
      <img
        src="https://avatars.githubusercontent.com/u/12444626?s=200&v=4"
        alt="Moveo Logo"
        style={styles.logo}
      />
      <div style={styles.content}>
        <h1 style={styles.title}>JaMoveo Web App</h1>
        <p style={styles.subtitle}>Welcome to JaMoveo web app, please select your desired action:</p>
        <div style={styles.buttonContainer}>
          <button onClick={() => handleNavigate('/signup-admin')} style={styles.button}>
            Signup as Admin
          </button>
          <button onClick={() => handleNavigate('/signup-user')} style={styles.button}>
            Signup as User
          </button>
          <button onClick={() => handleNavigate('/login')} style={styles.button}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
