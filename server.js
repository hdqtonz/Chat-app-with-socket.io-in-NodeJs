const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const server = http.createServer(app);

const Port = process.env.PORT || 3000;

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// routes
// app.get("/test", (req, res) => {
//   res.sendFile("");
// });

server.listen(Port, () => {
  console.log(`Server runing on port : ${Port}`);
});

/////////////////////////////////////////////////
//----------------Socket Io Setup--------------//
/////////////////////////////////////////////////

const io = require("socket.io")(server);

io.on("connection", (socket) => {
  console.log(`Socket Connected......`);
  socket.on("disconnect", () => {
    console.log("user disconnected.....");
  });

  socket.on("message", (msg) => {
    // console.log(msg);

    socket.broadcast.emit("message", msg);
  });
});
