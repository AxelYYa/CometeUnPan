'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Roles', [
      {
        nombre: 'Admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'User',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Delivery',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Roles', null, {});
  }
};