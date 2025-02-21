// filepath: /c:/Users/Axel/Documents/CometeUnPan/controllers/stripeController.js
const stripe = require('stripe')('sk_test_51QRqFLK2OoTqVpjs0AoH1F1DYnX8FrOKxRuc5GOMVHkYdw0anJNXk5d1A7uUdR4OXTiEmPw5rSkT4MxXuoSyF6It00rPlkJAie');
const { Pedidos, DetallesDePedido, sequelize } = require('../models');

exports.createPaymentIntent = async (req, res) => {
  try {
    const { amount } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method_types: ['card'],
    });
    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.handlePaymentSuccess = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { paymentIntentId, direccion, detalles, userId } = req.body;

    // Verify the payment intent status
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    if (paymentIntent.status !== 'succeeded') {
      return res.status(400).json({ error: 'Payment not successful' });
    }

    // Create the order in the database
    const pedido = await Pedidos.create({
      fecha_realizacion: new Date(),
      clienteId: userId,
      direccion,
      estado_envio: 'Pendiente',
      estado_pago: 'Pagado',
      forma_pagoId: 1
    }, { transaction: t });

    for (const detalle of detalles) {
      await DetallesDePedido.create({
        pedidoId: pedido.id,
        productoId: detalle.productoId,
        cantidad: detalle.cantidad,
        precio: detalle.precio
      }, { transaction: t });
    }

    await t.commit();
    res.status(201).json(pedido);
  } catch (error) {
    await t.rollback();
    console.error('Error handling payment success:', error);
    res.status(500).json({ error: error.message });
  }
};