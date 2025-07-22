const express = require('express')
const router = express.Router()
const PreguntasController = require('../Controllers/PreguntaController')

//Agregrar una pregunta
router.post('/agregarPregunta', PreguntasController.agregarPregunta);

//Listar todas las preguntas
router.get('/preguntas', PreguntasController.listarTodos);
// Actualizar una pregunta
router.get('/editarPregunta/:idPregunta', PreguntasController.listarPreguntaPorId);
router.put('/editarPregunta/:idPregunta', PreguntasController.editarPregunta);
//Eliminar una pregunta
router.delete('/borrarPregunta/:idPregunta', PreguntasController.eliminarPregunta);
 
 
module.exports = router