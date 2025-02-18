const jwt = require('jsonwebtoken');
const { secret } = require('../config/jwtConfig');

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  console.log('Authorization Header:', authHeader); // Registro de depuración

  if (!authHeader) {
    return res.status(403).send({ message: 'No token provided!' });
  }

  const token = authHeader.split(' ')[1];
  console.log('Token:', token); // Registro de depuración

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      console.log('Error de verificación del token:', err); // Registro de depuración
      return res.status(401).send({ message: 'Unauthorized!' });
    }
    req.userId = decoded.id;
    console.log('Token verificado, userId:', req.userId); // Registro de depuración
    next();
  });
};