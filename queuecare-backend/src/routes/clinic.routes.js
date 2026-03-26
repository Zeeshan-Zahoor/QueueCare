import { Router } from "express";
import { loginClinic,
         getClinicDoctors, 
         joinQueue, 
         exitQueue,
         advanceToken, 
        } from "../controllers/clinic.controller.js";

const router = Router();

router.route("/login").post(loginClinic);
router.route("/:clinicId/doctors").get(getClinicDoctors);
router.route("/doctor/:doctorId/join").post(joinQueue);
router.route("/doctor/:doctorId/exit").post(exitQueue);
router.route("/doctor/:doctorId/advance").post(advanceToken);

export default router;