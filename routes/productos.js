const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');

/**
 * @swagger
 * tags:
 *   name: Productos
 *   description: Endpoints para la gestión de productos
 */

/**
 * @swagger
 * /productos:
 *   post:
 *     summary: Crear un nuevo producto
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
 *         description: Producto creado exitosamente
 *       400:
 *         description: Solicitud incorrecta
 */
router.post('/', productosController.createProducto);

/**
 * @swagger
 * /productos:
 *   get:
 *     summary: Obtener todos los productos
 *     tags: [Productos]
 *     responses:
 *       200:
 *         description: Lista de productos
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', productosController.getProductos);

module.exports = router;
