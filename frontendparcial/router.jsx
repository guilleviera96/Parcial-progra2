import { createBrowserRouter } from "react-router";
import MainLayout from './src/components/layouts/MainLayout/MainLayout.jsx';
import ListarMascotas from "./src/pages/ListarMascotas.jsx";


import FormUsuario from './src/components/FormUsuario.jsx';
import FormMascota from "./src/components/FormMascotas.jsx";
export const router = createBrowserRouter([
    {
        path: "/",  
        element: <MainLayout />,
        children: [
            {path: "/", element: <FormUsuario/>},
            {path: "/agregar-mascotas", element: <FormMascota/>},
            {path: "/listar-mascotas", element: <ListarMascotas/>},
        ],
    },
]);