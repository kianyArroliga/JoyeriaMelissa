const express = require('express')
const router = express.Router()
const MaterialController = require('../Controllers/MaterialController')

// Ruta para obtener todos los materiales
router.get('/', MaterialController.listarMateriales)

module.exports = router