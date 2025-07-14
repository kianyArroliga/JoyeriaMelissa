const db = require('../Config/Database')

const ProductoTo = {
  // Registrar
  registrar: (producto, callback) => {
    const sql = `
      INSERT INTO producto
      (nombre, estado, image_url, precio, fechaCreacion, idCategoria, idPiedra, idMaterial, descripcion)
      VALUES (?, ?, ?, ?, NOW(), ?, ?, ?, ?)
    `;

    const params = [
      producto.nombre,
      producto.estado, // ✅ Se guarda como número (0 o 1)
      producto.image_url,
      producto.precio,
      producto.idCategoria,
      producto.idPiedra,
      producto.idMaterial,
      producto.descripcion,
    ];

    db.query(sql, params, (err, result) => {
      if (err) return callback(err, null);
      callback(null, result);
    });
  },

  obtenerTallasPorProducto: (idProducto, callback) => {
    const sql = `
      SELECT pt.idProducto_talla,  pt.idTalla, pt.idProducto, pt.stock, t.tamanio
      FROM producto_talla pt
      INNER JOIN talla t ON pt.idTalla = t.idTalla
      WHERE pt.idProducto = ?`;
    db.query(sql, [idProducto], (err, results) => {
      if (err) return callback(err, null);
      callback(null, results);
    });
  },


  // 👉 Registrar stock general para categorías que no son "Anillos"
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

  // 👉 Actualizar stock general para categorías que no son "Anillos"
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



  // SOLO productos activos para cliente
  obtenerActivos: (callback) => {
    const sql = `
      SELECT 
        p.*, 
        c.nombre AS categoria, 
        m.nombre AS material, 
        pi.nombre AS piedra
      FROM producto p
      JOIN categoria c ON p.idCategoria = c.idCategoria
      JOIN material m ON p.idMaterial = m.idMaterial
      JOIN piedra pi ON p.idPiedra = pi.idPiedra
      WHERE p.estado = 1
    `;
    db.query(sql, async (err, productos) => {
      if (err) return callback(err, null);

      for (const producto of productos) {
        producto.estado = producto.estado[0]; // ✅ Convierte BIT → número

        const tallasSql = `
          SELECT t.idTalla, t.tamanio, pt.stock
          FROM producto_talla pt
          JOIN talla t ON pt.idTalla = t.idTalla
          WHERE pt.idProducto = ?
        `;
        const [tallas] = await db.promise().query(tallasSql, [producto.idProducto]);
        producto.tallas = tallas;
      }
      callback(null, productos);
    });
  },

  obtenerTodos: (callback) => {
    const sql = `
      SELECT 
        p.*, 
        c.nombre AS categoria, 
        m.nombre AS material, 
        pi.nombre AS piedra
      FROM producto p
      JOIN categoria c ON p.idCategoria = c.idCategoria
      JOIN material m ON p.idMaterial = m.idMaterial
      JOIN piedra pi ON p.idPiedra = pi.idPiedra
    `;
    db.query(sql, async (err, productos) => {
      if (err) return callback(err, null);

      for (const producto of productos) {
        producto.estado = producto.estado[0]; // ✅ Convierte BIT → número

        const tallasSql = `
          SELECT pt.idTalla, t.tamanio, pt.stock
          FROM producto_talla pt
          LEFT JOIN talla t ON pt.idTalla = t.idTalla
          WHERE pt.idProducto = ?
        `;
        const [tallas] = await db.promise().query(tallasSql, [producto.idProducto]);

        if (producto.categoria === "Anillos") {
          producto.tallas = tallas.filter(t => t.idTalla !== null);
        } else {
          producto.stock = tallas[0]?.stock || 0;
        }
      }
      callback(null, productos);
    });
  },

  obtenerPorId: (idProducto, callback) => {
    const sqlProducto = `
      SELECT p.*, 
             c.nombre AS categoria, 
             m.nombre AS material, 
             pi.nombre AS piedra
      FROM producto p
      JOIN categoria c ON p.idCategoria = c.idCategoria
      JOIN material m ON p.idMaterial = m.idMaterial
      JOIN piedra pi ON p.idPiedra = pi.idPiedra
      WHERE p.idProducto = ?
    `;
    db.query(sqlProducto, [idProducto], (err, result) => {
      if (err) return callback(err, null);
      if (result.length === 0) return callback(null, null);

      const producto = {
        ...result[0],
        estado: result[0].estado[0], // ✅ Convierte BIT → número
        tallas: [],
      };

      const sqlTallas = `
        SELECT pt.idProducto_talla, pt.idTalla, t.tamanio, pt.stock
        FROM producto_talla pt
        LEFT JOIN talla t ON pt.idTalla = t.idTalla
        WHERE pt.idProducto = ?
      `;
      db.query(sqlTallas, [idProducto], (err, tallas) => {
        if (err) return callback(err, null);
        if (producto.categoria === "Anillos") {
          producto.tallas = tallas.filter(t => t.idTalla !== null);
        } else {
          producto.stock = tallas[0]?.stock || 0;
        }
        callback(null, producto);
      });
    });
  },

  actualizar: (idProducto, producto, callback) => {
    const sqlProducto = `
      UPDATE producto 
      SET nombre=?, estado=?, image_url=?, precio=?, idCategoria=?, idPiedra=?, idMaterial=?, descripcion=?
      WHERE idProducto=?
    `;
    const paramsProducto = [
      producto.nombre,
      producto.estado, // ✅ Guarda como número
      producto.image_url,
      producto.precio,
      producto.idCategoria,
      producto.idPiedra,
      producto.idMaterial,
      producto.descripcion,
      idProducto,
    ];

    db.query(sqlProducto, paramsProducto, (err, result) => {
      if (err) return callback(err, null);
      console.log(`✅ Producto ID ${idProducto} actualizado.`);

      const tallas = producto.tallas;
      const sqlDeleteTallas = `DELETE FROM producto_talla WHERE idProducto = ?`;
      db.query(sqlDeleteTallas, [idProducto], (errDelete) => {
        if (errDelete) return callback(errDelete, null);

        let values;
        if (producto.categoria === "Anillos") {
          values = tallas.map(t => [t.idTalla, idProducto, t.stock]);
        } else {
          values = [[null, idProducto, producto.stock]];
        }

        const sqlInsertTallas = `
          INSERT INTO producto_talla (idTalla, idProducto, stock)
          VALUES ?
        `;
        db.query(sqlInsertTallas, [values], (errInsert, resultInsert) => {
          if (errInsert) return callback(errInsert, null);
          console.log(`✅ Tallas/stock para producto ID ${idProducto} actualizados.`);
          callback(null, resultInsert);
        });
      });
    });
  },
  
  eliminar: (idProducto, callback) => {
    //Eliminar las tallas
    const sqlDeleteTallas = `DELETE FROM producto_talla WHERE idProducto = ?`;
    db.query(sqlDeleteTallas, [idProducto], (errDelete) => {
      if (errDelete) return callback(errDelete, null);

      console.log(`Tallas y stock para producto ID ${idProducto} eliminadas.`);

      //Eliminar el producto 
      const sqlDeleteProducto = `DELETE FROM producto WHERE idProducto = ?`;
      db.query(sqlDeleteProducto, [idProducto], (errProducto, resultProducto) => {
        if (errProducto) return callback(errProducto, null);

        console.log(`Producto ID ${idProducto} eliminado correctamente.`);
        callback(null, resultProducto);
      });
    });
  }


}

module.exports = ProductoTo;