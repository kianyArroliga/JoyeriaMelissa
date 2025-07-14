const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer({ dest: 'uploads/' }) 
const ProductoController = require('../Controllers/ProductoController') 
const ProductoTo = require('../Modelo/ProductoTo')

// Agregrar un producto
router.post('/agregar',upload.single('imagen'), ProductoController.agregarProducto);
// Cliente: listar solo productos activos
router.get('/activos', ProductoController.listarActivos);
// Admin: listar todos los productos (activos e inactivos)
router.get('/todos', ProductoController.listarTodos);
// Actualizar un producto
router.put('/editar/:idProducto',upload.single("imagen"), ProductoController.editarProducto);
router.get('/editar/:idProducto', ProductoController.obtenerProductoPorId);
//Eliminar un producto
router.delete('/borrar/:idProducto', ProductoController.eliminarProducto);


module.exports = router