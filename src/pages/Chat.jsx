import { useState, useEffect, useRef } from "react";
import {
  Container,
  Form,
  Button,
  Spinner,
  Card,
  Row,
  Col,
} from "react-bootstrap";
const suggestionsMap = {
  prezzo: ["Quanto costa?", "Qual è il prezzo?", "Costo abbonamento?"],
  supporto: ["Ho bisogno di aiuto", "Serve supporto tecnico"],
  template: ["Voglio vedere i template", "Si possono modificare i modelli?"],
};

const exactSuggestionReplies = {
  // PREZZO
  "quanto costa?": "💰 Il costo parte da €9,99 al mese, tutto incluso. Vuoi vedere i piani?",
  "qual è il prezzo?": "📊 Il prezzo varia a seconda del piano scelto: Basic, Pro o Premium.",
  "costo abbonamento?": "🧾 L'abbonamento ha 3 fasce: mensile, trimestrale e annuale. Vuoi i dettagli?",

  // SUPPORTO
  "ho bisogno di aiuto": "🙋 Dimmi pure in cosa posso aiutarti, sono qui per te!",
  "serve supporto tecnico": "🛠️ Nessun problema. Qual è il problema tecnico che stai riscontrando?",

  // TEMPLATE
  "voglio vedere i template": "🎨 Vai alla pagina TEMPLATE per una selezione dei nostri template più usati.",
  "si possono modificare i modelli?": "✏️ Certo! Ogni modello è completamente personalizzabile, anche nei colori e font.",
};

function getBotReply(message) {
  const msg = message.toLowerCase().trim();

  if (exactSuggestionReplies[msg]) {
    return {
      text: exactSuggestionReplies[msg],
    };
  }

  if (
    msg.includes("ciao") ||
    msg.includes("salve") ||
    msg.includes("buongiorno") ||
    msg.includes("buonasera") ||
    msg.includes("hi") ||
    msg.includes("hello") ||
    msg.includes("hey")
  ) {
    return {
      text:
        "Ciao! 😊 Come posso aiutarti oggi? Puoi chiedermi informazioni sui servizi, prezzi, template o qualsiasi altra cosa.",
    };
  } else if (
    msg.includes("prezzo") ||
    msg.includes("costo") ||
    msg.includes("tariffa") ||
    msg.includes("quanto costa") ||
    msg.includes("prezzi") ||
    msg.includes("quanto si paga") ||
    msg.includes("abbonamento")
  ) {
    return {
      text:
        "💸 Il nostro servizio parte da soli €9,99 al mese, con diversi piani flessibili. Vuoi vedere i dettagli?",
      suggestions: suggestionsMap.prezzo,
    };
  } else if (
    msg.includes("aiuto") ||
    msg.includes("supporto") ||
    msg.includes("problema") ||
    msg.includes("errore") ||
    msg.includes("non funziona") ||
    msg.includes("assistenza") ||
    msg.includes("help")
  ) {
    return {
      text:
        "🛟 Certo! Sono qui per aiutarti. Puoi spiegarmi meglio il problema o su cosa hai bisogno di supporto?",
      suggestions: suggestionsMap.supporto,
    };
  } else if (
    msg.includes("template") ||
    msg.includes("modello") ||
    msg.includes("modelli") ||
    msg.includes("templates") ||
    msg.includes("design") ||
    msg.includes("layout")
  ) {
    return {
      text:
        "🎨 Offriamo diversi template professionali e moderni. Vuoi vedere qualche esempio?",
      suggestions: suggestionsMap.template,
    };
  } else if (
    msg.includes("prodotto") ||
    msg.includes("prodotti") ||
    msg.includes("catalogo") ||
    msg.includes("articoli") ||
    msg.includes("offerta") ||
    msg.includes("disponibilità") ||
    msg.includes("disponibilita")
  ) {
    return {
      text:
        "🛍️ Puoi consultare il nostro catalogo prodotti aggiornato sul sito. Vuoi che ti mostri le ultime novità qui?",
    };
  } else if (
    msg.includes("team") ||
    msg.includes("staff") ||
    msg.includes("persone") ||
    msg.includes("chi siete") ||
    msg.includes("azienda")
  ) {
    return {
      text:
        "👩‍💻 Siamo un team appassionato di designer, sviluppatori e creativi. Vuoi sapere di più sulla nostra storia?",
    };
  } else if (
    msg.includes("contact") ||
    msg.includes("contatto") ||
    msg.includes("email") ||
    msg.includes("telefono") ||
    msg.includes("scrivere")
  ) {
    return {
      text:
        "📬 Puoi contattarci via email a support@example.com oppure telefonicamente al +39 123 456 789.",
    };
  } else if (
    msg.includes("lavora con noi") ||
    msg.includes("posizioni aperte") ||
    msg.includes("collaborazione") ||
    msg.includes("career") ||
    msg.includes("careers") ||
    msg.includes("job")
  ) {
    return {
      text:
        "💼 Siamo sempre alla ricerca di persone talentuose! Visita la nostra pagina Lavora con noi o inviaci una candidatura spontanea.",
    };
  } else if (
    msg.includes("blog") ||
    msg.includes("news") ||
    msg.includes("novità") ||
    msg.includes("novita") ||
    msg.includes("aggiornamenti")
  ) {
    return {
      text:
        "📰 Pubblichiamo aggiornamenti regolari nella sezione Blog. Vuoi che ti mostri l’ultimo articolo?",
    };
  } else {
    return {
      text:
        "🤔 Mi dispiace, non ho capito bene. Prova a chiedermi di prezzi, template, supporto, prodotti o altro.",
    };
  }
}



export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const stored = localStorage.getItem("chatHistory");
    if (stored) setMessages(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(messages));
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e, optionalText) => {
    e?.preventDefault();
    const text = (optionalText ?? input).trim();
    if (!text) return;

    const userMessage = { sender: "user", text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setThinking(true);

    setTimeout(() => {
      const { text: replyText, suggestions } = getBotReply(text);
      const botMessage = { sender: "bot", text: replyText, suggestions };
      setMessages((prev) => [...prev, botMessage]);
      setThinking(false);
    }, 1000);
  };


  const clearHistory = () => {
    localStorage.removeItem("chatHistory");
    setMessages([]);
  };

  return (
    <Container fluid="md" className="p-4">
      <Card className="shadow-lg">
        <Card.Body>
          <Row className="align-items-center justify-content-between mb-3">
            <Col>
              <h3 className="text-primary mb-0">💬 Assistente Virtuale</h3>
            </Col>
            <Col className="text-end">
              <Button variant="outline-danger" size="sm" onClick={clearHistory}>
                🗑 Cancella cronologia
              </Button>
            </Col>
          </Row>

          <div
            className="mb-3 px-2"
            style={{
              maxHeight: "55vh",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-4 shadow-sm ${msg.sender === "user"
                  ? "bg-primary text-white align-self-end"
                  : "bg-light text-dark align-self-start"
                  }`}
                style={{ maxWidth: "70%", whiteSpace: "pre-wrap" }}
              >
                {msg.text}
                {msg.suggestions && (
                  <div className="mt-2 d-flex flex-wrap gap-2">
                    {msg.suggestions.map((sugg, i) => (
                      <Button
                        key={i}
                        size="sm"
                        variant="outline-secondary"
                        onClick={(e) => handleSend(e, sugg)}
                      >
                        {sugg}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {thinking && (
              <div className="align-self-start d-flex align-items-center gap-2">
                <Spinner animation="grow" size="sm" />
                Sto pensando...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <Form onSubmit={handleSend} className="d-flex gap-2">
            <Form.Control
              type="text"
              placeholder="Scrivi un messaggio..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button type="submit" variant="primary">
              Invia
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
