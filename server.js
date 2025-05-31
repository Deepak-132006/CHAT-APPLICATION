// server.js

const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

// Initialize Express app and HTTP server
const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Handle Socket.io connections
io.on('connection', socket => {
  console.log('New user connected:', socket.id);

  // Listen for chat messages from the client
  socket.on('chatMessage', msg => {
    console.log('Received message:', msg);
    // Broadcast the message to all connected clients
    io.emit('message', msg);
  });

  // Handle user disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
