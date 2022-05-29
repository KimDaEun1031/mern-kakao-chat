require("dotenv").config();
require("./config/mongo.connection");

const express = require("express");
const socketIo = require("socket.io");
const http = require("http");
const cors = require('cors');
const port = process.env.PORT|| 5000;

const app = express();
const server = http.createServer(app);

const userRouter = require("./routes/userRouter");
const chatRouter = require("./routes/chatRouter");

app.use(cors({
  origin: "http://localhost:3000",
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/user", userRouter);
app.use("/chat", chatRouter);

// 서버 소켓 연결 설정
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// 서버 소켓 연결
io.on("connection", (socket) => {
  console.log("5000 connection ", socket.id);

  // 클라이언트 쪽으로 메세지 받기
  socket.on("init", (payload) => {
    console.log("server : ", payload);
  });
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
