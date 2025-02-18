import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Modal, Card } from 'react-bootstrap';

function CrearProductosCategorias() {
  const [categorias, setCategorias] = useState([]);
  const [nombreCategoria, setNombreCategoria] = useState('');
  const [producto, setProducto] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    categoriaId: '',
    stock: '',
    stock_minimo: '',
    imagepath: ''
  });

  const [showModalCategoria, setShowModalCategoria] = useState(false);
  const [showModalProducto, setShowModalProducto] = useState(false);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch('http://localhost:3000/categorias');
        const data = await response.json();
        setCategorias(data);
      } catch (error) {
        console.error('Error fetching categorias:', error);
      }
    };

    fetchCategorias();
  }, []);

  const handleAgregarCategoria = async (e) => {
    e.preventDefault();
    if (nombreCategoria.trim() === '') return;

    try {
      const response = await fetch('http://localhost:3000/categorias', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre: nombreCategoria })
      });

      if (response.ok) {
        const nuevaCategoria = await response.json();
        setCategorias([...categorias, nuevaCategoria]);
        setNombreCategoria('');
        setShowModalCategoria(false);
      } else {
        console.error('Error al agregar categoría');
      }
    } catch (error) {
      console.error('Error al agregar categoría:', error);
    }
  };

  const handleChangeProducto = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  const handleGuardarProducto = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/productos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(producto)
      });

      if (response.ok) {
        const nuevoProducto = await response.json();
        console.log('Producto guardado:', nuevoProducto);
        setProducto({ nombre: '', descripcion: '', precio: '', categoriaId: '', stock: '', stock_minimo: '', imagepath: '' });
        setShowModalProducto(false);
      } else {
        console.error('Error al guardar producto');
      }
    } catch (error) {
      console.error('Error al guardar producto:', error);
    }
  };

  return (
    <Container className="my-5">
      <h2 className="text-center text-info fw-bold mb-5">Crear Productos y Categorías</h2>

      <Row className="mb-6 justify-content-space-around">
        {/* Formulario de Categoría */}
        <Col md={5} className="mb-3 d-flex justify-content-center">
          <Card className="shadow-sm" style={{ width: '100%', maxWidth: '400px' }}>
            <Card.Body>
              <h4 className="text-primary text-center">Agregar Categoría</h4>
              <Button 
                variant="success" 
                onClick={() => setShowModalCategoria(true)} 
                className="mb-3 w-100"
              >
                Nueva Categoría
              </Button>
              <ul>
                {categorias.map((categoria, index) => (
                  <li key={index}>{categoria.nombre}</li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>

        {/* Formulario de Producto */}
        <Col md={7} className="mb-3 d-flex justify-content-center">
          <Card className="shadow-sm" style={{ width: '100%', maxWidth: '400px' }}>
            <Card.Body>
              <h4 className="text-primary text-center">Agregar Producto</h4>
              <Button 
                variant="primary" 
                onClick={() => setShowModalProducto(true)} 
                className="mb-3 w-100"
              >
                Crear Producto
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal para agregar nueva categoría */}
      <Modal show={showModalCategoria} onHide={() => setShowModalCategoria(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Nueva Categoría</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAgregarCategoria}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre de Categoría</Form.Label>
              <Form.Control 
                type="text" 
                value={nombreCategoria} 
                onChange={(e) => setNombreCategoria(e.target.value)} 
                placeholder="Ej: Percusiones"
                required
              />
            </Form.Group>
            <Button variant="success" type="submit" className="w-100">Agregar Categoría</Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal para agregar nuevo producto */}
      <Modal show={showModalProducto} onHide={() => setShowModalProducto(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Nuevo Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleGuardarProducto}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre del Producto</Form.Label>
              <Form.Control 
                type="text" 
                name="nombre" 
                value={producto.nombre} 
                onChange={handleChangeProducto} 
                placeholder="Ej: Guitarra acústica" 
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control 
                as="textarea" 
                name="descripcion" 
                value={producto.descripcion} 
                onChange={handleChangeProducto} 
                placeholder="Ej: Guitarra de madera con cuerdas de nylon" 
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Precio</Form.Label>
              <Form.Control 
                type="number" 
                name="precio" 
                value={producto.precio} 
                onChange={handleChangeProducto} 
                placeholder="Ej: 150" 
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Categoría</Form.Label>
              <Form.Control 
                as="select" 
                name="categoriaId" 
                value={producto.categoriaId} 
                onChange={handleChangeProducto} 
                required
              >
                <option value="">Seleccione una categoría</option>
                {categorias.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Stock</Form.Label>
              <Form.Control 
                type="number" 
                name="stock" 
                value={producto.stock} 
                onChange={handleChangeProducto} 
                placeholder="Ej: 10" 
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Stock Mínimo</Form.Label>
              <Form.Control 
                type="number" 
                name="stock_minimo" 
                value={producto.stock_minimo} 
                onChange={handleChangeProducto} 
                placeholder="Ej: 2" 
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Ruta de la Imagen</Form.Label>
              <Form.Control 
                type="text" 
                name="imagepath" 
                value={producto.imagepath} 
                onChange={handleChangeProducto} 
                placeholder="Ej: https://example.com/imagen.jpg" 
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">Guardar Producto</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default CrearProductosCategorias;