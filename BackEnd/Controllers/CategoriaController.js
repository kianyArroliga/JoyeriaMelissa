const CategoriaTo = require('../Modelo/CategoriaTo');

const CategoriaController = {

    listarCategorias: (req, res) => {
        CategoriaTo.obternerTodas((err, categorias) => {
            if (err) {
                console.error('Error al obtenr categorias:', err);
                return res.status(500).json({ error: 'Error al obtener categorias' });
            }
            res.status(200).json(categorias);
            
        })
    }
};

module.exports = CategoriaController;
