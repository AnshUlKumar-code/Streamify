import { FriendRequest } from "../models/FriendRequest.js";
import User from "../models/User.js";

async function getRecommendedUsers(req, res) {
    try {
        const currentUserId = req.user.id;
        const currentUser = req.user;
        const recommendedUser = await User.find({
            $and: [
                { _id: { $ne: currentUserId } },
                { _id: { $nin: currentUser.friends } },
                { isOnboarded: true }
            ]
        })
        res.status(200).json(recommendedUser)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" })


    }
}

async function getMyFriends(req, res) {
    try {
        const user = await User.findById(req.user.id)
            .select("friends")
            .populate("friends", "fullName profilePic nativeLanguage learningLanguage")
        res.status(200).json(user.friends)


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message })


    }
}

async function sendFriendRequest(req, res) {
    try {
        const myId = req.user.id;
        const { id } = req.params;
        if (myId == id) {
            return res.status(400).res({
                message: "You cannot send friend req to youself"
            })

        }
        const recipient = await User.findById(id);
        if (!recipient) {
            return res.status(400).json({
                message: "recipient not found"
            })

        }

        if (req.user.friends.includes(recipient._id)) {
            return res.status(400).json({
                message: "Both are Already Friends"
            })
        }
        const existingRequest = await FriendRequest.findOne({
            $or: [
                { sender: myId, recipient: id },
                { sender: id, recipient: myId }
            ]
        })
        if (existingRequest) {
            return res.status(400).json({
                message: "Request has already been sent"
            })
        }
        const newFriendRequest = await FriendRequest.create({
            sender: myId,
            recipient: id
        })
        res.status(200).json({
            success: true,
            newFriendRequest,
            message: "Request has been sent"
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message })

    }
}

async function acceptFriendRequest(req, res) {
    try {
        console.log("=======acceptFrriendRequest===========");
        
        const {id}  = req.params;
        const friendRequest = await FriendRequest.findById(id);
        if (!friendRequest) {
            return res.status(400).json({
                message: "friend request not found"
            })
        }
        friendRequest.status = "accepted";
        await friendRequest.save();

        const senderId = friendRequest.sender;
        const recipientId = friendRequest.recipient;



        await User.findByIdAndUpdate(senderId, {
            $addToSet: { friends: recipientId } 
        });
        await User.findByIdAndUpdate(recipientId, {
            $addToSet: { friends: senderId }
        });


        res.status(200).json({
            success: true,
            friendRequest,
            message: "friend request accepted"
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message })

    }



}

 async function getFriendRequest(req, res) {
  try {
   
    
    const incomingReqs = await FriendRequest.find({
      recipient: req.user.id,
      status: "pending",
    }).populate("sender", "fullName profilePic nativeLanguage learningLanguage");

    const acceptedReqs = await FriendRequest.find({
      sender: req.user.id,
      status: "accepted",
    }).populate("recipient", "fullName profilePic");
  
    
    
    

    res.status(200).json({ incomingReqs, acceptedReqs });
  } catch (error) {
    console.log("Error in getPendingFriendRequests controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
async function outgoingFriendRequest(req,res){
    try {
        const id=req.user.id;
        const outgoingfriendRequest=await FriendRequest.find({
            sender:id,
            status:"pending"
        }).populate("recipient","fullName nativeLanguage learningLanguage profilePic")
        res.status(200).json(outgoingfriendRequest)
    } catch (error) {
         console.log(error);
        res.status(500).json({ message: error.message })
    
        
    }
}


export { getRecommendedUsers, getMyFriends,acceptFriendRequest, sendFriendRequest,getFriendRequest,outgoingFriendRequest }