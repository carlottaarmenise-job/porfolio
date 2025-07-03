import { useState } from "react";
import { Container, Row, Col, Card, Table, Badge, Button, Modal, Form } from "react-bootstrap";
import { USERS_ACTIONS, useUsers } from "../reducer/UsersContext";

export default function Users() {
  const { users, dispatch } = useUsers();
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [isNewUser, setIsNewUser] = useState(false);

  const handleActivate = (id) => {
    dispatch({ type: USERS_ACTIONS.ACTIVATE, payload: { id } });
  };

  const handleDeactivate = (id) => {
    dispatch({ type: USERS_ACTIONS.DEACTIVATE, payload: { id } });
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setIsNewUser(false);
    setShowModal(true);
  };

  const handleAddNew = () => {
    setEditingUser({ id: null, name: "", email: "", active: true });
    setIsNewUser(true);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditingUser(null);
    setIsNewUser(false);
  };

  const handleModalSave = () => {
    if (!editingUser.name || !editingUser.email) {
      alert("Nome ed email sono obbligatori.");
      return;
    }

    if (isNewUser) {
      const newUser = {
        ...editingUser,
        id: Date.now(), 
      };
      dispatch({ type: USERS_ACTIONS.ADD, payload: newUser });
    } else {
      dispatch({ type: USERS_ACTIONS.UPDATE, payload: editingUser });
    }

    handleModalClose();
  };

  const handleDelete = (id) => {
    if (window.confirm("Sei sicuro di voler eliminare questo utente?")) {
      dispatch({ type: USERS_ACTIONS.DELETE, payload: { id } });
    }
  };

  return (
    <Container fluid className="p-4">
      <h1 className="mb-4">👥 Gestione Utenti</h1>

      <Row className="mb-4">
        <Col md={6} lg={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Utenti totali</Card.Title>
              <h2>{users.length}</h2>
              <Badge bg="primary">{`+0% questo mese`}</Badge>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Attivi</Card.Title>
              <h2>{users.filter(u => u.active).length}</h2>
              <Badge bg="success">Attivi</Badge>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Inattivi</Card.Title>
              <h2>{users.filter(u => !u.active).length}</h2>
              <Badge bg="secondary">Inattivi</Badge>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <Button variant="success" onClick={handleAddNew}>
            ➕ Aggiungi utente
          </Button>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Elenco utenti</Card.Title>
              <Table responsive hover className="align-middle">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Stato</th>
                    <th>Azioni</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user.id}>
                      <td>{index + 1}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <Badge bg={user.active ? "success" : "secondary"}>
                          {user.active ? "Attivo" : "Inattivo"}
                        </Badge>
                      </td>
                      <td>
                        <Button variant="outline-primary" size="sm" onClick={() => handleEdit(user)}>
                          Modifica
                        </Button>{" "}
                        {user.active ? (
                          <Button variant="outline-danger" size="sm" onClick={() => handleDeactivate(user.id)}>
                            Disattiva
                          </Button>
                        ) : (
                          <Button variant="outline-success" size="sm" onClick={() => handleActivate(user.id)}>
                            Attiva
                          </Button>
                        )}{" "}
                        <Button variant="outline-dark" size="sm" onClick={() => handleDelete(user.id)}>
                          Elimina
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isNewUser ? "Aggiungi nuovo utente" : "Modifica utente"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editingUser && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  value={editingUser.name}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, name: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={editingUser.email}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, email: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Attivo"
                  checked={editingUser.active}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, active: e.target.checked })
                  }
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Annulla
          </Button>
          <Button variant="primary" onClick={handleModalSave}>
            Salva
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
