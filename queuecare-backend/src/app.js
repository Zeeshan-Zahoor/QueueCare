import express from "express";
import cors from "cors";
import clinicRoutes from "./routes/clinic.routes.js";
import userRoutes from "./routes/user.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/clinic", clinicRoutes);
app.use("/api/user", userRoutes);

export default app;