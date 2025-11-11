import {
  crearMascota,
  eliminarMascotaPorId,
  listarMascotasPorDni,
  editarMascotaPorId as modificarMascota,
} from "../services/mascotaService.js";

export const crearMascotaController = async (req, res) => {
  try {
    const mascota = await crearMascota(req.body);
    res.status(201).json(mascota);
  } catch (error) {
    console.error("Error al crear mascota:", error);
    res.status(500).json({ error: error.message || "Error al crear la mascota" });
  }
};


export const editarMascota = async (req, res) => {
  try {
    const { id } = req.params;
    const datos = req.body;

    const mascota = await modificarMascota(id, datos);
    res.status(200).json(mascota);
  } catch (error) {
    console.error("Error al editar mascota:", error);
    res.status(500).json({ error: error.message || "Error al editar mascota" });
  }
};

export const eliminarMascotaController = async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await eliminarMascotaPorId(id);
    res.status(200).json(resultado);
  } catch (error) {
    console.error("Error al eliminar mascota:", error);
    res.status(500).json({ error: error.message || "Error al eliminar mascota" });
  }
};


export const listarMascotasPorDniController = async (req, res) => {
  try {
    const { dni } = req.query;
    const mascotas = await listarMascotasPorDni(dni);
    res.status(200).json(mascotas);
  } catch (error) {
    console.error("Error al listar mascotas:", error);
    res.status(500).json({ error: error.message || "Error al listar mascotas" });
  }
};

