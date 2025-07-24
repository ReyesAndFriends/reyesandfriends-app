import React from 'react';
import { Link } from 'react-router';

const Footer: React.FC = () => {

    return (
        <>
            <footer className="bg-black text-white py-8">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap justify-between">
                        <div className="w-full md:w-1/3 mb-6 md:mb-0">
                            <div className="flex items-center mb-4">
                                <img
                                    src="/img/logo/crown_red.svg"
                                    className="w-10 h-10 object-contain mr-3"
                                    alt="reyes&friends_crown"
                                />
                                <h2 className="text-lg font-bold text-white">Reyes&Friends</h2>
                            </div>
                            <p className="text-sm">
                                Realizando soluciones personalizadas y únicas para tu emprendimiento desde 2025.
                            </p>
                            <p className="text-xs mt-4 text-gray-500">&copy; {new Date().getFullYear()} Reyes&Friends. Todos los derechos reservados.</p>
                        </div>
                        <div className="w-full md:w-1/3 mb-6 md:mb-0">
                            <h3 className="text-md font-semibold text-white mb-4">Enlaces rápidos</h3>
                            <ul className="text-sm space-y-2">
                                <li><Link to="/" className="hover:underline">Inicio</Link></li>
                                <li><Link to="/about" className="hover:underline">Sobre nosotros</Link></li>
                                <li><Link to="/services" className="hover:underline">Servicios</Link></li>
                                <li><Link to="/portfolio" className="hover:underline">Portafolio</Link></li>
                                <li><Link to="/contact" className="hover:underline">Contacto</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;