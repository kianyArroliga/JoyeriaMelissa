import { Navigate, Outlet } from "react-router-dom";
 
const RutaProtegida = ({ rolPermitido }) => {
  const token = localStorage.getItem("token");
  let usuario;
 
  try {
    usuario = JSON.parse(localStorage.getItem("usuario"));
  } catch {
    usuario = null;
  }
 
  if (!token || !usuario) {
    return <Navigate to="/clientes/login" replace />;
  }
 
  const rol = usuario.rol ?? usuario.idRol;
 
  // Acepta rol único o varios
  const rolesPermitidos = Array.isArray(rolPermitido) ? rolPermitido : [rolPermitido];
 
  if (!rolesPermitidos.includes(rol)) {
    return <Navigate to="/" replace />;
  }
 
  return <Outlet />;
};
 
export default RutaProtegida;