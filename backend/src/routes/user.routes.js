import { Router } from "express";
import { 
    loginUser, 
    logoutUser, 
    registerUser, 
    // refreshAccessToken, 
    // changeCurrentPassword, 
    // getCurrentUser, 
    // updateUserAvatar, 
    // updateUserCoverImage, 
    // getUserChannelProfile, 
    // getWatchHistory, 
    // updateAccountDetails,
    onboard
} from "../controllers/user.controller.js";
// import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router()

router.route("/register").post(
    // upload.fields([
    //     {
    //         name: "avatar",
    //         maxCount: 1
    //     }, 
    //     {
    //         name: "coverImage",
    //         maxCount: 1
    //     }
    // ]),
    registerUser
    )
//router me hota hai ki hum controllers ko kis url se dekhenge
router.route("/login").post(loginUser)

//secured routes
router.route("/logout").post( logoutUser) // logout se pehle middleware inject karwana h
// router.route("/refresh-token").post(refreshAccessToken)
// router.route("/change-password").post(verifyJWT, changeCurrentPassword)
//check user is logged in or not
// router.route("/current-user").get(verifyJWT, getCurrentUser)
// router.route("/update-account").patch(verifyJWT, updateAccountDetails)//bcoz post se saari req update hongi
router.route("/onboarding").post(verifyJWT, onboard)

router.route("/current-user")
  .get(verifyJWT, async (req, res) => {
    res.status(200).json({ success: true, user: req.user });
  });
// router.route("/current-user").get(verifyJWT, async (req, res) => {
//   try {
//     console.log("👤 req.cookies.jwt:", req.cookies.jwt);
//     console.log("✅ req.user from verifyJWT:", req.user);

//     const user = await User.findById(req.user.id).select("-password");
//     if (!user) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }

//     res.status(200).json({ success: true, user });
//   } catch (error) {
//     console.error("💥 Error in /current-user route:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });
// router.route("/current-user").get(verifyJWT, (req, res) => {
//   console.log("Final req.user in /current-user route:", req.user); //  log 4
//   res.status(200).json({ success: true, user: req.user });
// });


// router.route("/avatar").patch(verifyJWT, upload.single("avatar"), updateUserAvatar)//sirf 1 avatar update ho rha
// router.route("/cover-image").patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage)

// router.route("/c/:username").get(verifyJWT, getUserChannelProfile)
// router.route("/history").get(verifyJWT, getWatchHistory)
//verify JWT sirf jaha logged in user hai waha use kro     upload multer ka h
export default router