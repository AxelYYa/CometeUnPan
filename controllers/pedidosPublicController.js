const { Pedidos, DetallesDePedido } = require('../models');

exports.getPedidosPublic = async (req, res) => {
  try {
    const pedidos = await Pedidos.findAll({
      where: {
        estado_envio: ['En Proceso', 'En Camino']
      },
      include: [{ model: DetallesDePedido, as: 'detalles' }]
    });

    res.status(200).json(pedidos);
  } catch (error) {
    console.error('Error fetching pedidos:', error);
    res.status(500).json({ error: error.message });
  }
};