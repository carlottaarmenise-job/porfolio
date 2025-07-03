import { Container, Row, Col, Card, Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../reducer/ProductsContext";

export default function Products() {
  const navigate = useNavigate();
  const { products, deleteProduct } = useProducts();

  const handleDelete = (id) => {
    if (window.confirm("Sei sicuro di voler eliminare questo prodotto?")) {
      deleteProduct(id);
    }
  };

  const handleEdit = (id) => {
    navigate(`/app/products/${id}`);
  };

  return (
    <Container fluid className="p-4">
      <h1 className="mb-4 text-primary">🛒 Prodotti</h1>

      <Row className="mb-4">
        <Col>
          <Card className="shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <Card.Title className="mb-0">📦 Lista Prodotti</Card.Title>
                <Button variant="primary" size="sm" onClick={() => navigate("/app/products/new")}>
                  ➕ Aggiungi prodotto
                </Button>
              </div>

              <div style={{ overflowX: "auto" }}>
                <Table hover responsive size="sm" className="mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>#</th>
                      <th>Nome</th>
                      <th>Prezzo</th>
                      <th>Disponibilità</th>
                      <th>Categoria</th>
                      <th>Azioni</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product, index) => (
                      <tr key={product.id}>
                        <td>{index + 1}</td>
                        <td>{product.name}</td>
                        <td>
                          €{typeof product.price === "number" ? product.price.toFixed(2) : "0.00"}
                        </td>
                        <td>{product.availability}</td>
                        <td>{product.category}</td>
                        <td>
                          <Button
                            variant="outline-primary"
                            size="sm"
                            className="me-2"
                            onClick={() => handleEdit(product.id)}
                          >
                            ✏️
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleDelete(product.id)}
                          >
                            🗑️
                          </Button>
                        </td>
                      </tr>
                    ))}
                    {products.length === 0 && (
                      <tr>
                        <td colSpan="6" className="text-center text-muted py-4">
                          Nessun prodotto disponibile.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
