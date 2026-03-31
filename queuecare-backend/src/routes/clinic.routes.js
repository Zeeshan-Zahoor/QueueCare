import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
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
router.route("/doctor/:doctorId/join").post( authMiddleware, joinQueue);
router.route("/doctor/:doctorId/exit").post(authMiddleware, exitQueue);
router.route("/doctor/:doctorId/advance").post(authMiddleware, advanceToken);
router.route("/doctor/:doctorId/toggle-day").post(authMiddleware, toggleDay);
router.route("/doctor/:doctorId/toggle-consultation").post(authMiddleware, toggleConsultation);
router.route("/doctor/:doctorId/settings").put(authMiddleware, updateDoctorSettings);


router.route("/:clinicId/doctors").get(getClinicDoctors);
router.route("/:clinicId").get(getClinic);
router.route("/:clinicId").put(authMiddleware, updateClinicSettings);

export default router;