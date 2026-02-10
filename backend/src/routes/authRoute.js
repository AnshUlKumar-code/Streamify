import {Router} from "express"
import { login,logout,signup ,onBoarding} from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";


const authRouter=Router();

authRouter.post("/signup",signup)

authRouter.post("/login",login)

authRouter.post("/logout",logout)

authRouter.post("/onboarding",authMiddleware,onBoarding)




export default authRouter




