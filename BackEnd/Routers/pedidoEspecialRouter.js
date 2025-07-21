const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const PedidoEspecialController = require('../Controllers/PedidoEspecialController');

// Registrar un nuevo pedido especial 
router.post('/agregar', upload.single('referencia'), PedidoEspecialController.registrarPedido); 
//router.post('/agregar', PedidoEspecialController.agregarPedidoEspecial);

// Listar pedidos especiales de un usuario específico 
router.get('/usuario/:idUsuario', PedidoEspecialController.listarPorUsuario);

// Admin: listar todos los pedidos especiales 
router.get('/todos', PedidoEspecialController.listarTodos);

// Admin: actualizar el estado de un pedido especial 
router.patch('/estado/:id', PedidoEspecialController.actualizarEstado);

module.exports = router; 