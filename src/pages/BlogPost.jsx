import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";

const blogPostsData = [
    {
        id: 1,
        title: "Il mio primo post sul blog",
        content: `
      <p>In questo articolo racconto come ho iniziato il mio progetto portfolio...</p>
      <p>È stata un'esperienza stimolante e formativa...</p>
    `,
        date: "2025-06-20",
        category: "react",
    },
    {
        id: 2,
        title: "Come utilizzo React Bootstrap",
        content: `
      <p>Una panoramica su come React Bootstrap aiuta a costruire UI rapide e responsive.</p>
      <p>Molto utile per progetti React che vogliono velocità e stile.</p>
    `,
        date: "2025-06-18",
        category: "javascript",
    },
    {
        id: 3,
        title: "Routing con react-router-dom",
        content: `
      <p>In questa guida spiego come gestire la navigazione nel progetto con react-router-dom.</p>
      <p>Si tratta di uno strumento fondamentale per le SPA.</p>
    `,
        date: "2025-06-15",
        category: "design",
    },
];

export default function BlogPost() {
    const { id } = useParams();
    const navigate = useNavigate();

    const post = blogPostsData.find((p) => p.id === parseInt(id, 10));

    if (!post) {
        return (
            <Container className="p-4">
                <h2>Post non trovato</h2>
                <Button variant="primary" onClick={() => navigate("/app/blog")}>
                    Torna al Blog
                </Button>
            </Container>
        );
    }

    return (
        <Container className="p-4">
            <Card className="shadow-sm">
                <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    <small className="text-muted mb-3 d-block">{post.date}</small>
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />

                    <Button
                        variant="secondary"
                        className="mt-4"
                        onClick={() => navigate("/app/blog")}
                    >
                        ← Torna al Blog
                    </Button>
                </Card.Body>
            </Card>
        </Container>
    );
}
