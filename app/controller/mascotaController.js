import {
  crearMascota,
  listarMascotasPorPropietarioId,
  editarMascotaPorId as modificarMascota,
  eliminarMascotaPorId
} from "../services/mascotaService.js";

export const crearMascotaController = async (req, res) => {
  try {
    const propietarioId = req.propietarioId;
    const mascota = await crearMascota(req.body, propietarioId);
    res.status(201).json(mascota);
  } catch (error) {
    console.error("Error al crear mascota:", error);
    res
      .status(500)
      .json({ error: error.message || "Error al crear la mascota" });
  }
};

export const editarMascota = async (req, res) => {
  try {
    const { id } = req.params;
    const datos = req.body;
    const propietarioId = req.propietarioId;

    const mascota = await modificarMascota(id, datos, propietarioId);
    res.status(200).json(mascota);
  } catch (error) {
    console.error("Error al editar mascota:", error);
    res.status(500).json({ error: error.message || "Error al editar mascota" });
  }
};

export const eliminarMascotaController = async (req, res) => {
  try {
    const { id } = req.params;
    const propietarioId = req.propietarioId;

    const resultado = await eliminarMascotaPorId(id, propietarioId);
    res.status(200).json(resultado);
  } catch (error) {
    console.error("Error al eliminar mascota:", error);
    res
      .status(500)
      .json({ error: error.message || "Error al eliminar mascota" });
  }
};

export const listarMascotasController = async (req, res) => {
  try {
    const propietarioId = req.propietarioId;
    const mascotas = await listarMascotasPorPropietarioId(propietarioId);
    res.status(200).json(mascotas);
  } catch (error) {
    console.error("Error al listar mascotas:", error);
    res
      .status(500)
      .json({ error: error.message || "Error al listar mascotas" });
  }
};
