'use strict';
module.exports = (sequelize, DataTypes) => {
  const Usuarios = sequelize.define('Usuarios', {
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    contraseña: {
      type: DataTypes.STRING,
      allowNull: false
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    rolId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Roles',
        key: 'id'
      }
    },
    personaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Personas',
        key: 'id'
      }
    }
  }, {});
  Usuarios.associate = function(models) {
    Usuarios.belongsTo(models.Roles, { foreignKey: 'rolId', as: 'rol' });
    Usuarios.belongsTo(models.Personas, { foreignKey: 'personaId', as: 'persona' });
  };
  return Usuarios;
};