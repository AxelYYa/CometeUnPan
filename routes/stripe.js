const express = require('express');
const router = express.Router();
const stripeController = require('../controllers/stripeController');

router.post('/create-payment-intent', stripeController.createPaymentIntent);
router.post('/payment-success', stripeController.handlePaymentSuccess);

module.exports = router;