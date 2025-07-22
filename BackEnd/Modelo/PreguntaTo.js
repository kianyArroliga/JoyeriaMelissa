const db = require('../Config/Database');

const PreguntaTo = {

    //Agrega preguntas
    agregar: (preguntasRespuestas, callback) => {
        const sql = `
  INSERT INTO preguntas_frecuentes (pregunta, respuesta, fechaCreacion, ultimaEdicion, visible)
  VALUES (?, ?, NOW(), NOW(), ?)
`;

        const params = [
            preguntasRespuestas.pregunta,
            preguntasRespuestas.respuesta,
            preguntasRespuestas.visible,
        ];

        db.query(sql, params, (err, result) => {
            if (err) return callback(err, null);
            callback(null, result);
        });
    },

    //Lista por uno en especifico (para admin)
    buscarPregunta: (idProducto, callback) => {
        const sql = `
      SELECT * FROM preguntas_frecuentes
      WHERE idPregunta = ?
    `;
        db.query(sql, [idUsuario], (err, results) => {
            if (err) return callback(err, null);
            callback(null, results);
        });
    },

    //Lista todos las preguntas (para admin)
    listarTodas: (callback) => {
        const sql = `
      SELECT * FROM preguntas_frecuentes
      ORDER BY fechaCreacion DESC
    `;
        db.query(sql, (err, results) => {
            if (err) return callback(err, null);
            callback(null, results);
        });
    },

    //Solo lista las preguntas visibles (para clientes)
    listarVisibles: (idPregunta, callback) => {
        const sql = `
    SELECT * FROM preguntas_frecuentes
    WHERE visible = 1
    ORDER BY fechaCreacion DESC
    `;
        db.query(sql, [idPregunta], (err, results) => {
            if (err) return callback(err, null);
            callback(null, results);
        });
    },

    //Actuliza las preguntas
    actualizarPregunta: (preguntaActualizada, callback) => {
        const sql = `
  UPDATE preguntas_frecuentes
  SET 
    pregunta = ?, 
    respuesta = ?, 
    visible = ?, 
    ultimaEdicion = NOW()
  WHERE idPregunta = ?
`;
        const params = [
            preguntaActualizada.pregunta,
            preguntaActualizada.respuesta,
            preguntaActualizada.visible,
            preguntaActualizada.idPregunta,
        ];

        db.query(sql, params, (err, result) => {
            if (err) return callback(err, null);
            callback(null, result);
        });
    },

    //Las elimina - aun viendo si es necesaria
    eliminarPregunta: (idPregunta, callback) => {
        const sql = `
      DELETE FROM preguntas_frecuentes
      WHERE idPregunta = ?
    `;
        db.query(sql, [idPregunta], (err, result) => {
            if (err) return callback(err, null);
            callback(null, result);
        });
    },
};


module.exports = PreguntaTo;