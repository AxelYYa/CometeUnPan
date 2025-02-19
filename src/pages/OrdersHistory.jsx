import React, { useState, useEffect } from "react";
import { Card, Button, Container, Row, Col, Modal, ProgressBar } from "react-bootstrap";
import NavbarComponent from "/src/Components/Navbar";
import FooterComponent from "/src/Components/Footer";
import MapRoute from "/src/Components/MapRoute";

function HistorialPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);
  const [showSeguimiento, setShowSeguimiento] = useState(false);

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

  const getEstadoColor = (estado) => {
    switch (estado) {
      case "Entregado":
        return "success";
      case "Pendiente":
        return "warning";
      case "En Camino":
        return "info";
      case "Cancelado":
        return "danger";
      default:
        return "secondary";
    }
  };

  const getProgreso = (estado) => {
    switch (estado) {
      case "Pendiente":
        return 20;
      case "En Proceso":
        return 40;
      case "En Camino":
        return 60;
      case "En Puerta":
        return 80;
      case "Entregado":
        return 100;
      default:
        return 0;
    }
  };

  const abrirModal = (pedido) => {
    setPedidoSeleccionado(pedido);
    setShowModal(true);
  };

  const abrirSeguimiento = (pedido) => {
    setPedidoSeleccionado(pedido);
    setShowSeguimiento(true);
  };

  const cerrarModal = () => {
    setShowModal(false);
  };

  const cerrarSeguimiento = () => {
    setShowSeguimiento(false);
  };

  return (
    <div className="d-flex flex-column" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <NavbarComponent />
      <Container className="my-5">
        <h2 className="text-center fw-bold" style={{ fontFamily: 'Pacifico, cursive', color: '#D4AF37', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>
          Historial de Pedidos
        </h2>
        <Row className="g-4 mt-4">
          {pedidos.map((pedido) => (
            <Col xs={12} sm={6} md={4} key={pedido.id}>
              <Card className="shadow-lg rounded" style={{ border: 'none', backgroundColor: '#f4e1d2' }}>
                <Card.Body>
                  <Card.Title className="text-center fw-bold" style={{ fontFamily: 'Pacifico, cursive', color: '#8B4513' }}>
                    Pedido #{pedido.id}
                  </Card.Title>
                  <Card.Text className="text-center text-muted">
                    <strong>Fecha:</strong> {new Date(pedido.fecha_realizacion).toLocaleDateString()}
                  </Card.Text>
                  <Card.Text className="text-center">
                    <span className={`badge bg-${getEstadoColor(pedido.estado_envio)}`}>
                      {pedido.estado_envio}
                    </span>
                  </Card.Text>
                  <Card.Text className="text-center fw-bold" style={{ color: '#8B4513' }}>
                    Total: ${pedido.detalles.reduce((acc, detalle) => acc + (detalle.cantidad * detalle.precio), 0).toFixed(2)}
                  </Card.Text>
                  <div className="d-flex justify-content-around">
                    <Button 
                      variant="outline-brown" 
                      onClick={() => abrirModal(pedido)}
                      style={{ borderRadius: '20px', borderColor: '#8B4513', color: '#8B4513' }}
                    >
                      Ver Detalles
                    </Button>
                    <Button 
                      variant="outline-success" 
                      onClick={() => abrirSeguimiento(pedido)}
                      style={{ borderRadius: '20px', borderColor: '#4CAF50', color: '#4CAF50' }}
                    >
                      Ver Seguimiento
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Modal de Detalles del Pedido */}
        <Modal show={showModal} onHide={cerrarModal} centered size="lg">
          <Modal.Header closeButton style={{ backgroundColor: '#8B4513', color: '#fff' }}>
            <Modal.Title style={{ fontFamily: 'Pacifico, cursive' }}>Detalles del Pedido</Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-4" style={{ backgroundColor: '#f4e1d2' }}>
            <div className="d-flex flex-wrap justify-content-start">
              {pedidoSeleccionado?.detalles.map((detalle, index) => (
                <div
                  key={index}
                  className="d-flex align-items-center border rounded p-3 me-3 mb-3 shadow-sm"
                  style={{ minWidth: "250px", maxWidth: "300px", backgroundColor: "#fff" }}
                >
                  {detalle.producto && (
                    <>
                      <img
                        src={detalle.producto.imagepath}
                        alt={detalle.producto.nombre}
                        className="img-fluid rounded shadow-lg me-3"
                        style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "8px" }}
                      />
                      <div>
                        <h6 className="fw-bold text-dark m-0">{detalle.producto.nombre}</h6>
                        <p className="small text-muted m-0">{detalle.producto.descripcion}</p>
                        <p className="fw-bold m-0">Cantidad: {detalle.cantidad}</p>
                        <p className="fw-bold m-0">${(detalle.cantidad * detalle.precio).toFixed(2)}</p>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </Modal.Body>
          <Modal.Footer style={{ backgroundColor: '#8B4513', color: '#fff' }}>
            <div className="w-100 d-flex justify-content-between align-items-center">
              <div>
                <p className="fw-bold mb-1">Total de productos: {pedidoSeleccionado?.detalles.reduce((acc, p) => acc + p.cantidad, 0)}</p>
                <p className="fw-bold mb-1">Total: ${pedidoSeleccionado?.detalles.reduce((acc, p) => acc + (p.cantidad * p.precio), 0).toFixed(2)}</p>
              </div>
              <Button variant="secondary" onClick={cerrarModal} style={{ borderRadius: '20px' }}>
                Cerrar
              </Button>
            </div>
          </Modal.Footer>
        </Modal>

        {/* Modal de Seguimiento */}
        <Modal show={showSeguimiento} onHide={cerrarSeguimiento} centered>
          <Modal.Header closeButton style={{ backgroundColor: '#4CAF50', color: '#fff' }}>
            <Modal.Title style={{ fontFamily: 'Pacifico, cursive' }}>Seguimiento del Pedido #{pedidoSeleccionado?.id}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-4" style={{ backgroundColor: '#f4e1d2' }}>
            <h5 className="text-center fw-bold" style={{ color: '#8B4513' }}>Estado: {pedidoSeleccionado?.estado_envio}</h5>
            <ProgressBar 
              animated 
              now={getProgreso(pedidoSeleccionado?.estado_envio)} 
              label={`${getProgreso(pedidoSeleccionado?.estado_envio)}%`} 
              className="mt-3" 
              style={{ height: '20px', borderRadius: '10px' }}
            />
            <p className="text-center mt-3" style={{ color: '#8B4513' }}>
              {getProgreso(pedidoSeleccionado?.estado_envio) === 100 ? "Pedido Entregado" : "Pedido en proceso..."}
            </p>
            <MapRoute destination={pedidoSeleccionado?.direccion} />
          </Modal.Body>
          <Modal.Footer style={{ backgroundColor: '#4CAF50', color: '#fff' }}>
            <Button variant="secondary" onClick={cerrarSeguimiento} style={{ borderRadius: '20px' }}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
      <FooterComponent />
    </div>
  );
}

export default HistorialPedidos;