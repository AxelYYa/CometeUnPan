'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pedidos = sequelize.define('Pedidos', {
    fecha_realizacion: {
      type: DataTypes.DATE,
      allowNull: false
    },
    fecha_entrega: {
      type: DataTypes.DATE,
      allowNull: true
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    estado_envio: {
      type: DataTypes.ENUM('Pendiente', 'En Proceso', 'En Camino', 'En Puerta', 'Entregado', 'Cancelado'),
      allowNull: false
    },
    estado_pago: {
      type: DataTypes.ENUM('Pendiente', 'Pagado', 'Cancelado'),
      allowNull: false
    }
  }, {});

  Pedidos.associate = function(models) {
    Pedidos.belongsTo(models.Usuarios, { foreignKey: 'clienteId', as: 'cliente' });
    Pedidos.belongsTo(models.Usuarios, { foreignKey: 'repartidorId', as: 'repartidor' });
    Pedidos.belongsTo(models.FormasDePago, { foreignKey: 'forma_pagoId', as: 'forma_pago' });
    Pedidos.hasMany(models.DetallesDePedido, { foreignKey: 'pedidoId', as: 'detalles' });
  };

  return Pedidos;
};