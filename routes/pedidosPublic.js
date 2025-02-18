const express = require('express');
const router = express.Router();
const pedidosPublicController = require('../controllers/pedidosPublicController');

router.get('/', pedidosPublicController.getPedidosPublic);

module.exports = router;