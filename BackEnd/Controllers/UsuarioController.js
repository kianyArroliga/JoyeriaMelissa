// backend/Controllers/UsuarioController.js
const UserModel = require('../Modelo/UsuarioTo');
const bcrypt = require('bcrypt');

const UserController = {
    login: (req, res) => {
        const { correo, contraseña } = req.body;

        if (!correo || !contraseña) {
            return res.status(400).json({ error: 'Correo y contraseña son obligatorios' });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(correo)) {
            return res.status(400).json({ error: 'Formato de correo no válido' });
        }

        UserModel.buscarUsuarioPorCorreo(correo, (err, data) => {
            if (err) {
                console.error('Error en el login:', err);
                return res.status(500).json({ error: 'Error interno en el servidor' });
            }

            if (data.length === 0) {
                return res.status(401).json({ error: 'Correo o contraseña incorrectos' });
            }

            const usuario = data[0];
            
            // Compara la contraseña con bcrypt
            bcrypt.compare(contraseña, usuario.contraseña, (err, isMatch) => {
                if (err) {
                    console.error('Error al comparar contraseña:', err);
                    return res.status(500).json({ error: 'Error interno en el servidor' });
                }

                if (!isMatch) {
                    return res.status(401).json({ error: 'Correo o contraseña incorrectos' });
                }

                
                const { contraseña, ...usuarioSinContraseña } = usuario;

                res.json({
                    mensaje: 'Login exitoso',
                    usuario: usuarioSinContraseña
                });
            });
        });
    },

    register: async (req, res) => {
        console.log('🔍 Iniciando registro de usuario...');
        const usuario = req.body;
        const { nombre, apellido, correo, telefono, contraseña } = usuario;

        console.log('📝 Datos recibidos:', { nombre, apellido, correo, telefono, contraseña: '[OCULTA]' });

        if (!nombre || !apellido || !correo || !telefono || !contraseña) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(correo)) {
            return res.status(400).json({ error: 'Correo no válido' });
        }

        if (!/^\d{8}$/.test(telefono)) {
            return res.status(400).json({ error: 'Teléfono debe tener 8 dígitos' });
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        if (!passwordRegex.test(contraseña)) {
            return res.status(400).json({
                error: 'La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, una minúscula, un número y un símbolo'
            });
        }

        if (contraseña === 'Clave123@') {
            return res.status(400).json({
                error: 'Por motivos de seguridad, no se permite usar "Clave123@" como contraseña. Elige una combinación más única.'
            });
        }

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
                // Encripta contrase;a
                const saltRounds = 10;
                const hashedPassword = await bcrypt.hash(contraseña, saltRounds);
                
                console.log('✅ Contraseña encriptada exitosamente');
                console.log('🔒 Hash generado:', hashedPassword);
                
                // Crea el usuario con la contraseña encriptada
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
    }
};

module.exports = UserController;