import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import socket from '../socket';
import DisconnectButton from './DisconnectButton'; 


const PlayerMain = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { role, instrument } = location.state;
  const [message, setMessage] = useState('Waiting for the next song...');
  
  useEffect(() => {
    socket.on('song-selected', ({ fileName, songName, artist }) => {
      navigate('/live', { state: { fileName, songName, artist, role, instrument } });
    });

    // Cleanup the event listener on component unmount
    return () => {
      socket.off('song-selected');
    };
  }, [navigate]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>{message}</h2>
      <DisconnectButton /> 
    </div>
  );
};

export default PlayerMain;