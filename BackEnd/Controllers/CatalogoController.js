const catalogoModel = require('../Modelo/catalogoTo');


const CatalogoController = {

    //Listar todos los productos que estén disponibles
   listarProductos: (req, res) => {
    catalogoModel.listarProductosDD((err, productos) => {
        if (err) {
            return res.status(500).json({ error: 'Error al listar los productos' });
        }

        res.json(productos);
    });
},

    //Listar todos los productos que estén disponibles
    listarProductosDestacados: (req, res) => {
        catalogoModel.listarProductosDestacados((err, productos) => {
            if (err) {
                return res.status(500).json({ error: 'Error al listar los productos destacados' });
            }

            res.json(productos);
        });
    },

    //Listar todos los productos que estén disponibles
    listarProductosEspeciales: (req, res) => {
        catalogoModel.listarProductosEspeciales((err, productos) => {
            if (err) {
                return res.status(500).json({ error: 'Error al listar los productos especiales' });
            }

            res.json(productos);
        });
    },


    //Listar los detalles de un producto en específico
    verDetalles: (req, res) => {
        const { id } = req.params;

        catalogoModel.verDetallesProductos(id, (err, producto) => {
            if (err) {
                return res.status(500).json({ error: 'Error al listar los detalles del producto' });
            }

            if (!producto) {
                return res.status(404).json({ mensaje: 'Producto no encontrado' });
            }

            res.json(producto);
        });
    },

    //Filtrar productos según los parámetros
    filtrar: (req, res) => {
        const filtros = {
            categoria: req.query.categoria || null,
            material: req.query.material || null,
            piedra: req.query.piedra || null,
            talla: req.query.talla || null,
            precioMin: req.query.precioMin || null,
            precioMax: req.query.precioMax || null,
        };

        catalogoModel.filtrarProductos(filtros, (err, productos) => {
            if (err) {
                return res.status(500).json({ error: 'Error al filtrar los productos' });
            }
            res.json(productos);
        });
    }

};

module.exports = CatalogoController;