const db = require('../Config/Database');

const catalogoModel = {

listarProductosDD: (callback) => {
  const sql = `SELECT * FROM Vista_ProductosDetalles WHERE precioEspecial IS NULL`;

  db.query(sql, (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
},

verDetallesProductos: (idProducto, callback) => {
  const sql = `SELECT * FROM Vista_ProductosDetalles WHERE idProducto = ?`;

  db.query(sql, [idProducto], (err, result) => {
    if (err) return callback(err, null);
    callback(null, result[0]);
  });
},

listarProductosDestacados: (callback) => {
  const sql = `SELECT * FROM Vista_ProductosDetalles WHERE destacado = 1`;

  db.query(sql, (err, results) => {
    if (err) return callback(err, null);
    callback(null, results);
  });
},

listarProductosEspeciales: (callback) => {
  const sql = `SELECT * FROM Vista_ProductosDetalles WHERE precioEspecial IS NOT NULL`;

  db.query(sql, (err, results) => {
    if (err) return callback(err, null);
    callback(null, results);
  });
},

filtrarProductos: (filters, callback) => {
  let sql = `SELECT * FROM Vista_ProductosDetalles WHERE 1=1`;
  const values = [];

  if (filters.categoria) {
    sql += ` AND nombreCategoria = ?`;
    values.push(filters.categoria);
  }

  if (filters.material) {
    sql += ` AND nombreMaterial = ?`;
    values.push(filters.material);
  }

  if (filters.piedra) {
    sql += ` AND nombrePiedra = ?`;
    values.push(filters.piedra);
  }

  if (filters.talla) {
    sql += ` AND tallasDisponibles LIKE ?`;
    values.push(`%${filters.talla}%`);
  }

  if (filters.precioMin) {
    sql += ` AND precio >= ?`;
    values.push(filters.precioMin);
  }

  if (filters.precioMax) {
    sql += ` AND precio <= ?`;
    values.push(filters.precioMax);
  }

  db.query(sql, values, (err, results) => {
    if (err) return callback(err, null);
    callback(null, results);
  });
}
};

module.exports = catalogoModel;
