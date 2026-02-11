import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getMyFriends, getRecommendedUsers, sendFriendRequest ,acceptFriendRequest,getFriendRequest,outgoingFriendRequest} from "../controllers/userController.js";


const userRouter=Router();

userRouter.get("/friends",authMiddleware,getMyFriends)
userRouter.get("/",authMiddleware,getRecommendedUsers)


userRouter.post("/friend-request/:id",authMiddleware,sendFriendRequest)
userRouter.post("/friend-request/:id/accept",authMiddleware,acceptFriendRequest)
userRouter.get("/friends",authMiddleware,getFriendRequest)
userRouter.get("/outgoing-friend-request",authMiddleware,outgoingFriendRequest)

export {userRouter}
