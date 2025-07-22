import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const PerfilUsuario = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const usuario = useSelector((state) => state.carrito.usuarioInfo);

  // Estado para la edición del perfil
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    telefono: ''
  });

  // Verificación de token al cargar el componente
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/clientes/login"); // Redirigir a inicio si no hay token
    }
  }, [navigate]);

  // Verificación de usuario
  console.log(usuario); // Añadir esta línea para depurar

  if (!usuario || !usuario[0]) return <div>Cargando perfil...</div>; // Mostrar algo mientras los datos cargan

  const { nombre = "Usuario", correo = "No disponible", telefono = "No disponible" } = usuario[0] || {};

  // Función para manejar la edición del perfil
  const handleEditClick = () => {
    setIsEditing(true);
    setFormData({
      nombre,
      correo,
      telefono
    });
  };

  // Función para manejar los cambios en el formulario de edición
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Función para guardar los cambios en el perfil
  const handleSave = async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      return navigate("/clientes/login");
    }

    try {
      const response = await axios.put(
        "http://localhost:3000/api/users/clientes/perfil",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log(response.data); // Añadir esta línea para ver la respuesta de la API

      // Si la actualización es exitosa, actualizamos los datos en Redux y desactivamos la edición
      if (response.data.mensaje === "Perfil actualizado correctamente") {
        setIsEditing(false);
        // Si deseas actualizar los datos en Redux también:
        dispatch({
          type: "UPDATE_USUARIO",
          payload: response.data.usuario, // Ajusta según lo que devuelva la API
        });
      }
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
    }
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    dispatch(logout()); // Acción de Redux para limpiar el estado global
    localStorage.removeItem("user"); // Eliminar usuario de localStorage
    localStorage.removeItem("authToken"); // Eliminar el token de localStorage
    navigate("/inicio"); // Redirigir a inicio después de cerrar sesión
  };

  return (
    <div className="absolute top-20 right-4 bg-white shadow-lg rounded-xl p-4 w-64 z-50">
      <h2 className="text-xl font-semibold mb-2">Bienvenido, {nombre}</h2>
      <p className="text-sm text-gray-600 mb-4">{correo}</p>
      <p className="text-sm text-gray-600 mb-4">{telefono}</p>

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
          <li><Link to="/perfil" className="hover:underline">Ver perfil</Link></li>
          <li><Link to="/mis-pedidos" className="hover:underline">Mis pedidos</Link></li>
          <li><Link to="/favoritos" className="hover:underline">Favoritos</Link></li>
          <li>
            <button onClick={handleEditClick} className="hover:underline text-blue-600">
              Editar perfil
            </button>
          </li>
          <li>
            <button onClick={handleLogout} className="text-red-500 hover:underline" aria-label="Cerrar sesión">
              Cerrar sesión
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default PerfilUsuario;
