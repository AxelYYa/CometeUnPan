import React, { useState, useEffect } from 'react';
import NavbarComponent from '/src/Components/Navbar';
import FooterComponent from '/src/Components/Footer';
import banner from '/src/assets/banner1.jpg';
import '/main.css';

const Home = () => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : {};
  });

  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch('http://localhost:3000/productos');
        const data = await response.json();
        const productosFiltrados = data.filter(producto => [1, 6, 11].includes(producto.id));
        setProductos(productosFiltrados);
      } catch (error) {
        console.error('Error fetching productos:', error);
      }
    };

    fetchProductos();
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      <NavbarComponent cart={cart} />
      <main className="flex-grow-1">
        {/* Sección Hero con superposición oscura y animación */}
        <section
          className="hero-section text-white text-center d-flex align-items-center justify-content-center position-relative overflow-hidden"
          style={{
            backgroundImage: `url(${banner})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "70vh",
          }}
        >
          <div className="position-absolute w-100 h-100" style={{ backgroundColor: 'rgba(139, 94, 59, 0.5)' }}></div>
          <div className="container position-relative z-index-1">
            <h1 className="display-4 fw-bold mb-4 animate__animated animate__fadeInDown" style={{ color: '#F5E1C8' }}>
              Bienvenido a Nuestra Panadería
            </h1>
            <p className="lead mb-4 animate__animated animate__fadeInUp" style={{ color: '#FFC75F' }}>
              Disfruta de los mejores panes, pasteles y dulces recién horneados.
            </p>
            <a
              href="catalogo"
              className="btn btn-lg animate__animated animate__fadeIn"
              style={{ backgroundColor: '#D72638', borderColor: '#D72638', color: '#FFF' }}
            >
              Ver Productos
            </a>
          </div>
        </section>

        {/* Sección de Productos Destacados */}
        <section id="productos" className="py-5" style={{ backgroundColor: '#F5E1C8' }}>
          <div className="container">
            <h2 className="text-center mb-5" style={{ color: '#8B5E3B' }}>Nuestros Productos Destacados</h2>
            <div className="row g-4">
              {productos.map(producto => (
                <div key={producto.id} className="col-md-4 mb-4">
                  <div className="card shadow-lg rounded card-equal-height h-100 transition-transform hover-scale" style={{ backgroundColor: '#D2A679' }}>
                    <img
                      src={producto.imagepath}
                      className="card-img-top img-fluid"
                      alt={producto.nombre}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title text-center text-uppercase fw-bold" style={{ color: '#8B5E3B' }}>
                        {producto.nombre}
                      </h5>
                      <p className="card-text text-center text-muted flex-grow-1" style={{ color: '#FFF' }}>
                        {producto.descripcion}
                      </p>
                      <a
                        href="#"
                        className="btn w-100 mt-3"
                        style={{ backgroundColor: '#A3B18A', borderColor: '#A3B18A', color: '#FFF' }}
                      >
                        Ver más
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <FooterComponent />
    </div>
  );
};

export default Home;