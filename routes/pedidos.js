const express = require('express');
const router = express.Router();
const pedidosController = require('../controllers/pedidosController');
const verifyToken = require('../middleware/authMiddleware');

router.post('/', verifyToken, pedidosController.createPedido);
router.put('/:id/aceptar', verifyToken, pedidosController.aceptarPedido);
router.put('/:id/entregar', verifyToken, pedidosController.entregarPedido);
router.put('/:id/procesar', pedidosController.procesarPedido);
router.put('/:id/revertir', verifyToken, pedidosController.revertirPedido);
router.get('/repartidor', pedidosController.getPedidosRepartidor);
router.get('/', pedidosController.getAllPedidos);
router.put('/:id/enpuerta', pedidosController.marcarComoEnPuerta);

module.exports = router;