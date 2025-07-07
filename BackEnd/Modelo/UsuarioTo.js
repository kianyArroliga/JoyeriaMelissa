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

    // Método de login anterior (ya no se usa, pero lo dejo por compatibilidad)
    login: (correo, contraseña, callback) => {
        const sql = "SELECT * FROM usuario WHERE correo = ? AND contraseña = ?";
        db.query(sql, [correo, contraseña], (err, data) => {
            if (err) return callback(err, null);
            callback(null, data);
        });
    },

    register: (usuario, callback) => {
        const params = [
            usuario.nombre,
            usuario.apellido,
            usuario.correo,
            usuario.telefono,
            usuario.contraseña // ahora viene encriptada desde el controller
        ];

        const sql = `
            INSERT INTO usuario 
            (nombre, apellido, correo, telefono, contraseña, estadoCuenta, fechaRegistro)
            VALUES (?, ?, ?, ?, ?, 'activo', NOW())
        `;

        db.query(sql, params, (err, result) => {
            if (err) return callback(err, null);
            callback(null, result);
        });
    },

    verificarCorreoExiste: (correo, callback) => {
        const sql = "SELECT idUsuario FROM usuario WHERE correo = ?";
        db.query(sql, [correo], (err, results) => {
            if (err) return callback(err, null);
            callback(null, results.length > 0);
        });
    }
};

module.exports = login;