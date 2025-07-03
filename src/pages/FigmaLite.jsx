import { useRef, useState, useEffect } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";

export default function CanvasEditor() {
   const canvasRef = useRef(null)
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 })
  const [elements, setElements] = useState([]);
  const [selectedTool, setSelectedTool] = useState("rectangle");
  const [selectedColor, setSelectedColor] = useState("#007bff");
  const [selectedFont, setSelectedFont] = useState("Arial");
  const [isDrawing, setIsDrawing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [start, setStart] = useState({ x: 0, y: 0 });
  const [pendingText, setPendingText] = useState(null);
  const [selectedElementIndex, setSelectedElementIndex] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    elements.forEach((el) => {
      ctx.fillStyle = el.color || "#007bff";
      if (el.type === "rectangle") {
        ctx.fillRect(el.x, el.y, el.width, el.height);
      } else if (el.type === "circle") {
        ctx.beginPath();
        ctx.arc(el.x, el.y, el.radius, 0, 2 * Math.PI);
        ctx.fill();
      } else if (el.type === "triangle") {
        ctx.beginPath();
        ctx.moveTo(el.x, el.y);
        ctx.lineTo(el.x + el.width, el.y);
        ctx.lineTo(el.x + el.width / 2, el.y - el.height);
        ctx.closePath();
        ctx.fill();
      } else if (el.type === "text") {
        ctx.fillStyle = el.color || "#000";
        ctx.font = `16px ${el.font || "Arial"}`;
        ctx.fillText(el.text, el.x, el.y);
      }
    });
  }, [elements]);

  const handleMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const index = elements.findIndex((el) => {
      if (el.type === "rectangle") {
        return x >= el.x && x <= el.x + el.width && y >= el.y && y <= el.y + el.height;
      } else if (el.type === "circle") {
        const dx = el.x - x;
        const dy = el.y - y;
        return dx * dx + dy * dy <= el.radius * el.radius;
      } else if (el.type === "text") {
        return x >= el.x && x <= el.x + 100 && y <= el.y && y >= el.y - 16;
      } else if (el.type === "triangle") {
        return x >= el.x && x <= el.x + el.width && y >= el.y - el.height && y <= el.y;
      }
      return false;
    });

    if (index !== -1) {
      setSelectedElementIndex(index);
      setIsDragging(true);
    } else {
      setStart({ x, y });
      setIsDrawing(true);
      setSelectedElementIndex(null);
    }
  };

  const handleMouseUp = (e) => {
    setIsDragging(false);
    setIsDrawing(false);

    const rect = canvasRef.current.getBoundingClientRect();
    const endX = e.clientX - rect.left;
    const endY = e.clientY - rect.top;

    if (pendingText) {
      setElements([
        ...elements,
        {
          type: "text",
          x: endX,
          y: endY,
          text: pendingText,
          color: selectedColor,
          font: selectedFont,
        },
      ]);
      setPendingText(null);
      return;
    }

    if (!isDrawing) return;

    const newElement = (() => {
      if (selectedTool === "rectangle") {
        return {
          type: "rectangle",
          x: start.x,
          y: start.y,
          width: endX - start.x,
          height: endY - start.y,
          color: selectedColor,
        };
      }
      if (selectedTool === "circle") {
        const radius = Math.sqrt(
          Math.pow(endX - start.x, 2) + Math.pow(endY - start.y, 2)
        );
        return {
          type: "circle",
          x: start.x,
          y: start.y,
          radius,
          color: selectedColor,
        };
      }
      if (selectedTool === "triangle") {
        return {
          type: "triangle",
          x: start.x,
          y: start.y,
          width: endX - start.x,
          height: endY - start.y,
          color: selectedColor,
        };
      }
      return null;
    })();

    if (newElement) {
      setElements([...elements, newElement]);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging || selectedElementIndex === null) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setElements((prev) => {
      const updated = [...prev];
      const el = { ...updated[selectedElementIndex] };

      if (el.type === "rectangle" || el.type === "triangle") {
        el.x = x - el.width / 2;
        el.y = y - el.height / 2;
      } else if (el.type === "circle" || el.type === "text") {
        el.x = x;
        el.y = y;
      }

      updated[selectedElementIndex] = el;
      return updated;
    });
  };

  const handleAddText = () => {
    const text = prompt("Inserisci il testo:");
    if (text) setPendingText(text);
  };

  const handleClear = () => setElements([]);
  const handleUndo = () => setElements((prev) => prev.slice(0, -1));

  const handleExport = () => {
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.download = "canvas.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

   useEffect(() => {
    const updateCanvasSize = () => {
      const padding = 32 // ad esempio, padding del container
      setCanvasSize({
        width: window.innerWidth - padding,
        height: window.innerHeight * 0.6, // 60% dell'altezza dello schermo
      })
    }

    updateCanvasSize()
    window.addEventListener('resize', updateCanvasSize)

    return () => window.removeEventListener('resize', updateCanvasSize)
  }, [])
  return (
    <Container fluid className="py-4">
      <h1 className="mb-3">🧱 Figma Lite</h1>
      <Row className="mb-3">
        <Col md="auto">
          <Form.Select
            value={selectedTool}
            onChange={(e) => setSelectedTool(e.target.value)}
          >
            <option value="rectangle">🟥 Rettangolo</option>
            <option value="circle">🟢 Cerchio</option>
            <option value="triangle">🔺 Triangolo</option>
          </Form.Select>
        </Col>
        <Col md="auto">
          <Form.Control
            type="color"
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            title="Scegli il colore"
          />
        </Col>
        <Col md="auto">
          <Form.Select
            value={selectedFont}
            onChange={(e) => setSelectedFont(e.target.value)}
          >
            <option value="Arial">Arial</option>
            <option value="Verdana">Verdana</option>
            <option value="Courier New">Courier New</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Georgia">Georgia</option>
          </Form.Select>
        </Col>
        <Col md="auto">
          <Button onClick={handleAddText} variant="secondary">
            ➕ Aggiungi Testo
          </Button>
        </Col>
        <Col md="auto">
          <Button onClick={handleUndo} variant="warning">
            ↩️ Annulla Ultima
          </Button>
        </Col>
        <Col md="auto">
          <Button onClick={handleClear} variant="danger">
            🗑️ Pulisci Canvas
          </Button>
        </Col>
        <Col md="auto">
          <Button onClick={handleExport} variant="success">
            💾 Esporta
          </Button>
        </Col>
      </Row>
      <canvas
      ref={canvasRef}
      width={canvasSize.width}
      height={canvasSize.height}
      style={{
        width: '100%',
        maxWidth: '100%',
        height: 'auto',
        border: '2px solid #ccc',
        background: '#fff',
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    />
    </Container>
  );
}
