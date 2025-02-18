'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Personas', [{
      nombre: 'Admin',
      apellido_paterno: 'Admin',
      apellido_materno: 'Admin',
      fecha_nacimiento: new Date('1990-01-01'),
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    const persona = await queryInterface.sequelize.query(
      `SELECT id FROM Personas WHERE nombre = 'Admin' AND apellido_paterno = 'Admin' AND apellido_materno = 'Admin' LIMIT 1;`
    );
    const personaId = persona[0][0].id;

    await queryInterface.bulkInsert('Usuarios', [{
      correo: 'admin@gmail.com',
      contraseña: bcrypt.hashSync('admin123', 8),
      rolId: 1,
      personaId: personaId,
      direccion: '123 Admin St',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Usuarios', { correo: 'admin@gmail.com' }, {});
    await queryInterface.bulkDelete('Personas', { nombre: 'Admin' }, {});
  }
};