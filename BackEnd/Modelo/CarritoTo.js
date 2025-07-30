const db = require('../Config/Database');

const CarritoTo = {
    insertarTemporal: (detalle, callback) => {
        const sql = `
    INSERT INTO detalle_pedido (idProducto, cantidad, precioUnitario, expiracion)
    VALUES (?, ?, ?, ?)
  `;

        const params = [
            detalle.idProducto,
            detalle.cantidad,
            detalle.precioUnitario,
            detalle.expiracion
        ];

        db.query(sql, params, (err, result) => {
            if (err) return callback(err, null);
            callback(null, result);
        });
    },


    obtenerTodosTemporales: (callback) => {
        const sql = `SELECT * FROM detalle_pedido WHERE expiracion > NOW()`;
        db.query(sql, (err, rows) => {
            if (err) return callback(err, null);
            callback(null, rows);
        });
    },


    eliminarExpirados: (callback) => {
        const sql = `DELETE FROM detalle_pedido WHERE expiracion <= NOW()`;
        db.query(sql, (err, result) => {
            if (err) return callback(err, null);
            callback(null, result);
        });
    }
};

module.exports = CarritoTo;
