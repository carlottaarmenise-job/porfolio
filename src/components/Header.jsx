import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Search, UserCircle } from 'lucide-react';
import { Container, Form, InputGroup, Button, Navbar, Nav, Dropdown, Modal, ListGroup } from 'react-bootstrap';

export default function Header({ onToggleSidebar }) {
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);

  const handleOpenNotifications = () => setShowNotificationsModal(true);
  const handleCloseNotifications = () => setShowNotificationsModal(false);

  return (
    <>
      <Navbar bg="white" expand="lg" className="shadow-sm py-3 px-3">
        <Container fluid className="d-flex justify-content-between align-items-center">
          <Button
            variant="outline-secondary"
            className="d-lg-none me-2"
            onClick={onToggleSidebar}
          >
            ☰
          </Button>

          <Navbar.Brand className="fw-semibold text-dark fs-4">Porfolio</Navbar.Brand>

          <Nav className="align-items-center">
            {/* Wrapper solo per mobile */}
            <div className="d-flex d-lg-none gap-3 align-items-center">
              {/* Notifiche */}
              <Dropdown align="end">
                <Dropdown.Toggle
                  as={Button}
                  variant="link"
                  className="position-relative text-muted p-0"
                  style={{ fontSize: 0 }}
                >
                  <Bell size={24} />
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                    style={{ fontSize: '0.6rem' }}
                  >
                    3
                  </span>
                </Dropdown.Toggle>

                <Dropdown.Menu
                  className="dropdown-menu-end shadow-sm"
                  style={{
                    position: 'absolute',
                    zIndex: 99,
                    top: '40px',
                    right: 0,
                    maxWidth: '90vw',
                    minWidth: '250px',
                  }}
                >
                  <Dropdown.Header>🔔 Notifiche</Dropdown.Header>
                  <Dropdown.Item href="#notifica1">
                    <small className="text-muted">1 min fa</small><br />
                    Nuovo utente registrato
                  </Dropdown.Item>
                  <Dropdown.Item href="#notifica2">
                    <small className="text-muted">5 min fa</small><br />
                    Backup completato
                  </Dropdown.Item>
                  <Dropdown.Item href="#notifica3">
                    <small className="text-muted">10 min fa</small><br />
                    Nuovo messaggio ricevuto
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item
                    as="button"
                    onClick={handleOpenNotifications}
                    className="text-center text-primary w-100"
                  >
                    Vedi tutte le notifiche
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              {/* Profilo */}
              <Link to="/app/profile">
                <Button variant="link" className="text-muted p-0" style={{ fontSize: 0 }}>
                  <UserCircle size={32} />
                </Button>
              </Link>
            </div>

            {/* Desktop: mostrali singolarmente con gap */}
            <div className="d-none d-lg-flex gap-3 align-items-center">
             <Dropdown align="end">
              <Dropdown.Toggle
                as={Button}
                variant="link"
                className="position-relative text-muted p-0"
                style={{ fontSize: 0 }}>
                <Bell size={24} />
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  style={{ fontSize: '0.6rem' }}
                >
                  3
                </span>
              </Dropdown.Toggle>

              <Dropdown.Menu className="dropdown-menu-end shadow-sm" style={{position: 'absolute', zIndex:99}}>
                <Dropdown.Header>🔔 Notifiche</Dropdown.Header>
                <Dropdown.Item href="#notifica1">
                  <small className="text-muted">1 min fa</small><br />
                  Nuovo utente registrato
                </Dropdown.Item>
                <Dropdown.Item href="#notifica2">
                  <small className="text-muted">5 min fa</small><br />
                  Backup completato
                </Dropdown.Item>
                <Dropdown.Item href="#notifica3">
                  <small className="text-muted">10 min fa</small><br />
                  Nuovo messaggio ricevuto
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  as="button"
                  onClick={handleOpenNotifications}
                  className="text-center text-primary w-100"
                >
                  Vedi tutte le notifiche
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
              <Link to="/app/profile">
                <Button variant="link" className="text-muted p-0" style={{ fontSize: 0 }}>
                  <UserCircle size={32} />
                </Button>
              </Link>
            </div>
          </Nav>

        </Container>
      </Navbar>

      <Modal show={showNotificationsModal} onHide={handleCloseNotifications} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>🔔 Notifications</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <strong>Nuovo utente registrato</strong>
              <div className="text-muted small">1 minuto fa</div>
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Backup completato</strong>
              <div className="text-muted small">5 minuti fa</div>
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Nuovo messaggio ricevuto</strong>
              <div className="text-muted small">10 minuti fa</div>
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Aggiornamento disponibile</strong>
              <div className="text-muted small">1 ora fa</div>
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Report settimanale generato</strong>
              <div className="text-muted small">2 ore fa</div>
            </ListGroup.Item>
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseNotifications}>
            Chiudi
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
