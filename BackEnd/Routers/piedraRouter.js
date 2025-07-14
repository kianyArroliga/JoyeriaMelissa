const express = require('express')
const router = express.Router()
const PiedraController = require('../Controllers/PiedraController')
 
// Ruta para obtener todas las piedras
router.get('/', PiedraController.listarPiedras)
 
module.exports = router