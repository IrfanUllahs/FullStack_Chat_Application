import express from "express";
const router = express.Router();
import conversationController from "../controllers/conversation.controller.js";
router.post("/create", conversationController.createConversation);
router.get("/get/:userId", conversationController.getConversation);
export default router;
