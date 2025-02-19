import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col, Form, Pagination } from "react-bootstrap";
import NavbarComponent from "/src/Components/Navbar";
import { FaShoppingCart, FaMinus, FaPlus } from "react-icons/fa";
import "/main.css";

function Catalogo() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : {};
  });
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch("http://localhost:3000/productos");
        const data = await response.json();
        const updatedItems = data.map((item) => ({
          ...item,
          quantity: cart[item.id] || 0,
        }));
        setItems(updatedItems);
      } catch (error) {
        console.error("Error fetching productos:", error);
      }
    };

    fetchProductos();
  }, [cart]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
  };

  const handleQuantityChange = (id, amount) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(0, Math.min(item.quantity + amount, 3)) }
          : item
      )
    );
  };

  const handleAddToCart = (id) => {
    setCart((prevCart) => {
      const item = items.find((item) => item.id === id);
      return item && item.quantity > 0 ? { ...prevCart, [id]: item.quantity } : prevCart;
    });
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredItems = selectedCategory
    ? items.filter((item) => item.categoria && item.categoria.nombre === selectedCategory)
    : items;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const uniqueCategories = [...new Set(items.map((item) => item.categoria?.nombre).filter(Boolean))];

  return (
    <div>
      <NavbarComponent cart={cart} />
      <div className="container my-5">
        <h2 className="mb-4 text-center text-warning fw-bold text-uppercase">
          <FaShoppingCart className="me-2" /> Catálogo de Productos
        </h2>

        {/* Filtrar por Categoría */}
        <Form.Group controlId="categorySelect" className="mb-4 text-center">
          <Form.Label className="h5 fw-bold">Filtrar por Categoría</Form.Label>
          <Form.Select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="form-select-lg shadow-sm border-warning"
          >
            <option value="">Todas las categorías</option>
            {uniqueCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        {/* Productos */}
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {currentItems.map((item) => (
            <Col key={item.id}>
              <Card className="shadow-lg rounded-4 border-0 card-hover">
                <Card.Img variant="top" src={item.imagepath} className="rounded-top-4" />
                <Card.Body className="text-center">
                  <Card.Title className="fw-bold text-dark">{item.nombre}</Card.Title>
                  <Card.Text className="text-muted">{item.descripcion}</Card.Text>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="text-success fw-bold fs-5">${item.precio}</span>
                    <div className="d-flex align-items-center">
                      <Button
                        variant="outline-warning"
                        onClick={() => handleQuantityChange(item.id, -1)}
                        disabled={item.quantity <= 0 || cart[item.id]}
                        className="rounded-circle"
                      >
                        <FaMinus />
                      </Button>
                      <span className="mx-2 fw-bold">{item.quantity || 0}</span>
                      <Button
                        variant="warning"
                        onClick={() => handleQuantityChange(item.id, 1)}
                        disabled={item.quantity >= 3 || cart[item.id]}
                        className="rounded-circle"
                      >
                        <FaPlus />
                      </Button>
                    </div>
                  </div>
                  <Button
                    variant="dark"
                    className="mt-3 w-100 fw-bold"
                    onClick={() => handleAddToCart(item.id)}
                    disabled={cart[item.id]}
                  >
                    {cart[item.id] ? "Añadido" : "Agregar al carrito"}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Paginación */}
        <Pagination className="justify-content-center mt-4">
          {[...Array(totalPages).keys()].map((number) => (
            <Pagination.Item
              key={number + 1}
              active={number + 1 === currentPage}
              onClick={() => handlePageChange(number + 1)}
              className="fw-bold"
            >
              {number + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
    </div>
  );
}

export default Catalogo;
