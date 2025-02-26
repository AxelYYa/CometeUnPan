const express = require('express');
const router = express.Router();
const categoriasController = require('../controllers/categoriasController');

/**
 * @swagger
 * tags:
 *   name: Categorias
 *   description: Endpoints para la gestión de categorías
 */

/**
 * @swagger
 * /categorias:
 *   post:
 *     summary: Crear una nueva categoría
 *     tags: [Categorias]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *     responses:
 *       200:
 *         description: Categoría creada con éxito
 *       400:
 *         description: Solicitud incorrecta
 */
router.post('/', categoriasController.createCategoria);

/**
 * @swagger
 * /categorias:
 *   get:
 *     summary: Obtener todas las categorías
 *     tags: [Categorias]
 *     responses:
 *       200:
 *         description: Lista de categorías
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', categoriasController.getCategorias);

module.exports = router;