import { Brain, Dumbbell, HeartPulse, Microscope, Stethoscope, Syringe } from "lucide-react";

export const medicalCategories = [
  { key: "dental", label: "Dental", icon: Stethoscope, color: "#E49AA0" },
  { key: "cardiology", label: "Cardio...", icon: HeartPulse, color: "#9BCBA8" },
  { key: "pulmonology", label: "Cough...", icon: Dumbbell, color: "#F4B38B" },
  { key: "general", label: "General", icon: Stethoscope, color: "#ADA0D2" },
  { key: "neurology", label: "Neurology", icon: Brain, color: "#55AAA0" },
  { key: "gastroenterology", label: "Stomach...", icon: HeartPulse, color: "#5A4388" },
  { key: "laboratory", label: "Laborato...", icon: Microscope, color: "#E4B8BD" },
  { key: "vaccination", label: "Vaccinat...", icon: Syringe, color: "#83C8D8" },
];
