const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const ProductoController = require('../Controllers/ProductoController');

// Agregar un producto
router.post('/agregar', upload.single('imagen'), ProductoController.agregarProducto);

// Listar todos los productos (activos e inactivos)
router.get('/todos', ProductoController.listarTodos);

// Obtener un producto por ID
router.get('/editar/:idProducto', ProductoController.obtenerProductoPorId);

// Actualizar un producto
router.put('/editar/:idProducto', upload.single('imagen'), ProductoController.editarProducto);

// Eliminar un producto
router.delete('/borrar/:idProducto', ProductoController.eliminarProducto);

// Filtrar productos según los parámetros
router.get('/filtros', ProductoController.filtrar);

module.exports = router;
