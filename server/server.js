const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const taskRoutes = require("./routes/taskRoutes");

const app = express();   // create app first

app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

app.set("io", io);   // make io available in routes

app.use("/api/tasks", taskRoutes);   // now app exists

io.on("connection", (socket) => {
  console.log("User connected");

  setInterval(() => {
    socket.emit("systemUpdate", {
      cpu: Math.floor(Math.random() * 100)
    });
  }, 3000);

  setInterval(() => {
    socket.emit("newAlert", {
      message: "Edge node overloaded",
      level: "High"
    });

    socket.emit("nodeStatus", {
      node: "Edge Node 2",
      status: "Busy"
    });
  }, 5000);

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});