// backend/Controllers/UsuarioController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserModel = require('../Modelo/UsuarioTo');

// Clave secreta para firmar el token
const JWT_SECRET = process.env.JWT_SECRET || 'mi-clave-secreta';

const UserController = {
  // Login de usuario
  login: (req, res) => {
    const { correo, contraseña } = req.body;

    // Validar si correo y contraseña fueron enviados
    if (!correo || !contraseña) {
      return res.status(400).json({ error: 'Correo y contraseña son obligatorios' });
    }

    // Validar el formato del correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      return res.status(400).json({ error: 'Formato de correo no válido' });
    }

    // Buscar al usuario por correo en la base de datos
    UserModel.buscarUsuarioPorCorreo(correo, (err, data) => {
      if (err) {
        console.error('Error en el login:', err);
        return res.status(500).json({ error: 'Error interno en el servidor' });
      }

      if (data.length === 0) {
        return res.status(401).json({ error: 'Correo o contraseña incorrectos' });
      }

      const usuario = data[0];

      // Comparar la contraseña con bcrypt
      bcrypt.compare(contraseña, usuario.contraseña, (err, isMatch) => {
        if (err) {
          console.error('Error al comparar contraseña:', err);
          return res.status(500).json({ error: 'Error interno en el servidor' });
        }

        if (!isMatch) {
          return res.status(401).json({ error: 'Correo o contraseña incorrectos' });
        }

        // Generar un token JWT
        const token = jwt.sign({ id: usuario.idUsuario }, JWT_SECRET, { expiresIn: '1h' });

        // Devolver la respuesta con el token y los datos del usuario sin la contraseña
        const { contraseña, ...usuarioSinContraseña } = usuario;

        res.json({
          mensaje: 'Login exitoso',
          usuario: usuarioSinContraseña,
          token: token
        });
      });
    });
  },

  // Registro de usuario
  register: async (req, res) => {
    console.log('🔍 Iniciando registro de usuario...');
    const usuario = req.body;
    const { nombre, apellido, correo, telefono, contraseña } = usuario;

    console.log('📝 Datos recibidos:', { nombre, apellido, correo, telefono, contraseña: '[OCULTA]' });

    // Validar los campos obligatorios
    if (!nombre || !apellido || !correo || !telefono || !contraseña) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Validar formato de correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      return res.status(400).json({ error: 'Correo no válido' });
    }

    // Validar el formato del teléfono
    if (!/^\d{8}$/.test(telefono)) {
      return res.status(400).json({ error: 'Teléfono debe tener 8 dígitos' });
    }

    // Validar formato de contraseña
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!passwordRegex.test(contraseña)) {
      return res.status(400).json({
        error: 'La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, una minúscula, un número y un símbolo'
      });
    }

    // Validar que no se use una contraseña insegura
    if (contraseña === 'Clave123@') {
      return res.status(400).json({
        error: 'Por motivos de seguridad, no se permite usar "Clave123@" como contraseña. Elige una combinación más única.'
      });
    }

    // Verificar si el correo ya existe
    UserModel.verificarCorreoExiste(correo, async (err, existe) => {
      if (err) {
        console.error('❌ Error al verificar correo:', err);
        return res.status(500).json({ error: 'Error al verificar el correo' });
      }

      if (existe) {
        console.log('⚠️ Correo ya existe:', correo);
        return res.status(409).json({ error: 'El correo ya está registrado' });
      }

      try {
        console.log('🔐 Encriptando contraseña...');
        // Encriptar la contraseña con bcrypt
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(contraseña, saltRounds);
        
        console.log('✅ Contraseña encriptada exitosamente');
        console.log('🔒 Hash generado:', hashedPassword);
        
        // Crear el usuario con la contraseña encriptada
        const usuarioConHashedPassword = {
          ...usuario,
          contraseña: hashedPassword
        };

        console.log('💾 Guardando usuario en base de datos...');
        UserModel.register(usuarioConHashedPassword, (err, result) => {
          if (err) {
            console.error('❌ Error al registrar usuario:', err);
            return res.status(500).json({ error: 'Error al registrar el usuario' });
          }

          console.log('✅ Usuario registrado exitosamente con ID:', result.insertId);
          res.status(201).json({ mensaje: 'Usuario registrado exitosamente', id: result.insertId });
        });
      } catch (hashError) {
        console.error('❌ Error al encriptar contraseña:', hashError);
        return res.status(500).json({ error: 'Error al procesar la contraseña' });
      }
    });
  },

  // Ver perfil del usuario por el id (con validación JWT)
  verPerfil: (req, res) => {
    const token = req.headers.authorization?.split(" ")[1]; // Obtener token del header

    if (!token) {
      return res.status(401).json({ error: 'Token no proporcionado' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Token no válido' });
      }

      const idUsuario = decoded.id; // Obtener el id del usuario desde el token

      // Obtener el perfil del usuario
      UserModel.buscarUsuarioPorId(idUsuario, (err, data) => {
        if (err) {
          return res.status(500).json({ error: 'Error interno del servidor' });
        }

        if (data.length === 0) {
          return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.json(data[0]); // Devolver el perfil del usuario
      });
    });
  },

  // Actualizar perfil del usuario (con validación JWT)
  actualizarPerfilUsuario: (req, res) => {
    const token = req.headers.authorization?.split(" ")[1]; // Obtener token del header

    if (!token) {
      return res.status(401).json({ error: 'Token no proporcionado' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Token no válido' });
      }

      const idUsuario = decoded.id; // Obtener el id del usuario desde el token

      const { nombre, apellido, correo, telefono } = req.body;

      if (!nombre || !apellido || !correo || !telefono) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
      }

      // Actualizar el perfil del usuario
      UserModel.actualizarPerfil(idUsuario, { nombre, apellido, correo, telefono }, (err, result) => {
        if (err) {
          return res.status(500).json({ error: 'Error interno del servidor' });
        }

        res.json({ mensaje: 'Perfil actualizado correctamente' });
      });
    });
  }
};

module.exports = UserController;
