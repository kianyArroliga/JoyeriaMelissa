const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'mi-clave-secreta-super-hiper-segura';

const verifyToken = (req, res, next) => {
    const bearer = req.headers['authorization'];

    if (!bearer || !bearer.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'No autorizado: token requerido' });
    }

    const token = bearer.split(' ')[1];

    try {
        const decoded = jwt.verify(token, SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Token inválido o expirado' });
    }
};

module.exports = verifyToken;