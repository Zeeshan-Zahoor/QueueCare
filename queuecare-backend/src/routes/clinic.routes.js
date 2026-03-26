import { Router } from "express";
import { loginClinic, getClinicDoctors, joinQueue } from "../controllers/clinic.controller.js";

const router = Router();

router.route("/login").post(loginClinic);
router.route("/:clinicId/doctors").get(getClinicDoctors);
router.route("/doctor/:doctorId/join").post(joinQueue);

export default router;