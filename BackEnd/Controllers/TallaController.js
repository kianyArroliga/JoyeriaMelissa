const TallaTo = require('../Modelo/TallaTo');
 
const TallaController = {
 
    listarTallas: (req, res) => {
        TallaTo.obternerTodas((err, tallas) => {
            if (err) {
                console.error('Error al obtener tallas:', err);
                return res.status(500).json({ error: 'Error al obtener tallas' });
            }
            res.status(200).json(tallas);
 
        });
    }
}
 
module.exports = TallaController;