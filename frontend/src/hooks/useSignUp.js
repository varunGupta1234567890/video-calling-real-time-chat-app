import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup } from "../lib/api.js";
import React from "react"
// import { useNavigate } from "react-router-dom";
const useSignUp = () => {
  const queryClient = useQueryClient();
// const navigate = useNavigate();
  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: signup,
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["authUser"] }),
    console.log("signup successfully");
    
      // navigate("/login");
  },
    onError: (error) => {
  console.error("Signup Error:", error);  
}

  });

  return { isPending, error, signupMutation:mutateAsync };
};
export default useSignUp;