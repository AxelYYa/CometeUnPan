'use strict';
module.exports = (sequelize, DataTypes) => {
  const Roles = sequelize.define('Roles', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Roles.associate = function(models) {
    Roles.hasMany(models.Usuarios, { foreignKey: 'rolId', as: 'usuarios' });
  };
  return Roles;
};