const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");
app.use(cors());
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("Connection successful...");
  socket.on("live_score", (data) => {
    // console.log(data);
    socket.broadcast.emit("updated_score", data);
  });

  socket.on("game_time", (data) => {
    // console.log(data);
  })
});

server.listen(3002, () => {
  console.log("Listening at port 3002..");
});
