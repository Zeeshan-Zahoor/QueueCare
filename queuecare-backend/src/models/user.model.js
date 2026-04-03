import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        default: "https://avatar.iran.liara.run/public/boy"
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"],
    }
    
}, {timestamps: true});

export const User = mongoose.model("User", userSchema)