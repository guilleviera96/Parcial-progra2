import express from "express";
import {
  crearMascotaController,
  editarMascota,
  eliminarMascotaController,
  listarMascotasPorDniController,
} from "../controller/mascotaController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

//crea rmastoas
router.post("/agregar-mascotas",authMiddleware, crearMascotaController);
//modificar mascota
router.put("/editar/:id", authMiddleware, editarMascota);
//eliminar mascota
router.delete("/eliminar/:id", authMiddleware, eliminarMascotaController);
//listar mascotas
router.get("/listar", authMiddleware, listarMascotasPorDniController);
export default router;
