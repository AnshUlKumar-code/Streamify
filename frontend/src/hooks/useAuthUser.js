
import {
 useQuery
} from '@tanstack/react-query'
import { getAuthUser } from "../lib/api"

const useAuthUser=()=>{
     const {data,isLoading,error}=useQuery({
    queryKey:["authUser"],
    queryFn:getAuthUser,
  })

  const authUser=data?.user;
  console.log(authUser);
  
  return {data,isLoading,error,authUser}

}
export default useAuthUser;