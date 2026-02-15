import axios from "axios";

 export const signup = async (signupData) => {
    
    
  const response = await axios.post(import.meta.env.VITE_BASE_URL+"/auth/signup", signupData, { withCredentials: true });
  console.log(response.data);
  console.log("you have signed up");
  
  
  return response.data;
};

export const getAuthUser=async()=>{
   try {
       const res=await axios.get(import.meta.env.VITE_BASE_URL+"/auth/me",{
        withCredentials: true
      })
     
      
      return res.data
   } catch (error) {
     console.log("Error in getAuthUser:", error);
    return null;
    
   }

  }

export const completeOnboarding = async (userData) => {
  const response = await axios.post(import.meta.env.VITE_BASE_URL+"/auth/onboarding", userData,{
        withCredentials: true
      });
      console.log("you are on onboarded page");
      
  return response.data;
};

export const login = async (loginData) => {
  const response = await axios.post(import.meta.env.VITE_BASE_URL+"/auth/login", loginData,{
        withCredentials: true
      });
      console.log("you have logged in");
      
  return response.data;
};
export const logout = async () => {
  console.log("Sending logout request with credentials...");
  
  const res = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/auth/logout`,
    {},
    { 
      withCredentials: true,  // CRITICAL!
    }
  );
  
  console.log("Logout response:", res.data);
  return res.data;
};

export async function getUserFriends() {
  const response = await axios.get(import.meta.env.VITE_BASE_URL+"/users/friends",{
        withCredentials: true
      });
  return response.data;
}

export async function getRecommendedUsers() {
  const response = await axios.get(import.meta.env.VITE_BASE_URL+"/users",{
        withCredentials: true
      });
  return response.data;
}

export async function getOutgoingFriendReqs() {
  const response = await axios.get(import.meta.env.VITE_BASE_URL+"/users/outgoing-friend-request",{
        withCredentials: true
      });
      console.log("O------------Outgoing friend requrest--------------");
      
 return response.data;
}

export async function sendFriendRequest(userId) {
  try {
  
    
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/friend-request/${userId}`,
      {},
      { withCredentials: true }
    );
    
    return response.data;
  } catch (error) {
    // Log the actual backend error message
    console.log("Error response:", error.response?.data);
    console.log("Error status:", error.response?.status);
    throw error;
  }
}

export async function getFriendRequests() {
  try {
    const response = await axios.get(import.meta.env.VITE_BASE_URL+"/users/friend-request",{
        withCredentials: true
      });
   
      
  return response.data;
  } catch (error) {
      console.log("Error response:", error.response?.data);
    console.log("Error status:", error.response?.status);
    throw error;
    
  }
}

export async function acceptFriendRequest(requestId) {
try {
    const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/users/friend-request/${requestId}/accept`,{},{
        withCredentials: true
      });
  return response.data;
} catch (error) {
   console.log("Error response:", error.response?.data);
    console.log("Error status:", error.response?.status);
    throw error;
  
  
}
}

export async function getStreamToken() {
  try {
    const response = await axios.get(import.meta.env.VITE_BASE_URL+"/chat/token",{
        withCredentials: true
      });
  return response.data;
  } catch (error) {
       console.log("Error response:", error.response?.data);
    console.log("Error status:", error.response?.status);
    throw error;
    
  }
}
