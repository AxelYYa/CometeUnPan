const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware, usuariosController.createUsuario);
router.get('/', authMiddleware, usuariosController.getUsuarios);

// Otras rutas CRUD (update, delete, etc.) pueden ser añadidas aquí

module.exports = router;