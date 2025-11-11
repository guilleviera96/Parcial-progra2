import { SECRET } from "../constants/constants.js";
import jwt from "jsonwebtoken";
import prisma from "../client/client.js";
import bcrypt from "bcryptjs";

export const authMiddleware = async (req, res, next) => {
  try {
    const dni = req.body?.dni || req.query?.dni;

    if (!dni) {
      return res.status(400).json({ error: "DNI requerido en el body" });
    }

    const propietarios = await prisma.propietarios.findMany();

    let propietarioEncontrado = null;
    for (const propietario of propietarios) {
      const match = await bcrypt.compare(dni, propietario.dni);
      if (match) {
        propietarioEncontrado = propietario;
        break;
      }
    }

    if (!propietarioEncontrado || !propietarioEncontrado.token) {
      return res
        .status(401)
        .json({ error: "Propietario no encontrado o sin token" });
    }

    const decoded = jwt.verify(propietarioEncontrado.token, SECRET);

    if (!decoded?.id) {
      return res.status(403).json({ error: "Token inválido o mal formado" });
    }

    req.propietarioId = decoded.id;
    req.propietario = propietarioEncontrado;

    next();
  } catch (error) {
    console.error("Error en authMiddleware:", error);
    return res.status(403).json({ error: "Autenticación fallida" });
  }
};
