const express = require('express');
const router = express.Router();
const UserController = require ('../Controllers/UsuarioController')

router.post('/clientes/login', UserController.login);
router.post('/register', UserController.register);
router.get('/clientes/perfil', UserController.verPerfil);


module.exports = router;

