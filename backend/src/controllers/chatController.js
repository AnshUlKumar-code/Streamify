import { generateStreamToken } from "../config/stream.js";


export async function getStreamToken(req,res){
    try {
        const token=generateStreamToken(req.user.id)
        res.status(200).json({
            token,
            message:"Stream token generated"
        })
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:error.message
        })
        
        
    }
}