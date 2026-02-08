import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"


const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
       
    },
    password:{
        type:String,
        required:true,
        minlength:5

    },
    bio: {
        type: String,
        default: ""

    },
    profilePic: {
        type: String,
        default: ""
    },
    nativeLanguage: {
        type: String,

    },
    learningLanguage: {
        type: String,
        default: ""
    },
    location: {
        type: String,
        default: ""
    },
    isOnboarded: {
        type: Boolean,
        default: false
    },
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]


}, { timestamps: true })



userSchema.pre("save", async function () {
    try {
        if (!this.isModified("password")) return ;
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt)
        

    } catch (error) {
        console.log(error);

    }
})

userSchema.methods.matchPassword=async function(enterdPassword){
    const isPasswordCorrect=await bcrypt.compare(enterdPassword,this.password)
    return isPasswordCorrect;
}


const User = mongoose.model("User", userSchema)




export default User