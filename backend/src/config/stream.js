import {StreamChat} from "stream-chat"
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

const apikey=process.env.STREAM_API_KEY
const apiSecret=process.env.STREAM_API_SECRET

if(!apikey || !apiSecret){
    console.error("Stream API key or Secret are missing");

    
}
const streamClient=StreamChat.getInstance(apikey,apiSecret)

export const upsertStreamUser=async(userData)=>{
    try {
        console.log(apikey);
        console.log(apiSecret);
        
        
        await streamClient.upsertUsers([userData])
        return userData
    } catch (error) {
        console.error("Error upserting Stream user:",error)
        
    }
}