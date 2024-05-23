require('dotenv').config();
// imports
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require("./router/index");

const http = require('http');
const socketIo = require('socket.io');

app.use(express.json());
app.use(cors());

// Create HTTP server
const server = http.createServer(app);

// Route
app.use("/", routes);
app.get('/', (req, res) => {
  res.send({ message: "Welcome to the API" });
});

// Socket.IO
const io = socketIo(server, {
  cors: {
    origin: "https://handyman-home-services.netlify.app",
  },
});

let activeUsers = [];

io.on("connection", (socket) => {
  // Add new user
  socket.on("new-user-add", (newUserId) => {
    // If user is not added previously
    if (!activeUsers.some((user) => user.userId === newUserId)) {
      activeUsers.push({ userId: newUserId, socketId: socket.id });
    }
    // Send all active users to new user
    io.emit("get-users", activeUsers);
  });

  socket.on("disconnect", () => {
    // Remove user from active users
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    // Send all active users to all users
    io.emit("get-users", activeUsers);
  });

  // Send message to a specific user
  socket.on("send-message", (data) => {
    const { receiverId } = data;
    const user = activeUsers.find((user) => user.userId === receiverId);
    if (user) {
      io.to(user.socketId).emit("receive-message", data);
    }
  });
});

// Server initialization
const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server running on port ${port}`));

// Connecting to database
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("Connected to database!"))
  .catch((err) => console.error("Error connecting to database:", err));
