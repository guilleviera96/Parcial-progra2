import { useState } from "react";
import api from "../api/api";
import Table from "../components/Table";
import Button from "../components/Button";
import EditarMascotaForm from "../components/EditarMascotaForm";
import TextField from "../components/TextField";
function ListarMascotas() {
  const [dni, setDni] = useState("");
  const [mascotas, setMascotas] = useState([]);
  const [error, setError] = useState(null);
  const [mascotaEditando, setMascotaEditando] = useState(null);

  const handleBuscar = async () => {
    setError(null);
    try {
      const res = await api.get("/mascotas/listar", {
        params: { dni },
      });
      setMascotas(res.data);
    } catch (err) {
      const mensaje = err.response?.data?.error || "Error al buscar mascotas";
      setError(mensaje);
    }
  };
  const handleEditar = (id) => {
    const mascota = mascotas.find((m) => m.id === id);
    setMascotaEditando(mascota);
  };
  const handleActualizada = (mascotaActualizada) => {
    setMascotas((prev) =>
      prev.map((m) => (m.id === mascotaActualizada.id ? mascotaActualizada : m))
    );
  };

  const handleEliminar = async (id) => {
    try {
      await api.delete(`/mascotas/eliminar/${id}`);
      setMascotas((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      console.error("Error al eliminar mascota:", err);
      setError("No se pudo eliminar la mascota");
    }
  };
  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Buscar Mascotas por DNI
      </h2>
      <TextField
        label="Ingrese DNI"
        value={dni}
        onChange={(e) => setDni(e.target.value)}
        placeholder="Ingrese DNI"
      />
      <Button onClick={handleBuscar}> Buscar </Button>

      {error && <p className="mt-1 text-red-400 font-bold">{error}</p>}
      <Table
        mascotas={mascotas}
        onEditar={handleEditar}
        onEliminar={handleEliminar}
      />

      {mascotaEditando && (
        <EditarMascotaForm
          mascota={mascotaEditando}
          onClose={() => {
            setMascotaEditando(null);
            setError(null);
          }}
          onActualizada={handleActualizada}
        />
      )}
    </div>
  );
}

export default ListarMascotas;
