import { useState } from "react";
import api from "../api/api";
import TextField from "./TextField";
import Button from "./Button";

function FormMascota() {
    const [form, setForm] = useState({
        dni: "",
        nombre: "",
        raza: "",
        edad: "",
        color: "",
        peso: "",
    });

    const [mensaje, setMensaje] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje(null);
        setError(null);

        try {
            const res = await api.post("/mascotas/agregar-mascotas", form);
            console.log("creada la mascota", res.data)
            setMensaje("Mascota creada correctamente");
            setForm({
                dni: "",
                nombre: "",
                raza: "",
                edad: "",
                color: "",
                peso: "",
            });
        } catch (err) {
            console.error("Error al crear mascota:", err);
            const mensajeError = err.response?.data?.error || "No se pudo crear la mascota";
            setError(mensajeError);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Registrar Mascota</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <TextField
                    label="DNI del propietario"
                    name="dni"
                    value={form.dni}
                    onChange={handleChange}
                    placeholder="Su dni"
                    required
                />
                <TextField
                    label="Nombre"
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    placeholder="Nombre de tu mascota"
                    required
                />
                <TextField
                    label="Raza"
                    name="raza"
                    value={form.raza}
                    onChange={handleChange}
                    placeholder="Raza de tu mascota"
                    required
                />
                <TextField
                    label="Edad"
                    name="edad"
                    type="number"
                    min="0"
                    value={form.edad}
                    onChange={handleChange}
                    placeholder="Edad de tu mascota"
                    required
                />
                <TextField
                    label="Color"
                    name="color"
                    value={form.color}
                    onChange={handleChange}
                    placeholder="Color de tu mascota"
                    required
                />
                <TextField
                    label="Peso (kg)"
                    name="peso"
                    type="number"
                    min="0" 
                    value={form.peso}
                    onChange={handleChange}
                    required
                />

                <Button type="submit">Registrar Mascota</Button>
            </form>

            {mensaje && <p className="mt-4 text-green-600 text-sm font-medium">{mensaje}</p>}
            {error && <p className="mt-4 text-red-500 text-sm font-medium">{error}</p>}
        </div>
    );
}

export default FormMascota;