
 import { login } from "../lib/api";
 import { useQueryClient ,useMutation} from "@tanstack/react-query";


export default function useLogin(){
      const queryClient = useQueryClient();
  const {
    mutate,
    isPending,
    error,
  } = useMutation({
    mutationFn: login,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  });
  
  
  return {loginMutation:mutate,isPending,error}
}
