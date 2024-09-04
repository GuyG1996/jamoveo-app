import io from 'socket.io-client';

const socket = io(process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000', {
  transports: ['websocket'],
  upgrade: false
});

socket.on('connect', () => {
  console.log('Socket connected:', socket.id);
});


socket.on('connect_error', (err) => {
  console.error('Connection error:', err.message);
});

export default socket;
