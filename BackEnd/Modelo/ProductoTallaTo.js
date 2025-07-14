const db = require('../Config/Database');
 
const ProductoTallaTo = {
    agregar: (productoTalla, callback) => {
        const sql = `
      INSERT INTO producto_talla (idTalla, idProducto, stock)
      VALUES (?, ?, ?)
    `;
        const params = [productoTalla.idTalla, productoTalla.idProducto, productoTalla.stock];
 
        db.query(sql, params, (err, result) => {
            if (err) return callback(err, null);
            callback(null, result);
        });
    },
 
    obtenerPorProducto: (idProducto, callback) => {
        const sql = `
      SELECT pt.idProducto_talla, pt.idProducto, pt.idTalla, pt.stock, t.tamanio
      FROM producto_talla pt
      INNER JOIN talla t ON pt.idTalla = t.idTalla
      WHERE pt.idProducto = ?
    `;
        db.query(sql, [idProducto], (err, results) => {
            if (err) return callback(err, null);
            callback(null, results);
        });
    },
 
    actualizarStock: (idProducto_talla, stock, callback) => {
        const sql = `
      UPDATE producto_talla
      SET stock = ?
      WHERE idProducto_talla = ?
    `;
        db.query(sql, [stock, idProducto_talla], (err, result) => {
            if (err) return callback(err, null);
            callback(null, result);
        });
    },
 
    registrarStockGeneral: (idProducto, stock, callback) => {
        const sql = `
        INSERT INTO producto_talla (idTalla, idProducto, stock)
        VALUES (NULL, ?, ?)
    `;
        db.query(sql, [idProducto, stock], (err, result) => {
            if (err) return callback(err, null);
            callback(null, result);
        });
    },
 
    actualizarStockGeneral: (idProducto, stock, callback) => {
        const sql = `
        UPDATE producto_talla
        SET stock = ?
        WHERE idProducto = ? AND idTalla IS NULL
    `;
        db.query(sql, [stock, idProducto], (err, result) => {
            if (err) return callback(err, null);
            callback(null, result);
        });
    },
 
    obtenerStockGeneralPorProducto: (idProducto, callback) => {
        const sql = `
        SELECT stock
        FROM producto_talla
        WHERE idProducto = ? AND idTalla IS NULL
    `;
        db.query(sql, [idProducto], (err, result) => {
            if (err) return callback(err, null);
            callback(null, result[0] ? result[0].stock : 0);
        });
    },
 
   
 
 
    eliminar: (idProducto_talla, callback) => {
        const sql = `
      DELETE FROM producto_talla
      WHERE idProducto_talla = ?
    `;
        db.query(sql, [idProducto_talla], (err, result) => {
            if (err) return callback(err, null);
            callback(null, result);
        });
    },
 
    registrarTallas: (idProducto, tallas, callback) => {
    let values;
 
    if (tallas.length > 0 && tallas[0].idTalla) {
      // Anillos con tallas específicas
      values = tallas.map(t => [t.idTalla, idProducto, t.stock]);
    } else {
      // Otras categorías sin talla (NULL en idTalla)
      values = [[null, idProducto, tallas[0].stock]];
    }
 
    const sql = `
        INSERT INTO producto_talla (idTalla, idProducto, stock)
        VALUES ?
    `;
    db.query(sql, [values], (err, result) => {
      if (err) return callback(err, null);
      callback(null, result);
    });
  },
 
  actualizarTallas: (idProducto, tallas, callback) => {
    const deleteSql = `DELETE FROM producto_talla WHERE idProducto=?`;
    db.query(deleteSql, [idProducto], (err) => {
      if (err) return callback(err, null);
 
      let values;
 
      if (tallas.length > 0 && tallas[0].idTalla) {
        values = tallas.map(t => [t.idTalla, idProducto, t.stock]);
      } else {
        values = [[null, idProducto, tallas[0].stock]];
      }
 
      const insertSql = `
            INSERT INTO producto_talla (idTalla, idProducto, stock)
            VALUES ?
        `;
      db.query(insertSql, [values], (err, result) => {
        if (err) return callback(err, null);
        callback(null, result);
      });
    });
  }
 
 
 
   
};
 
 
module.exports = ProductoTallaTo;