import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Card, Container } from 'react-bootstrap';
import bgImage from '/src/assets/banner3.jpg'; // Imagen de fondo de panadería
import logo from '/src/assets/logo1.png'; // Logo de la panadería

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ correo: email, contraseña: password })
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Iniciando sesión con:', data);
        localStorage.setItem('token', data.accessToken); // Almacenar el token JWT
        navigate('/catalogo'); // Redirigir a la página del catálogo
      } else {
        const errorData = await response.json();
        alert('Error en el inicio de sesión: ' + errorData.message);
      }
    } catch (error) {
      alert('Error en el inicio de sesión: ' + error.message);
    }
  };

  const handleGoHome = () => {
    navigate('/'); // Redirigir al inicio
  };

  return (
    <div 
      className="login-container d-flex justify-content-center align-items-center vh-100" 
      style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <Container>
        <Card className="shadow-lg p-4" style={{ maxWidth: '400px', margin: 'auto', borderRadius: '15px', backgroundColor: 'rgba(255, 248, 220, 0.95)' }}>
          <Card.Body className="text-center">
            <img src={logo} alt="Panadería" style={{ width: '120px', marginBottom: '15px' }} />
            <h2 className="text-brown fw-bold">¡Bienvenido de nuevo!</h2>
            <p className="text-muted">Inicia sesión para disfrutar de nuestros deliciosos productos</p>

            <Form onSubmit={handleLogin}>
              {/* Email */}
              <Form.Group className="mb-3 text-start">
                <Form.Label className="fw-bold text-brown">Correo Electrónico</Form.Label>
                <Form.Control 
                  type="email" 
                  placeholder="Ingresa tu correo"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="rounded-pill"
                />
              </Form.Group>

              {/* Contraseña */}
              <Form.Group className="mb-3 text-start">
                <Form.Label className="fw-bold text-brown">Contraseña</Form.Label>
                <Form.Control 
                  type="password" 
                  placeholder="Ingresa tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="rounded-pill"
                />
              </Form.Group>

              {/* Botón de Iniciar Sesión */}
              <Button variant="warning" type="submit" className="w-100 fw-bold text-white rounded-pill">
                Iniciar Sesión
              </Button>
            </Form>

            {/* Enlace a registro */}
            <div className="text-center mt-3">
              <p className="text-muted">¿No tienes cuenta? <Link to="/registro" className="text-brown fw-bold">Regístrate aquí</Link></p>
            </div>

            {/* Botón de Regresar al Inicio */}
            <Button variant="secondary" onClick={handleGoHome} className="w-100 fw-bold text-white rounded-pill mt-3">
              Regresar al Inicio
            </Button>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Login;
