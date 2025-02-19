import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button, Container, Row, Col, Card, Alert, Spinner } from 'react-bootstrap';
import NavbarComponent from '/src/Components/NavBarAdmin';
import { FaCreditCard, FaCheckCircle } from 'react-icons/fa';

// Carga la clave pública de Stripe
const stripePromise = loadStripe('tu_clave_publica_de_stripe');

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return; // Stripe.js aún no se ha cargado
    }

    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      // 1. Crear un PaymentIntent en el backend
      const response = await fetch('http://localhost:3000/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: 1000 }), // Monto en centavos (ej: $10.00)
      });

      const { clientSecret } = await response.json();

      // 2. Confirmar el pago con Stripe
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (stripeError) {
        setError(stripeError.message);
      } else if (paymentIntent.status === 'succeeded') {
        setSuccessMessage('Pago exitoso!');
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

const Pagos = () => {
  return (
    <div className='d-flex flex-column min-vh-100 bg-light'>
      <NavbarComponent />
      <Container className="my-5">
        <h2 className="text-center fw-bold mb-5" style={{ fontFamily: "'Pacifico', cursive", color: '#6F4E37' }}>
          <FaCreditCard className="me-2" /> Pagos con Stripe
        </h2>

        <Row className="justify-content-center">
          <Col md={6}>
            <Card className="shadow-sm" style={{ backgroundColor: '#fff3e6', border: 'none' }}>
              <Card.Body>
                <h4 className="text-center text-brown" style={{ fontFamily: "'Pacifico', cursive" }}>
                  <FaCheckCircle className="me-2" /> Procesar Pago
                </h4>
                <Elements stripe={stripePromise}>
                  <CheckoutForm />
                </Elements>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Pagos;