import { useNavigate } from "react-router-dom";
import { Container, Card, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useProducts } from "../reducer/ProductsContext";

export default function AddProduct() {
    const navigate = useNavigate();
    const { dispatch } = useProducts();

    const [product, setProduct] = useState({
        name: "",
        price: 0,
        availability: "Disponibile",
        category: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prev) => ({
            ...prev,
            [name]: name === "price" ? parseFloat(value) || 0 : value,
        }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        const newProduct = { ...product, id: Date.now() };

        dispatch({ type: "add", payload: newProduct });

        alert(`Prodotto "${product.name}" aggiunto con successo!`);
        navigate("/app/products");
    };

    return (
        <Container fluid className="p-4">
            <h1 className="mb-4 text-primary">➕ Aggiungi Nuovo Prodotto</h1>

            <Card className="shadow-sm">
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Nome prodotto</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={product.name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="price">
                            <Form.Label>Prezzo (€)</Form.Label>
                            <Form.Control
                                type="number"
                                name="price"
                                step="1"
                                value={product.price}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="availability">
                            <Form.Label>Disponibilità</Form.Label>
                            <Form.Select
                                name="availability"
                                value={product.availability}
                                onChange={handleChange}
                                required
                            >
                                <option value="Disponibile">Disponibile</option>
                                <option value="Esaurito">Esaurito</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="category">
                            <Form.Label>Categoria</Form.Label>
                            <Form.Control
                                type="text"
                                name="category"
                                value={product.category}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <div className="d-flex justify-content-end gap-2">
                            <Button variant="secondary" onClick={() => navigate("/app/products")}>
                                Annulla
                            </Button>
                            <Button variant="primary" type="submit">
                                Aggiungi Prodotto
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}
