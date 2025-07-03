import { Container, Row, Col, Card } from "react-bootstrap";

export default function About() {
  return (
    <Container fluid className="p-4">
      <h1 className="mb-4 text-success">ℹ️ About Page</h1>

      <Row className="mb-4">
        <Col>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>📌 Informazioni sull'app</Card.Title>
              <Card.Text>
                Questa applicazione è una dashboard di esempio realizzata in ReactJS con React Bootstrap e React Router.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
         <Col>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>📝 Changelog & Contatti</Card.Title>
                <Card.Text>
                  Versione: <strong>1.0.0</strong><br />
                  Ultimo aggiornamento: 27/06/2025<br />
                  Email: <a href="carlottaarmenise.job@gmail.com">carlottaarmenise.job@gmail.com</a>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
      </Row>

      <Row>
         <Col>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>👨‍💻 Sviluppatore</Card.Title>
              <Card.Text>
                Sviluppata da <strong>Carlotta</strong>.<br />
                Tecnologie: React, React-Bootstrap, React Router.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
