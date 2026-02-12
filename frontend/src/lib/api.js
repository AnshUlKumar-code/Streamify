import axios from "axios";

 export const signup = async (signupData) => {
    
    
  const response = await axios.post(import.meta.env.VITE_BASE_URL+"/auth/signup", signupData, { withCredentials: true });
  console.log(response.data);
  
  return response.data;
};

export const getAuthUser=async()=>{
      const res=await axios.get(import.meta.env.VITE_BASE_URL+"/auth/me",{
        withCredentials: true
      })
      return res.data

    }

export const completeOnboarding = async (userData) => {
  const response = await axios.post(import.meta.env.VITE_BASE_URL+"/auth/onboarding", userData,{
        withCredentials: true
      });
  return response.data;
};

export const login = async (loginData) => {
  const response = await axios.post(import.meta.env.VITE_BASE_URL+"/auth/login", loginData,{
        withCredentials: true
      });
  return response.data;
};
