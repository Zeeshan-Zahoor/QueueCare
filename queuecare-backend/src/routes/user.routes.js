import express from "express";
import { loginUser, registerUser, getMyProfile, updateProfile, uploadProfileImage, getMyTokens, forgotPassord, verifyOtp, resetPassword, googleLogin } from "../controllers/user.controller.js";
import { userAuthMiddleware } from "../middlewares/userAuthMiddleware.js";
import { upload } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/google-login").post(googleLogin)
router.route("/profile").get(userAuthMiddleware, getMyProfile);
router.route("/update").put(userAuthMiddleware, updateProfile);
router.route("/upload-profile").post(userAuthMiddleware, upload.single("image"), uploadProfileImage);
router.route("/my-tokens").get(userAuthMiddleware, getMyTokens);
router.route("/forgot-password").post(forgotPassord);
router.route("/verify-otp").post(verifyOtp);
router.route("/reset-password").post(resetPassword);


export default router;