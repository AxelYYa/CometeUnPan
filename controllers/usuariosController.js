const { Usuarios } = require('../models');

exports.createUsuario = async (req, res) => {
  try {
    const usuario = await Usuarios.create(req.body);
    res.status(201).json(usuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuarios.findAll();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};