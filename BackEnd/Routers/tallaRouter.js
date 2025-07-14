const express = require('express')
const router = express.Router()
const TallaController = require('../Controllers/TallaController')   

// Ruta para obtener todas las tallas
router.get('/', TallaController.listarTallas)

module.exports = router