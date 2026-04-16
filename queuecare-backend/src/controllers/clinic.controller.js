import cloudinary from "../config/cloudinary.js";
import { Clinic } from "../models/clinic.model.js";
import { Doctor } from "../models/doctor.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const loginClinic = async (req, res) => {
    try {
        //get clinic credentials
        const { email, password } = await req.body; 

        //check number and password
        if(!email || !password) {
            return res
                    .status(400)
                    .json({
                        message: "Email and password are required",
                    });
        }

        //find the clinic
        const clinic = await Clinic.findOne({ email });
        if(!clinic) {
            return res.status(404).json({
                message: "Clinic not found!",
            });
        }

        //validiate clinic with password (hashed now)
        const isMatch = await bcrypt.compare(password, clinic.password);

        if(!isMatch) {
            return res.status(400).json({
                message: "Invalid Credentials!",
            });
        }

        const jwt_token = jwt.sign(
            { clinicId: clinic._id }, // payload 
            process.env.CLINIC_ACCESS_TOKEN_SECRET,   
            { expiresIn: process.env.CLINIC_ACCESS_TOKEN_EXPIRY }
        )

        //response (success)
        return res.status(200).json({
            message: "Login Successful",
            clinicId: clinic._id,
            success: true,
            jwt_token,
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

const getClinic = async (req, res) => {
    try {
        const { clinicId } = req.params;

        const clinic = await Clinic.findById(clinicId);
        if(!clinic) {
            return res.status(404).json({
                message: "Clinic not found",
            })
        }

        return res.status(200).json({
            success: true,
            clinic,
        })
    } catch (error) {
        return res.status(500).json({
            message: "Error fetching clinic",
            error: error.message,
        })
    }
}

const joinQueue = async (req, res) => {
    try {
        const { doctorId } = req.params;
        const { name, phone, source } = req.body;

        let userId; 
        if(source === "online") {  // to handle walks-in contradiction
            userId = req.userId;
        } else {
            userId = null;
        }

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
        if(doctor.status !== "open" || doctor.consultationStatus !== "active") {
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
        doctor.lastIssuedToken = newToken;
        
        // add patient
        doctor.queue.push({
            token: newToken,
            name, 
            phone,
            source,
            userId,
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

const exitQueue = async (req, res) => {
    try {
        const { doctorId } = req.params;
        const { token } = req.body;

        // validate
        if(!token) {
            return res.status(400).json({
                message: "Token is required",
            });
        }

        //find doctor
        const doctor = await Doctor.findById(doctorId);
        if(!doctor) {
            return res.status(400).json({
                message: "Doctor not found",
            });
        }

        //prevent cancellation if already served or being served
        if(token <= doctor.currentlyServing) {
            return res.status(400).json({
                message: "Cannot cancel, already served or in consultation",
            });
        }

        //check token exists
        const exists = doctor.queue.some(
            p => p.token === token
        )

        if(!exists) {
            return res.status(404).json({
                message: "Token not found in the queue",
            });
        }

        //remove patient
        doctor.queue = doctor.queue.filter(
            p => p.token !== token
        );

        await doctor.save();

        //response
        return res.status(200).json({
            message: "Exited succesfully!",
            success: true,
        });
        
    } catch (error) {
        return res.status(500).json({
            message: "Failed to exit queue",
            error: error.message,
        });
    }
}

const advanceToken = async (req, res) => {
    try {
        const { doctorId } = req.params;

        //find doctor
        const doctor = await Doctor.findById(doctorId);
        if(!doctor) {
            return res.status(400).json({
                message: "Doctor not found",
            });
        }

        // check consultation status
        if(doctor.status !== "open" || doctor.consultationStatus !== "active") {
            return res.status(400).json({
                message: "Consultation is not active",
            });
        }

        //check if queue is empty
        if(doctor.queue.length === 0) {
            return res.status(400).json({
                message: "Queue is emplty. No more patients waiting",
            });
        }

        //get next patient
        const nextPatient = doctor.queue[0];

        // change states
        doctor.currentlyServing = nextPatient.token;
        doctor.queue = doctor.queue.slice(1);

        await doctor.save();

        //response
        return res.status(200).json({
            success: true,
            message: "Token advanced successfully!",
            currentToken: doctor.currentlyServing,
        })

        
    } catch (error) {
        return res.status(500).json({
            message: "Failed to advance token",
            error: error.message,
        });
    }
}

const toggleDay = async (req, res) => {
    try {
        const { doctorId } = req.params;

        const doctor = await Doctor.findById(doctorId);
        if(!doctor) {
            return res.status(404).json({
                message: "Doctor not found",
            });
        }

        if(doctor.status === "closed") {
            //start day
            doctor.status = "open";
            doctor.consultationStatus = "active";
        } else {
            //end day
            doctor.status = "closed";
            doctor.queue = [];
            doctor.currentlyServing = 0;
            doctor.lastIssuedToken = 0;
        }

        await doctor.save();

        return res.status(200).json({
            success: true,
            status: doctor.status,
        });

    } catch (error) {
        return res.status(500).json({
            message: "Failed to toggle day",
            error: error.message,
        })
    }
}

const toggleConsultation = async (req, res) => {
    try {
        const { doctorId } = req.params;
    
        const doctor = await Doctor.findById(doctorId);
        if(!doctor) {
            return res.status(404).json({
                message: "Doctor not found",
            });
        }

        //only allow if day is open
        if(doctor.status !== "open") {
            return res.status(400).json({
                message: "Doctor is not available today",
            })
        }

        doctor.consultationStatus = doctor.consultationStatus === "active" ? "paused" : "active" ;

        await doctor.save();

        return res.status(200).json({
            success: true,
            consultationStatus: doctor.consultationStatus,
        })

    } catch (error) {
        return res.status(500).json({
            message: "Failed toggle consultation status",
            error: error.message,
        });
    }
}

const getDoctorById = async (req, res) => {
    try {
        const { doctorId } = req.params;

        const doctor = await Doctor.findById(doctorId);

        if(!doctor) {
            return res.status(404).json({
                message: "Doctor not found",
            })
        }

        return res.status(200).json({
            success: true,
            message: "Doctor fetched successfully",
            doctor,
        })
    } catch (error) {
        return res.status(500).json({
            message: "Failed to fetch doctor",
            error: error.message,
        })
    }
}

const getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find();

        return res.status(200).json({
            success: true,
            doctors,
        })
    } catch (error) {
        return res.status(500).json({
            message: "Failed to fetch doctors",
            error: error.message,
        })
    }
}

const getAllClinics = async (req, res) => {
    try {
        const clinics = await Clinic.find();

        return res.status(200).json({
            success: true,
            clinics,
        })
    } catch (error) {
        return res.status(500).json({
            message: "Failed to fetch clinics",
            error: error.message,
        })
    }
}

const updateDoctorSettings = async (req, res) => {
    try {
        const { doctorId } = req.params;
        const { consultationTime, maxTokens } = req.body;

        const doctor = await Doctor.findById(doctorId);
        if(!doctor) {
            return res.status(404).json({
                message: "Doctor not found",
            })
        }

        if(doctor.consultationTime !== undefined) {
            doctor.consultationTime = consultationTime;
        }

        if(doctor.maxTokens !== undefined) {
            doctor.maxTokens = maxTokens;
        }

        await doctor.save();

        return res.status(200).json({
            success: true,
            message: "Doctor settings updated successfully",
            doctor,
        })

    } catch (error) {
        return res.status(500).json({
            message: "Failed to update settings",
            error: error.message,
        });
    }
}

const updateClinicSettings = async(req, res) => {
    try {
        const { clinicId } = req.params;
        const data = req.body;

        const clinic = await Clinic.findById(clinicId);
        if(!clinic) {
            return res.status(404).json({
                message: "Clinic not found",
            })
        }

        Object.assign(clinic, data);

        await clinic.save();

        return res.status(200).json({
            success: true,
            clinic,
        });

    } catch (error) {
        return res.status(500).json({
            message: "Failed to update clinic settings",
            error: error.message,
        })
    }
}

const addDoctor = async (req, res) => {
    try {
        const data = req.body;
        
        const doctor = await Doctor.create(data);
        if(!doctor) {
            return res.status(400).json({
                message: "Failed to add doctor",
            })
        }

        return res.status(200).json({
            success: true,
            message: "Doctor added",
            doctorId: doctor._id,
        })

    } catch (error) {
        return res.status(500).json({
            message: "Error adding doctor",
            error: error.message,
        })
    }
}

const deleteDoctor = async (req, res) => {
    try {
        const { doctorId } = req.body;
        
        const deletedDoctor = await Doctor.findByIdAndDelete(doctorId);
        if(!deletedDoctor) {
            return res.status(404).json({
                message: "Doctor not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Doctor deleted successfully",
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error deleting doctor",
            error: error.message,
        })
    }
}

const uploadDoctorProfilePic = async (req, res) => {
    try {
        const { doctorId } = req.body;
        // check file uploaded or not
        if(!req.file) {
            return res.status(400).json({
                message: "No file uploaded",
            });
        }

        // convert buffer to base64
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        
        const dataURI = `data:${req.file.mimetype};base64,${b64}`;

        // upload to cloudinary
        const result = await cloudinary.uploader.upload(dataURI, {
            folder: "queuecare_doctor_profiles"
        })

        // save url to db
        const doctor = await Doctor.findByIdAndUpdate(doctorId,
            { image: result.secure_url },
            { new: true }
        );

        // response
        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            imageUrl: result.secure_url,
            doctor,
        })
    } catch (error) {
        return res.status(500).json({
            message: "Failed to upload image",
            error: error.message,
        });
    }
}

const forgotClinicPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const clinic = await Clinic.findOne({ email });
        if(!clinic) {
            return res.status(404).json({
                message: "No clinic found by this email",
            });
        }

        // generate otp
        const otp = Math.floor(10000 + Math.random() * 90000).toString();

        clinic.otp = otp;
        clinic.otpExpiry = Date.now() + 5 * 60 * 1000; // 5 minutes

        await clinic.save();

        // send mail
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD,
            }
        })

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: "QueueCare Clinic Password Reset OTP",
            html: `<h2>Password Reset</h2>
                    <p>Your OTP is:</p>
                    <h1>${otp}</h1>
                    <p>This expires in 5 minutes.</p>`
        })

        //response
        return res.status(200).json({
            success: true,

        })
    } catch (error) {
        return res.status(500).json({
            message: "Failed to generate OTP",
            error: error.message,
        })
    }
}

const verifyClinicOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const clinic = await Clinic.findOne({ email });

        if(!clinic) {
            return res.status(404).json({
                message: "Clinic not found",
            })
        }

        if(clinic.otp !== otp) {
            return res.status(400).json({
                message: "Invalid OTP",
            });
        }

        if(clinic.otpExpiry < Date.now()) {
            return res.status(400).json({
                message: "OTP Expired",
            });
        }

        return res.status(200).json({
            success: true,
            message: "OTP verifed",
        });

    } catch (error) {
        return res.status(500).json({
            message: "Failed to verify OTP",
            error: error.message,
        });
    }
}

const resetClinicPassword = async (req, res) => {
    try {
        const { email, password } = req.body;

        const clinic = await Clinic.findOne({ email });
        
        if(!clinic) {
            return res.status(404).json({
                message: "Clinic not found",
            });
        }

        // hash new password
        const hashed = await bcrypt.hash(password, 10);

        clinic.password = hashed;
        clinic.otp = null;
        clinic.otpExpiry = null;

        await clinic.save();

        //login automatically
        const jwt_token = jwt.sign(
            { clinicId: clinic._id},
            process.env.CLINIC_ACCESS_TOKEN_SECRET,
            { expiresIn: process.env.CLINIC_ACCESS_TOKEN_EXPIRY },
        )

        return res.status(200).json({
            success: true,
            jwt_token,
            clinicId: clinic._id,
            message: "Password Updated",
        })

    } catch (error) {
        console.log("Error: ", error);
        return res.status(500).json({
            message: "Failed to reset password",
            error: error.message,
        })
    }
}

export {
    loginClinic,
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
    verifyClinicOtp,
    resetClinicPassword,
}