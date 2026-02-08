import mongoose from "mongoose"


export async function connectDB(){
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`connected to DB ${process.env.MONGO_URL}`);
        
    } catch (error) {
        console.log(error);
    }

}
