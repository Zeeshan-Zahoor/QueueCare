import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
    token: Number,
    name: String,
    phone: String,
    source: {
        type: String,
        enum: ["online", "walk-in"],
        default: "online",
    }
});

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    specialization: {
        type: String,
        required: true,
    },
    clinicId: {
        type: mongoose.Schema.Types.ObjectId,
        src: "Clinic",
    },
    consultationTime: {
        type: Number,
        default: 10,
    },
    maxTokens: {
        type: Number,
        default: 50,
    },
    currentlyServing: {
        type: Number,
        default: 0,
    },
    lastIssuedToken: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,
        enum: ["open", "closed"],
        default: "closed",
    },
    consultationStatus: {
        type: String,
        enum: ["active", "paused"],
        default: "paused",
    },
    queue: [patientSchema],
}, {timestamps: true});

export const Doctor = mongoose.model("Doctor", doctorSchema);