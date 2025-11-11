import express from "express";
import mascotasRoutes from "./routes/mascotasRoutes.js";
import propietariosRoutes from "./routes/propietariosRoutes.js";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

//usuario rutas
app.use("/propietarios", propietariosRoutes);
// mascotas rutas
app.use("/mascotas", mascotasRoutes);

export default app;
