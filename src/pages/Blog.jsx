import React, { useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link, useSearchParams } from "react-router-dom";

export default function Blog() {
  const [visiblePosts, setVisiblePosts] = useState(3);
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category");

  // Post statici hardcoded
  const staticArticles = [
  {
    id: 1,
    title: "Il mio primo post sul blog",
    description: "In questo articolo racconto come ho iniziato il mio progetto portfolio...",
    url: "#",
    publishedAt: "2025-06-20",
    category: "react",
  },
  {
    id: 2,
    title: "Come utilizzo React Bootstrap",
    description: "Una panoramica su come React Bootstrap aiuta a costruire UI rapide e responsive.",
    url: "#",
    publishedAt: "2025-06-18",
    category: "javascript",
  },
  {
    id: 3,
    title: "Routing con react-router-dom",
    description: "In questa guida spiego come gestire la navigazione nel progetto con react-router-dom.",
    url: "#",
    publishedAt: "2025-06-15",
    category: "design",
  },
 
];


  // Applica filtro categoria se presente
  const filteredArticles = categoryFilter
    ? staticArticles.filter((article) => article.category === categoryFilter)
    : staticArticles;

  const handleLoadMore = () => {
    setVisiblePosts((prev) => prev + 3);
  };

  return (
    <Container fluid className="p-4">
      <h1 className="mb-4">📰 Blog / News</h1>
      <Row>
        <Col md={8}>
          {filteredArticles.slice(0, visiblePosts).map((article, index) => (
            <Card key={index} className="mb-3 shadow-sm">
              <Card.Body>
                <Card.Title>
                  <Link to={`/app/blog/${article.id}`}>
                    {article.title}
                  </Link>
                </Card.Title>
                <Card.Text>{article.description}</Card.Text>
                <small className="text-muted">{new Date(article.publishedAt).toLocaleDateString()}</small>
              </Card.Body>
            </Card>
          ))}

          {visiblePosts < filteredArticles.length && (
            <Button variant="primary" onClick={handleLoadMore}>
              Carica più
            </Button>
          )}

          {categoryFilter && (
            <Button
              variant="outline-secondary"
              className="mt-3"
              onClick={() => setSearchParams({})}
            >
              Mostra tutti
            </Button>
          )}
        </Col>

        <Col md={4}>
          <Card className="shadow-sm mb-3">
            <Card.Body>
              <Card.Title>Categorie News</Card.Title>
              <ul style={{ listStyle: "none", paddingLeft: 0 }}>
                <li><Link to="/app/blog">Tutte</Link></li>
                <li><Link to="/app/blog?category=react">React</Link></li>
                <li><Link to="/app/blog?category=javascript">Javascript</Link></li>
                <li><Link to="/app/blog?category=design">Design</Link></li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
