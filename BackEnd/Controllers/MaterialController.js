const MaterialTo = require('../Modelo/MaterialTo');
 
const MaterialController = {
 
    listarMateriales: (req, res) => {
        MaterialTo.obternerTodas((err, materiales) => {
            if (err) {
                console.error('Error al obtener materiales:', err);
                return res.status(500).json({ error: 'Error al obtener materiales' });
            }
            res.status(200).json(materiales);
 
        });
    }
}
 
module.exports = MaterialController;