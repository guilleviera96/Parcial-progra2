import Button from "./Button";
function Table({ mascotas, onEliminar, onEditar }) {
  if (!mascotas || mascotas.length === 0) {
    return <p className="text-gray-500 mt-4">Busca a tu mascotas</p>;
  }

  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full bg-white border border-gray-300 rounded shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Nombre
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Raza
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Edad
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Color
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Peso
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {mascotas.map((m) => (
            <tr key={m.id} className="border-t">
              <td className="px-4 py-2 text-sm text-gray-800">{m.nombre}</td>
              <td className="px-4 py-2 text-sm text-gray-800">{m.raza}</td>
              <td className="px-4 py-2 text-sm text-gray-800">{m.edad}</td>
              <td className="px-4 py-2 text-sm text-gray-800">{m.color}</td>
              <td className="px-4 py-2 text-sm text-gray-800">{m.peso} kg</td>
              <td className="px-4 py-2 text-sm text-gray-800 space-x-2">
                <Button variant="edit" onClick={() => onEditar(m.id)}>
                  Editar
                </Button>
                <Button variant="danger" onClick={() => onEliminar(m.id)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
