const PedidoEspecialTo = require('../Modelo/PedidoEspecialTo');
const cloudinary = require('../Config/cloudinary');
const fs = require('fs');

const PedidoEspecialController = {
    // Registrar nuevo pedido especial 
    registrarPedido: async (req, res) => {
        const { idUsuario, pieza, talla, tipoPiedra, descripcion } = req.body;

        if (!idUsuario || !pieza || !tipoPiedra) {
            return res.status(400).json({ error: 'Los campos idUsuario, pieza y tipoPiedra son obligatorios' });
        }

        try {
            let referenciaURL = '';

            // Subir imagen si hay archivo 
            if (req.file) {
                const result = await cloudinary.uploader.upload(req.file.path, {
                    folder: 'joyeria_pedidos_especiales'
                });
                referenciaURL = result.secure_url;
                fs.unlinkSync(req.file.path); // limpiar temp 
            }

            const nuevoPedido = {
                idUsuario,
                pieza,
                talla: talla || '',
                tipoPiedra,
                color: '', // Campo reservado 
                referenciaURL,
                estado: 'Pendiente',
                fechaRespuesta: null
            };

            PedidoEspecialTo.registrar(nuevoPedido, (err, result) => {
                if (err) {
                    console.error('❌ Error al registrar pedido especial:', err);
                    return res.status(500).json({ error: 'Error al registrar el pedido especial' });
                }

                return res.status(201).json({
                    mensaje: 'Pedido especial registrado correctamente',
                    id: result.insertId
                });
            });
        } catch (error) {
            console.error('❌ Error inesperado:', error);
            return res.status(500).json({ error: 'Error al procesar el pedido especial' });
        }
    },

    // Ver pedidos por usuario (perfil) 
    listarPorUsuario: (req, res) => {
        const { idUsuario } = req.params;

        PedidoEspecialTo.obtenerPorUsuario(idUsuario, (err, pedidos) => {
            if (err) {
                console.error('Error al obtener pedidos especiales:', err);
                return res.status(500).json({ error: 'Error al obtener los pedidos' });
            }
            return res.status(200).json(pedidos);
        });
    },

    // Ver todos los pedidos (admin) 
    listarTodos: (req, res) => {
        PedidoEspecialTo.obtenerTodos((err, pedidos) => {
            if (err) {
                console.error('Error al listar todos los pedidos:', err);
                return res.status(500).json({ error: 'Error al obtener los pedidos' });
            }
            return res.status(200).json(pedidos);
        });
    },

    // Actualizar estado de pedido 
    actualizarEstado: (req, res) => {
        const { id } = req.params;
        const { estado } = req.body;

        if (!estado) {
            return res.status(400).json({ error: 'El nuevo estado es obligatorio' });
        }

        const fechaRespuesta = new Date();

        PedidoEspecialTo.actualizarEstado(id, estado, fechaRespuesta, (err, result) => {
            if (err) {
                console.error('Error al actualizar el estado del pedido:', err);
                return res.status(500).json({ error: 'No se pudo actualizar el pedido' });
            }
            return res.status(200).json({ mensaje: 'Estado actualizado correctamente' });
        });
    }
};

module.exports = PedidoEspecialController;