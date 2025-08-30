import { Link } from "react-router";

export default function FloatingSocialBar() {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col">
      <Link
        to="https://wa.me/56982034567?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20sus%20servicios."
        target="_blank"
        rel="noopener noreferrer"
        title="Contáctanos por WhatsApp"
        className="bg-gradient-to-br from-green-400 via-green-500 to-green-600 p-4 rounded-full shadow-xl transition duration-300 flex items-center justify-center border-4 border-white hover:scale-110 hover:rotate-6"
      >
        <img
          src="/img/icons/whatsapp.png"
          alt="WhatsApp"
          className="w-10 h-10 pointer-events-none"
        />
      </Link>
    </div>
  );
}