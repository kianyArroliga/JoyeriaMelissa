const db = require('../Config/Database');

const UserModel = {
    buscarUsuarioPorCorreo: (correo, callback) => {
        
        const sql = "SELECT idUsuario, identificacion, nombre, apellido, correo, telefono, contraseña, estado, suscrito FROM usuario WHERE correo = ?";
        db.query(sql, [correo], (err, data) => {
            if (err) {
                console.error('Error en buscarUsuarioPorCorreo:', err);
                return callback(err, null);
            }
            
            if (data.length > 0) {
                console.log('Usuario encontrado:', {
                    id: data[0].idUsuario,
                    correo: data[0].correo,
                    tieneContraseña: !!data[0].contraseña
                });
            } else {
                console.log('No se encontró usuario con correo:', correo);
            }
            callback(null, data);
        });
    },

    buscarUsuarioPorId: (id, callback) => {
        const sql = "SELECT idUsuario, identificacion, nombre, apellido, correo, telefono, suscrito FROM usuario WHERE idUsuario = ?";
        db.query(sql, [id], (err, data) => {
            if (err) return callback(err, null);
            callback(null, data);
        });
    },

    actualizarPerfil: (id, datos, callback) => {
        const sql = `
            UPDATE usuario
            SET nombre = ?, apellido = ?, correo = ?, telefono = ?, identificacion = ?
            WHERE idUsuario = ?
        `;
        const params = [datos.nombre, datos.apellido, datos.correo, datos.telefono, datos.identificacion, id];

        db.query(sql, params, (err, result) => {
            if (err) return callback(err, null);
            callback(null, result);
        });
    },

    register: (usuario, callback) => {
        const params = [
            usuario.identificacion,
            usuario.nombre,
            usuario.apellido,
            usuario.correo,
            usuario.telefono,
            usuario.contraseña
        ];

        const sql = `
            INSERT INTO usuario 
            (identificacion, nombre, apellido, correo, telefono, contraseña, estado, suscrito, fechaRegistro, idRol)
            VALUES (?, ?, ?, ?, ?, ?, 'activo', 0, NOW(), 1)
        `;

        db.query(sql, params, (err, result) => {
            if (err) {
                console.error('Error SQL en register:', err);
                return callback(err, null);
            }
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

module.exports = UserModel;