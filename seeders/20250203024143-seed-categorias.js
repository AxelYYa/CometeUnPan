'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Categorias', [
      { nombre: 'Dulces', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Blancos', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Integrales', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Especiales', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categorias', null, {});
  }
};