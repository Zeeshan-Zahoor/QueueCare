import { User } from "../models/user.model.js";
import { Doctor } from "../models/doctor.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cloudinary from "../config/cloudinary.js";
import nodemailer from "nodemailer";

const registerUser = async (req, res) => {
    try {
        //get data
        const { name, email, password, gender } = req.body;

        //validate
        if(!name || !email || !password) {
            return res.status(400).json({
                message: "All required fields must be filled",
            });
        }

        //check existing user
        const existingUser = await User.findOne({ email });
        if(existingUser) {
            return res.status(400).json({
                message: "User already exists",
            })
        }

        //hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create user
        const user = User.create({
            name, 
            email,
            password: hashedPassword,
            gender
        })

        // send response
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            userId: user._id,
        })

    } catch (error) {
        return res.status(500).json({
            message: "Failed to register user",
            error: error.message
        })
    }
}

const loginUser = async (req, res) => {
    try {
        // get the user info
        const { email, password } = req.body;

        //validate
        if(!email || !password) {
            return res.status(400).json({
                message: "Phone and passord are required",
            });
        }

        //find user
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        //check password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({
                message: "Invalid Password",
            });
        }

        // generate token (jwt)
        const user_jwt_token = jwt.sign(
            { userId: user._id },
            process.env.USER_ACCESS_TOKEN_SECRET, // separate from clinic
            { expiresIn: process.env.USER_ACCESS_TOKEN_EXPIRY }
        );

        //return response
        return res.status(200).json({
            success: true, 
            message: "Login Successfull",
            user_jwt_token,
            userId: user._id
        });

    } catch (error) {
        return res.status(500).json({
            message: "Failed to login user",
            error: error.message,
        })
    }
}

const getMyProfile = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");

        if(!user) {
            return res.status(404).json({
                message: "User not found",
            })
        }

        console.log(user);

        return res.status(200).json({
            success: true,
            user,
        });

    } catch (error) {
        res.status(500).json({
            message: "Error fetching profile details",
            error: error.message,
        })
    }
}

const updateProfile = async (req, res) => {
    try {
        const { name, gender } = req.body;
        const user = await User.findByIdAndUpdate(
            req.userId,
            { name, gender },
            { new: true }
        ).select("-password");

        return res.status(200).json({
            success: true,
            message: "Details updated successfully",
            user,
        })

    } catch (error) {
        return res.status(500).json({
            messsage: "Error updating details",
            error: error.message,
        })
    }
}

const uploadProfileImage = async (req, res) => {
    try {
        if(!req.file) {
            return res.status(400).json({
                message: "No file uploaded",
            });
        }

        // convert buffer tp base64
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        const dataURI = `data:${req.file.mimetype};base64,${b64}`;

        //upload to cloudinary
        const result = await cloudinary.uploader.upload(dataURI, {
            folder: "queuecare_user_profiles"
        });

        //save url in db
        const user = await User.findByIdAndUpdate(
            req.userId,
            { profilePic: result.secure_url },
            { new: true }
        ).select("-password");

        return res.json({
            success: true,
            imageUrl: result.secure_url,
            user,
        })
    } catch (error) {
        console.log("Error: ", error);
        return res.status(500).json({
            message: "Image upload failed",
            error: "error.message",
        });
    }
}

const getMyTokens = async (req, res) => {
    try {
        const userId = req.userId;

        // find all doctors where this user is in queue
        const doctors = await Doctor.find({
            "queue.userId": userId
        });

        const myTokens = [];

        doctors.forEach((doctor) => {
            doctor.queue.forEach((entry) => {
                if(entry.userId?.toString() === userId) {
                    myTokens.push({
                        doctorId: doctor._id,
                        doctorName: doctor.name,
                        doctorSpecialization: doctor.specialization,
                        doctorClinicId: doctor.clinicId,
                        doctorImage: doctor.image,
                        token: entry.token,
                        name: entry.name,
                        phone: entry.phone,
                        status: entry.token < doctor.currentlyServing ? "completed"
                        : entry.token === doctor.currentlyServing ? "ongoing"
                        : "waiting",
                    });
                }
            })
        })

        return res.json({
            success: true,
            tokens: myTokens,
        });
        
    } catch (error) {
        return res.status(500).json({
            message: "Error finding tokens",
            error: error.message,
        })
    }
}

const forgotPassord = async (req, res) => {
    try {
        const { email } = req.body;
        
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(404).json({
                message: "User not found",
            })
        }

        //generate otp 5-digit
        const otp = Math.floor(10000 + Math.random() * 90000).toString();

        user.otp = otp;
        user.otpExpir = Date.now() + 5 * 60 * 1000; // 5 min

        await user.save();

        //send email
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
            subject: "QueueCare Password Reset OTP",
            text: `Your OTP is ${otp}`,
        });

        return res.json({
            success: true,
            message: "OTP sent to email",
        })

    } catch (error) {
        return res.status(500).json({
            message: "Failed to send OTP",
        })
    }
}


export {
    registerUser,
    loginUser,
    getMyProfile,
    updateProfile,
    uploadProfileImage,
    getMyTokens,
    forgotPassord,
}