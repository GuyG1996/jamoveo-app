require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000', 
    methods: ['GET', 'POST'], 
  }
});

// Enable CORS for all origins during development
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  methods: 'GET,POST,PUT,DELETE',
  credentials: true,
}));

// Middleware for parsing JSON and URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the frontend build directory
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Define API routes
const authRoutes = require('./routes/auth');
const songsRoutes = require('./routes/songs');

app.use('/api/auth', authRoutes);
app.use('/api/songs', songsRoutes);

// Basic route to check if the server is running
app.get('/', (req, res) => {
  res.send('JaMoveo API Running');
});

// Serve the frontend application for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// Socket.io connection handler
io.on('connection', (socket) => {
  console.log(`New client connected`);

  // Handle song selection
  socket.on('song-selected', (song) => {
    io.emit('song-selected', song);
  });

  socket.on('disconnect', () => {
    console.log(`Client disconnected`);
  });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {})
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
