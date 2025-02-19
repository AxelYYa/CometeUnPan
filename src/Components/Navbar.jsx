import React from 'react';
import { Link } from 'react-router-dom';
import logo from '/src/assets/logo1.png';
import LogoutButton from './LogoutButton';
import { FaShoppingCart } from 'react-icons/fa';

const Navbar = ({ cart = {} }) => {
  const token = localStorage.getItem('token');
  const cartItemCount = Object.values(cart).reduce((acc, count) => acc + count, 0);

  return (
    <nav className="navbar navbar-expand-lg shadow" style={{ backgroundColor: '#F5E1C8', padding: '15px 30px' }}>
      <div className="container-fluid d-flex align-items-center justify-content-between">
        
        {/* Logo a la izquierda */}
        <div className="d-flex align-items-center">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="Logo" style={{ height: '100px' }} />
          </Link>
        </div>

        {/* Menú centrado */}
        <div className="d-flex flex-grow-1 justify-content-center">
          <ul className="navbar-nav d-flex align-items-center gap-4">
            <li className="nav-item">
              <Link className="nav-link text-dark fw-bold fs-5" to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark fw-bold fs-5" to="/catalogo">Catálogo</Link>
            </li>
            {token ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-dark fw-bold fs-5" to="/ordershistory">Historial de Pedidos</Link>
                </li>
                <li className="nav-item">
                  <LogoutButton />
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="btn btn-warning text-dark fw-bold fs-5 px-4 py-2" to="/login" style={{ borderRadius: '20px' }}>
                  Iniciar Sesión
                </Link>
              </li>
            )}
          </ul>
        </div>

        {/* Carrito alineado a la derecha */}
        <div className="d-flex align-items-center">
          <Link className="nav-link position-relative text-dark" to="/cart">
            <FaShoppingCart size={28} />
            {cartItemCount > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cartItemCount}
              </span>
            )}
          </Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
