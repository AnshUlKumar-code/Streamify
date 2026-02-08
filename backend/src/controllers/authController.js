import z, { success } from "zod"
import User from "../models/User.js";
import jwt from "jsonwebtoken"
import { upsertStreamUser } from "../config/stream.js";



const signup = async (req, res) => {
    try {
        const { email, password, fullName } = req.body
        const schema = z.object({
            fullName: z.string(),
            email: z.string().email(),
            password: z.string().min(5).max(10)

        })

        const validation = schema.safeParse(req.body);
        if (!validation.success) {
            res.status(400).json({ success: false, message: "Invalid credentials format" })
            return;

        }
        const user = await User.findOne({ email });
        if (user) {
            res.status(400).json({ success: false, message: "User with this email already exists" })
            return;
        }
        const random = Math.floor(Math.random() * 100) + 1;
        const randomAvatar = `https://avatar.iran.liara.run/public/${random}.png`
        const newUser = await User.create({
            fullName,
            email,
            password,
            profilePic: randomAvatar
        })
        try {
            await upsertStreamUser({
                id:newUser._id,
                name:newUser.fullName,
                image:newUser.profilePic || ""
            })
            console.log(`Stream user created for ${newUser._id}`);
            
        } catch (error) {
            console.log(`error in creating  stream  user ,${error.mssage}`);
            
            
        }



        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        })

        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 *60* 1000,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production"
        })
        res.status(200).json({
            success: true,
            message: "You are signed up"
        })



    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message })


    }


}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "each field is required" })

        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ success: false, message: "invalid email" })
        }
        const isPasswordCorrect = await user.matchPassword(password)

        if (!isPasswordCorrect) {
            return res.status(400).json({ success: false, message: "Incorrect password" })
        }





        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        })

        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
            secure:process.env.NODE_ENV === "production"
        })
        res.status(200).json({
            success: true,
            message: "Login"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message })


    }
}

const logout = async (req, res) => {
    res.clearCookie("jwt")
    res.status(200).json({ success: true, message: "Lohout successfully" })


}

export { signup, login, logout }