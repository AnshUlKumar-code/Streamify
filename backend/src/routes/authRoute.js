import {Router} from "express"
import { login,logout,signup ,onBoarding} from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";


const userRouter=Router();

userRouter.post("/signup",signup)

userRouter.post("/login",login)

userRouter.post("/logout",logout)

userRouter.post("/onboarding",authMiddleware,onBoarding)

export default userRouter




