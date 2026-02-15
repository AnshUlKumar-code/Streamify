import jwt from "jsonwebtoken"
import User from "../models/User.js";


async function authMiddleware(req,res,next){
try {
    console.log("|||  AUTH MIDDLE WARE FUNCTION |||||    ----------------------------------");
    
    //  console.log("Cookies ->", req.cookies)
    // console.log("Header Cookie ->", req.headers.cookie)
        const token=req.cookies.jwt;


    if(!token){
        return res.status(400).json({message:"No token found"})
    }
    const decode=jwt.verify(token,process.env.JWT_SECRET)
    if(!decode){
        return res.status(400).json({
            success:false,
            message:"Not a valid token"
        })
    }
    const userid=decode.id;
    const findUser=await User.findById(userid)
    if(!findUser){
        return res.status(400).json({
            message:"User does not exist"
        })
    }
    req.user=findUser
    // res.json({
    //     message:"u are authenticated"
    // })
    next()

} catch (error) {
    console.log(error);
    res.status(400).json({success:false,message:error.message})
    
    
}

}

export {authMiddleware}