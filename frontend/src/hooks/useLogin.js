import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../lib/api.js";
import React from "react"
import { useNavigate } from "react-router-dom";
const useLogin = () => {
  const queryClient = useQueryClient();
const navigate = useNavigate();
  const { mutate, isPending, error } = useMutation({
    mutationFn: login,
    onSuccess: () => {queryClient.invalidateQueries({ queryKey: ["authUser"] });
        console.log("login successfully");
          // navigate("/onboarding");
  },
      onError: (error) => {
      console.error("Login failed:", error);
      toast.error(error?.response?.data?.message || "Invalid email or password");
    },
  
  })

  return { error, isPending, loginMutation: mutate };
};

export default useLogin;