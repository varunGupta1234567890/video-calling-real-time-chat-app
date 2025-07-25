// import { ApiError } from "../utils/ApiError.js";
// import { asyncHandler } from "../utils/asyncHandler.js";
// import jwt from "jsonwebtoken"
// import { User } from "../models/user.model.js";
// //ye ek async middleware h isme pehle token access kro cookies se fir use decode karke user nikalo
// export const verifyJWT = asyncHandler(async(req,res, next) => {
//     try {
//         const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        
//         // console.log(token);
//         if (!token) {
//             throw new ApiError(401, "Unauthorized request")
//         }
//      //agar token hai to decode kro using secret
//         const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
//         const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    
//         if (!user) {
            
//             throw new ApiError(401, "Invalid Access Token")
//         }
    
//         req.user = user;  //req ke ander user obj add kro
//         next()  //isse user model me next middleware execute hoga
//     } catch (error) {
//         throw new ApiError(401, error?.message || "Invalid access token")
//     }//middleware routes me use honge
    
// })


import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";


export const verifyJWT = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
console.log("Token from cookies:", token); // 
    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No token provided" });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
console.log("Decoded JWT:", decoded);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Unauthorized - User not found" });
    }

    req.user = user;
 console.log("Verified user:", user);
    next();
  } catch (error) {
    console.log("Error in protectRoute middleware", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};