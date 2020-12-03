const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const app = express();
const server = http.createServer(app);
const Filter = require("bad-words");

const io = socketio(server);

const port = process.env.PORT;
const publicDirectoryPath = path.join(__dirname, "../public");
app.use(express.static(publicDirectoryPath));
io.on("connection", (socket) => {
  console.log("New WebSocket connection established");
  socket.emit("newMessage", "Welcome to this chat room.");
  socket.broadcast.emit("newMessage", "A new user has joined");
  socket.on("messageFromClient", (message,callback) => {
    const filter = new Filter()
    if(filter.isProfane(message)){
      return callback("Profanity is not allowed");
    }
    io.emit("newMessage", message);
    callback();
  });
  socket.on("sendLocation", (object,callback) => {
    io.emit("newMessage", `https://www.google.com/maps?q=${object.latitude},${object.longitude}`);
    callback();
  });

  socket.on("disconnect", () => {
    io.emit("newMessage", "A user has left");
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
