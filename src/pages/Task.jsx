import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  ListGroup,
  Badge,
  Card,
  InputGroup,
} from "react-bootstrap";

export default function DailyTasks() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("dailyTasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");

  useEffect(() => {
    localStorage.setItem("dailyTasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newTask = {
      id: Date.now(),
      text: input.trim(),
      completed: false,
    };
    setTasks((prev) => [...prev, newTask]);
    setInput("");
  };

  const toggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDelete = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <Container className="my-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow">
            <Card.Body>
              <h4 className="mb-4 text-primary">🗓️ Le mie attività di oggi</h4>
              <Form onSubmit={handleAddTask}>
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="Aggiungi una nuova attività..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />
                  <Button type="submit" variant="primary">
                    Aggiungi
                  </Button>
                </InputGroup>
              </Form>

              {tasks.length === 0 ? (
                <p className="text-muted">Nessuna attività aggiunta per oggi.</p>
              ) : (
                <ListGroup>
                  {tasks.map((task) => (
                    <ListGroup.Item
                      key={task.id}
                      className="d-flex justify-content-between align-items-center"
                      variant={task.completed ? "success" : ""}
                    >
                      <div
                        style={{
                          textDecoration: task.completed ? "line-through" : "none",
                          cursor: "pointer",
                        }}
                        onClick={() => toggleComplete(task.id)}
                      >
                        {task.text}
                      </div>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDelete(task.id)}
                      >
                        ✕
                      </Button>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
