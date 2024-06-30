const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:5173",
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};
const findUser = (id) => {
  return users.find((user) => user.userId == id);
};
io.on("connection", (socket) => {
  // console.log("user connected", users);

  socket.on("add user", (userId) => {
    console.log(userId);
    addUser(userId, socket.id);

    io.emit("get users", users);
  });
  socket.on("sendMessage", (data) => {
    console.log(data);
    let user = findUser(data.receiverId);
    console.log(user, "user:");
    if (user) {
      console.log(user.socketId);
      io.to(user.socketId).emit("getMessage", data);
    }
  });
  socket.on("handleblock", ({ id, isBlockedbyMe }) => {
    let user = findUser(id);
    if (user) {
      console.log(user);
      io.to(user.socketId).emit("blockOrUnblock", isBlockedbyMe);
    }
  });
  const user = socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
