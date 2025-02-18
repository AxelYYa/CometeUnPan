'use strict';
module.exports = (sequelize, DataTypes) => {
  const Categorias = sequelize.define('Categorias', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Categorias.associate = function(models) {
    Categorias.hasMany(models.Productos, { foreignKey: 'categoriaId', as: 'productos' });
  };
  return Categorias;
};