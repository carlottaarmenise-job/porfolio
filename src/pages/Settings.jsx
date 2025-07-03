import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

export default function Settings() {
  return (
    <Container fluid className="p-4">
      <h1 className="mb-4">⚙️ Impostazioni</h1>

      <Row className="mb-4">
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>🔧 Generali</Card.Title>
              <Card.Text>
                Configura le impostazioni generali dell'applicazione, come tema, lingua e layout.
              </Card.Text>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Lingua</Form.Label>
                  <Form.Select>
                    <option>Italiano</option>
                    <option>Inglese</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Tema</Form.Label>
                  <Form.Select>
                    <option>Chiaro</option>
                    <option>Scuro</option>
                  </Form.Select>
                </Form.Group>
                <Button variant="primary">Salva impostazioni</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>🔔 Notifiche</Card.Title>
              <Card.Text>
                Gestisci le preferenze relative alle notifiche email e push.
              </Card.Text>
              <Form>
                <Form.Check
                  type="switch"
                  id="email-notifications"
                  label="Notifiche via email"
                  defaultChecked
                />
                <Form.Check
                  type="switch"
                  id="push-notifications"
                  label="Notifiche push"
                />
                <Button variant="primary" className="mt-3">
                  Aggiorna notifiche
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
