import mongoose from "mongoose";

const clinicSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
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
    },
    workingDays: {
        mon: { type: Boolean, default: true },
        tue: { type: Boolean, default: true },
        wed: { type: Boolean, default: true },
        thu: { type: Boolean, default: true },
        fri: { type: Boolean, default: true },
        sat: { type: Boolean, default: true },
        sun: { type: Boolean, default: true },
    },
    openingTime: {
        type: String,
        default: "09:00",
    },
    closingTime: {
        type: String,
        default: "17:00",
    },
    allowWalkIns: {
        type: Boolean,
        default: true,
    },
    image: {
        type: String,
        default: ""
    },
    otp: {
        type: String,
    },
    otpExpiry: {
        type: Date,
    },
}, { timestamps: true });

export const Clinic = mongoose.model("Clinic", clinicSchema);