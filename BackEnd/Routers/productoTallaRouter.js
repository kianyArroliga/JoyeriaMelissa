const express = require('express')
const router = express.Router()
const ProductoTallaController = require('../Controllers/ProductoTallaController')
 
router.post('/agregar', ProductoTallaController.agregar);
router.get('/por-producto/:idProducto', ProductoTallaController.obtenerPorProducto);
router.put('/actualizar-stock', ProductoTallaController.actualizarStock);
router.delete('/eliminar/:idProductoTalla', ProductoTallaController.eliminar);
 
module.exports = router;