import { useState, useEffect } from "react";
import api from "../api/api";
import TextField from "./TextField";
import Button from "./Button";
function FormUsuario() {
  const [dni, setDni] = useState("");
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await api.post("/propietarios", { dni });
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
      setDni("");
    } catch (err) {
      setError("No se pudo crear el usuario");
    }
  };

  useEffect(() => {
    if (token) {
      console.log("Token recibido:", token);
    }
  }, [token]);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Crear Usuario</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <TextField
          label="DNI"
          name="dni"
          value={dni}
          onChange={(e) => setDni(e.target.value)}
          placeholder="Ingrese DNI"
          required
        />

        <Button type="submit">Crear usuario</Button>

      </form>

      {error && (
        <p className="mt-4 text-red-500 text-sm font-medium">{error}</p>
      )}

      {token && (
        <p className="mt-4 text-shadow-green-600 text-sm font-medium">
          Usuario creado correctamente. Token guardado.
        </p>
      )}
    </div>
  );
}

export default FormUsuario;