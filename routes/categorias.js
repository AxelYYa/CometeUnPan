const express = require('express');
const router = express.Router();
const categoriasController = require('../controllers/categoriasController');

router.post('/', categoriasController.createCategoria);
router.get('/', categoriasController.getCategorias);

module.exports = router;