const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');

/**
 * @swagger
 * tags:
 *   name: Productos
 *   description: Product management endpoints
 */

/**
 * @swagger
 * /productos:
 *   post:
 *     summary: Create a new product
 *     tags: [Productos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               precio:
 *                 type: number
 *     responses:
 *       200:
 *         description: Product created successfully
 *       400:
 *         description: Bad request
 */
router.post('/', productosController.createProducto);

/**
 * @swagger
 * /productos:
 *   get:
 *     summary: Get all products
 *     tags: [Productos]
 *     responses:
 *       200:
 *         description: List of products
 *       500:
 *         description: Internal server error
 */
router.get('/', productosController.getProductos);

module.exports = router;