import { useQuery } from "@tanstack/react-query";
import { getauthUser } from "../lib/api.js";
import React from "react"
const useAuthUser = () => {
  const authUser = useQuery({
    queryKey: ["authUser"],
    queryFn: getauthUser,
    retry: false, // users check
      refetchOnWindowFocus: false,
  });

  console.log("useAuthUser data:", authUser.data);
  return { isLoading: authUser.isLoading, authUser: authUser.data?.user,refetch: authUser.refetch};// return only user data
};
export default useAuthUser;