import prisma from "../client/client.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Token no proporcionado" });
    }

    const token = authHeader.split(" ")[1];

    const propietario = await prisma.propietarios.findFirst({
      where: { token },
    });

    if (!propietario) {
      return res.status(401).json({ error: "Token inválido o no registrado" });
    }

    req.propietario = propietario;
    next();
  } catch (error) {
    console.error("Error en authMiddleware:", error);
    res.status(401).json({ error: "Autenticación fallida" });
  }
};