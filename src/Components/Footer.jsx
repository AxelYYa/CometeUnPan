import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const FooterComponent = () => {
  return (
    <footer className="text-white py-4 mt-auto shadow-lg" style={{ backgroundColor: "#5D4037" }}>
      <div className="container text-center">
        
        {/* Logo y Nombre */}
        <h4 className="fw-bold">Comete Un Pan</h4>
        <p className="small">El mejor pan recién horneado, todos los días.</p>

        {/* Copyright */}
        <div className="mt-3">
          <p className="mb-0 small">&copy; {new Date().getFullYear()} Comete Un Pan - Todos los derechos reservados</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
