import { Container, Row, Col, Card, Table, ProgressBar } from "react-bootstrap";
import { useProducts } from "../reducer/ProductsContext";
import { useUsers } from "../reducer/UsersContext";

export default function Home() {
  const { products } = useProducts();
  const { users } = useUsers();


  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.active).length;
  const activeUsersPercent = totalUsers > 0 ? Math.round((activeUsers / totalUsers) * 100) : 0;
  const totalProducts = products.length;
  const availableProducts = products.filter(p => p.availability === "Disponibile").length;
  const soldOutProducts = products.filter(p => p.availability === "Esaurito").length;

  const availableProductsPercent = totalProducts > 0
    ? Math.round((availableProducts / totalProducts) * 100)
    : 0;


  return (
    <Container fluid className="p-4">
      <h1 className="mb-4">🏠 Dashboard principale</h1>

      <Row className="mb-4">
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>👥 Utenti attivi</Card.Title>
              <Card.Text>
                {activeUsers} su {totalUsers} utenti
              </Card.Text>
              <ProgressBar now={activeUsersPercent} label={`${activeUsersPercent}%`} />
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>🛒 Prodotti disponibili</Card.Title>
              <Card.Text>
                {availableProducts} su {totalProducts} prodotti
              </Card.Text>
              <ProgressBar
                variant="success"
                now={availableProductsPercent}
                label={`${availableProductsPercent}%`}
              />
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>📊 Prodotti esauriti</Card.Title>
              <Card.Text>
                {soldOutProducts} su {totalProducts} prodotti
              </Card.Text>
              <ProgressBar
                variant="danger"
                now={100 - availableProductsPercent}
                label={`${100 - availableProductsPercent}%`}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={8} className="mb-4">
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>📉 Grafico (placeholder)</Card.Title>
              <div style={{ height: "300px", background: "#f0f2f5" }}>
                <p className="text-center pt-5">Grafico qui</p>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>📅 Ultime attività</Card.Title>
              <Table responsive hover size="sm">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Attività</th>
                    <th>Data</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Dashboard aggiornata</td>
                    <td>27/06/2025</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Nuovo utente registrato</td>
                    <td>26/06/2025</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Nuovo prodotto aggiunto</td>
                    <td>25/06/2025</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
