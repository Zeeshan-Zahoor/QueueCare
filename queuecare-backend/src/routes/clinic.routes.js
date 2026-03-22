import { Router } from "express";
import { loginClinic, getClinicDoctors } from "../controllers/clinic.controller.js";

const router = Router();

router.route("/login").post(loginClinic);
router.route("/:clinicId/doctors").get(getClinicDoctors);

export default router;