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

const joinQueue = async (req, res) => {
    try {
        const { doctorId } = req.params;
        const { name, phone, source } = req.body;

        // validate
        if(!name || !phone) {
            return res.status(400).json({
                message: "Name and phone is required",
            });
        }

        // find doctor
        const doctor = await Doctor.findById(doctorId);
        if(!doctor) {
            return res.status(404).json({
                message: "Doctor not found",
            })
        }

        //check consultation status
        if(doctor.status !== "active") {
            return res.status(400).json({
                message: "Consultation is not active",
            })
        }

        // check queue full
        const tokensLeft = doctor.maxTokens - (doctor.currentlyServing + doctor.queue.length);

        if(tokensLeft <= 0) {
            return res.status(400).json({
                message: "Queue full",
            })
        }
        
        // duplicate check
        const exists = doctor.queue.some(
            p => p.phone === phone
        );

        if(exists) {
            return res.status(400).json({
                message: "Patient already in queue",
            });
        }

        //generate token
        const newToken = doctor.lastIssuedToken + 1;
        
        // add patient
        doctor.queue.push({
            token: newToken,
            name, 
            phone,
            source,
        })

        // save in database
        await doctor.save();

        // response
        return res.status(200).json({
            message: "Entered Queue Successfully!",
            success: true,
            token: newToken,
        })


    } catch (error) {
        return res.status(500).json({
            message: "Failed to join queue",
            error: error.message,
        });
    }
}
export {
    loginClinic,
    getClinicDoctors,
    joinQueue,
}