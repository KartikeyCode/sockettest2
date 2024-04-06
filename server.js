const express = require("express");
const cors = require("cors"); // Import cors module
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"], // Allow only GET and POST requests
  },
});

const chatHistory = {};

app.use(cors()); // Enable CORS for all routes in Express app

io.on("connection", (socket) => {
  socket.emit("your id", socket.id);
  
  socket.on("join", (room) => {
    socket.join(room);
    console.log(`User joined room: ${room}`);

    if (chatHistory[room]) {
      socket.emit("chat history", chatHistory[room]);
    }
    
    socket.on("leave", (room) => {
      socket.leave(room);
      console.log(`User left room: ${room}`);
    });
    
    socket.on("chat message", (data) => {
      const { room, message } = data;
      console.log(`Message in room ${room} from ${socket.id}: ${message}`);
      
      if (!chatHistory[room]) {
        chatHistory[room] = [];
      }
      chatHistory[room].push({ id: socket.id, body: message });
      
      io.to(room).emit("chat message", { id: socket.id, body: message });
    });
    
    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
});
  
  const PORT = 5000;
http.listen(PORT, () => {
  console.log(`Listening on *:${PORT}`);
});