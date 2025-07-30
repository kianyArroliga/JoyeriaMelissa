const CarritoTo = require("../Modelo/CarritoTo");
const crypto = require("crypto");

const CarritoController = {
    agregarProductoTemporal: (req, res) => {
        const { idProducto, cantidad, precioUnitario } = req.body;

        const expiracion = new Date(Date.now() + 1 * 60 * 1000); // 1 minuto

        const detalle = {
            idProducto,
            cantidad,
            precioUnitario,
            expiracion
        };

        CarritoTo.insertarTemporal(detalle, (err, result) => {
            if (err) {
                console.error("❌ Error en insertarTemporal:", err);
                return res.status(500).json({ error: err });
            }
            res.status(201).json({ message: "Producto agregado", result });
        });
    },


    obtenerProductos: (req, res) => {
        CarritoTo.obtenerTodosTemporales((err, rows) => {
            if (err) return res.status(500).json({ error: err });
            res.status(200).json(rows);
        });
    },

    limpiarExpirados: (req, res) => {
        CarritoTo.eliminarExpirados((err, result) => {
            if (err) return res.status(500).json({ error: err });
            res.status(200).json({ message: "Carritos expirados eliminados", result });
        });
    }
};

module.exports = CarritoController;
