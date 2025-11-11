import { Outlet } from "react-router-dom";  

export default function AuthLayout() {
 // TODO agregar logica para autentificacion y rutas privadas
 
  return (
    <div>
      <Outlet />
    </div>
  );
}
