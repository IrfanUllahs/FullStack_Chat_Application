import express from "express";
import message_controller from "../controllers/message._controller.js";
const router = express.Router();
router.post("/create", message_controller.createMessage);
router.get("/get/:senderId/:receiverId", message_controller.getMessage);
router.delete("/clearchat/:senderId/:receiverId", message_controller.clearChat);
router.delete("/delete/:id", message_controller.deleteMessage);
export default router;
