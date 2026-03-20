import mongoose, { mongo } from "mongoose";

const clinicSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    }
}, {timestamps: true});

export const Clinic = mongoose.model("Clinic", clinicSchema);