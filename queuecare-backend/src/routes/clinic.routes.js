import { Router } from "express";
import { loginClinic } from "../controllers/clinic.controller.js";

const router = Router();

router.route("/login").post(loginClinic);

export default router;