const PreguntaTo = require('../Modelo/PreguntaTo');
//para administrador

const PreguntasController = {

    //Agrega las preguntas
    agregarPregunta: async (req, res) => {
        const { pregunta, respuesta, visible } = req.body;

        // Validación
        if (
            !pregunta || pregunta.trim() === '' ||
            !respuesta || respuesta.trim() === '' ||
            typeof visible === 'undefined'
        ) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios y deben ser válidos' });
        }

        try {

            const nuevaPregunta = {
                pregunta: pregunta.trim(),
                respuesta: respuesta.trim(),
                visible: visible ? 1 : 0,
            };

            PreguntaTo.agregar(nuevaPregunta, (err, resultado) => {
                if (err) {
                    console.error('Error al agregar la pregunta:', err);
                    return res.status(500).json({ error: 'Error al agregar la pregunta' });
                }

                res.status(201).json({ mensaje: 'Pregunta agregada correctamente', idInsertado: resultado.insertId });
            });

        } catch (error) {
            console.error('Error inesperado:', error);
            res.status(500).json({ error: 'Error inesperado del servidor' });
        }
    },

    // Listar todas las preguntas (admin)
    listarTodos: (req, res) => {
        PreguntaTo.listarTodas((err, pregunta) => {
            if (err) {
                console.error('Error al obtener todas las preguntas:', err);
                return res.status(500).json({ error: 'Error al obtener todas las preguntas' });
            }
            res.status(200).json(pregunta);
        })
    },

    listarPreguntaPorId: (req, res) => {
        const idPregunta = req.params.idPregunta;

        PreguntaTo.buscarPregunta(idPregunta, (err, pregunta) => {
            if (err) {
                console.error("Error al buscar la pregunta:", err);
                return res.status(500).json({ error: "Error al buscar la pregunta" });
            }

            if (!pregunta || pregunta.length === 0) {
                return res.status(404).json({ error: "Pregunta no encontrada" });
            }


            res.status(200).json(pregunta);
        });
    },

    eliminarPregunta: (req, res) => {
        const { idPregunta } = req.params
        PreguntaTo.eliminarPregunta(idPregunta, (err, result) => {
            if (err) {
                console.error('Error al eliminar la pregunta:', err);
                return res.status(500).json({ error: 'Error al eliminar la pregunta' });
            }
            res.status(200).json({ mensaje: 'La pregunta fue eliminada exitosamente' });
        })
    },

    editarPregunta: async (req, res) => {
        try {
            const { idPregunta } = req.params;
            let { pregunta, respuesta, visible } = req.body;

            const visibilidad = visible === "1" || visible === 1 || visible === true ? 1 : 0;

            PreguntaTo.buscarPregunta(idPregunta, (err, resultado) => {
                if (err) {
                    console.error("Error al buscar la pregunta:", err);
                    return res.status(500).json({ error: "Error al buscar la pregunta" });
                }

                if (!resultado || resultado.length === 0) {
                    console.warn(`Pregunta con ID ${idPregunta} no encontrada`);
                    return res.status(404).json({ error: "Pregunta no encontrada" });
                }

                const existente = resultado[0];

                const datosActualizados = {
                    pregunta: pregunta?.trim() || existente.pregunta,
                    respuesta: respuesta?.trim() || existente.respuesta,
                    visible: typeof visible !== 'undefined' ? visibilidad : existente.visible,
                    idPregunta: idPregunta
                };

                console.log("Datos actualizados:", datosActualizados);

                PreguntaTo.actualizarPregunta(datosActualizados, (err) => {
                    if (err) {
                        console.error("Error al actualizar la pregunta:", err);
                        return res.status(500).json({ error: "Error al actualizar la pregunta" });
                    }

                    res.status(200).json({ mensaje: "Pregunta actualizada correctamente" });
                });
            });

        } catch (err) {
            console.error("Error inesperado en editarPregunta:", err);
            return res.status(500).json({ error: "Error interno al actualizar la pregunta" });
        }
    }


};

module.exports = PreguntasController;