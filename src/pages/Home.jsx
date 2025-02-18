import React, { useState, useEffect } from 'react';
import NavbarComponent from '/src/Components/Navbar';
import FooterComponent from '/src/Components/Footer';
import banner from "/src/assets/banner1.jpg";
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
        {/* Sección Hero con superposición oscura */}
        <section
          className="hero-section text-white text-center d-flex align-items-center justify-content-center position-relative"
          style={{
            backgroundImage: "url(" + banner + ")",
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "70vh",
          }}
        >
          <div className="position-absolute w-100 h-100 bg-dark opacity-50"></div> {/* Superposición oscura */}
          <div className="container position-relative z-index-1">
            <h1 className="display-4 fw-bold mb-4">Bienvenido a la Mejor Tienda de Instrumentos Musicales</h1>
            <p className="lead mb-4">
              Encuentra la mejor calidad en guitarras, pianos, baterías y más.
            </p>
            <a href="catalogo" className="btn btn-primary btn-lg">
              Ver Productos
            </a>
          </div>
        </section>

        {/* Sección de Productos Destacados */}
        <section id="productos" className="py-5 bg-light">
          <div className="container">
            <h2 className="text-center mb-5">Productos Destacados</h2>
            <div className="row">
              {productos.map(producto => (
                <div key={producto.id} className="col-md-4 mb-4">
                  <div className="card shadow-lg rounded card-equal-height">
                    <img
                      src={producto.imagepath}
                      className="card-img-top"
                      alt={producto.nombre}
                    />
                    <div className="card-body">
                      <h5 className="card-title text-center text-uppercase">{producto.nombre}</h5>
                      <p className="card-text text-center text-muted">{producto.descripcion}</p>
                      <a href="#" className="btn btn-primary w-100">
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