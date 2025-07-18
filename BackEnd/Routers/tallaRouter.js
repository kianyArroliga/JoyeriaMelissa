const express = require('express')
const router = express.Router()
const TallaController = require('../Controllers/TallaController')  


router.get('/', TallaController.listarTallas)

module.exports = router
