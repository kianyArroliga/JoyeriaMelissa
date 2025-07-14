const PiedraTo = require('../Modelo/PiedraTo');
 
const PiedraController = {
 
    listarPiedras: (req, res) => {
        PiedraTo.obternerTodas((err, piedras) => {
            if (err) {
                console.error('Error al obtener piedras:', err);
                return res.status(500).json({ error: 'Error al obtener piedras' });
            }
            res.status(200).json(piedras);
 
        });
    }
}
 
module.exports = PiedraController;