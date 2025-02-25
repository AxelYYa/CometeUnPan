const express = require('express');
const router = express.Router();
const pedidosController = require('../controllers/pedidosController');
const verifyToken = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Pedidos
 *   description: Order management endpoints
 */

/**
 * @swagger
 * /pedidos:
 *   post:
 *     summary: Create a new order
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clienteId:
 *                 type: integer
 *               direccion:
 *                 type: string
 *               detalles:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productoId:
 *                       type: integer
 *                     cantidad:
 *                       type: integer
 *                     precio:
 *                       type: number
 *     responses:
 *       201:
 *         description: Order created successfully
 *       401:
 *         description: Unauthorized
 */
router.post('/', verifyToken, pedidosController.createPedido);

/**
 * @swagger
 * /pedidos/{id}/aceptar:
 *   put:
 *     summary: Accept an order
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order accepted successfully
 *       401:
 *         description: Unauthorized
 */
router.put('/:id/aceptar', verifyToken, pedidosController.aceptarPedido);

/**
 * @swagger
 * /pedidos/{id}/entregar:
 *   put:
 *     summary: Deliver an order
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order delivered successfully
 *       401:
 *         description: Unauthorized
 */
router.put('/:id/entregar', verifyToken, pedidosController.entregarPedido);

/**
 * @swagger
 * /pedidos/{id}/procesar:
 *   put:
 *     summary: Process an order
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order processed successfully
 *       500:
 *         description: Internal server error
 */
router.put('/:id/procesar', pedidosController.procesarPedido);

/**
 * @swagger
 * /pedidos/{id}/revertir:
 *   put:
 *     summary: Revert an order
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order reverted successfully
 *       401:
 *         description: Unauthorized
 */
router.put('/:id/revertir', verifyToken, pedidosController.revertirPedido);

/**
 * @swagger
 * /pedidos/repartidor:
 *   get:
 *     summary: Get orders for delivery
 *     tags: [Pedidos]
 *     responses:
 *       200:
 *         description: List of orders for delivery
 *       500:
 *         description: Internal server error
 */
router.get('/repartidor', pedidosController.getPedidosRepartidor);

/**
 * @swagger
 * /pedidos:
 *   get:
 *     summary: Get all orders
 *     tags: [Pedidos]
 *     responses:
 *       200:
 *         description: List of orders
 *       500:
 *         description: Internal server error
 */
router.get('/', pedidosController.getAllPedidos);

/**
 * @swagger
 * /pedidos/{id}/enpuerta:
 *   put:
 *     summary: Mark an order as at the door
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order marked as at the door successfully
 *       500:
 *         description: Internal server error
 */
router.put('/:id/enpuerta', pedidosController.marcarComoEnPuerta);

module.exports = router;