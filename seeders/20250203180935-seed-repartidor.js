'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Personas', [{
      nombre: 'Repartidor',
      apellido_paterno: 'Repartidor',
      apellido_materno: 'Repartidor',
      fecha_nacimiento: new Date('1990-01-01'),
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    const persona = await queryInterface.sequelize.query(
      `SELECT id FROM Personas WHERE nombre = 'Repartidor' AND apellido_paterno = 'Repartidor' AND apellido_materno = 'Repartidor' LIMIT 1;`
    );
    const personaId = persona[0][0].id;

    await queryInterface.bulkInsert('Usuarios', [{
      correo: 'repartidor@gmail.com',
      contraseña: bcrypt.hashSync('repartidor123', 8),
      rolId: 3,
      personaId: personaId,
      direccion: '123 Repartidor St',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Usuarios', { correo: 'repartidor@gmail.com' }, {});
    await queryInterface.bulkDelete('Personas', { nombre: 'Repartidor' }, {});
  }
};