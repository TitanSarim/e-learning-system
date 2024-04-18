const cluster = require('cluster');
const cors = require("cors");
const { app } = require('./app');
const os = require('os');
const http = require('http');
const socket = require("socket.io");


if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);
  const numCPUs = os.cpus().length;
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    console.log(`Forking a new worker...`);
    cluster.fork();
  });
} else {
  const app = require('./app');
  app.use(cors());

 const server =  app.listen(process.env.PORT, () => {
    console.log(`Worker ${process.pid} is running on http://localhost:${process.env.PORT}`);
  });

  
const io = socket(server,  {
  cors: {
    origin: "http://localhost:3000",
    methods: ["SET", "GET", "POST"],
    credentials: true,
  },
});

  // Socket.io logic
  global.onlineUsers = new Map();
  io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
      onlineUsers.set(userId, socket.id);
    });
    
    socket.on("send-msg", (data) => {
      const sendUserSocket = onlineUsers.get(data.ToUserId);
      console.log("sendUserSocket", sendUserSocket)
      if (sendUserSocket) {
        socket.to(sendUserSocket).emit("msg-recieve", data.message);
      }
    });
  });

  process.on('uncaughtException', (err) => {
    console.error(`Worker ${process.pid} encountered an uncaught exception:`, err);
    process.exit(1);
  });

  process.on('unhandledRejection', (reason, promise) => {
    console.error(`Worker ${process.pid} encountered an unhandled rejection at:`, promise, 'reason:', reason);
    process.exit(1);
  });
}
