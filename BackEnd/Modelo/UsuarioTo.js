const db = require ('../Config/Database')

const login = {
    login: (correo, contraseña, callback) => {
        const sql = "SELECT * FROM usuario WHERE correo = ? AND contraseña = ?";
        db.query(sql, [correo, contraseña], (err, data) => {
            if (err) return callback(err, null);
            callback(null, data);
        });
    }
};

module.exports = login;
