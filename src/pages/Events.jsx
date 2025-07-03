import { useState } from "react";
import { Container, Card, Button, Modal, Form } from "react-bootstrap";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = {
    "it": require("date-fns/locale/it"),
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
    getDay,
    locales,
});

export default function Events() {
    const [events, setEvents] = useState([
        {
            title: "Meeting team",
            start: new Date(),
            end: new Date(new Date().getTime() + 60 * 60 * 1000),
            allDay: false,
        },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });

    const handleAddEvent = () => {
        setEvents([
            ...events,
            {
                title: newEvent.title,
                start: new Date(newEvent.start),
                end: new Date(newEvent.end),
                allDay: false,
            },
        ]);
        setShowModal(false);
        setNewEvent({ title: "", start: "", end: "" });
    };

    return (
        <Container fluid className="p-4">
            <div className="d-flex align-items-center justify-content-between mb-4">
                <h1 className="mb-0">📅 Eventi & Calendario</h1>
                <Button onClick={() => setShowModal(true)}>➕ Aggiungi Evento</Button>
            </div>


            <Card className="shadow-sm">
                <Card.Body style={{ height: "600px" }}>
                    <Calendar
                        localizer={localizer}
                        events={events}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: "100%" }}
                        messages={{
                            next: "Avanti",
                            previous: "Indietro",
                            today: "Oggi",
                            month: "Mese",
                            week: "Settimana",
                            day: "Giorno",
                            agenda: "Agenda",
                            date: "Data",
                            time: "Ora",
                            event: "Evento",
                            noEventsInRange: "Nessun evento in questo intervallo",
                        }}
                    />
                </Card.Body>
            </Card>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Nuovo evento</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Titolo</Form.Label>
                            <Form.Control
                                type="text"
                                value={newEvent.title}
                                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Data e ora inizio</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                value={newEvent.start}
                                onChange={(e) => setNewEvent({ ...newEvent, start: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Data e ora fine</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                value={newEvent.end}
                                onChange={(e) => setNewEvent({ ...newEvent, end: e.target.value })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Annulla
                    </Button>
                    <Button variant="primary" onClick={handleAddEvent}>
                        Aggiungi
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}
