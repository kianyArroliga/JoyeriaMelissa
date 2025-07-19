const express = require("express");
const router = express.Router();
const OlvidoContrasenaController = require("../Controllers/OlvidoContrasenaController");

router.post("/solicitar", OlvidoContrasenaController.solicitarRecuperacion);
router.get("/verificar/:token", OlvidoContrasenaController.verificarToken);
router.post("/restablecer", OlvidoContrasenaController.restablecerContrasena);

module.exports = router;