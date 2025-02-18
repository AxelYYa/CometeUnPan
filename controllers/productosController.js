const { Productos, Categorias } = require('../models');

exports.createProducto = async (req, res) => {
  try {
    const producto = await Productos.create({
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      categoriaId: req.body.categoriaId,
      precio: req.body.precio,
      stock: req.body.stock,
      stock_minimo: req.body.stock_minimo,
      imagepath: req.body.imagepath
    });
    res.status(201).json(producto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getProductos = async (req, res) => {
  try {
    const productos = await Productos.findAll({
      include: {
        model: Categorias,
        as: 'categoria',
        attributes: ['nombre']
      }
    });
    res.status(200).json(productos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};