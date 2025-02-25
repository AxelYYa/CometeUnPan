const express = require('express');
const router = express.Router();
const stripeController = require('../controllers/stripeController');

/**
 * @swagger
 * tags:
 *   name: Stripe
 *   description: Stripe payment endpoints
 */

/**
 * @swagger
 * /stripe/create-payment-intent:
 *   post:
 *     summary: Create a payment intent
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
 *         description: Payment intent created successfully
 *       500:
 *         description: Internal server error
 */
router.post('/create-payment-intent', stripeController.createPaymentIntent);

/**
 * @swagger
 * /stripe/payment-success:
 *   post:
 *     summary: Handle payment success
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
 *         description: Order created successfully
 *       500:
 *         description: Internal server error
 */
router.post('/payment-success', stripeController.handlePaymentSuccess);

module.exports = router;