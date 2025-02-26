const express = require('express');
const router = express.Router();
const pedidosController = require('../controllers/pedidosController');
const verifyToken = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Pedidos
 *   description: Endpoints para la gestión de pedidos
 */

/**
 * @swagger
 * /pedidos:
 *   post:
 *     summary: Crear un nuevo pedido
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
 *         description: Pedido creado con éxito
 *       401:
 *         description: No autorizado
 */
router.post('/', pedidosController.createPedido);

/**
 * @swagger
 * /pedidos/{id}/aceptar:
 *   put:
 *     summary: Aceptar un pedido
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del pedido
 *     responses:
 *       200:
 *         description: Pedido aceptado con éxito
 *       401:
 *         description: No autorizado
 */
router.put('/:id/aceptar', verifyToken, pedidosController.aceptarPedido);

/**
 * @swagger
 * /pedidos/{id}/entregar:
 *   put:
 *     summary: Entregar un pedido
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del pedido
 *     responses:
 *       200:
 *         description: Pedido entregado con éxito
 *       401:
 *         description: No autorizado
 */
router.put('/:id/entregar', verifyToken, pedidosController.entregarPedido);

/**
 * @swagger
 * /pedidos/{id}/procesar:
 *   put:
 *     summary: Procesar un pedido
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del pedido
 *     responses:
 *       200:
 *         description: Pedido procesado con éxito
 *       500:
 *         description: Error interno del servidor
 */
router.put('/:id/procesar', pedidosController.procesarPedido);

/**
 * @swagger
 * /pedidos/{id}/revertir:
 *   put:
 *     summary: Revertir un pedido
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del pedido
 *     responses:
 *       200:
 *         description: Pedido revertido con éxito
 *       401:
 *         description: No autorizado
 */
router.put('/:id/revertir', verifyToken, pedidosController.revertirPedido);

/**
 * @swagger
 * /pedidos/repartidor:
 *   get:
 *     summary: Obtener pedidos para entrega
 *     tags: [Pedidos]
 *     responses:
 *       200:
 *         description: Lista de pedidos para entrega
 *       500:
 *         description: Error interno del servidor
 */
router.get('/repartidor', pedidosController.getPedidosRepartidor);

/**
 * @swagger
 * /pedidos:
 *   get:
 *     summary: Obtener todos los pedidos
 *     tags: [Pedidos]
 *     responses:
 *       200:
 *         description: Lista de pedidos
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', pedidosController.getAllPedidos);

/**
 * @swagger
 * /pedidos/{id}/enpuerta:
 *   put:
 *     summary: Marcar un pedido como en la puerta
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del pedido
 *     responses:
 *       200:
 *         description: Pedido marcado como en la puerta con éxito
 *       500:
 *         description: Error interno del servidor
 */
router.put('/:id/enpuerta', pedidosController.marcarComoEnPuerta);

module.exports = router;