import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";

const registerUser = async (req, res) => {
    try {
        //get data
        const { name, phone, password, gender } = req.body;

        //validate
        if(!name || !phone || !password) {
            return res.status(400).json({
                message: "All required fields must be filled",
            });
        }

        //check existing user
        const existingUser = await User.findOne({ phone });
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
            phone,
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


export {
    registerUser,
}