import { crearPropietario } from "../services/propietarioService.js";

export const crearPropietarioController = async (req, res) => {
  try {
    const propietario = await crearPropietario(req.body);   
    res.status(201).json(propietario);
  } catch (error) {
    console.error("propietariocontroller", error);
    res.status(500).json({ error: "Error al crear el propietario" });
  }
};
