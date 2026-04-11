import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        default: ""
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"],
        default: "male",
    }, 
    otp: {
        type: String,
    }, 
    otpExpir: {
        type: Date,
    }

}, {timestamps: true});

export const User = mongoose.model("User", userSchema);