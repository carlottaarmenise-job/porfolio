import React, { useState } from "react";
import { Row, Col, Button, Card } from "react-bootstrap";

const initialCanvas = {
  valueProposition: "Describe your Value Proposition...",
  customerSegments: "Define your Customer Segments...",
  channels: "List your Channels...",
  customerRelationships: "Explain how you build Relationships...",
  revenueStreams: "Define Revenue Streams...",
  keyActivities: "Key Activities go here...",
  keyResources: "Key Resources required...",
  keyPartners: "Who are your Key Partners?",
  costStructure: "Outline Cost Structure..."
};

const CustomerCanvas = () => {
  const [canvas, setCanvas] = useState(initialCanvas);

  const handleChange = (key, content) => {
    setCanvas({ ...canvas, [key]: content });
  };

  const renderBlock = (title, key) => (
    <Card className="mb-3 shadow-sm">
      <Card.Header as="h5">{title}</Card.Header>
      <Card.Body>
        <div
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => handleChange(key, e.target.innerText)}
          style={{
            minHeight: "80px",
            padding: "0.5rem",
            border: "1px dashed #ccc",
            borderRadius: "4px",
            backgroundColor: "#fafafa"
          }}
        >
          {canvas[key]}
        </div>
      </Card.Body>
    </Card>
  );

  const handleSave = () => {
    console.log("Saved Canvas:", canvas);
    alert("Canvas salvato nel console log!");
  };

  return (
    <div className="p-3">
      <h2 className="mb-4">Customer Canvas Editor</h2>
      <Row>
        <Col md={6}>{renderBlock("Value Proposition", "valueProposition")}</Col>
        <Col md={6}>{renderBlock("Customer Segments", "customerSegments")}</Col>
      </Row>
      <Row>
        <Col md={6}>{renderBlock("Channels", "channels")}</Col>
        <Col md={6}>{renderBlock("Customer Relationships", "customerRelationships")}</Col>
      </Row>
      <Row>
        <Col md={6}>{renderBlock("Revenue Streams", "revenueStreams")}</Col>
        <Col md={6}>{renderBlock("Key Activities", "keyActivities")}</Col>
      </Row>
      <Row>
        <Col md={6}>{renderBlock("Key Resources", "keyResources")}</Col>
        <Col md={6}>{renderBlock("Key Partners", "keyPartners")}</Col>
      </Row>
      <Row>
        <Col>{renderBlock("Cost Structure", "costStructure")}</Col>
      </Row>
      <Button variant="success" onClick={handleSave}>Salva Canvas</Button>
    </div>
  );
};

export default CustomerCanvas;
