import prisma from "../client/client.js";
import bcrypt from "bcryptjs";

export const buscarPropietarioPorDni = async (dni) => {
  const propietarios = await prisma.propietarios.findMany();
  
  for (const propietario of propietarios) {
    const match = await bcrypt.compare(dni, propietario.dni);
    if (match) {
      return propietario;
    }
  }

  return null;
};


export const crearMascota = async (data, propietarioId) => {
  const { nombre, raza, edad, color, peso } = data;

  const nuevaMascota = await prisma.mascotas.create({
    data: {
      nombre,
      raza,
      edad: Number(edad),
      color,
      peso: Number(peso),
      propietarioId,
    },
  });

  return nuevaMascota;
};
export const editarMascotaPorId = async (id, data, propietarioId) => {
  const mascota = await prisma.mascotas.findUnique({ where: { id: Number(id) } });

  if (!mascota) throw new Error("Mascota no encontrada");
  if (mascota.propietarioId !== propietarioId) throw new Error("No tenés permiso para editar esta mascota");

  const mascotaActualizada = await prisma.mascotas.update({
    where: { id: mascota.id },
    data: {
      nombre: data.nombre,
      raza: data.raza,
      edad: Number(data.edad),
      color: data.color,
      peso: Number(data.peso),
    },
  });

  return mascotaActualizada;
};

export const eliminarMascotaPorId = async (id, propietarioId) => {
  const mascota = await prisma.mascotas.findUnique({ where: { id: Number(id) } });

  if (!mascota) throw new Error("Mascota no encontrada");
  if (mascota.propietarioId !== propietarioId) throw new Error("No tenés permiso para eliminar esta mascota");

  await prisma.mascotas.delete({ where: { id: mascota.id } });

  return { mensaje: `Mascota ${mascota.nombre} eliminada correctamente` };
};
export const listarMascotasPorPropietarioId = async (propietarioId) => {
  const mascotas = await prisma.mascotas.findMany({
    where: { propietarioId },
  });

  return mascotas;
};

