const db = require('../Config/Database');
const PedidoEspecialTo = {

    // Registrar nuevo pedido especial 
    registrar: (pedido, callback) => {
        const sql = `         
        INSERT INTO pedidos_especiales ( 
        idUsuario, pieza, talla, tipoPiedra, color, referenciaURL, 
        fechaSolicitud, estado, fechaRespuesta 
      ) 
        VALUES (?, ?, ?, ?, ?, ?, NOW(), ?, ?) 
    `;

        const params = [
            pedido.idUsuario,
            pedido.pieza,
            pedido.talla || "", // puede estar vacío si no es anillo 
            pedido.tipoPiedra,
            pedido.color || "",
            pedido.referenciaURL || "", // puede estar vacío si no hay imagen 
            pedido.estado || "Pendiente", // por defecto 
            pedido.fechaRespuesta || null // puede ser null 
        ];
        db.query(sql, params, (err, result) => {
            if (err) return callback(err, null);
            callback(null, result);
        });
    },

    // Obtener todos los pedidos especiales (admin) 
    obtenerTodos: (callback) => {
        const sql = ` 
        SELECT pe.*, u.nombre AS nombreUsuario, u.correo 
        FROM pedidos_especiales pe 
        JOIN usuario u ON pe.idUsuario = u.idUsuario 
        ORDER BY pe.fechaSolicitud DESC 
    `;
        db.query(sql, (err, resultados) => {
            if (err) return callback(err, null);
            callback(null, resultados);
        });
    },

    // Obtener pedidos por ID de usuario (para su perfil) 
    obtenerPorUsuario: (idUsuario, callback) => {
        const sql = ` 
        SELECT * 
        FROM pedidos_especiales 
        WHERE idUsuario = ? 
        ORDER BY fechaSolicitud DESC 
    `;
        db.query(sql, [idUsuario], (err, resultados) => {
            if (err) return callback(err, null);
            callback(null, resultados);
        });
    },

    // Actualizar estado y respuesta (cuando se conteste) 
    actualizarEstado: (idPedidoEspecial, estado, fechaRespuesta, callback) => {
        const sql = ` 
        UPDATE pedidos_especiales 
        SET estado = ?, fechaRespuesta = ? 
        WHERE idPedidoEspecial = ? 
    `;
        db.query(sql, [estado, fechaRespuesta, idPedidoEspecial], (err, result) => {
            if (err) return callback(err, null);
            callback(null, result);
        });
    },

    // Eliminar pedido (opcional, solo si lo necesitás) 
    eliminar: (idPedidoEspecial, callback) => {
        const sql = ` 
        DELETE FROM pedidos_especiales 
        WHERE idPedidoEspecial = ? 
    `;
        db.query(sql, [idPedidoEspecial], (err, result) => {
            if (err) return callback(err, null);
            callback(null, result);
        });
    }
};

module.exports = PedidoEspecialTo; 