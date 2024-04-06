// server.js
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: 'https://localhost3000',
  }
});
const cors = require('cors');
// Data structure to store chat history for each room
const chatHistory = {};
io.on('connection', (socket) => {
  console.log('a user connected');

  // When a client joins a room
  socket.on('join', (room) => {
    socket.join(room);
    console.log(`User joined room: ${room}`);

    // Send chat history to the user who just joined
    if (chatHistory[room]) {
      socket.emit('chat history', chatHistory[room]);
    }
  });

  // When a client leaves a room
  socket.on('leave', (room) => {
    socket.leave(room);
    console.log(`User left room: ${room}`);
  });

  // When a client sends a message to a room
  socket.on('chat message', (data) => {
    const { room, message } = data;
    console.log(`Message in room ${room}: ${message}`);

    // Save message to chat history
    if (!chatHistory[room]) {
      chatHistory[room] = [];
    }
    chatHistory[room].push(message);

    // Broadcast the message to all clients in the room
    io.to(room).emit('chat message', message);
  });

  // When a client disconnects
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

http.listen(5000, () => {
  console.log('listening on *:5000');
});
