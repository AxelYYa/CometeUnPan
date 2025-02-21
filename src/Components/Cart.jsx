import React, { useState, useEffect } from 'react';
import { Button, Row, Col, Card, Modal, Form, Alert, Spinner } from 'react-bootstrap';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import NavbarComponent from '/src/Components/Navbar';
import MapSelector from '/src/Components/MapSelector';
import '/main.css';

const stripePromise = loadStripe('pk_test_51QRqFLK2OoTqVpjsGusZyEMIl2PjZcbSLF5Kbog1UO2tDImcTgDwcxpG9DY1OIJlkjGwAjcNdYNV2IwdxBM8wU2900RwQSlGT6');

function Cart() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : {};
  });
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [address, setAddress] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch('http://localhost:3000/productos');
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Error fetching productos:', error);
      }
    };

    fetchProductos();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const fetchUser = async () => {
        try {
          const response = await fetch('http://localhost:3000/auth/me', {
            headers: {
              'x-access-token': token
            }
          });
          const data = await response.json();
          setUser(data);
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      };

      fetchUser();
    }
  }, []);

  const handleQuantityChange = (id, amount) => {
    setCart((prevCart) => {
      const newQuantity = (prevCart[id] || 0) + amount;
      if (newQuantity <= 0) {
        const { [id]: _, ...rest } = prevCart;
        return rest;
      }
      return { ...prevCart, [id]: Math.min(newQuantity, 3) };
    });
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const cartItems = items.filter(item => cart[item.id]);

  const handleShowModal = async () => {
    setShowModal(true);
    try {
      const response = await fetch('http://localhost:3000/stripe/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ amount: calculateTotalAmount() })
      });
      const data = await response.json();
      setClientSecret(data.clientSecret);
    } catch (error) {
      console.error('Error creating payment intent:', error);
    }
  };

  const handleCloseModal = () => setShowModal(false);

  const handleAddressChange = (e) => setAddress(e.target.value);

  const handleSelectLocation = (location) => {
    setSelectedLocation(location);
    setAddress(location.address);
  };

  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => total + item.precio * cart[item.id], 0) * 100; // Convert to cents
  };

  const handlePaymentSuccess = async (paymentIntentId) => {
    try {
      const response = await fetch('http://localhost:3000/stripe/payment-success', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          paymentIntentId,
          direccion: address,
          detalles: cartItems.map(item => ({
            productoId: item.id,
            cantidad: cart[item.id],
            precio: item.precio
          })),
          userId: user.id
        })
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Pedido realizado:', data);
        setCart({});
        localStorage.removeItem('cart');
        handleCloseModal();
      } else {
        const errorData = await response.json();
        console.error('Error al realizar el pedido:', errorData);
      }
    } catch (error) {
      console.error('Error al realizar el pedido:', error);
    }
  };

  const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
      event.preventDefault();

      if (!stripe || !elements) {
        return; // Stripe.js aún no se ha cargado
      }

      setLoading(true);
      setError('');
      setSuccessMessage('');

      try {
        const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        });

        if (stripeError) {
          setError(stripeError.message);
        } else if (paymentIntent.status === 'succeeded') {
          setSuccessMessage('Pago exitoso!');
          await handlePaymentSuccess(paymentIntent.id);
        }
      } catch (error) {
        setError('Error al procesar el pago.');
      } finally {
        setLoading(false);
      }
    };

    return (
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        <Button type="submit" variant="success" className="w-100 mt-3" disabled={!stripe || loading}>
          {loading ? <Spinner animation="border" size="sm" /> : 'Pagar'}
        </Button>
        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
        {successMessage && <Alert variant="success" className="mt-3">{successMessage}</Alert>}
      </form>
    );
  };

  return (
    <div>
      <NavbarComponent cart={cart} />
      <div className="container my-5">
        <h2 className="mb-4 text-center fw-bold" style={{ fontFamily: 'Pacifico, cursive', color: '#D4AF37', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>
          Tu Canasta de Pan
        </h2>
        {cartItems.length > 0 ? (
          <Row xs={1} sm={2} md={3} lg={4} className="g-4">
            {cartItems.map((item) => (
              <Col key={item.id}>
                <Card className="shadow-lg rounded card-equal-height" style={{ backgroundColor: '#f4e1d2', border: 'none' }}>
                  <Card.Img variant="top" src={item.imagepath} className="card-img-top" style={{ height: '200px', objectFit: 'cover' }} />
                  <Card.Body>
                    <Card.Title className="text-center text-uppercase text-brown" style={{ fontFamily: 'Pacifico, cursive' }}>{item.nombre}</Card.Title>
                    <Card.Text className="text-center text-muted">{item.descripcion}</Card.Text>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="text-brown fw-bold">${item.precio}</span>
                      <div className="d-flex align-items-center">
                        <Button 
                          variant="outline-danger" 
                          onClick={() => handleQuantityChange(item.id, -1)}
                          disabled={cart[item.id] <= 0}
                          style={{ 
                            borderRadius: '50%', 
                            width: '40px', 
                            height: '40px', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                            borderColor: '#F44336', // Rojo suave
                            color: '#F44336', // Texto en rojo
                          }}
                        >
                          -
                        </Button>
                        <span className="mx-2 fw-bold text-brown" style={{ fontSize: '1.2rem' }}>{cart[item.id] || 0}</span>
                        <Button 
                          variant="outline-success" 
                          onClick={() => handleQuantityChange(item.id, 1)}
                          disabled={cart[item.id] >= 3}
                          style={{ 
                            borderRadius: '50%', 
                            width: '40px', 
                            height: '40px', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                            borderColor: '#4CAF50', // Verde suave
                            color: '#4CAF50', // Texto en verde
                          }}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                    <Button 
                      variant="outline-danger" 
                      className="mt-3 w-100" 
                      onClick={() => handleQuantityChange(item.id, -cart[item.id])}
                      style={{ borderRadius: '20px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}
                    >
                      Eliminar del carrito
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <Card className="text-center" style={{ backgroundColor: '#f4e1d2', border: 'none' }}>
            <Card.Body>
              <Card.Title className="text-brown" style={{ fontFamily: 'Pacifico, cursive' }}>Aún no hay productos en tu canasta.</Card.Title>
            </Card.Body>
          </Card>
        )}
        {cartItems.length > 0 && (
          <div className="text-center mt-4">
            <Button 
              variant="success" 
              size="lg" 
              onClick={handleShowModal} 
              style={{ backgroundColor: '#8B4513', border: 'none', borderRadius: '25px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}
            >
              Realizar Compra
            </Button>
          </div>
        )}
      </div>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton style={{ backgroundColor: '#f4e1d2', border: 'none' }}>
          <Modal.Title className="text-brown" style={{ fontFamily: 'Pacifico, cursive' }}>Detalles del Pedido</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: '#f4e1d2' }}>
          {cartItems.length > 0 ? (
            <div className="d-flex flex-column align-items-center">
              {cartItems.map((item, index) => (
                <div key={index} className="m-2 text-center" style={{ width: "250px" }}>
                  <img src={item.imagepath} alt={item.nombre} className="img-fluid rounded mb-2" style={{ maxHeight: "150px", objectFit: "cover" }} />
                  <h6 className="text-brown" style={{ fontFamily: 'Pacifico, cursive' }}>{item.nombre}</h6>
                  <p className="text-muted">{item.descripcion}</p>
                  <p className="text-muted">Cantidad: {cart[item.id]}</p>
                  <p className="text-muted">Precio: ${item.precio}</p>
                </div>
              ))}
              <Form.Group className="mt-3 w-100">
                <Form.Label className="text-brown">Ingresa tu Dirección</Form.Label>
                <Form.Control type="text" value={address} onChange={handleAddressChange} />
              </Form.Group>
              <div className="mt-3 w-100">
                <MapSelector onSelectLocation={handleSelectLocation} />
              </div>
              <div className="mt-3 w-100">
                <Elements stripe={stripePromise}>
                  <CheckoutForm />
                </Elements>
              </div>
            </div>
          ) : (
            <p className="text-center text-brown">No hay productos en el carrito.</p>
          )}
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: '#f4e1d2', border: 'none' }}>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Cart;