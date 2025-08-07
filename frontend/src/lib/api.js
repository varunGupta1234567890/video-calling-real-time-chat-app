import { axiosInstance } from "./axios";

export const signup = async (signupData) => {
  const response = await axiosInstance.post("/users/register", signupData);
  console.log(response.data);
  
  return response.data;
};

export const login = async (loginData) => {
  const response = await axiosInstance.post("/users/login", loginData);
  console.log(response.data);
  return response.data;
};
export const logout = async () => {
  const response = await axiosInstance.post("/users/logout");
  return response.data;
};

export const getauthUser = async () => {
//this fechdhes current authenticated user
  try {
    const res = await axiosInstance.get("/users/current-user");
    return res.data;
  } catch (error) {
    console.log("Error in getauthUser:", error);
    return null
  }
};

export const completeOnboarding = async (userData) => {
  const response = await axiosInstance.post("/users/onboarding", userData);
  return response.data;
};

export async function getMyFriends() {
  const response = await axiosInstance.get("/auth/friends");
  return response.data;
}

export async function getRecommendedUsers() {
  const response = await axiosInstance.get("/auth");
  return response.data;
}

export async function getOutgoingFriendReqs() {
  const response = await axiosInstance.get("/auth/outgoing-friend-requests");
  return response.data;
}

export async function sendFriendRequest(userId) {
  console.log("Sending friend request to:", userId);

  try{
  const response = await axiosInstance.post(`/auth/friend-request/${userId}`);
  return response.data;
  
}catch(error){
   console.error("Error sending friend request:", error);
    throw error;
}}

export async function getFriendRequests() {
  const response = await axiosInstance.get("/auth/friend-requests");
  return response.data;
}

export async function acceptFriendRequest(requestId) {
  const response = await axiosInstance.put(`/auth/friend-request/${requestId}/accept`);
  return response.data;
}
export async function deletefriend(friendId) {
  const response = await axiosInstance.delete(`/auth/friends/${friendId}`);
  return response.data;
}

export async function getStreamToken() {
  const response = await axiosInstance.get("/chat/token");
  return response.data;
}

export async function updateprofilepage(formData) {
  try {
    const res = await axiosInstance.put("/auth/update-profile", formData);
    return res.data;
  } catch (error) {
    throw error;
  }
}
