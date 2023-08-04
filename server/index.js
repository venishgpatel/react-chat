const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000'
  }
})

io.on("connection", (socket) => {
  console.log('New user connected:', socket.id);

  socket.on('join_chat', (data) => {
    console.log(`User ${socket.id} joined the chat`)
  });

  socket.on('send_message', (data) => {
    console.log(`User ${socket.id} (${data.userName}) sent the message at ${data.time}.`)
    socket.broadcast.emit('receive_message', data);
  });

  socket.on("disconnect", () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(3001, () => {
  console.log('Node server started on port 3001');
});