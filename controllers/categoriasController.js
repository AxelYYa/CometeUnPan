const { Categorias } = require('../models');

exports.createCategoria = async (req, res) => {
  try {
    const categoria = await Categorias.create({
      nombre: req.body.nombre
    });
    res.status(201).json(categoria);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getCategorias = async (req, res) => {
  try {
    const categorias = await Categorias.findAll();
    res.status(200).json(categorias);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};