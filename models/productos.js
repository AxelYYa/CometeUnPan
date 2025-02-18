'use strict';
module.exports = (sequelize, DataTypes) => {
  const Productos = sequelize.define('Productos', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    stock_minimo: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    precio: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    imagepath: {
      type: DataTypes.STRING,
      allowNull: true
    },
    categoriaId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Categorias',
        key: 'id'
      }
    }
  }, {});
  Productos.associate = function(models) {
    Productos.belongsTo(models.Categorias, { foreignKey: 'categoriaId', as: 'categoria' });
  };
  return Productos;
};