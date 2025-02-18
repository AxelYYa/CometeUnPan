import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Navbar from '/src/Components/Navbar';
import FooterComponent from '/src/Components/Footer';
import MapRoute from '/src/Components/MapRoute';

const defaultCenter = { lat: 25.53845653120954, lng: -103.45535531993444 };

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
    <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
      <Navbar />
      <div className="container mt-5 flex-grow-1">
        <h2 className="mb-4 text-center text-info fw-bold">Panel de Repartidor</h2>
        <div className="row">
          {Array.isArray(pedidos) && pedidos.map(pedido => (
            <div key={pedido.id} className="col-md-4 mb-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{pedido.cliente?.persona ? `${pedido.cliente.persona.nombre} ${pedido.cliente.persona.apellido_paterno}` : 'Cliente desconocido'}</h5> {/* Verificación de seguridad */}
                  <p className="card-text">{pedido.direccion}</p>
                  <span className={`badge ${getEstadoColor(pedido.estado_envio)}`}>
                    {pedido.estado_envio}
                  </span>
                </div>
                <div className="card-footer text-center">
                  {pedido.estado_envio === 'En Proceso' && (
                    <div className="d-flex justify-content-between">
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => aceptarPedido(pedido.id)}
                      >
                        Aceptar
                      </button>
                      <button
                        className="btn btn-info btn-sm text-white"
                        onClick={() => verDetalles(pedido)}
                      >
                        Ver Detalles
                      </button>
                    </div>
                  )}
                  {pedido.estado_envio === 'En Camino' && (
                    <div className="d-flex justify-content-between">
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => rechazarPedido(pedido.id)}
                      >
                        Denegar
                      </button>
                      <button
                        className="btn btn-info btn-sm text-white"
                        onClick={() => verDetalles(pedido)}
                      >
                        Ver Detalles
                      </button>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => abrirSeguimiento(pedido)}
                      >
                        Ver Recorrido
                      </button>
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => marcarComoEnPuerta(pedido.id)}
                      >
                        Por Entregar
                      </button>
                    </div>
                  )}
                  {pedido.estado_envio === 'En Puerta' && (
                    <div className="d-flex justify-content-between">
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => entregarPedido(pedido.id)}
                      >
                        Marcar como Entregado
                      </button>
                    </div>
                  )}
                  {pedido.estado_envio === 'Entregado' && (
                    <div className="alert alert-success mt-2">
                      Pedido entregado
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal para mostrar los detalles del pedido */}
        <Modal show={showModal} onHide={cerrarModal} centered size="lg">
          <Modal.Header closeButton className="bg-primary text-white">
            <Modal.Title>Detalles del Pedido</Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-4 bg-light">
            <div className="d-flex flex-wrap justify-content-start">
              {pedidoSeleccionado?.detalles.map((detalle, index) => (
                <div
                  key={index}
                  className="d-flex align-items-center border rounded p-3 me-3 mb-3 shadow-sm"
                  style={{ minWidth: "250px", maxWidth: "300px", backgroundColor: "#f8f9fa" }}
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
          <Modal.Footer className="bg-primary text-white">
            <div className="w-100 d-flex justify-content-between align-items-center">
              <div>
                <p className="fw-bold mb-1">Total de productos: {pedidoSeleccionado?.detalles.reduce((acc, p) => acc + p.cantidad, 0)}</p>
                <p className="fw-bold mb-1">Total: ${pedidoSeleccionado?.detalles.reduce((acc, p) => acc + (p.cantidad * p.precio), 0).toFixed(2)}</p>
              </div>
              <Button variant="secondary" onClick={cerrarModal} className="text-white">
                Cerrar
              </Button>
            </div>
          </Modal.Footer>
        </Modal>

        {/* Modal de Seguimiento */}
        <Modal show={showSeguimiento} onHide={cerrarSeguimiento} centered>
          <Modal.Header closeButton className="bg-info text-white">
            <Modal.Title>Seguimiento del Pedido #{pedidoSeleccionado?.id}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-4 bg-light">
            <MapRoute destination={pedidoSeleccionado?.direccion} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={cerrarSeguimiento}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <FooterComponent />
    </div>
  );
};

export default DeliveryDashboard;