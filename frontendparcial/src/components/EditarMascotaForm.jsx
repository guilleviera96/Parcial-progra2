import { useState, useEffect } from "react";
import api from "../api/api";
import TextField from "./TextField";
import Button from "./Button";

function EditarMascotaForm({ mascota, onClose, onActualizada }) {
  const [form, setForm] = useState({
    nombre: "",
    raza: "",
    edad: "",
    color: "",
    peso: "",
  });

  useEffect(() => {
    if (mascota) {
      setForm({
        nombre: mascota.nombre,
        raza: mascota.raza,
        edad: mascota.edad,
        color: mascota.color,
        peso: mascota.peso,
      });
    }
  }, [mascota]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put(`/mascotas/editar/${mascota.id}`, form);
      onActualizada(res.data); 
      onClose(); 
    } catch (err) {
      console.error("Error al editar mascota:", err);
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow max-w-md mx-auto mt-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Editar Mascota</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextField label="Nombre" name="nombre" value={form.nombre} onChange={handleChange} required />
        <TextField label="Raza" name="raza" value={form.raza} onChange={handleChange} required />
        <TextField label="Edad" name="edad" type="number" min="0" value={form.edad} onChange={handleChange} required />
        <TextField label="Color" name="color" value={form.color} onChange={handleChange} required />
        <TextField label="Peso (kg)" name="peso" type="number" min="0" value={form.peso} onChange={handleChange} required />
        <div className="flex gap-4">
          <Button type="submit">Guardar cambios</Button>
          <Button variant="danger" onClick={onClose}>Cancelar</Button>
        </div>
      </form>
    </div>
  );
}

export default EditarMascotaForm;