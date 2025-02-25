const express = require('express');
const router = express.Router();
const categoriasController = require('../controllers/categoriasController');

/**
 * @swagger
 * tags:
 *   name: Categorias
 *   description: Category management endpoints
 */

/**
 * @swagger
 * /categorias:
 *   post:
 *     summary: Create a new category
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
 *         description: Category created successfully
 *       400:
 *         description: Bad request
 */
router.post('/', categoriasController.createCategoria);

/**
 * @swagger
 * /categorias:
 *   get:
 *     summary: Get all categories
 *     tags: [Categorias]
 *     responses:
 *       200:
 *         description: List of categories
 *       500:
 *         description: Internal server error
 */
router.get('/', categoriasController.getCategorias);

module.exports = router;