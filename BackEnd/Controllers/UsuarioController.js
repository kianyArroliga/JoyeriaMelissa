const UserModel = require ('../Modelo/UsuarioTo')


const UserController = {
    login: (req, res) => {
        const { correo, contraseña } = req.body;

        console.log('Datos recibidos del frontend:', { correo, contraseña });

        UserModel.login(correo, contraseña, (err, data) => {
            if (err) {
                console.error('Error en el login:', err);
                return res.status(500).json({ error: 'Login failed', details: err.message });
            }

            if (data.length === 0) {
                return res.status(401).json("Invalid credentials");
            }

            res.json(data);
        });
    }
};

module.exports = UserController;