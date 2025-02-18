const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const mime = require('mime-types');
const fs = require('fs');
const app = express();
const authRoutes = require('./routes/auth');
const usuariosRoutes = require('./routes/usuarios');
const categoriasRoutes = require('./routes/categorias');
const productosRoutes = require('./routes/productos');
const pedidosRoutes = require('./routes/pedidos');
const pedidosPublicRouter = require('./routes/pedidosPublic');

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(`Solicitud para: ${req.url}`);
  next();
});

app.use('/images', (req, res, next) => {
  const filePath = path.join(__dirname, 'src/images', req.path);
  const mimeType = mime.lookup(filePath);
  if (mimeType) {
    res.setHeader('Content-Type', mimeType);
  }
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.status(404).send('Not Found');
    } else {
      res.send(data);
    }
  });
});

app.use('/auth', authRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/categorias', categoriasRoutes);
app.use('/productos', productosRoutes);
app.use('/pedidos', pedidosRoutes);
app.use('/pedidos-public', pedidosPublicRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});