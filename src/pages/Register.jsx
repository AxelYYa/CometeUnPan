import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card, Container, ProgressBar } from 'react-bootstrap';
import bgImage from '/src/assets/banner2.jpg';
import logo from '/src/assets/logo1.png';

const Register = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido_paterno: '',
    apellido_materno: '',
    fecha_nacimiento: '',
    correo: '',
    contraseña: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      try {
        const response = await fetch('http://localhost:3000/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          navigate('/login');
        } else {
          const errorData = await response.json();
          alert('Error en el registro: ' + errorData.error);
        }
      } catch (error) {
        alert('Error en el registro: ' + error.message);
      }
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="register-container d-flex justify-content-center align-items-center vh-100" 
         style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <Container>
        <Card className="shadow-lg p-3" style={{ maxWidth: '450px', margin: 'auto', borderRadius: '15px', backgroundColor: 'rgba(255, 248, 220, 0.95)' }}>
          <Card.Body>
            <div className="text-center">
              <img src={logo} alt="Panadería" style={{ width: '100px', marginBottom: '15px' }} />
              <h3 className="text-brown fw-bold">Registro</h3>
              <p className="text-muted">¡Crea tu cuenta para ordenar tus panes favoritos!</p>
            </div>
            
            <ProgressBar now={step === 1 ? 50 : 100} variant="warning" className="mb-3" />
            
            <Form onSubmit={handleSubmit}>
              {step === 1 && (
                <>
                  <Form.Group className="mb-3">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Apellido Paterno</Form.Label>
                    <Form.Control type="text" name="apellido_paterno" value={formData.apellido_paterno} onChange={handleChange} required />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Apellido Materno</Form.Label>
                    <Form.Control type="text" name="apellido_materno" value={formData.apellido_materno} onChange={handleChange} required />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Fecha de Nacimiento</Form.Label>
                    <Form.Control type="date" name="fecha_nacimiento" value={formData.fecha_nacimiento} onChange={handleChange} required />
                  </Form.Group>
                </>
              )}

              {step === 2 && (
                <>
                  <Form.Group className="mb-3">
                    <Form.Label>Correo Electrónico</Form.Label>
                    <Form.Control type="email" name="correo" value={formData.correo} onChange={handleChange} required />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password" name="contraseña" value={formData.contraseña} onChange={handleChange} required />
                  </Form.Group>
                  <Button variant="secondary" onClick={handleBack} className="w-100 fw-bold rounded-pill mb-3">
                    Regresar
                  </Button>
                </>
              )}
              
              <Button variant="warning" type="submit" className="w-100 fw-bold text-white rounded-pill mb-3">
                {step === 1 ? 'Continuar' : 'Registrar'}
              </Button>

              
              

              {/* Nuevo botón para regresar al inicio */}
              <Button variant="danger" onClick={handleGoHome} className="w-100 fw-bold text-white rounded-pill">
                Regresar al Inicio
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Register;
