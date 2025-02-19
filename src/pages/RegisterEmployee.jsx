import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card, Container, ProgressBar } from 'react-bootstrap';
import bgImage from '/src/assets/banner2.jpg';
import logo from '/src/assets/logo1.png';

function RegisterEmployee() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido_paterno: '',
    apellido_materno: '',
    fecha_nacimiento: '',
    direccion: '',
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
        const response = await fetch('http://localhost:3000/auth/registerEmployee', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          navigate('/');
        } else {
          const errorText = await response.text();
          try {
            const errorData = JSON.parse(errorText);
            alert('Error en el registro: ' + errorData.error);
          } catch (e) {
            alert('Error en el registro: ' + errorText);
          }
        }
      } catch (error) {
        alert('Error en el registro: ' + error.message);
      }
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleGoToAdmin = () => {
    navigate('/admin/pedidos');
  };

  return (
    <div className="register-container d-flex justify-content-center align-items-center vh-100" 
         style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <Container>
        <Card className="shadow-lg p-3" style={{ maxWidth: '400px', margin: 'auto', borderRadius: '15px', backgroundColor: 'rgba(255, 248, 220, 0.95)' }}>
          <Card.Body>
            <div className="text-center">
              <img src={logo} alt="Logo" style={{ width: '80px', marginBottom: '10px' }} />
              <h3 className="text-brown fw-bold" style={{ fontSize: '1.5rem' }}>Registro de Empleado</h3>
              <p className="text-muted" style={{ fontSize: '0.9rem' }}>¡Crea una cuenta para gestionar tu perfil!</p>
            </div>

            <ProgressBar now={step === 1 ? 50 : 100} variant="warning" className="mb-2" />

            <Form onSubmit={handleSubmit}>
              {step === 1 && (
                <>
                  <Form.Group className="mb-2">
                    <Form.Label style={{ fontSize: '0.9rem' }}>Nombre</Form.Label>
                    <Form.Control type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label style={{ fontSize: '0.9rem' }}>Apellido Paterno</Form.Label>
                    <Form.Control type="text" name="apellido_paterno" value={formData.apellido_paterno} onChange={handleChange} required />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label style={{ fontSize: '0.9rem' }}>Apellido Materno</Form.Label>
                    <Form.Control type="text" name="apellido_materno" value={formData.apellido_materno} onChange={handleChange} required />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label style={{ fontSize: '0.9rem' }}>Fecha de Nacimiento</Form.Label>
                    <Form.Control type="date" name="fecha_nacimiento" value={formData.fecha_nacimiento} onChange={handleChange} required />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label style={{ fontSize: '0.9rem' }}>Dirección</Form.Label>
                    <Form.Control type="text" name="direccion" value={formData.direccion} onChange={handleChange} required />
                  </Form.Group>
                </>
              )}

              {step === 2 && (
                <>
                  <Form.Group className="mb-2">
                    <Form.Label style={{ fontSize: '0.9rem' }}>Correo Electrónico</Form.Label>
                    <Form.Control type="email" name="correo" value={formData.correo} onChange={handleChange} required />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label style={{ fontSize: '0.9rem' }}>Contraseña</Form.Label>
                    <Form.Control type="password" name="contraseña" value={formData.contraseña} onChange={handleChange} required />
                  </Form.Group>
                  <Button variant="secondary" onClick={handleBack} className="w-100 fw-bold rounded-pill mb-2" style={{ fontSize: '0.9rem' }}>
                    Regresar
                  </Button>
                </>
              )}

              <Button variant="warning" type="submit" className="w-100 fw-bold text-white rounded-pill mb-2" style={{ fontSize: '0.9rem' }}>
                {step === 1 ? 'Continuar' : 'Registrar'}
              </Button>

              <Button variant="danger" onClick={handleGoToAdmin} className="w-100 fw-bold text-white rounded-pill" style={{ fontSize: '0.9rem' }}>
                Volver a Admin
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default RegisterEmployee;