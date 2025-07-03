import { useState } from "react";
import {
    Container,
    Row,
    Col,
    Card,
    Button,
    Table,
    Modal,
    Form
} from "react-bootstrap";

export default function InvoicesPage() {
    const [invoices, setInvoices] = useState([
        { id: 1, client: "Mario Rossi", amount: 1200, date: "2025-06-15" },
        { id: 2, client: "Luca Bianchi", amount: 850, date: "2025-06-20" },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [editingInvoice, setEditingInvoice] = useState(null);
    const [form, setForm] = useState({ client: "", amount: "", date: "" });

    const handleOpenModal = (invoice = null) => {
        setEditingInvoice(invoice);
        setForm(invoice || { client: "", amount: "", date: "" });
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingInvoice(null);
        setForm({ client: "", amount: "", date: "" });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        if (editingInvoice) {
            setInvoices((prev) =>
                prev.map((inv) =>
                    inv.id === editingInvoice.id ? { ...editingInvoice, ...form } : inv
                )
            );
        } else {
            setInvoices((prev) => [
                ...prev,
                { ...form, id: Date.now(), amount: parseFloat(form.amount) }
            ]);
        }
        handleCloseModal();
    };

    const handleDelete = (id) => {
        if (window.confirm("Sicuro di voler eliminare questa fattura?")) {
            setInvoices((prev) => prev.filter((inv) => inv.id !== id));
        }
    };

    return (
        <Container fluid className="p-4">
            <h1 className="mb-4">🧾 Gestione Fatture</h1>

            <Row>
                <Col>
                    <Card className="shadow-sm">
                        <Card.Body>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <Card.Title>📋 Elenco Fatture</Card.Title>
                                <Button variant="primary" size="sm" onClick={() => handleOpenModal()}>
                                    ➕ Nuova Fattura
                                </Button>
                            </div>
                            <Table responsive hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Cliente</th>
                                        <th>Importo (€)</th>
                                        <th>Data</th>
                                        <th>Azioni</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {invoices.map((inv, idx) => (
                                        <tr key={inv.id}>
                                            <td>{idx + 1}</td>
                                            <td>{inv.client}</td>
                                            <td>{inv.amount.toFixed(2)}</td>
                                            <td>{inv.date}</td>
                                            <td>
                                                <Button
                                                    variant="outline-primary"
                                                    size="sm"
                                                    className="me-2"
                                                    onClick={() => handleOpenModal(inv)}
                                                >
                                                    ✏️
                                                </Button>
                                                <Button
                                                    variant="outline-danger"
                                                    size="sm"
                                                    onClick={() => handleDelete(inv.id)}
                                                >
                                                    🗑️
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                    {invoices.length === 0 && (
                                        <tr>
                                            <td colSpan="5" className="text-center">
                                                Nessuna fattura presente.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {editingInvoice ? "Modifica Fattura" : "Nuova Fattura"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Cliente</Form.Label>
                            <Form.Control
                                type="text"
                                name="client"
                                value={form.client}
                                onChange={handleChange}
                                placeholder="Nome cliente"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Importo (€)</Form.Label>
                            <Form.Control
                                type="number"
                                name="amount"
                                value={form.amount}
                                onChange={handleChange}
                                placeholder="Es. 1000"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Data</Form.Label>
                            <Form.Control
                                type="date"
                                name="date"
                                value={form.date}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Annulla
                    </Button>
                    <Button variant="success" onClick={handleSave}>
                        Salva
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}
