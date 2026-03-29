import { Router } from "express";
import { loginClinic,
         getClinicDoctors, 
         joinQueue, 
         exitQueue,
         advanceToken, 
         toggleDay,
         toggleConsultation,
         getDoctorById,
         getAllDoctors,
         getAllClinics,
         updateDoctorSettings,
         updateClinicSettings,
         getClinic,
        } from "../controllers/clinic.controller.js";

const router = Router();

router.route("/login").post(loginClinic);

router.route("/clinics").get(getAllClinics);
router.route("/doctors").get(getAllDoctors);

router.route("/doctor/:doctorId").get(getDoctorById);
router.route("/doctor/:doctorId/join").post(joinQueue);
router.route("/doctor/:doctorId/exit").post(exitQueue);
router.route("/doctor/:doctorId/advance").post(advanceToken);
router.route("/doctor/:doctorId/toggle-day").post(toggleDay);
router.route("/doctor/:doctorId/toggle-consultation").post(toggleConsultation);
router.route("/doctor/:doctorId/settings").put(updateDoctorSettings);


router.route("/:clinicId/doctors").get(getClinicDoctors);
router.route("/:clinicId").get(getClinic);
router.route("/:clinicId").put(updateClinicSettings);

export default router;