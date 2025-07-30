const express = require("express");
const router = express.Router();
const CarritoController = require("../Controllers/CarritoController");

router.post("/temporal", CarritoController.agregarProductoTemporal);
router.get("/", CarritoController.obtenerProductos);
router.delete("/expirar", CarritoController.limpiarExpirados);

module.exports = router;
