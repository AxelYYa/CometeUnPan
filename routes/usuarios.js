const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const authMiddleware = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: User management endpoints
 */

/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Create a new user
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 */
router.post('/', authMiddleware, usuariosController.createUsuario);

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Get all users
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: List of users
 *       401:
 *         description: Unauthorized
 */
router.get('/', authMiddleware, usuariosController.getUsuarios);

module.exports = router;