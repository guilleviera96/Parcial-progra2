import { Link, useLocation } from 'react-router-dom';
export default function Navbar( ) {
  const location = useLocation();

  const linkClass = (path) =>
    `px-3 py-2 rounded hover:bg-blue-100 ${
      location.pathname === path ? 'font-semibold text-blue-600' : 'text-gray-700'
    }`;

  return (
    <nav className="flex gap-4 p-4 bg-gray-50 border-b border-gray-200">
      <Link to="/" className={linkClass('/')}>Inicio</Link>
      <Link to="/agregar-mascotas" className={linkClass('/agregar-mascotas')}>Agregar mascotas</Link>
      <Link to="/listar-mascotas" className={linkClass('/listar-mascotas')}>Ver mascotas</Link>

      {/* {isAuthenticated ? (
        <>
          <Link to="/perfil" className={linkClass('/perfil')}>Perfil</Link>
          <Link to="/logout" className="px-3 py-2 text-red-500 hover:underline">Cerrar sesión</Link>
        </>
      ) : (
        <Link to="/login" className="px-3 py-2 text-blue-500 hover:underline">Ingresar</Link>
      )} */}
    </nav>
  );
}