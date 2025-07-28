const requerirRol = (rolesPermitidos) => {
  return (req, res, next) => {
    const usuario = req.user;

    if (!rolesPermitidos.includes(usuario.rol)) {
      return res.status(403).json({ error: 'Acceso denegado' });
    }

    next();
  };
};

module.exports = requerirRol;