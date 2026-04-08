import express from "express";
import { loginUser, registerUser, getMyProfile, updateProfile } from "../controllers/user.controller.js";
import { userAuthMiddleware } from "../middlewares/userAuthMiddleware.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/profile").get(userAuthMiddleware, getMyProfile);
router.route("/update").put(userAuthMiddleware, updateProfile);

export default router;