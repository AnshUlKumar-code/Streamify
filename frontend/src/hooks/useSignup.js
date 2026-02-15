 import { signup } from "../lib/api";
 import { useQueryClient ,useMutation} from "@tanstack/react-query";


function useSignup(){
    const queryClient = useQueryClient();
 
  const {
    mutate,
    isPending,
    error,
  } = useMutation({
    mutationFn: signup,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  });
  
  
  return { signupMutation:mutate,isPending,error}

}
export default useSignup;

