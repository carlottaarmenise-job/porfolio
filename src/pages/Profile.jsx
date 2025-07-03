import { Container, Card, Row, Col, Form, Button } from "react-bootstrap";

export default function Profile() {
  return (
    <Container fluid className="p-4">
      <h1 className="mb-4">👤 Profilo Utente</h1>

      <Row>
        <Col md={6}>
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <Card.Title>Dati personali</Card.Title>
              <Card.Text>
                Qui puoi consultare le informazioni attuali associate al tuo profilo.
              </Card.Text>
              <ul className="list-unstyled mb-0">
                <li><strong>Nome:</strong> Emilio Rossi</li>
                <li><strong>Email:</strong> emilio@example.com</li>
                <li><strong>Ruolo:</strong> Amministratore</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <Card.Title>Aggiorna dati</Card.Title>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Nome completo</Form.Label>
                  <Form.Control type="text" placeholder="Emilio Rossi" />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="emilio@example.com" />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Nuova password</Form.Label>
                  <Form.Control type="password" placeholder="••••••••" />
                </Form.Group>

                <Button variant="primary" type="submit">Salva modifiche</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
