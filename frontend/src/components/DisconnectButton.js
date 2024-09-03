import React from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const DisconnectButton = () => {
  const navigate = useNavigate();

  const handleDisconnect = () => {
    socket.disconnect();
    navigate('/');
  };

  return (
    <button onClick={handleDisconnect} style={{ position: 'absolute', top: '10px', right: '10px' }}>
      Disconnect
    </button>
  );
};

export default DisconnectButton;
