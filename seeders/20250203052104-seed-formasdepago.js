'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('FormasDePago', [
      { nombre: 'Efectivo', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Transferencia', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Débito', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Crédito', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('FormasDePago', null, {});
  }
};