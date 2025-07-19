const express = require('express');
const router = express.Router();
const CatalogoController = require ('../Controllers/CatalogoController')


// Ruta base
router.get('/inicio', CatalogoController.listarProductos);

router.get('/filtro/avanzado', CatalogoController.filtrar);

router.get('/destacados', CatalogoController.listarProductosDestacados);
router.get('/ofertas', CatalogoController.listarProductosEspeciales);

//Como tiene eso de id, es mejor que siempre vaya de ultimo. Así no dan errores
router.get('/:id', CatalogoController.verDetalles);

module.exports = router;