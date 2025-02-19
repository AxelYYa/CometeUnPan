'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Productos', [
      { nombre: 'Concha', descripcion: 'Pan dulce con cobertura de azúcar', stock: 20, stock_minimo: 5, precio: 15, categoriaId: 1, imagepath: 'https://img.freepik.com/fotos-premium/dulche-casero-glaseado-blanco-amarillo-rosa_198639-55287.jpg?w=740', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Oreja', descripcion: 'Pan hojaldrado crujiente con azúcar', stock: 25, stock_minimo: 5, precio: 18, categoriaId: 1, imagepath: 'https://img.freepik.com/fotos-premium/soplo-sabroso-aislado-sobre-superficie-blanca_188078-7383.jpg?w=1060', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Dona', descripcion: 'Pan dulce frito con glaseado', stock: 15, stock_minimo: 5, precio: 22, categoriaId: 1, imagepath: 'https://img.freepik.com/foto-gratis/desayuno-donut-espolvorea-dieta-tratar_1339-73.jpg?t=st=1739947622~exp=1739951222~hmac=adcc2b7a887743a7f6b91a32ae6bfdc7dc0d8ed795c30391852b8df11fa3340e&w=826', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Bolillo', descripcion: 'Pan salado tradicional', stock: 30, stock_minimo: 10, precio: 10, categoriaId: 2, imagepath: 'https://img.freepik.com/foto-gratis/rollo-pan_1339-691.jpg?t=st=1739947662~exp=1739951262~hmac=c006b04f1a1102d6dc83142a09857e45e4f425fd6f1716f1a068d20af1ced737&w=1060', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Telera', descripcion: 'Pan salado suave y esponjoso', stock: 20, stock_minimo: 5, precio: 12, categoriaId: 2, imagepath: 'https://img.freepik.com/foto-gratis/masa-madre-levadura-pan-amargo-alimentos_1203-5439.jpg?t=st=1739947704~exp=1739951304~hmac=82063aa9c2fee98798697eb1b3682ef547122d91975cf06d4b71b98323be62b9&w=1060', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Baguette', descripcion: 'Pan francés crujiente', stock: 10, stock_minimo: 2, precio: 25, categoriaId: 2, imagepath: 'https://img.freepik.com/fotos-premium/mini-baguette-frances-aislado-sobre-fondo-blanco-primer-plano_627281-1729.jpg?w=1060', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Pan Integral', descripcion: 'Pan saludable con fibra', stock: 15, stock_minimo: 5, precio: 20, categoriaId: 3, imagepath: 'https://img.freepik.com/fotos-premium/rebanadas-pan-sobre-superficie-blanca-aislada_404043-1749.jpg?w=1060', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Pan de Centeno', descripcion: 'Pan oscuro con alto contenido de fibra', stock: 12, stock_minimo: 3, precio: 22, categoriaId: 3, imagepath: 'https://chedrauimx.vtexassets.com/arquivos/ids/37908344-800-auto?v=638652186129230000&width=800&height=auto&aspect=true', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Pan Multigrano', descripcion: 'Pan con semillas y cereales', stock: 18, stock_minimo: 5, precio: 28, categoriaId: 3, imagepath: 'https://lumijor.com.do/wp-content/uploads/2015/10/Pan-Multigrano-Domino.jpg', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Rosca de Reyes', descripcion: 'Pan especial con fruta confitada', stock: 10, stock_minimo: 2, precio: 150, categoriaId: 4, imagepath: 'https://i5-mx.walmartimages.com/gr/images/product-images/img_large/00750649500860L.jpg', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Pan de Muerto', descripcion: 'Pan tradicional con azucar', stock: 8, stock_minimo: 2, precio: 40, categoriaId: 4, imagepath: 'https://arteli.vtexassets.com/arquivos/ids/260281/000002353735_00.jpg?v=638635817234370000', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Panettone', descripcion: 'Pan dulce italiano con pasas y frutas', stock: 6, stock_minimo: 2, precio: 180, categoriaId: 4, imagepath: 'https://blog.elamasadero.com/wp-content/uploads/panettone-amasadero-1.jpg', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Productos', null, {});
  }
};
