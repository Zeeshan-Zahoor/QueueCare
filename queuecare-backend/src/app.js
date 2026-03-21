import express from "express";
import cors from "cors";
import clinicRoutes from "./routes/clinic.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/clinic", clinicRoutes);

export default app;