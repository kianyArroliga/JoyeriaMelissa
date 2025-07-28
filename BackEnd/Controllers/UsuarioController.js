const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserModel = require('../Modelo/UsuarioTo');

const JWT_SECRET = process.env.JWT_SECRET || 'mi-clave-secreta-super-hiper-segura';

const UserController = {
  login: (req, res) => {
    const { correo, contrasena } = req.body;

    //Muestra los datos recibidos el front
    console.log('Datos de login recibidos:', { correo, contrasena: contrasena ? '***' : 'undefined' });

    //Validaciones
    if (!correo || !contrasena) {
      return res.status(400).json({ error: 'Correo y contraseña son obligatorios' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      return res.status(400).json({ error: 'Formato de correo no válido' });
    }

    UserModel.buscarUsuarioPorCorreo(correo, (err, data) => {
      if (err) {
        console.error('Error en buscarUsuarioPorCorreo:', err);
        return res.status(500).json({ error: 'Error interno en el servidor' });
      }

      if (data.length === 0) {
        console.log('Usuario no encontrado para correo:', correo);
        return res.status(401).json({ error: 'Correo o contraseña incorrectos' });
      }

      const usuario = data[0];

      //Se verifica que el campo contraseña existe
      if (!usuario.contraseña) {
        console.error('Campo contraseña no encontrado en usuario:', Object.keys(usuario));
        return res.status(500).json({ error: 'Error en la estructura de datos del usuario' });
      }

      console.log('Comparando contraseñas...');
      bcrypt.compare(contrasena, usuario.contraseña, (err, isMatch) => {
        if (err) {
          console.error('Error en bcrypt.compare:', err);
          return res.status(500).json({ error: 'Error interno en el servidor' });
        }

        if (!isMatch) {
          console.log('Contraseña incorrecta para usuario:', correo);
          return res.status(401).json({ error: 'Correo o contraseña incorrectos' });
        }

        console.log('Login exitoso para usuario:', correo);

        const token = jwt.sign(
          {
            id: usuario.idUsuario,
            correo: usuario.correo,
            rol: usuario.idRol, //necesario porque vamos a estar manejando distintos tipos usuarios
          },
          SECRET,
          { expiresIn: '2h' }
        );

        const { contraseña, ...usuarioSinContrasena } = usuario;

        res.json({ mensaje: 'Login exitoso', usuario: usuarioSinContrasena, token });
      });
    });
  },

  register: async (req, res) => {
    const { identificacion, nombre, apellido, correo, telefono, contrasena, contraseña } = req.body;

    const password = contraseña || contrasena;

    console.log('Datos recibidos:', { identificacion, nombre, apellido, correo, telefono, password: password ? '***' : 'undefined' });

    if (!identificacion || !nombre || !apellido || !correo || !telefono || !password) {
      return res.status(400).json({
        error: 'Todos los campos son obligatorios',
        campos_recibidos: {
          identificacion: !!identificacion,
          nombre: !!nombre,
          apellido: !!apellido,
          correo: !!correo,
          telefono: !!telefono,
          password: !!password
        }
      });
    }

    //Puras validaciones
    if (!/^\d{9}$/.test(identificacion)) {
      return res.status(400).json({ error: 'La identificación debe tener 9 dígitos' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      return res.status(400).json({ error: 'Correo no válido' });
    }

    if (!/^\d{8}$/.test(telefono)) {
      return res.status(400).json({ error: 'Teléfono debe tener 8 dígitos' });
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ error: 'La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, una minúscula, un número y un símbolo' });
    }

    if (password === 'Clave123@') {
      return res.status(400).json({ error: 'Por motivos de seguridad, no se permite usar "Clave123@" como contraseña.' });
    }

    UserModel.verificarCorreoExiste(correo, async (err, existe) => {
      if (err) return res.status(500).json({ error: 'Error al verificar el correo' });
      if (existe) return res.status(409).json({ error: 'El correo ya está registrado' });

      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const usuarioNuevo = { identificacion, nombre, apellido, correo, telefono, contraseña: hashedPassword };

        UserModel.register(usuarioNuevo, (err, result) => {
          if (err) {
            console.error('Error en registro:', err);
            return res.status(500).json({ error: 'Error al registrar el usuario' });
          }
          res.status(201).json({ mensaje: 'Usuario registrado exitosamente', id: result.insertId });
        });
      } catch (err) {
        console.error('Error al procesar contraseña:', err);
        res.status(500).json({ error: 'Error al procesar la contraseña' });
      }
    });
  },

  verPerfil: (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: 'Token no proporcionado' });

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) return res.status(401).json({ error: 'Token no válido' });

      const idUsuario = decoded.id;
      UserModel.buscarUsuarioPorId(idUsuario, (err, data) => {
        if (err) return res.status(500).json({ error: 'Error interno del servidor' });
        if (data.length === 0) return res.status(404).json({ error: 'Usuario no encontrado' });

        res.json({ usuario: data });
      });
    });
  },

  actualizarPerfilUsuario: (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: 'Token no proporcionado' });

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) return res.status(401).json({ error: 'Token no válido' });

      const idUsuario = decoded.id;
      const { identificacion, nombre, apellido, correo, telefono } = req.body;

      if (!identificacion || !nombre || !apellido || !correo || !telefono) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
      }

      UserModel.actualizarPerfil(idUsuario, { identificacion, nombre, apellido, correo, telefono }, (err, result) => {
        if (err) return res.status(500).json({ error: 'Error interno del servidor' });
        res.json({ mensaje: 'Perfil actualizado correctamente' });
      });
    });
  }
};

module.exports = UserController;