require('dotenv').config()
// imports
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const routes = require("./router/index")

const http = require('http');
const socketIo = require('socket.io');


app.use(express.json())

app.use(cors())

const server = http.createServer(app);


// route
app.use("/" ,routes) 
app.get('/', (req, res)=>{
  res.send({message : "Welcome to the API"})
})

// socket


const io = require("socket.io")(server, {
  cors: {
    origin: "https://handyman-home-services.netlify.app",
  },
});

let activeUsers = [];

io.on("connection", (socket) => {
  // add new User
  socket.on("new-user-add", (newUserId) => {
    // if user is not added previously
    if (!activeUsers.some((user) => user.userId === newUserId)) {
      activeUsers.push({ userId: newUserId, socketId: socket.id });
    }
    // send all active users to new user
    io.emit("get-users", activeUsers);
  });

  socket.on("disconnect", () => {
    // remove user from active users
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    // send all active users to all users
    io.emit("get-users", activeUsers);
  });

  // send message to a specific user
  socket.on("send-message", (data) => {
    const { receiverId } = data;
    const user = activeUsers.find((user) => user.userId === receiverId);
    if (user) {
      io.to(user.socketId).emit("recieve-message", data);
    }
  });
});


// server init::
const port = process.env.PORT || 5000
app.listen(port , ()=> console.log(`server running on port ${port}`))

// connecting to database
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("Connected to database!"))
  .catch((err) => console.error("Error connecting to database:", err));