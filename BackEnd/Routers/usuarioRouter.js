const express = require('express');
const router = express.Router();
const UserController = require ('../Controllers/UsuarioController')
const verifyToken = require('../Middleware/verifyToken');

router.post('/clientes/login', UserController.login);
router.post('/register', UserController.register);

router.put('/clientes/perfil', verifyToken, UserController.actualizarPerfilUsuario);

//Básicamente enseñar el perfil de los distintos roles
router.get('/clientes/perfil', verifyToken, (req, res) => {
  const usuario = req.user;

  if (usuario.rol === 1) {
    res.json({ mensaje: 'Perfil del cliente', usuario });
  } else if (usuario.rol === 2) {
    res.json({ mensaje: 'Perfil del administrador', usuario });
  } else if (usuario.rol === 3) {
    res.json({ mensaje: 'Perfil del manager', usuario });
  } else {
    res.status(403).json({ error: 'Rol no reconocido' });
  }
});

module.exports = router;