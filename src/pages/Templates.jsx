import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
} from "react-bootstrap";
import web1 from "../assets/img/web1.jpg";
import web2 from "../assets/img/web2.jpg";
import web3 from "../assets/img/web3.jpg";
import web4 from "../assets/img/web4.jpg";
import web5 from "../assets/img/web5.jpg";
import web6 from "../assets/img/web6.jpg";
import web7 from "../assets/img/web7.jpg";
import app1 from "../assets/img/app1.jpg";
import app2 from "../assets/img/app2.jpg";
import fly1 from "../assets/img/fly1.png";
import fly2 from "../assets/img/fly2.png";
import { Link } from "react-router-dom";

const templates = [
  { id: 1, category: "Web Site", title: "Modern Portfolio", description: "Un template elegante e minimal per portfolio professionali.", image: web1, link: "/yoga1" },
  { id: 2, category: "Web Site", title: "Startup Landing", description: "Landing page accattivante per startup e nuovi prodotti.", image: web2, link: null },
  { id: 3, category: "Web Site", title: "Business Corporate", description: "Design solido per aziende e siti istituzionali.", image: web3, link: "/food" },
  { id: 4, category: "Web Site", title: "Creative Agency", description: "Layout creativo per agenzie di comunicazione e marketing.", image: web4, link: "/music" },
  { id: 5, category: "Web Site", title: "Restaurant Deluxe", description: "Template raffinato per ristoranti, bar e locali.", image: web5, link: null },
  { id: 6, category: "Web Site", title: "Photography Showcase", description: "Template pensato per fotografi, con gallery ad alto impatto.", image: web6, link: null },
  { id: 7, category: "Web Site", title: "Tech Blog", description: "Un template pulito per blog tecnologici e riviste online.", image: web7, link: "/beauty" },
  { id: 8, category: "Application", title: "Task Manager App", description: "Template per un’app di gestione attività semplice e intuitiva.", image: app1, link: "/travel" },
  { id: 9, category: "Application", title: "Fitness Tracker App", description: "Interfaccia moderna per app dedicate a sport e benessere.", image: app2, link: "/shop" },
  { id: 10, category: "Printable", title: "Event Flyer", description: "Flyer creativo per eventi, concerti o feste aziendali.", image: fly1, link: "/flyer" },
  { id: 11, category: "Printable", title: "Corporate Brochure", description: "Brochure aziendale professionale per presentazioni o fiere.", image: fly2, link: "/flyer2" },
];

const categories = ["Web Site", "Application", "Printable"];

export default function Templates() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showDetail, setShowDetail] = useState(null);

  const handleShow = (template) => setSelectedTemplate(template);
  const handleClose = () => setSelectedTemplate(null);
  const handleShowTemplateD = (link) => setShowDetail(link);

  return (
    <Container fluid className="p-4">
      <h1 className="mb-4">📂 Template disponibili</h1>

      {categories.map((category) => {
        const filteredTemplates = templates.filter(
          (template) => template.category === category
        );

        return (
          <div key={category} className="mb-5">
            <h2 className="mb-3">{category}</h2>
            <Row xs={1} sm={2} md={3} lg={4} className="g-4">
              {filteredTemplates.map((template) => (
                <Col key={template.id}>
                  <Card className="shadow-sm h-100">
                    <Card.Img variant="top" src={template.image} />
                    <Card.Body className="d-flex flex-column">
                      <Card.Title>{template.title}</Card.Title>
                      <Card.Text className="flex-grow-1">
                        {template.description}
                      </Card.Text>
                      <Button
                        variant="primary"
                        onClick={() => handleShow(template)}
                      >
                        Visualizza
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        );
      })}

      <Modal
        show={!!selectedTemplate}
        onHide={handleClose}
        centered
        size="lg"
      >
        {selectedTemplate && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{selectedTemplate.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <img
                src={selectedTemplate.image}
                alt={selectedTemplate.title}
                className="img-fluid mb-3 rounded"
              />
              <p>{selectedTemplate.description}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Chiudi
              </Button>
              {selectedTemplate.link && (
                <Button variant="primary" onClick={() => handleShowTemplateD(selectedTemplate.link)}>
                  Visualizza
                </Button>
              )}
            </Modal.Footer>
          </>
        )}
      </Modal>

      <Modal
        show={!!showDetail}
        onHide={() => setShowDetail(null)}
        centered
        size="xl"
      >
        <Modal.Header closeButton>
          <Modal.Title>Anteprima Template</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: "80vh" }}>
          {showDetail && (
            <iframe
              src={`${process.env.PUBLIC_URL}/website${showDetail}.html`}
              title="Anteprima Template"
              style={{
                width: "100%",
                height: "100%",
                border: "none",
              }}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDetail(null)}>
            Chiudi
          </Button>
          <Link to="/app/canvas">
            <Button variant="primary" >
              Edit
            </Button>
          </Link>
        </Modal.Footer>
      </Modal>

    </Container>
  );
}
