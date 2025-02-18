'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Pedidos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fecha_realizacion: {
        type: Sequelize.DATE,
        allowNull: false
      },
      fecha_entrega: {
        type: Sequelize.DATE,
        allowNull: true
      },
      clienteId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Usuarios',
          key: 'id'
        },
        allowNull: false
      },
      repartidorId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Usuarios',
          key: 'id'
        },
        allowNull: true
      },
      direccion: {
        type: Sequelize.STRING,
        allowNull: true
      },
      estado_envio: {
        type: Sequelize.ENUM('Pendiente', 'En Proceso', 'En Camino', 'En Puerta', 'Entregado', 'Cancelado'),
        allowNull: false
      },
      estado_pago: {
        type: Sequelize.ENUM('Pendiente', 'Pagado', 'Cancelado'),
        allowNull: false
      },
      forma_pagoId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'FormasDePago',
          key: 'id'
        },
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Pedidos');
  }
};