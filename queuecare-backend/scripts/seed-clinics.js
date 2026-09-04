import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { Clinic } from "../src/models/clinic.model.js";
import { Doctor } from "../src/models/doctor.model.js";

dotenv.config();

const clinics = [
  { name: "SreeCare Multispeciality Clinic", email: "sreecare@example.com", address: "Sreekariyam, Thiruvananthapuram", phone: "+91 471 270 1200", coordinates: [76.9282, 8.5466], image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=900&q=85", rating: 4.8, reviewCount: 124, isVerified: true },
  { name: "Kowdiar Family Health Center", email: "kowdiar@example.com", address: "Kowdiar, Thiruvananthapuram", phone: "+91 471 272 4411", coordinates: [76.9574, 8.5241], image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=900&q=85", rating: 4.6, reviewCount: 89, isVerified: true },
  { name: "Nila Women & Children Clinic", email: "nila@example.com", address: "Kesavadasapuram, Thiruvananthapuram", phone: "+91 471 244 8300", coordinates: [76.9388, 8.5365], image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=900&q=85", rating: 4.7, reviewCount: 57, isVerified: true },
  { name: "Pattom Diagnostic Centre", email: "pattom@example.com", address: "Pattom, Thiruvananthapuram", phone: "+91 471 255 6699", coordinates: [76.9438, 8.5247], image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=900&q=85", rating: 4.5, reviewCount: 43, isVerified: true },
];

const doctors = [
  ["Dr. Ananya Nair", "General Physician", "general"], ["Dr. Rahul Menon", "Cardiologist", "cardiology"], ["Dr. Meera Thomas", "Dentist", "dental"],
  ["Dr. Vivek Pillai", "Pulmonologist", "pulmonology"], ["Dr. Lakshmi Iyer", "Neurologist", "neurology"], ["Dr. Nithin Kumar", "Gastroenterologist", "gastroenterology"],
  ["Dr. Diya Mathew", "General Physician", "general"], ["Dr. Farhan Ali", "Laboratory Consultant", "laboratory"], ["Dr. Sneha Joseph", "Vaccination Specialist", "vaccination"], ["Dr. Arun Das", "Cardiologist", "cardiology"],
];

const run = async () => {
  if (!process.env.MONGO_URI) throw new Error("MONGO_URI is not configured");
  await mongoose.connect(process.env.MONGO_URI);
  const password = await bcrypt.hash("QueueCare@2026", 10);
  await Doctor.deleteMany({});
  await Clinic.deleteMany({});
  const insertedClinics = await Clinic.insertMany(clinics.map((clinic) => ({ ...clinic, password, location: { type: "Point", coordinates: clinic.coordinates }, doctorCount: 0 })));
  for (let i = 0; i < doctors.length; i += 1) {
    await Doctor.create({ name: doctors[i][0], specialization: doctors[i][1], category: doctors[i][2], clinicId: insertedClinics[i % insertedClinics.length]._id, status: i % 3 === 0 ? "open" : "closed", consultationStatus: i % 3 === 0 ? "active" : "paused", consultationTime: 15, maxTokens: 30 });
  }
  for (const clinic of insertedClinics) await Clinic.findByIdAndUpdate(clinic._id, { doctorCount: await Doctor.countDocuments({ clinicId: clinic._id }) });
  console.log(`Seeded ${insertedClinics.length} clinics and ${doctors.length} doctors.`);
  console.log("Clinic login password for all seeded accounts: QueueCare@2026");
  await mongoose.disconnect();
};

run().catch(async (error) => { console.error(error); await mongoose.disconnect(); process.exitCode = 1; });

