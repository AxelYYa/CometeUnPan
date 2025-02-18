'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Categorias', [
      { nombre: 'Cuerda', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Viento', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Percusiones', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Accesorios', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categorias', null, {});
  }
};