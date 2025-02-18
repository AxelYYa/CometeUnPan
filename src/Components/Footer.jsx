
import React from "react";

const FooterComponent = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-auto">
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <p className="mb-0">&copy; {new Date().getFullYear()}  Symphony - Music Store</p>
            <nav className="mt-2">
              <a href="#" className="text-white mx-3 text-decoration-none hover-underline">Sobre Nosotros</a>
              <a href="#" className="text-white mx-3 text-decoration-none hover-underline">Contacto</a>
              <a href="#" className="text-white mx-3 text-decoration-none hover-underline">Términos y Condiciones</a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
