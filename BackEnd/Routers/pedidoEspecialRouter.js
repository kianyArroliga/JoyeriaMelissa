const express = require('express'); 
const router = express.Router(); 
const multer = require('multer'); 
const upload = multer({ dest: 'uploads/' }); 

const ProductoEspecialController = require('../Controllers/ProductoEspecialController'); 

// Registrar un nuevo pedido especial 
router.post('/agregar', upload.single('referencia'), ProductoEspecialController.registrarPedido); 

// Listar pedidos especiales de un usuario específico 
router.get('/usuario/:idUsuario', ProductoEspecialController.listarPorUsuario); 

// Admin: listar todos los pedidos especiales 
router.get('/todos', ProductoEspecialController.listarTodos); 

// Admin: actualizar el estado de un pedido especial 
router.patch('/estado/:id', ProductoEspecialController.actualizarEstado); 

module.exports = router; 