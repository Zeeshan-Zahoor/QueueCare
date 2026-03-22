import { Clinic } from "../models/clinic.model.js";
import { Doctor } from "../models/doctor.model.js";

const loginClinic = async (req, res) => {
    try {
        //get clinic credentials
        const { phone, password } = await req.body; 

        //check number and password
        if(!phone || !password) {
            return res
                    .status(400)
                    .json({
                        message: "Phone and password are required",
                    });
        }

        //find the clinic
        const clinic = await Clinic.findOne({ phone });
        if(!clinic) {
            return res.status(404).json({
                message: "Clinic not found!",
            });
        }

        //validiate clinic with password (plain for now)
        if(clinic.password !== password) {
            return res.status(401).json({
                message: "Invalid Credentials!",
            });
        }

        //response (success)
        return res.status(200).json({
            message: "Login Successful",
            clinicId: clinic._id,
        });

    } catch (error) {
        res
        .status(500)
        .json({
            message: "Internal Server Error",
            error: error.message,
        })
    }
}

const getClinicDoctors = async (req, res) => {
    try {
        const { clinicId } = req.params;
        const doctors = await Doctor.find({ clinicId });

        res.status(200).json({
            message: "Doctors fetched successfully!",
            success: true,
            doctors,
        })
    } catch (error) {
        res.status(500).json({
            message: "Error fetching doctors!",
            error: error.message,
        })
    }
} 

export {
    loginClinic,
    getClinicDoctors,
}