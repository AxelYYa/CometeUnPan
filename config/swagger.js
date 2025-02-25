const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CometeUnPan API',
      version: '1.0.0',
      description: 'API documentation for CometeUnPan project',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./routes/*.js', './models/*.js'], // Archivos donde se encuentran las rutas y modelos
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};