import { useState } from "react";
import { Container, Row, Col, Button, Form, Modal } from "react-bootstrap";
import { Rnd } from "react-rnd";

export default function WebsiteBuilder() {
    const [elements, setElements] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedElement, setSelectedElement] = useState(null);

    const addElement = (type) => {
        const id = Date.now();
        const newElement = {
            id,
            type,
            content:
                type === "text"
                    ? "Testo di esempio"
                    : type === "button"
                        ? "Cliccami"
                        : "https://placehold.co/80x80?text=PROVA-IMG",
            x: 100,
            y: 100,
            width: 200,
            height: type === "image" ? 150 : 50,
            styles: {
                backgroundColor: type === "button" ? "#007bff" : "white",
                color: type === "button" ? "white" : "black",
                fontSize: "16px",
                fontFamily: "Arial",
                borderRadius: "4px",
                border: "1px solid #ccc",
                padding: "8px",
                fontWeight: "normal",
                fontStyle: "normal",
                textAlign: "left",
                margin: "0",
                boxShadow: "none",
                textShadow: "none",
            },
        };
        setElements([...elements, newElement]);
    };

    const updateElement = (id, newProps) => {
        setElements((prev) =>
            prev.map((el) => (el.id === id ? { ...el, ...newProps } : el))
        );
    };

    const updateElementStyles = (id, newStyles) => {
        setElements((prev) =>
            prev.map((el) =>
                el.id === id ? { ...el, styles: { ...el.styles, ...newStyles } } : el
            )
        );
    };

    const deleteElement = (id) => {
        setElements((prev) => prev.filter((el) => el.id !== id));
    };

    const handleContentChange = (id, content) => {
        updateElement(id, { content });
    };

    const handleEdit = (element) => {
        setSelectedElement({ ...element });
        setShowEditModal(true);
    };

    const handleSaveEdit = () => {
        if (selectedElement) {
            updateElement(selectedElement.id, selectedElement);
        }
        setShowEditModal(false);
    };

    const handleExport = () => {
        const json = JSON.stringify(elements);
        const blob = new Blob([json], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "layout.json";
        link.click();
    };

    const handleImport = (e) => {
        const fileReader = new FileReader();
        fileReader.onload = () => {
            try {
                const imported = JSON.parse(fileReader.result);
                setElements(imported);
            } catch (err) {
                alert("Errore nel file JSON");
            }
        };
        fileReader.readAsText(e.target.files[0]);
    };

    return (
        <Container fluid className="py-4">
            <h1 className="mb-3">🌐 Wix Lite</h1>
            <Row className="mb-3">
                <Col md="auto">
                    <Button variant="primary" onClick={() => addElement("text")}>➕ Aggiungi Testo</Button>
                </Col>
                <Col md="auto">
                    <Button variant="success" onClick={() => addElement("button")}>➕ Aggiungi Bottone</Button>
                </Col>
                <Col md="auto">
                    <Button variant="info" onClick={() => addElement("image")}>🖼️ Aggiungi Immagine</Button>
                </Col>
                <Col md="auto">
                    <Button variant="secondary" onClick={handleExport}>💾 Esporta</Button>
                </Col>
                <Col md="auto">
                    <Form.Control type="file" accept="application/json" onChange={handleImport} />
                </Col>
            </Row>

            <div
                style={{
                    width: "100%",
                    height: "80vh",
                    border: "2px dashed #ccc",
                    position: "relative",
                    background: "#f9f9f9",
                }}
            >
                {elements.map((el) => (
                    <Rnd
                        key={el.id}
                        default={{
                            x: el.x,
                            y: el.y,
                            width: el.width,
                            height: el.height,
                        }}
                        bounds="parent"
                        onDragStop={(e, d) => updateElement(el.id, { x: d.x, y: d.y })}
                        onResizeStop={(e, direction, ref, delta, position) => {
                            updateElement(el.id, {
                                width: parseInt(ref.style.width),
                                height: parseInt(ref.style.height),
                                ...position,
                            });
                        }}
                        onDoubleClick={() => handleEdit(el)}
                    >
                        <div style={{ position: "relative", width: "100%", height: "100%" }}>
                            {el.type === "text" && (
                                <div
                                    contentEditable
                                    suppressContentEditableWarning
                                    style={el.styles}
                                    onBlur={(e) => handleContentChange(el.id, e.target.innerText)}
                                >
                                    {el.content}
                                </div>
                            )}
                            {el.type === "button" && (
                                <button
                                    style={el.styles}
                                    contentEditable
                                    suppressContentEditableWarning
                                    onBlur={(e) => handleContentChange(el.id, e.target.innerText)}
                                >
                                    {el.content}
                                </button>
                            )}
                            {el.type === "image" && (
                                <img
                                    src={el.content}
                                    alt=""
                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                />
                            )}
                            <Button
                                variant="danger"
                                size="sm"
                                style={{ position: "absolute", top: -10, right: -10, zIndex: 1 }}
                                onClick={() => deleteElement(el.id)}
                            >
                                ✖
                            </Button>
                        </div>
                    </Rnd>
                ))}
            </div>

            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>🎨 Modifica Elemento</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedElement && (
                        <>
                            {selectedElement.type !== "image" ? (
                                <>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Colore Sfondo</Form.Label>
                                        <Form.Control
                                            type="color"
                                            value={selectedElement.styles.backgroundColor}
                                            onChange={(e) =>
                                                setSelectedElement({
                                                    ...selectedElement,
                                                    styles: {
                                                        ...selectedElement.styles,
                                                        backgroundColor: e.target.value,
                                                    },
                                                })
                                            }
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Colore Testo</Form.Label>
                                        <Form.Control
                                            type="color"
                                            value={selectedElement.styles.color}
                                            onChange={(e) =>
                                                setSelectedElement({
                                                    ...selectedElement,
                                                    styles: {
                                                        ...selectedElement.styles,
                                                        color: e.target.value,
                                                    },
                                                })
                                            }
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Font</Form.Label>
                                        <Form.Select
                                            value={selectedElement.styles.fontFamily}
                                            onChange={(e) =>
                                                setSelectedElement({
                                                    ...selectedElement,
                                                    styles: {
                                                        ...selectedElement.styles,
                                                        fontFamily: e.target.value,
                                                    },
                                                })
                                            }
                                        >
                                            <option value="Arial">Arial</option>
                                            <option value="Verdana">Verdana</option>
                                            <option value="Georgia">Georgia</option>
                                            <option value="Courier New">Courier New</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group className="mb-2">
                                        <Form.Check
                                            type="checkbox"
                                            label="Grassetto"
                                            checked={selectedElement.styles.fontWeight === "bold"}
                                            onChange={(e) =>
                                                setSelectedElement({
                                                    ...selectedElement,
                                                    styles: {
                                                        ...selectedElement.styles,
                                                        fontWeight: e.target.checked ? "bold" : "normal",
                                                    },
                                                })
                                            }
                                        />
                                        <Form.Check
                                            type="checkbox"
                                            label="Corsivo"
                                            checked={selectedElement.styles.fontStyle === "italic"}
                                            onChange={(e) =>
                                                setSelectedElement({
                                                    ...selectedElement,
                                                    styles: {
                                                        ...selectedElement.styles,
                                                        fontStyle: e.target.checked ? "italic" : "normal",
                                                    },
                                                })
                                            }
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Allineamento Testo</Form.Label>
                                        <Form.Select
                                            value={selectedElement.styles.textAlign}
                                            onChange={(e) =>
                                                setSelectedElement({
                                                    ...selectedElement,
                                                    styles: {
                                                        ...selectedElement.styles,
                                                        textAlign: e.target.value,
                                                    },
                                                })
                                            }
                                        >
                                            <option value="left">Sinistra</option>
                                            <option value="center">Centro</option>
                                            <option value="right">Destra</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Margine</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={selectedElement.styles.margin}
                                            onChange={(e) =>
                                                setSelectedElement({
                                                    ...selectedElement,
                                                    styles: {
                                                        ...selectedElement.styles,
                                                        margin: e.target.value,
                                                    },
                                                })
                                            }
                                        />
                                        <Form.Text>Es. 10px o 10px 20px</Form.Text>
                                    </Form.Group>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Ombra del testo</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={selectedElement.styles.textShadow}
                                            onChange={(e) =>
                                                setSelectedElement({
                                                    ...selectedElement,
                                                    styles: {
                                                        ...selectedElement.styles,
                                                        textShadow: e.target.value,
                                                    },
                                                })
                                            }
                                        />
                                        <Form.Text>Es. 1px 1px 2px #000</Form.Text>
                                    </Form.Group>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Ombra del box</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={selectedElement.styles.boxShadow}
                                            onChange={(e) =>
                                                setSelectedElement({
                                                    ...selectedElement,
                                                    styles: {
                                                        ...selectedElement.styles,
                                                        boxShadow: e.target.value,
                                                    },
                                                })
                                            }
                                        />
                                        <Form.Text>Es. 0px 4px 6px rgba(0,0,0,0.1)</Form.Text>
                                    </Form.Group>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Bordi Arrotondati</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={selectedElement.styles.borderRadius}
                                            onChange={(e) =>
                                                setSelectedElement({
                                                    ...selectedElement,
                                                    styles: {
                                                        ...selectedElement.styles,
                                                        borderRadius: e.target.value,
                                                    },
                                                })
                                            }
                                        />
                                        <Form.Text>Es. 4px, 50%</Form.Text>
                                    </Form.Group>
                                </>
                            ) : (
                                <Form.Group className="mb-2">
                                    <Form.Label>URL Immagine</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={selectedElement.content}
                                        onChange={(e) =>
                                            setSelectedElement({ ...selectedElement, content: e.target.value })
                                        }
                                    />
                                </Form.Group>
                            )}
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                        Chiudi
                    </Button>
                    <Button variant="primary" onClick={handleSaveEdit}>
                        Salva modifiche
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}