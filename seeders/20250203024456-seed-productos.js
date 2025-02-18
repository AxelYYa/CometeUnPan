'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Productos', [
      // 🎸 Instrumentos de Cuerda
      { nombre: 'Guitarra Acústica Yamaha F310', descripcion: 'Guitarra acústica de 6 cuerdas', stock: 10, stock_minimo: 2, precio: 3500, categoriaId: 1, imagepath: 'https://res.cloudinary.com/drstwixm0/image/upload/v1738676757/1_yy2c5v.png', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Bajo Eléctrico Fender Jazz Bass', descripcion: 'Bajo eléctrico de 4 cuerdas', stock: 8, stock_minimo: 2, precio: 12000, categoriaId: 1, imagepath: 'https://res.cloudinary.com/drstwixm0/image/upload/v1738676757/2_lr6h8p.png', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Violín Stradivarius Réplica', descripcion: 'Violín hecho a mano con arco', stock: 5, stock_minimo: 1, precio: 25000, categoriaId: 1, imagepath: 'https://res.cloudinary.com/drstwixm0/image/upload/v1738676757/3_g0dbjt.jpg', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Ukulele Mahalo Soprano', descripcion: 'Ukulele soprano de 4 cuerdas', stock: 15, stock_minimo: 3, precio: 1500, categoriaId: 1, imagepath: 'https://res.cloudinary.com/drstwixm0/image/upload/v1738676757/4_aqxhkh.png', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Tololoche de Madera Clásico', descripcion: 'Tololoche hecho a mano', stock: 5, stock_minimo: 1, precio: 15000, categoriaId: 1, imagepath: 'https://res.cloudinary.com/drstwixm0/image/upload/v1738676758/5_niptl9.png', createdAt: new Date(), updatedAt: new Date() },

      // 🎷 Instrumentos de Viento
      { nombre: 'Trompeta Yamaha YTR-2330', descripcion: 'Trompeta en si bemol', stock: 7, stock_minimo: 2, precio: 8000, categoriaId: 2, imagepath: 'https://res.cloudinary.com/drstwixm0/image/upload/v1738676757/6_v3prly.png', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Acordeón Hohner Panther', descripcion: 'Acordeón de 31 botones', stock: 4, stock_minimo: 1, precio: 9000, categoriaId: 2, imagepath: 'https://res.cloudinary.com/drstwixm0/image/upload/v1738676757/7_vbi41l.jpg', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Flauta Traversa Yamaha', descripcion: 'Flauta traversa plateada', stock: 10, stock_minimo: 2, precio: 6000, categoriaId: 2, imagepath: 'https://res.cloudinary.com/drstwixm0/image/upload/v1738676757/8_ief4x7.png', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Clarinete Buffet Crampon', descripcion: 'Clarinete de madera profesional', stock: 5, stock_minimo: 1, precio: 18000, categoriaId: 2, imagepath: 'https://res.cloudinary.com/drstwixm0/image/upload/v1738676758/9_s9gvfu.png', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Saxofón Alto Yamaha YAS-280', descripcion: 'Saxofón alto dorado', stock: 3, stock_minimo: 1, precio: 25000, categoriaId: 2, imagepath: 'https://res.cloudinary.com/drstwixm0/image/upload/v1738676758/10_wfrktr.jpg', createdAt: new Date(), updatedAt: new Date() },

      // 🥁 Percusiones
      { nombre: 'Batería Pearl Roadshow', descripcion: 'Batería completa de 5 piezas', stock: 6, stock_minimo: 2, precio: 18000, categoriaId: 3, imagepath: 'https://res.cloudinary.com/drstwixm0/image/upload/v1738676758/11_makzdk.jpg', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Conga LP Matador', descripcion: 'Conga de madera 11 3/4 pulgadas', stock: 4, stock_minimo: 1, precio: 5000, categoriaId: 3, imagepath: 'https://res.cloudinary.com/drstwixm0/image/upload/v1738676758/12_ctou8i.png', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Cajón Flamenco Schlagwerk', descripcion: 'Cajón de madera profesional', stock: 8, stock_minimo: 2, precio: 3500, categoriaId: 3, imagepath: 'https://res.cloudinary.com/drstwixm0/image/upload/v1738676758/13_zub77r.jpg', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Pandereta Remo Fiberskyn', descripcion: 'Pandereta de 10 pulgadas con jingles', stock: 20, stock_minimo: 5, precio: 600, categoriaId: 3, imagepath: 'https://res.cloudinary.com/drstwixm0/image/upload/v1738676758/14_ondktm.jpg', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Timbal Tito Puente LP', descripcion: 'Juego de timbales de acero', stock: 3, stock_minimo: 1, precio: 12000, categoriaId: 3, imagepath: 'https://res.cloudinary.com/drstwixm0/image/upload/v1738676758/15_r6nvku.jpg', createdAt: new Date(), updatedAt: new Date() },

      // 🎼 Accesorios
      { nombre: 'Cuerdas para Guitarra Elixir 80/20', descripcion: 'Juego de cuerdas para guitarra acústica', stock: 20, stock_minimo: 5, precio: 500, categoriaId: 4, imagepath: 'https://res.cloudinary.com/drstwixm0/image/upload/v1738676759/16_whb5hx.jpg', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Capotrasto Dunlop Trigger', descripcion: 'Capo para guitarra', stock: 15, stock_minimo: 3, precio: 450, categoriaId: 4, imagepath: 'https://res.cloudinary.com/drstwixm0/image/upload/v1738676759/17_ozmzop.jpg', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Afinador Digital Korg', descripcion: 'Afinador cromático para instrumentos', stock: 25, stock_minimo: 5, precio: 300, categoriaId: 4, imagepath: 'https://res.cloudinary.com/drstwixm0/image/upload/v1738676759/18_pzwki9.png', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Púas Fender Medium', descripcion: 'Paquete de 12 púas medianas', stock: 50, stock_minimo: 10, precio: 120, categoriaId: 4, imagepath: 'https://res.cloudinary.com/drstwixm0/image/upload/v1738676762/19_kc8lhd.png', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Soporte de Guitarra Hercules', descripcion: 'Soporte ajustable para guitarra o bajo', stock: 10, stock_minimo: 2, precio: 800, categoriaId: 4, imagepath: 'https://res.cloudinary.com/drstwixm0/image/upload/v1738676764/20_mue8od.jpg', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Productos', null, {});
  }
};