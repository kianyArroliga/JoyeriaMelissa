import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { setLogin, logout } from "../../../redux/autenticadorSlice";
 
const PerfilUsuario = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { usuario } = useSelector((state) => state.auth);
 
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    telefono: "",
  });
 
  useEffect(() => {
    const token = localStorage.getItem("token");
 
    if (!token) {
      navigate("/clientes/login");
      return;
    }
 
    if (!usuario) {
      const fetchPerfil = async () => {
        try {
          const response = await axios.get("http://localhost:4000/api/users/clientes/perfil", {
            headers: { Authorization: `Bearer ${token}` },
          });
 
          console.log("Perfil recibido:", response.data.usuario);
 
          dispatch(setLogin({ usuario: response.data.usuario, token }));
        } catch (error) {
          console.error("Error al obtener el perfil:", error);
          navigate("/clientes/login");
        }
      };
 
      fetchPerfil();
    }
  }, [usuario, dispatch, navigate]);
 
  if (!usuario) {
    return <div>Cargando perfil...</div>;
  }
 
  const {
    nombre = "Usuario",
    correo = "No disponible",
    telefono = "No disponible",
    identificacion = "No disponible",
  } = usuario;
 
  const handleEditClick = () => {
    setIsEditing(true);
    setFormData({ nombre, correo, telefono });
  };
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
 
  const handleSave = async () => {
    const token = localStorage.getItem("token");
 
    if (!token) {
      return navigate("/clientes/login");
    }
 
    try {
      const response = await axios.put(
        "http://localhost:4000/api/users/clientes/perfil",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
 
      if (response.data.mensaje === "Perfil actualizado correctamente") {
        setIsEditing(false);
        dispatch(setLogin({ usuario: response.data.usuario, token }));
      }
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
    }
  };
 
  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navigate("/clientes/login");
  };
 
  return (
    <div className="absolute top-20 right-4 bg-white shadow-lg rounded-xl p-4 w-64 z-50">
      <h2 className="text-xl font-semibold mb-2">Bienvenido, {nombre}</h2>
      <p className="text-sm text-gray-600 mb-1">Cédula: {identificacion}</p>
      <p className="text-sm text-gray-600 mb-1">Correo: {correo}</p>
      <p className="text-sm text-gray-600 mb-4">Teléfono: {telefono}</p>
 
      {isEditing ? (
        <div className="space-y-4">
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full border-b border-[#CED1C0] focus:outline-none focus:border-[#8C162A] py-2"
          />
          <input
            type="email"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            className="w-full border-b border-[#CED1C0] focus:outline-none focus:border-[#8C162A] py-2"
          />
          <input
            type="text"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            className="w-full border-b border-[#CED1C0] focus:outline-none focus:border-[#8C162A] py-2"
          />
          <button
            onClick={handleSave}
            className="bg-[#8C162A] hover:bg-[#660022] text-white px-4 py-2 rounded-md w-full"
          >
            Guardar cambios
          </button>
        </div>
      ) : (
        <ul className="text-gray-700 text-sm flex flex-col gap-2">
          <li>
            <Link to="/perfil" className="hover:underline">
              Ver perfil
            </Link>
          </li>
          <li>
            <Link to="/mis-pedidos" className="hover:underline">
              Mis pedidos
            </Link>
          </li>
          <li>
            <Link to="/favoritos" className="hover:underline">
              Favoritos
            </Link>
          </li>
          <li>
            <button onClick={handleEditClick} className="hover:underline text-blue-600">
              Editar perfil
            </button>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="text-red-500 hover:underline"
            >
              Cerrar sesión
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};
 
export default PerfilUsuario;