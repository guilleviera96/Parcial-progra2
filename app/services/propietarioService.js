import prisma from "../client/client.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { SECRET } from "../constants/constants.js";


export const crearPropietario = async ({ dni }) => {
  try {
    console.log("DNI recibido:", dni);
    const hashedDni = await bcrypt.hash(dni, 10);
    console.log("DNI hasheado:", hashedDni);

    // Primero creás el propietario sin token
    const nuevoPropietario = await prisma.propietarios.create({
      data: { dni: hashedDni },
    });

    // Luego generás el token con el ID
    const token = jwt.sign({ id: nuevoPropietario.id }, SECRET, { expiresIn: "5h" });
    console.log("Token generado:", token);

    // Guardás el token en la base de datos
    await prisma.propietarios.update({
      where: { id: nuevoPropietario.id },
      data: { token },
    });

    return { ...nuevoPropietario, token };
  } catch (error) {
    console.error("Error en crearPropietario:", error);
    throw error;
  }
};

