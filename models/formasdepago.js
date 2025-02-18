'use strict';
module.exports = (sequelize, DataTypes) => {
  const FormasDePago = sequelize.define('FormasDePago', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  FormasDePago.associate = function(models) {
    // associations can be defined here
  };
  return FormasDePago;
};