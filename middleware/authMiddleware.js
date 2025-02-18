const jwt = require('jsonwebtoken');
const { secret } = require('../config/jwtConfig');

const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    console.log('No token provided'); // Log para verificar si el token no está presente
    return res.status(403).send({ message: 'No token provided!' });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      console.log('Unauthorized:', err); // Log para verificar si hay un error en la verificación del token
      return res.status(401).send({ message: 'Unauthorized!' });
    }
    console.log('Token decoded:', decoded); // Log para verificar el token decodificado
    req.userId = decoded.id;
    next();
  });
};

module.exports = verifyToken;