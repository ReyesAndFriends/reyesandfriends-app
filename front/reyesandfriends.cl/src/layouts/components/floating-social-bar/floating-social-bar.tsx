import { useState } from "react";
import { Link } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Contact, FacebookIcon, InstagramIcon } from "lucide-react";

export default function FloatingSocialBar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-4 left-4 z-40 flex flex-col items-start">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="mb-2 flex flex-col gap-2"
          >
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ delay: 0.05 }}
            >
              <Link
                to="https://wa.me/56982034567?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20sus%20servicios."
                target="_blank"
                rel="noopener noreferrer"
                title="Contáctanos por WhatsApp"
                className="bg-gradient-to-br from-green-400 via-green-500 to-green-600 p-3 rounded-full shadow transition flex items-center border-2 border-white hover:scale-110"
              >
                <img
                  src="/img/icons/whatsapp.png"
                  alt="WhatsApp"
                  className="w-6 h-6 pointer-events-none"
                />
              </Link>
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ delay: 0.12 }}
            >
              <Link
                to="https://www.facebook.com/people/ReyesFriends/61580531925223/"
                target="_blank"
                rel="noopener noreferrer"
                title="Síguenos en Facebook"
                className="bg-gradient-to-br from-blue-500 via-blue-700 to-blue-900 p-3 rounded-full shadow transition flex items-center border-2 border-white hover:scale-110"
              >
                <FacebookIcon className="w-6 h-6 pointer-events-none text-white" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ delay: 0.19 }}
            >
              <Link
                to="https://www.instagram.com/reyesandfriends.cl/"
                target="_blank"
                rel="noopener noreferrer"
                title="Síguenos en Instagram"
                className="bg-gradient-to-br from-pink-400 via-pink-500 to-pink-600 p-3 rounded-full shadow transition flex items-center border-2 border-white hover:scale-110"
              >
                <InstagramIcon className="w-6 h-6 pointer-events-none text-white" />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="bg-reyes hover:bg-reyes-light p-4 rounded-full shadow-xl transition duration-300 flex items-center justify-center border-4 border-white hover:scale-110 hover:rotate-6"
        title="Abrir redes sociales"
      >
        <Contact className="w-8 h-8 pointer-events-none text-white" />
      </button>
    </div>
  );
}