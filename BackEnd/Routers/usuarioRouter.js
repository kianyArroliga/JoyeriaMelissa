const express = require('express');
const router = express.Router();
const UserController = require ('../Controllers/UsuarioController')

router.post('/login', UserController.login);

module.exports = router;