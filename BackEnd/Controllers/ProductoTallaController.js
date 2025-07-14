const ProductoTallaTo = require('../Modelo/ProductoTallaTo');

const ProductoTallaController = {
      agregar: (req, res) => {
    const { idTalla, idProducto, stock } = req.body;

    if (!idTalla || !idProducto || stock === undefined) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    ProductoTallaTO.agregar({ idTalla, idProducto, stock }, (err, result) => {
      if (err) {
        console.error('Error al agregar talla:', err);
        return res.status(500).json({ error: 'Error al agregar la talla' });
      }
      res.status(201).json({ mensaje: 'Talla agregada correctamente', id: result.insertId });
    });
  },

  obtenerPorProducto: (req, res) => {
    const { idProducto } = req.params;

    ProductoTallaTO.obtenerPorProducto(idProducto, (err, results) => {
      if (err) {
        console.error('Error al obtener tallas:', err);
        return res.status(500).json({ error: 'Error al obtener tallas' });
      }
      res.status(200).json(results);
    });
  },

  actualizarStock: (req, res) => {
    const { idProducto_talla, stock } = req.body;

    if (!idProducto_talla || stock === undefined) {
      return res.status(400).json({ error: "ID y stock son obligatorios" });
    }

    ProductoTallaTO.actualizarStock(idProducto_talla, stock, (err, result) => {
      if (err) {
        console.error('Error al actualizar stock:', err);
        return res.status(500).json({ error: 'Error al actualizar stock' });
      }
      res.status(200).json({ mensaje: 'Stock actualizado correctamente' });
    });
  },

    eliminar: (req, res) => {
    const { idProducto_talla } = req.params;

    ProductoTallaTO.eliminar(idProducto_talla, (err, result) => {
      if (err) {
        console.error('Error al eliminar talla:', err);
        return res.status(500).json({ error: 'Error al eliminar talla' });
      }
      res.status(200).json({ mensaje: 'Talla eliminada correctamente' });
    });
  }
};

module.exports = ProductoTallaController;