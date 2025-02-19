import React, { useState, useEffect } from 'react';
import { Modal, Button, Card, Container, Row, Col } from 'react-bootstrap';
import Navbar from '/src/Components/Navbar';
import FooterComponent from '/src/Components/Footer';
import MapRoute from '/src/Components/MapRoute';

const DeliveryDashboard = () => {
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

  const aceptarPedido = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:3000/pedidos/${id}/aceptar`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        }
      });
      if (response.ok) {
        const updatedPedido = await response.json();
        setPedidos(pedidos.map(pedido => 
          pedido.id === id ? updatedPedido : pedido
        ));
      } else {
        console.error('Error al aceptar el pedido');
      }
    } catch (error) {
      console.error('Error al aceptar el pedido:', error);
    }
  };

  const rechazarPedido = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:3000/pedidos/${id}/revertir`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        }
      });
      if (response.ok) {
        setPedidos(pedidos.filter(pedido => pedido.id !== id));
      } else {
        console.error('Error al rechazar el pedido');
      }
    } catch (error) {
      console.error('Error al rechazar el pedido:', error);
    }
  };

  const marcarComoEnPuerta = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:3000/pedidos/${id}/enpuerta`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        }
      });
      if (response.ok) {
        const updatedPedido = await response.json();
        setPedidos(pedidos.map(pedido => 
          pedido.id === id ? updatedPedido : pedido
        ));
      } else {
        console.error('Error al marcar como En Puerta');
      }
    } catch (error) {
      console.error('Error al marcar como En Puerta:', error);
    }
  };

  const entregarPedido = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:3000/pedidos/${id}/entregar`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        }
      });
      if (response.ok) {
        const updatedPedido = await response.json();
        setPedidos(pedidos.map(pedido => 
          pedido.id === id ? updatedPedido : pedido
        ));
      } else {
        console.error('Error al entregar el pedido');
      }
    } catch (error) {
      console.error('Error al entregar el pedido:', error);
    }
  };

  const verDetalles = (pedido) => {
    setPedidoSeleccionado(pedido);
    setShowModal(true);
  };

  const cerrarModal = () => {
    setShowModal(false);
  };

  const abrirSeguimiento = (pedido) => {
    setPedidoSeleccionado(pedido);
    setShowSeguimiento(true);
  };

  const cerrarSeguimiento = () => {
    setShowSeguimiento(false);
  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case "Entregado":
        return "success";
      case "Pendiente":
        return "warning";
      case "En Camino":
        return "info";
      case "En Puerta":
        return "primary";
      case "Cancelado":
        return "danger";
      default:
        return "secondary";
    }
  };

  return (
    <div className="d-flex flex-column" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <Navbar />
      <Container className="my-5 flex-grow-1">
        <h2 className="mb-4 text-center fw-bold" style={{ fontFamily: 'Pacifico, cursive', color: '#D4AF37', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>
          Panel de Repartidor
        </h2>
        <Row className="g-4">
          {Array.isArray(pedidos) && pedidos.map(pedido => (
            <Col key={pedido.id} xs={12} sm={6} md={4}>
              <Card className="shadow-lg rounded" style={{ border: 'none', backgroundColor: '#f4e1d2' }}>
                <Card.Body>
                  <Card.Title className="text-center fw-bold" style={{ fontFamily: 'Pacifico, cursive', color: '#8B4513' }}>
                    {pedido.cliente?.persona ? `${pedido.cliente.persona.nombre} ${pedido.cliente.persona.apellido_paterno}` : 'Cliente desconocido'}
                  </Card.Title>
                  <Card.Text className="text-center text-muted">
                    {pedido.direccion}
                  </Card.Text>
                  <div className="text-center">
                    <span className={`badge bg-${getEstadoColor(pedido.estado_envio)}`}>
                      {pedido.estado_envio}
                    </span>
                  </div>
                </Card.Body>
                <Card.Footer className="text-center">
                  {pedido.estado_envio === 'En Proceso' && (
                    <div className="d-flex justify-content-between">
                      <Button
                        variant="outline-success"
                        onClick={() => aceptarPedido(pedido.id)}
                        style={{ borderRadius: '20px', borderColor: '#4CAF50', color: '#4CAF50' }}
                      >
                        Aceptar
                      </Button>
                      <Button
                        variant="outline-info"
                        onClick={() => verDetalles(pedido)}
                        style={{ borderRadius: '20px', borderColor: '#17a2b8', color: '#17a2b8' }}
                      >
                        Ver Detalles
                      </Button>
                    </div>
                  )}
                  {pedido.estado_envio === 'En Camino' && (
                    <div className="d-flex justify-content-between">
                      <Button
                        variant="outline-danger"
                        onClick={() => rechazarPedido(pedido.id)}
                        style={{ borderRadius: '20px', borderColor: '#F44336', color: '#F44336' }}
                      >
                        Denegar
                      </Button>
                      <Button
                        variant="outline-info"
                        onClick={() => verDetalles(pedido)}
                        style={{ borderRadius: '20px', borderColor: '#17a2b8', color: '#17a2b8' }}
                      >
                        Ver Detalles
                      </Button>
                      <Button
                        variant="outline-primary"
                        onClick={() => abrirSeguimiento(pedido)}
                        style={{ borderRadius: '20px', borderColor: '#007bff', color: '#007bff' }}
                      >
                        Ver Recorrido
                      </Button>
                      <Button
                        variant="outline-warning"
                        onClick={() => marcarComoEnPuerta(pedido.id)}
                        style={{ borderRadius: '20px', borderColor: '#ffc107', color: '#ffc107' }}
                      >
                        Por Entregar
                      </Button>
                    </div>
                  )}
                  {pedido.estado_envio === 'En Puerta' && (
                    <Button
                      variant="outline-success"
                      onClick={() => entregarPedido(pedido.id)}
                      style={{ borderRadius: '20px', borderColor: '#4CAF50', color: '#4CAF50' }}
                    >
                      Marcar como Entregado
                    </Button>
                  )}
                  {pedido.estado_envio === 'Entregado' && (
                    <div className="alert alert-success mt-2">
                      Pedido entregado
                    </div>
                  )}
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Modal para mostrar los detalles del pedido */}
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
};

export default DeliveryDashboard;