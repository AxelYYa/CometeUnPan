import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavbarComponent from "/src/Components/NavBarAdmin";
import FooterComponent from "/src/Components/Footer";
import "/main.css";
import { FaBreadSlice, FaShoppingBasket, FaTruck, FaCheckCircle } from "react-icons/fa"; // Íconos temáticos

const estados = ["Pendiente", "En Proceso", "En Camino", "Entregado"];
const estadoColores = {
  "Pendiente": "bg-warning text-white",
  "En Proceso": "bg-primary text-white",
  "En Camino": "bg-info text-white",
  "Entregado": "bg-success text-white",
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
    <div className="d-flex flex-column min-vh-100 bg-light" style={{ backgroundImage: "url('/ruta/a/imagen-de-fondo-panaderia.jpg')", backgroundSize: "cover" }}>
      <NavbarComponent />
      <main className="flex-grow-1 container mt-4">
        <h2 className="text-center mb-4" style={{ fontFamily: "'Pacifico', cursive", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", color: "#6F4E37" }}>
          <FaBreadSlice className="me-2" /> Panel de Administrador - Panadería Dulce Hogar
        </h2>
        <div className="row">
          {pedidos.map((pedido) => (
            <div key={pedido.id} className="col-md-4 mb-4">
              <div className="card shadow-lg rounded border-0" style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}>
                <div className="card-body">
                  <h5 className="card-title fw-bold text-dark">
                    <FaShoppingBasket className="me-2" /> {pedido.cliente.nombre}
                  </h5>
                  <p className="card-text text-muted">{pedido.direccion}</p>
                  <p className="card-text">
                    <small className="text-secondary">
                      <FaBreadSlice className="me-1" /> Fecha: {new Date(pedido.fecha_realizacion).toLocaleDateString()}
                    </small>
                  </p>
                  <p className="card-text">
                    <FaTruck className="me-2" /> Repartidor: <strong>{pedido.repartidor ? pedido.repartidor.nombre : 'Sin asignar'}</strong>
                  </p>
                  <span className={`badge py-2 px-3 ${estadoColores[pedido.estado_envio]}`}>
                    {pedido.estado_envio === "Entregado" && <FaCheckCircle className="me-1" />}
                    {pedido.estado_envio}
                  </span>
                </div>
                <div className="card-footer text-center bg-white border-0">
                  <button className="btn btn-info btn-sm me-2 text-white" onClick={() => verDetalles(pedido.detalles)}>
                    <FaBreadSlice className="me-1" /> Ver Detalles
                  </button>
                  {pedido.estado_envio === "Pendiente" && (
                    <button className="btn btn-success btn-sm" onClick={() => procesarPedido(pedido.id)}>
                      <FaCheckCircle className="me-1" /> Procesar Pedido
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <Modal show={showModal} onHide={cerrarModal} centered size="lg">
          <Modal.Header closeButton style={{ backgroundColor: "#6F4E37", color: "white" }}>
            <Modal.Title>
              <FaBreadSlice className="me-2" /> Detalles del Pedido
            </Modal.Title>
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
          <Modal.Footer style={{ backgroundColor: "#6F4E37", color: "white" }}>
            <div className="w-100 d-flex justify-content-between align-items-center">
              <div>
                <p className="fw-bold mb-1">Total de productos: {totalCantidad}</p>
                <p className="fw-bold mb-1">Total: ${totalPrecio.toFixed(2)}</p>
              </div>
              <Button variant="secondary" onClick={cerrarModal} style={{ backgroundColor: "#8B7355", borderColor: "#8B7355", color: "white" }}>
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