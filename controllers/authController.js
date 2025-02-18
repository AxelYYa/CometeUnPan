const { Usuarios, Personas } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { secret, expiresIn } = require('../config/jwtConfig');

exports.getMe = async (req, res) => {
  try {
    const user = await Usuarios.findByPk(req.userId);
    if (!user) {
      return res.status(404).send({ message: 'User Not Found.' });
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.register = async (req, res) => {
  try {
    const persona = await Personas.create({
      nombre: req.body.nombre,
      apellido_paterno: req.body.apellido_paterno,
      apellido_materno: req.body.apellido_materno,
      fecha_nacimiento: req.body.fecha_nacimiento
    });

    const hashedPassword = bcrypt.hashSync(req.body.contraseña, 8);
    const usuario = await Usuarios.create({
      correo: req.body.correo,
      contraseña: hashedPassword,
      rolId: 2,
      personaId: persona.id,
      direccion: req.body.direccion
    });

    res.status(201).json(usuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.registerEmployee = async (req, res) => {
  try {
    const persona = await Personas.create({
      nombre: req.body.nombre,
      apellido_paterno: req.body.apellido_paterno,
      apellido_materno: req.body.apellido_materno,
      fecha_nacimiento: req.body.fecha_nacimiento
    });

    const hashedPassword = bcrypt.hashSync(req.body.contraseña, 8);
    const usuario = await Usuarios.create({
      correo: req.body.correo,
      contraseña: hashedPassword,
      rolId: 3,
      personaId: persona.id,
      direccion: req.body.direccion
    });

    res.status(201).json(usuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.login = async (req, res) => {
  try {
    const usuario = await Usuarios.findOne({ where: { correo: req.body.correo } });
    if (!usuario) {
      return res.status(404).send({ message: 'User Not found.' });
    }

    const passwordIsValid = bcrypt.compareSync(req.body.contraseña, usuario.contraseña);
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: 'Contraseña Inválida, cómo mi primo Jaimico!.'
      });
    }

    const token = jwt.sign({ id: usuario.id }, secret, {
      expiresIn: expiresIn
    });

    res.status(200).send({
      id: usuario.id,
      correo: usuario.correo,
      accessToken: token
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};