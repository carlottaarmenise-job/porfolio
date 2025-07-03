import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { Link, useSearchParams } from "react-router-dom";

const API_KEY = "be2007598f9049ea8e5a891c62b0af29"; 

export default function Blog() {
  const [articles, setArticles] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState(3);
  const [loading, setLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category");

  useEffect(() => {
    setLoading(true);
    const fetchNews = async () => {
      try {
        const categoryParam = categoryFilter || "technology";
        const res = await fetch(
          `https://newsapi.org/v2/top-headlines?category=${categoryParam}&language=en&pageSize=20&apiKey=${API_KEY}`
        );
        const data = await res.json();
        setArticles(data.articles || []);
      } catch (err) {
        console.error("Errore nel recupero notizie:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [categoryFilter]);

  const handleLoadMore = () => {
    setVisiblePosts((prev) => prev + 3);
  };

  return (
    <Container fluid className="p-4">
      <h1 className="mb-4">📰 Blog / News</h1>
      <Row>
        <Col md={8}>
          {loading ? (
            <Spinner animation="border" />
          ) : (
            <>
              {articles.slice(0, visiblePosts).map((article, index) => (
                <Card key={index} className="mb-3 shadow-sm">
                  <Card.Body>
                    <Card.Title>
                      <a href={article.url} target="_blank" rel="noopener noreferrer">
                        {article.title}
                      </a>
                    </Card.Title>
                    <Card.Text>{article.description}</Card.Text>
                    <small className="text-muted">{new Date(article.publishedAt).toLocaleDateString()}</small>
                  </Card.Body>
                </Card>
              ))}

              {visiblePosts < articles.length && (
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
            </>
          )}
        </Col>

        <Col md={4}>
          <Card className="shadow-sm mb-3">
            <Card.Body>
              <Card.Title>Categorie News</Card.Title>
              <ul style={{ listStyle: "none", paddingLeft: 0 }}>
                <li><Link to="/app/blog">Tutte</Link></li>
                <li><Link to="/app/blog?category=technology">Technology</Link></li>
                <li><Link to="/app/blog?category=health">Health</Link></li>
                <li><Link to="/app/blog?category=entertainment">Entertainment</Link></li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
