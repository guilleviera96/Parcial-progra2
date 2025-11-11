import prisma from "../client/client.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { SECRET } from "../constants/constants.js";

export const crearPropietario = async ({ dni }) => {
  const hashedDni = await bcrypt.hash(dni, 10);

  const token = jwt.sign({ dni }, SECRET, { expiresIn: "1h" });

  const nuevoPropietario = await prisma.propietarios.create({
    data: {
      dni: hashedDni,
      token
    },
  });

  return { ...nuevoPropietario, token };
};