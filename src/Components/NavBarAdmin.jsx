import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Importamos useLocation para obtener la ruta actual
import logo from '/src/assets/logo1.png';
import LogoutButton from './LogoutButton';
import '/main.css';

const Navbar = ({ cart = {} }) => {
  const token = localStorage.getItem('token');
  const cartItemCount = Object.values(cart).reduce((acc, count) => acc + count, 0);
  const location = useLocation(); // Obtenemos la ubicación actual

  // Función para comprobar si la ruta actual es igual a la ruta del link
  const isActive = (path) => location.pathname === path ? 'active' : '';

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
              <Link className={`nav-link text-dark fw-bold fs-5 ${isActive('/')}`} to="/">Inicio</Link>
            </li>
            {token && (
              <>
                <li className="nav-item">
                  <Link className={`nav-link text-dark fw-bold fs-5 ${isActive('/admin/pedidos')}`} to="/admin/pedidos">Pedidos</Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link text-dark fw-bold fs-5 ${isActive('/admin/createproducts')}`} to="/admin/createproducts">Agregar Productos</Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link text-dark fw-bold fs-5 ${isActive('/registroempleado')}`} to="/registroempleado">Registrar Empleados</Link>
                </li>
                <li className="nav-item">
                  <LogoutButton />
                </li>
              </>
            )}
            {!token && (
              <li className="nav-item">
                <Link className="btn btn-warning text-dark fw-bold fs-5 px-4 py-2" to="/login" style={{ borderRadius: '20px' }}>
                  Iniciar Sesión
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
