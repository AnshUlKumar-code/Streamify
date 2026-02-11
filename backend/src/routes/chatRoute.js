import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getStreamToken } from "../controllers/chatController.js";

const chatRouter=Router();

chatRouter.get("/token",authMiddleware,getStreamToken)
export {chatRouter}