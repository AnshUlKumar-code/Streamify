import express from "express"
import dotenv from  "dotenv"
import userRouter from "./routes/authRoute.js"
import { connectDB } from "./config/DBconfig.js";
import cookieParser from "cookie-parser"



dotenv.config({path:"../.env"});
const app=express()
const port=process.env.PORT


app.use(express.json())
app.use(cookieParser());




app.use("/api/auth",userRouter);

app.get("/",(req,res)=>{
    res.json({
        message:"API is working"
    })
})

app.listen(port,()=>{
    console.log(`server is running on port ${port} `);
    connectDB();
    
})