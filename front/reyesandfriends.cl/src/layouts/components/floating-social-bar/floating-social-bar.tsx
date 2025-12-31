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
                className="w-14 h-14 rounded-full bg-gradient-to-br from-green-400 via-green-500 to-green-600 text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center"
              >
                <img
                  src="/img/icons/whatsapp.png"
                  alt="WhatsApp"
                  className="w-7 h-7 pointer-events-none"
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
                className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 via-blue-700 to-blue-900 text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center"
              >
                <FacebookIcon className="w-7 h-7 pointer-events-none text-white" />
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
                className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-400 via-pink-500 to-pink-600 text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center"
              >
                <InstagramIcon className="w-7 h-7 pointer-events-none text-white" />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-14 h-14 rounded-full bg-reyes-secondary hover:bg-reyes-secondary-light text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center"
        title="Abrir redes sociales"
      >
        <Contact className="w-8 h-8 pointer-events-none text-white" />
      </button>
    </div>
  );
}