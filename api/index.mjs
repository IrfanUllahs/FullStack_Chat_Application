import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRouter from "./routes/auth_routes.js";
import conversationRouter from "./routes/conversation_routes.js";
import userRouter from "./routes/user_routes.js";
import messageRouter from "./routes/message_routes.js";
const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;
let DBSTRINGS = process.env.DBSTRINGS;
console.log(DBSTRINGS, "db url is here");

mongoose
  .connect(DBSTRINGS)
  .then(() => {
    console.log("DB connected Successfully");
  })
  .catch((error) => {
    console.error("DB connection error:", error);
  });

app.use(
  cors({
    origin: [
      "https://full-stack-chat-application-front-end.vercel.app",
      "http://localhost:5173",
    ],
    methods: ["POST", "GET", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", authRouter);
app.use("/api/conversation", conversationRouter);
app.use("/api/user", userRouter);
app.use("/api/message", messageRouter);
app.use("/", (req, res) => {
  res.json({ message: "deploy" });
});
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
