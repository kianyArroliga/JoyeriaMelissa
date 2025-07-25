// Definir los tipos de acción
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const UPDATE_USUARIO = "UPDATE_USUARIO";

// Acción para iniciar sesión
export const login = (usuario) => {
  return {
    type: LOGIN,
    payload: usuario,  // Aquí pasas la información del usuario
  };
};

// Acción para cerrar sesión
export const logout = () => {
  return {
    type: LOGOUT,  // Aquí no necesitamos payload porque solo necesitamos limpiar el estado
  };
};

// Acción para actualizar los datos del usuario
export const updateUsuario = (usuario) => {
  return {
    type: UPDATE_USUARIO,
    payload: usuario,  // Aquí pasas los nuevos datos del usuario (por ejemplo, después de una actualización)
  };
};
