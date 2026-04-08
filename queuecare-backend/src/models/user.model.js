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
        default: "https://www.pngmart.com/files/23/Profile-PNG-Photo.png"
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"],
        default: "male",
    }

}, {timestamps: true});

export const User = mongoose.model("User", userSchema);