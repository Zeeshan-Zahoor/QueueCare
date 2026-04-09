import express from "express";
import { loginUser, registerUser, getMyProfile, updateProfile, uploadProfileImage, getMyTokens } from "../controllers/user.controller.js";
import { userAuthMiddleware } from "../middlewares/userAuthMiddleware.js";
import { upload } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/profile").get(userAuthMiddleware, getMyProfile);
router.route("/update").put(userAuthMiddleware, updateProfile);
router.route("/upload-profile").post(userAuthMiddleware, upload.single("image"), uploadProfileImage);
router.route("/my-tokens").get(userAuthMiddleware, getMyTokens);

export default router;