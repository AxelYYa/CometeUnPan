import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Modal, Card, Alert, Spinner, Pagination } from 'react-bootstrap';
import NavbarComponent from '/src/Components/NavBarAdmin';
import { FaPlusCircle, FaBox, FaListUl, FaImage, FaBreadSlice } from 'react-icons/fa'; // Íconos temáticos

function CrearProductosCategorias() {
  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(4); // 4 productos por página

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

    const fetchProductos = async () => {
      try {
        const response = await fetch('http://localhost:3000/productos');
        const data = await response.json();
        setProductos(data);
      } catch (error) {
        console.error('Error fetching productos:', error);
      }
    };

    fetchCategorias();
    fetchProductos();
  }, []);

  // Lógica de paginación
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productos.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAgregarCategoria = async (e) => {
    e.preventDefault();
    if (nombreCategoria.trim() === '') {
      setError('El nombre de la categoría no puede estar vacío.');
      return;
    }

    setLoading(true);
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
        setSuccessMessage('Categoría agregada correctamente.');
        setError('');
      } else {
        setError('Error al agregar categoría.');
      }
    } catch (error) {
      setError('Error al agregar categoría.');
    } finally {
      setLoading(false);
    }
  };

  const handleChangeProducto = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  const handleGuardarProducto = async (e) => {
    e.preventDefault();
    if (!producto.nombre || !producto.descripcion || !producto.precio || !producto.categoriaId || !producto.stock || !producto.stock_minimo || !producto.imagepath) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    setLoading(true);
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
        setProductos([...productos, nuevoProducto]);
        setProducto({ nombre: '', descripcion: '', precio: '', categoriaId: '', stock: '', stock_minimo: '', imagepath: '' });
        setShowModalProducto(false);
        setSuccessMessage('Producto guardado correctamente.');
        setError('');
      } else {
        setError('Error al guardar producto.');
      }
    } catch (error) {
      setError('Error al guardar producto.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='d-flex flex-column min-vh-100 bg-light'>
      <NavbarComponent />
      <Container className="my-5">
        <h2 className="text-center fw-bold mb-5" style={{ fontFamily: "'Pacifico', cursive", color: '#6F4E37' }}>
          <FaBreadSlice className="me-2" /> Crear Productos y Categorías
        </h2>

        {/* Mensajes de éxito y error */}
        {error && <Alert variant="danger" className="text-center">{error}</Alert>}
        {successMessage && <Alert variant="success" className="text-center">{successMessage}</Alert>}

        <Row className="mb-4 justify-content-center">
          {/* Tarjeta para agregar categoría */}
          <Col md={5} className="mb-4">
            <Card className="shadow-sm" style={{ backgroundColor: '#fff3e6', border: 'none' }}>
              <Card.Body>
                <h4 className="text-center text-brown" style={{ fontFamily: "'Pacifico', cursive" }}>
                  <FaListUl className="me-2" /> Categorías
                </h4>
                <Button 
                  variant="warning" 
                  onClick={() => setShowModalCategoria(true)} 
                  className="w-100 mb-3"
                >
                  <FaPlusCircle className="me-2" /> Nueva Categoría
                </Button>
                <ul className="list-group">
                  {categorias.map((categoria, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center" style={{ backgroundColor: '#f8f9fa' }}>
                      {categoria.nombre}
                      <span className="badge bg-brown rounded-pill">{categoria.productos?.length || 0}</span>
                    </li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          </Col>

          {/* Tarjeta para agregar producto */}
          <Col md={7} className="mb-4">
            <Card className="shadow-sm" style={{ backgroundColor: '#fff3e6', border: 'none' }}>
              <Card.Body>
                <h4 className="text-center text-brown" style={{ fontFamily: "'Pacifico', cursive" }}>
                  <FaBox className="me-2" /> Productos
                </h4>
                <Button 
                  variant="warning" 
                  onClick={() => setShowModalProducto(true)} 
                  className="w-100 mb-3"
                >
                  <FaPlusCircle className="me-2" /> Crear Producto
                </Button>
                <Row>
                  {currentProducts.map((producto, index) => (
                    <Col md={6} key={index} className="mb-3">
                      <Card className="shadow-sm" style={{ backgroundColor: '#f8f9fa' }}>
                        <Card.Body>
                          <div className="d-flex align-items-center">
                            <img
                              src={producto.imagepath}
                              alt={producto.nombre}
                              className="img-fluid rounded me-3"
                              style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                            />
                            <div>
                              <h6 className="fw-bold text-dark m-0">{producto.nombre}</h6>
                              <p className="small text-muted m-0">{producto.descripcion}</p>
                              <p className="fw-bold m-0">${producto.precio}</p>
                              <p className="small text-muted m-0">Stock: {producto.stock}</p>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>

                {/* Paginación */}
                <div className="d-flex justify-content-center mt-4">
                  <Pagination>
                    {[...Array(Math.ceil(productos.length / productsPerPage)).keys()].map((number) => (
                      <Pagination.Item
                        key={number + 1}
                        active={number + 1 === currentPage}
                        onClick={() => paginate(number + 1)}
                      >
                        {number + 1}
                      </Pagination.Item>
                    ))}
                  </Pagination>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Modal para agregar nueva categoría */}
        <Modal show={showModalCategoria} onHide={() => setShowModalCategoria(false)} centered>
          <Modal.Header closeButton style={{ backgroundColor: '#6F4E37', color: 'white' }}>
            <Modal.Title>
              <FaListUl className="me-2" /> Agregar Nueva Categoría
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleAgregarCategoria}>
              <Form.Group className="mb-3">
                <Form.Label>Nombre de Categoría</Form.Label>
                <Form.Control 
                  type="text" 
                  value={nombreCategoria} 
                  onChange={(e) => setNombreCategoria(e.target.value)} 
                  placeholder="Ej: Panadería"
                  required
                />
              </Form.Group>
              <Button variant="warning" type="submit" className="w-100" disabled={loading}>
                {loading ? <Spinner animation="border" size="sm" /> : 'Agregar Categoría'}
              </Button>
            </Form>
          </Modal.Body>
        </Modal>

        {/* Modal para agregar nuevo producto */}
        <Modal show={showModalProducto} onHide={() => setShowModalProducto(false)} centered size="lg">
          <Modal.Header closeButton style={{ backgroundColor: '#6F4E37', color: 'white' }}>
            <Modal.Title>
              <FaBox className="me-2" /> Agregar Nuevo Producto
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleGuardarProducto}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Nombre del Producto</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="nombre" 
                      value={producto.nombre} 
                      onChange={handleChangeProducto} 
                      placeholder="Ej: Pan de Trigo" 
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
                      placeholder="Ej: Pan artesanal hecho con trigo orgánico" 
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
                      placeholder="Ej: 5.99" 
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
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
                      placeholder="Ej: 50" 
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
                      placeholder="Ej: 10" 
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
                      placeholder="Ej: https://example.com/pan.jpg" 
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Button variant="warning" type="submit" className="w-100" disabled={loading}>
                {loading ? <Spinner animation="border" size="sm" /> : 'Guardar Producto'}
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
}

export default CrearProductosCategorias;