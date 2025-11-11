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


export const crearMascota = async (data) => {
  const { dni, nombre, raza, edad, color, peso } = data;

  const propietario = await buscarPropietarioPorDni(dni);
  if (!propietario) throw new Error("DNI no coincide con ningún propietario");


  const nuevaMascota = await prisma.mascotas.create({
    data: {
      nombre,
      raza,
      edad: Number(edad),
      color,
      peso: Number(peso),
      propietarioId: propietario.id,
    },
  });

  return nuevaMascota;
};

export const editarMascotaPorId = async (id, data) => {
  const mascota = await prisma.mascotas.findUnique({ where: { id: Number(id) } });

  if (!mascota) {
    throw new Error("Mascota no encontrada");
  }

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

export const eliminarMascotaPorId = async (id) => {
  const mascota = await prisma.mascotas.findUnique({ where: { id: Number(id) } });

  if (!mascota) {
    throw new Error("Mascota no encontrada");
  }

  await prisma.mascotas.delete({ where: { id: mascota.id } });

  return { mensaje: `Mascota ${mascota.nombre} eliminada correctamente` };
};



export const listarMascotasPorDni = async (dni) => {
  const propietario = await buscarPropietarioPorDni(dni);

  if (!propietario) {
    throw new Error("DNI no coincide con ningún propietario");
  }

  const mascotas = await prisma.mascotas.findMany({
    where: { propietarioId: propietario.id },
  });

  return mascotas;
};

