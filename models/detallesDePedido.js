'use strict';
module.exports = (sequelize, DataTypes) => {
  const DetallesDePedido = sequelize.define('DetallesDePedido', {
    pedidoId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    productoId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    precio: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    tableName: 'DetallesDePedido'
  });

  DetallesDePedido.associate = function(models) {
    DetallesDePedido.belongsTo(models.Pedidos, { foreignKey: 'pedidoId', as: 'pedido' });
    DetallesDePedido.belongsTo(models.Productos, { foreignKey: 'productoId', as: 'producto' });
  };

  return DetallesDePedido;
};