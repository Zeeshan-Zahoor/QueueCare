import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
            "usersecret123",    // separate from clinic
            { expiresIn: "1d" }
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


export {
    registerUser,
    loginUser,
}