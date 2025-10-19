import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { marked } from "marked";
import "./john-smith-assistance.css";

const ENABLE_JOHN_SMITH = import.meta.env.VITE_ENABLE_JOHN_SMITH_ASSISTANCE === "true";
const JOHN_SMITH_WS_URL = import.meta.env.VITE_JOHN_SMITH_WS_URL || null;

function JohnSmithAssistance() {
  const [open, setOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(() => {
    return sessionStorage.getItem("john-smith-has-opened") === "true";
  });

  const [messages, setMessages] = useState([
    {
      from: "assistant",
      text: "¡Saludos! ¿En qué puedo ayudarte hoy?",
    },
  ]);
  const [step, setStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  const [inputValue, setInputValue] = useState("");
  const wsRef = useRef<WebSocket | null>(null);
  const botBufferRef = useRef("");
  const botTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [wsConnected, setWsConnected] = useState(false);
  const [wsFailed, setWsFailed] = useState(false);
  const [wsConnecting, setWsConnecting] = useState(true);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const options = [
    {
      label: "Que tipo de servicios ofreces?",
    },
    {
      label: "Quiero cotizar un proyecto con ustedes",
    },
    {
      label: "Necesito asesoría para mi proyecto",
    },
    {
      label: "Solo estoy explorando",
    },
  ];

  useEffect(() => {
    if (!JOHN_SMITH_WS_URL) return;
    setWsConnecting(true);
    let ws = new WebSocket(JOHN_SMITH_WS_URL);
    wsRef.current = ws;

    ws.onopen = () => {
      setWsConnected(true);
      setWsFailed(false);
      setWsConnecting(false);
      if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
    };
    ws.onclose = () => {
      setWsConnected(false);
      setWsConnecting(false);
      if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = setTimeout(() => {
        setWsFailed(true);
      }, 4000);
    };
    ws.onerror = () => {
      setWsConnected(false);
      setWsConnecting(false);
      if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = setTimeout(() => {
        setWsFailed(true);
      }, 4000);
    };

    ws.onmessage = (event) => {

      if (botBufferRef.current === "") startTypingAnimation();
      botBufferRef.current += event.data;

      if (event.data.includes("__END__")) {
        let msg = botBufferRef.current.replace(/__END__/g, "").trim();
        stopTypingAnimation();
        if (msg) {
          setMessages((prev) => [...prev, { from: "assistant", text: msg }]);
        }
        botBufferRef.current = "";
        if (botTimeoutRef.current) clearTimeout(botTimeoutRef.current);
        botTimeoutRef.current = null;
      } else {
        if (botTimeoutRef.current) clearTimeout(botTimeoutRef.current);
        botTimeoutRef.current = setTimeout(() => {
          let msg = botBufferRef.current.trim();
          stopTypingAnimation();
          if (msg) {
            setMessages((prev) => [...prev, { from: "assistant", text: msg }]);
          }
          botBufferRef.current = "";
        }, 1200);
      }
    };

    return () => {
      ws.close();
      if (botTimeoutRef.current) clearTimeout(botTimeoutRef.current);
      if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
      if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
    };
  }, [JOHN_SMITH_WS_URL]);

  function startTypingAnimation() {
    setIsTyping(true);
    let dots = 0;
    typingIntervalRef.current = setInterval(() => {
      dots = (dots + 1) % 4;
    }, 500);
  }
  function stopTypingAnimation() {
    setIsTyping(false);
    if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
  }

  const handleSendMessage = () => {
    const text = inputValue.trim();
    if (!text) return;
    if (isTyping) return;
    setMessages((prev) => [...prev, { from: "user", text }]);
    setInputValue("");
    if (wsRef.current && wsConnected) {
      wsRef.current.send(text);
      setStep(1);
    }
  };

  const handleOptionClick = (optionIdx: number) => {
    if (!wsConnected || wsFailed) return;
    if (isTyping) return;
    const userMsg = { from: "user", text: options[optionIdx].label };
    setMessages((prev) => [...prev, userMsg]);
    setStep(1);
    if (wsRef.current && wsConnected) {
      wsRef.current.send(options[optionIdx].label);
    }
  };

  const handleButtonClick = () => {
    setOpen((prev) => {
      if (!prev && !hasOpened) {
        setHasOpened(true);
        sessionStorage.setItem("john-smith-has-opened", "true");
      }
      return !prev;
    });

    if (open) {
      setMessages([
        {
          from: "assistant",
          text: "¡Saludos! ¿En qué puedo ayudarte hoy?",
        },
      ]);
      setStep(0);
    }
  };

  const handleRetryConnection = () => {
    setWsFailed(false);
    setWsConnected(false);
    setWsConnecting(true);
    if (wsRef.current) wsRef.current.close();
    let ws = new WebSocket(JOHN_SMITH_WS_URL);
    wsRef.current = ws;
    ws.onopen = () => {
      setWsConnected(true);
      setWsFailed(false);
      setWsConnecting(false);
      if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
    };
    ws.onclose = () => {
      setWsConnected(false);
      setWsConnecting(false);
      if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = setTimeout(() => {
        setWsFailed(true);
      }, 4000);
    };
    ws.onerror = () => {
      setWsConnected(false);
      setWsConnecting(false);
      if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = setTimeout(() => {
        setWsFailed(true);
      }, 4000);
    };
    ws.onmessage = (event) => {
      if (botBufferRef.current === "") startTypingAnimation();
      botBufferRef.current += event.data;

      if (event.data.includes("__END__")) {
        let msg = botBufferRef.current.replace(/__END__/g, "").trim();
        stopTypingAnimation();
        if (msg) {
          setMessages((prev) => [...prev, { from: "assistant", text: msg }]);
        }
        botBufferRef.current = "";
        if (botTimeoutRef.current) clearTimeout(botTimeoutRef.current);
        botTimeoutRef.current = null;
      } else {
        if (botTimeoutRef.current) clearTimeout(botTimeoutRef.current);
        botTimeoutRef.current = setTimeout(() => {
          let msg = botBufferRef.current.trim();
          stopTypingAnimation();
          if (msg) {
            setMessages((prev) => [...prev, { from: "assistant", text: msg }]);
          }
          botBufferRef.current = "";
        }, 1200);
      }
    };
  };

  function renderMarkdown(text: string) {
    return { __html: marked.parse(text) };
  }

  if (!ENABLE_JOHN_SMITH) return null;

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        <AnimatePresence>
          {!open && (
            <motion.button
              key="john-smith-avatar"
              className="relative focus:outline-none"
              onClick={handleButtonClick}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.25 }}
              style={{ zIndex: 10 }}
            >
              <img
                src="/img/icons/john-smith-profile.png"
                alt="John Smith"
                className={`w-16 h-16 rounded-full border-2 border-white shadow-lg pointer-events-none ${(!wsConnected || wsConnecting || wsFailed) ? "grayscale" : ""}`}
              />

              {wsConnected && !open && !hasOpened && !wsConnecting && !wsFailed && (
                <>
                  <span className="absolute top-0 right-0 block h-4 w-4 rounded-full ring-2 ring-white bg-red-500 animate-ping"></span>
                  <span className="absolute top-0 right-0 block h-4 w-4 rounded-full ring-2 ring-white bg-red-500"></span>
                </>
              )}
            </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {open && (
            <motion.div
              key="john-smith-panel"
              initial={{ opacity: 0, scale: 0.8, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 40 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="mb-4 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 animate-fade-in flex flex-col gap-3 absolute bottom-0 right-0"
              style={{ zIndex: 20 }}
            >
              <button
                className="absolute -top-4 -right-4 bg-white rounded-full shadow p-2 z-10 hover:bg-gray-100 transition"
                onClick={handleButtonClick}
                aria-label="Cerrar chat"
              >
                <X className="text-gray-500 w-4 h-4" />
              </button>

              <div className="flex items-center gap-3 mb-2">
                <img
                  src="/img/icons/john-smith-profile.png"
                  alt="John Smith"
                  className={`w-10 h-10 rounded-full border pointer-events-none ${(!wsConnected || wsConnecting || wsFailed) ? "grayscale" : ""}`}
                />
                <div>
                  <div className="font-semibold text-gray-800">John Smith</div>
                  <div className="text-xs text-gray-600 font-medium">
                    Asistente virtual
                  </div>
                </div>
              </div>

              {wsConnecting && !wsFailed ? (
                <div className="flex flex-col items-center gap-3 mt-8 mb-8">
                  <div className="text-center text-gray-500 text-sm">
                    <span className="block font-semibold mb-2">Conectando con John Smith...</span>
                    <span className="block">Por favor espera un momento.</span>
                  </div>
                  <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mt-2"></div>
                </div>
              ) : wsFailed ? (
                <div className="flex flex-col items-center gap-3 mt-6 mb-6">
                  <div className="text-center text-gray-500 text-sm">
                    <span className="block font-semibold mb-2">John Smith no se encuentra en línea para ayudarnos en estos momentos.</span>
                    <span className="block">Puedes intentar reconectar en unos segundos.</span>
                  </div>
                  <button
                    className="bg-blue-500 text-white rounded-lg px-4 py-2 text-sm"
                    onClick={handleRetryConnection}
                  >
                    Reintentar conexión
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex flex-col gap-2 max-h-64 overflow-y-auto mb-2">
                    {messages.map((msg, idx) =>
                      msg.from === "assistant" ? (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="bg-gray-100 rounded-lg p-3 text-gray-700 text-sm self-start max-w-[85%]"
                        >
                          <span
                            className="johnsmith-markdown"
                            dangerouslySetInnerHTML={renderMarkdown(msg.text)}
                          />
                        </motion.div>
                      ) : (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="bg-blue-500 text-white rounded-lg p-3 text-sm self-end max-w-[85%]"
                        >
                          {msg.text}
                        </motion.div>
                      )
                    )}

                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-gray-100 rounded-lg p-3 text-gray-700 text-sm self-start max-w-[85%] flex items-center gap-2"
                      >
                        <span className="inline-block w-2 h-2 bg-gray-400 rounded-full animate-bounce mr-1" style={{ animationDelay: "0s" }}></span>
                        <span className="inline-block w-2 h-2 bg-gray-400 rounded-full animate-bounce mr-1" style={{ animationDelay: "0.2s" }}></span>
                        <span className="inline-block w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></span>
                        <span className="ml-2 text-xs text-gray-500">Escribiendo...</span>
                      </motion.div>
                    )}
                  </div>

                  <div className="flex gap-2 mt-2">
                    <input
                      className="flex-1 border rounded-lg px-3 py-2 text-sm disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                      type="text"
                      placeholder="Escribe tu mensaje..."
                      value={inputValue}
                      onChange={e => setInputValue(e.target.value)}
                      onKeyDown={e => { if (e.key === "Enter") handleSendMessage(); }}
                      disabled={!wsConnected || wsFailed || isTyping}
                    />
                    <button
                      className="bg-red-600 hover:bg-red-700 transition text-white rounded-lg px-4 py-2 text-sm disabled:bg-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed"
                      onClick={handleSendMessage}
                      disabled={!wsConnected || wsFailed || isTyping}
                    >
                      Enviar
                    </button>
                  </div>

                  {step === 0 && !isTyping && (
                    <div className="flex flex-col gap-2 mt-2">
                      {options.map((opt, idx) => (
                        <motion.button
                          key={opt.label}
                          className="bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg px-3 py-2 text-left text-sm transition disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                          whileTap={{ scale: 0.97 }}
                          onClick={() => handleOptionClick(idx)}
                          disabled={!wsConnected || wsFailed || isTyping}
                        >
                          {opt.label}
                        </motion.button>
                      ))}
                    </div>
                  )}

                  <div className="text-xs text-gray-400 mt-2 flex items-center gap-2">
                    {wsConnected ? (
                      <>
                        <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
                        Conectado a John Smith
                      </>
                    ) : (
                      "Conectando..."
                    )}
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default JohnSmithAssistance;