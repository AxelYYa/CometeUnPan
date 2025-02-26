const express = require('express');
const router = express.Router();
const stripeController = require('../controllers/stripeController');

/**
 * @swagger
 * tags:
 *   name: Stripe
 *   description: Endpoints para pagos con Stripe
 */

/**
 * @swagger
 * /stripe/create-payment-intent:
 *   post:
 *     summary: Crear una intención de pago
 *     tags: [Stripe]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Intención de pago creada exitosamente
 *       500:
 *         description: Error interno del servidor
 */
router.post('/create-payment-intent', stripeController.createPaymentIntent);

/**
 * @swagger
 * /stripe/payment-success:
 *   post:
 *     summary: Manejar el éxito del pago
 *     tags: [Stripe]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               paymentIntentId:
 *                 type: string
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
 *               userId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Orden creada exitosamente
 *       500:
 *         description: Error interno del servidor
 */
router.post('/payment-success', stripeController.handlePaymentSuccess);

module.exports = router;
