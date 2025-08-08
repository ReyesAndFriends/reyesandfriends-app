import { Instagram, Mail } from "lucide-react";
import { Link } from "react-router";

export default function FloatingSocialBar() {
  return (
    <div className="fixed top-1/2 right-4 -translate-y-1/2 z-50 flex flex-col space-y-4">
      <Link
        to="https://www.instagram.com/reyesandfriends.cl"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-pink-500 hover:bg-pink-600 text-white p-3 rounded-full shadow-lg transition duration-300"
        title="Visita nuestro Instagram"
      >
        <Instagram className="w-5 h-5" />
      </Link>
      <Link
        to="/contact"
        className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition duration-300"
        title="Contáctanos"
      >
        <Mail className="w-5 h-5" />
      </Link>
    </div>
  );
}
