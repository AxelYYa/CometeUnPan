import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavbarComponent from "/src/Components/Navbar";
import FooterComponent from "/src/Components/Footer";

const estados = ["Pendiente", "En Proceso", "En Camino", "Entregado"];
const estadoColores = {
  "Pendiente": "bg-warning text-white",
  "En Proceso": "bg-primary",
  "En Camino": "bg-warning text-white",
  "Entregado": "bg-success",
};

const AdminDashboard = () => {
  const [pedidos, setPedidos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [detallesPedido, setDetallesPedido] = useState([]);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await fetch('http://localhost:3000/pedidos');
        const data = await response.json();
        setPedidos(data);
      } catch (error) {
        console.error('Error fetching pedidos:', error);
      }
    };

    fetchPedidos();
  }, []);

  const verDetalles = (detalles) => {
    setDetallesPedido(detalles);
    setShowModal(true);
  };

  const cerrarModal = () => setShowModal(false);

  const procesarPedido = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/pedidos/${id}/procesar`, {
        method: 'PUT'
      });

      if (response.ok) {
        setPedidos((prev) => prev.map((p) => {
          if (p.id === id) {
            return { ...p, estado_envio: 'En Proceso' };
          }
          return p;
        }));
      } else {
        console.error('Error al procesar el pedido');
      }
    } catch (error) {
      console.error('Error al procesar el pedido:', error);
    }
  };

  const totalCantidad = detallesPedido.reduce((acc, producto) => acc + producto.cantidad, 0);
  const totalPrecio = detallesPedido.reduce((acc, producto) => acc + (producto.cantidad * producto.precio), 0);

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <NavbarComponent />
      <nav className="container mt-3">
        <ul className="nav nav-pills justify-content-center">
          <li className="nav-item"><Link to="/pedidos" className="nav-link active">Pedidos</Link></li>
          <li className="nav-item"><Link to="/admin/createproducts" className="nav-link">Agregar Productos</Link></li>
          <li className="nav-item"><Link to="/registroempleado" className="nav-link">Registrar Empleados</Link></li>
        </ul>
      </nav>
      <main className="flex-grow-1 container mt-4">
        <h2 className="text-center mb-4 text-primary">Panel de Administrador</h2>
        <div className="row">
          {pedidos.map((pedido) => (
            <div key={pedido.id} className="col-md-4 mb-4">
              <div className="card shadow-lg rounded border-0">
                <div className="card-body">
                  <h5 className="card-title fw-bold text-dark">{pedido.cliente.nombre}</h5>
                  <p className="card-text text-muted">{pedido.direccion}</p>
                  <p className="card-text"><small className="text-secondary">Fecha: {new Date(pedido.fecha_realizacion).toLocaleDateString()}</small></p>
                  <p className="card-text">Repartidor: <strong>{pedido.repartidor ? pedido.repartidor.nombre : 'Sin asignar'}</strong></p>
                  <span className={`badge py-2 px-3 ${estadoColores[pedido.estado_envio]}`}>{pedido.estado_envio}</span>
                </div>
                <div className="card-footer text-center bg-white border-0">
                  <button className="btn btn-info btn-sm me-2 text-white" onClick={() => verDetalles(pedido.detalles)}>Ver Detalles</button>
                  {pedido.estado_envio === "Pendiente" && (
                    <button className="btn btn-success btn-sm" onClick={() => procesarPedido(pedido.id)}>Procesar Pedido</button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <Modal show={showModal} onHide={cerrarModal} centered size="lg">
          <Modal.Header closeButton className="bg-primary text-white">
            <Modal.Title>Detalles del Pedido</Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-4 bg-light">
            <div className="d-flex flex-wrap justify-content-start">
              {detallesPedido.map((producto, index) => (
                <div key={index} className="d-flex align-items-center border rounded p-3 me-3 mb-3 shadow-sm" style={{ minWidth: "250px", maxWidth: "300px", backgroundColor: "#f8f9fa" }}>
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="img-fluid rounded shadow-lg me-3"
                    style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "8px" }}
                  />
                  <div>
                    <h6 className="fw-bold text-dark m-0">{producto.nombre}</h6>
                    <p className="small text-muted m-0">{producto.descripcion}</p>
                    <p className="fw-bold m-0">Cantidad: {producto.cantidad}</p>
                    <p className="fw-bold m-0">${(producto.cantidad * producto.precio).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </Modal.Body>
          <Modal.Footer className="bg-primary text-white">
            <div className="w-100 d-flex justify-content-between align-items-center">
              <div>
                <p className="fw-bold mb-1">Total de productos: {totalCantidad}</p>
                <p className="fw-bold mb-1">Total: ${totalPrecio.toFixed(2)}</p>
              </div>
              <Button variant="secondary" onClick={cerrarModal} className="text-white" style={{ backgroundColor: "#0056b3", borderColor: "#0056b3" }}>
                Cerrar
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      </main>
      <FooterComponent />
    </div>
  );
};

export default AdminDashboard;