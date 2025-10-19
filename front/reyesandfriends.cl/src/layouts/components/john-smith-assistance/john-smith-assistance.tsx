import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const ENABLE_JOHN_SMITH = import.meta.env.VITE_ENABLE_JOHN_SMITH_ASSISTANCE === "true";

function JohnSmithAssistance() {

  if (!ENABLE_JOHN_SMITH) return null;

  const [open, setOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);

  const [messages, setMessages] = useState([
    {
      from: "assistant",
      text: "¡Saludos! ¿En qué puedo ayudarte hoy?",
    },
  ]);
  const [step, setStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  const options = [
    {
      label: "Tengo una pregunta sobre mi pedido",
      response:
        "¡Por supuesto! Por favor, proporciona tu número de pedido y te ayudaré con la información.",
    },
    {
      label: "Quiero contactar soporte",
      response:
        "Puedes contactar a nuestro equipo de soporte enviando un correo a soporte@reyesandfriends.cl o llamando al +56 9 1234 5678.",
    },
    {
      label: "Solo estoy explorando",
      response:
        "¡Genial! Si tienes alguna pregunta sobre nuestros servicios o productos, no dudes en consultarme.",
    },
  ];

  const handleButtonClick = () => {
    setOpen((prev) => {
      if (!prev && !hasOpened) setHasOpened(true);
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

  const handleOptionClick = (optionIdx: number) => {
    const userMsg = { from: "user", text: options[optionIdx].label };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);
    setStep(1);

    setTimeout(() => {
      const assistantMsg = { from: "assistant", text: options[optionIdx].response };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 1200);
  };

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
                className="w-16 h-16 rounded-full border-2 border-white shadow-lg pointer-events-none"
              />
              {!open && !hasOpened && (
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
                  className="w-10 h-10 rounded-full border pointer-events-none"
                />
                <div>
                  <div className="font-semibold text-gray-800">John Smith</div>
                  <div className="text-xs text-gray-600 font-medium">
                    Asistente virtual
                  </div>
                </div>
              </div>

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
                      {msg.text}
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

              {step === 0 && !isTyping && (
                <div className="flex flex-col gap-2 mt-2">
                  {options.map((opt, idx) => (
                    <motion.button
                      key={opt.label}
                      className="bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg px-3 py-2 text-left text-sm transition"
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleOptionClick(idx)}
                    >
                      {opt.label}
                    </motion.button>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default JohnSmithAssistance;