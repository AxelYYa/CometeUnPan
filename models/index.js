'use strict';

console.log('📂 Archivo index.js cargado');

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

console.log('🔧 Configuración de la base de datos cargada');

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

console.log('🔗 Sequelize inicializado');

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

console.log('📦 Módulo db exportado');

module.exports = db;

// Probar la conexión con la base de datos
async function testConnection() {
  console.log('🔍 Iniciando prueba de conexión...');
  try {
    await db.sequelize.authenticate();
    console.log('✅ Conexión exitosa con MySQL');
  } catch (error) {
    console.error('❌ Error al conectar con MySQL:', error);
  }
}

// Llamar a la función para probar la conexión
testConnection();