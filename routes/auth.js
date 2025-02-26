const express = require('express');
const router = express.Router();
const controladorAutenticacion = require('../controllers/authController');
const verificarToken = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Autenticación
 *   description: Endpoints relacionados con la autenticación
 */

/**
 * @swagger
 * /auth/registrar:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario:
 *                 type: string
 *               contraseña:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario registrado exitosamente
 *       400:
 *         description: Solicitud incorrecta
 */
router.post('/registrar', controladorAutenticacion.register);

/**
 * @swagger
 * /auth/registrarEmpleado:
 *   post:
 *     summary: Registrar un nuevo empleado
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario:
 *                 type: string
 *               contraseña:
 *                 type: string
 *     responses:
 *       200:
 *         description: Empleado registrado exitosamente
 *       400:
 *         description: Solicitud incorrecta
 */
router.post('/registrarEmpleado', controladorAutenticacion.registerEmployee);

/**
 * @swagger
 * /auth/iniciarSesion:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario:
 *                 type: string
 *               contraseña:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario autenticado exitosamente
 *       400:
 *         description: Solicitud incorrecta
 */
router.post('/iniciarSesion', controladorAutenticacion.login);

/**
 * @swagger
 * /auth/yo:
 *   get:
 *     summary: Obtener usuario actual
 *     tags: [Autenticación]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Datos del usuario actual
 *       401:
 *         description: No autorizado
 */
router.get('/yo', verificarToken, controladorAutenticacion.getMe);

module.exports = router;
