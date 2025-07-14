const express = require('express');
const router = express.Router();
const CategoriaController = require('../Controllers/CategoriaController');

// Ruta para obtener todas las categorías
router.get('/', CategoriaController.listarCategorias);

module.exports = router;