const db = require("../Config/Database");

const OlvidoContrasenaTO = {
    guardarToken: (correo, token, expiracion, callback) => {
        const sql = `
        UPDATE usuario 
        SET tokenRecuperacion = ?, expiracionToken = ?
        WHERE correo = ?`;
        db.query(sql, [token, expiracion, correo], callback);
    },

    verificarToken: (token, callback) => {
        const sql = `
      SELECT * FROM usuario 
        WHERE tokenRecuperacion = ? AND expiracionToken > NOW()`;
        db.query(sql, [token], callback);
    },

    actualizarContrasena: (correo, nuevaHash, callback) => {
        const sql = `
        UPDATE usuario 
        SET contraseña = ?, tokenRecuperacion = NULL, expiracionToken = NULL
        WHERE correo = ?`;
        db.query(sql, [nuevaHash, correo], callback);
    }
};

module.exports = OlvidoContrasenaTO;
