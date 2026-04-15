import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { optionalUserAuthMiddleware } from "../middlewares/optionalUserAuthMiddleware.js";
import { upload } from "../middlewares/uploadMiddleware.js";
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
         addDoctor,
         deleteDoctor,
         uploadDoctorProfilePic,
         forgotClinicPassword,
        } from "../controllers/clinic.controller.js";
import { auth } from "google-auth-library";

const router = Router();

router.route("/login").post(loginClinic);

router.route("/clinics").get(getAllClinics);
router.route("/doctors").get(getAllDoctors);

router.route("/doctor/:doctorId").get(getDoctorById);
router.route("/doctor/:doctorId/join").post(optionalUserAuthMiddleware, joinQueue);
router.route("/doctor/:doctorId/exit").post(exitQueue);
router.route("/doctor/:doctorId/advance").post(authMiddleware, advanceToken);
router.route("/doctor/:doctorId/toggle-day").post(authMiddleware, toggleDay);
router.route("/doctor/:doctorId/toggle-consultation").post(authMiddleware, toggleConsultation);
router.route("/doctor/:doctorId/settings").put(authMiddleware, updateDoctorSettings);


router.route("/:clinicId/doctors").get(getClinicDoctors);
router.route("/:clinicId").get(getClinic);
router.route("/:clinicId").put(authMiddleware, updateClinicSettings);
router.route("/add-doctor").post(authMiddleware, addDoctor);
router.route("/delete-doctor").post(authMiddleware, deleteDoctor);
router.route("/upload-profile").post(authMiddleware, upload.single("doctorImage"), uploadDoctorProfilePic);
router.route("/forgot-password").post(forgotClinicPassword);
export default router;