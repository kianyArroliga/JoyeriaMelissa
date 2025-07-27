const db = require('../Config/Database');

const login = {
    // Método para buscar usuario por correo (para el login)
    buscarUsuarioPorCorreo: (correo, callback) => {
        const sql = "SELECT * FROM usuario WHERE correo = ?";
        db.query(sql, [correo], (err, data) => {
            if (err) return callback(err, null);
            callback(null, data);
        });
    },

    // Método para buscar usuario por id (para obtener el perfil)
    buscarUsuarioPorId: (id, callback) => {
        const sql = "SELECT idUsuario, identificacion, nombre, apellido, correo, telefono FROM usuario WHERE idUsuario = ?";
        db.query(sql, [id], (err, data) => {
            if (err) return callback(err, null);
            callback(null, data); // Devolver los datos del usuario
        });
    },

    // Método para actualizar los datos del perfil del usuario
    actualizarPerfil: (id, datos, callback) => {
        const sql = `
            UPDATE usuario
            SET nombre = ?, apellido = ?, correo = ?, telefono = ?, identificacion = ?
            WHERE idUsuario = ?
        `;
        const params = [datos.nombre, datos.apellido, datos.correo, datos.telefono, datos.identificacion, id];

        db.query(sql, params, (err, result) => {
            if (err) return callback(err, null);
            callback(null, result); // Devolver el resultado de la actualización
        });
    },

    // Método para registrar un nuevo usuario
    register: (usuario, callback) => {
        const params = [
            usuario.identificacion, // Se incluye la identificación
            usuario.nombre,
            usuario.apellido,
            usuario.correo,
            usuario.telefono,
            usuario.contraseña // ahora viene encriptada desde el controller
        ];

        const sql = `
            INSERT INTO usuario 
            (nombre, apellido, identificacion, correo, telefono, contraseña, estadoCuenta, fechaRegistro)
            VALUES (?, ?, ?, ?, ?, ?, 'activo', NOW())
        `;

        db.query(sql, params, (err, result) => {
            if (err) return callback(err, null);
            callback(null, result); // Devolver el resultado de la inserción
        });
    },

    // Método para verificar si un correo ya existe
    verificarCorreoExiste: (correo, callback) => {
        const sql = "SELECT idUsuario FROM usuario WHERE correo = ?";
        db.query(sql, [correo], (err, results) => {
            if (err) return callback(err, null);
            callback(null, results.length > 0); // Verificar si el correo ya existe
        });
    }
};

module.exports = login;
