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
                                    className="w-12 h-12 object-contain mr-4 pointer-events-none"
                                    alt="reyes&friends_crown"
                                />
                                <div className="flex flex-col">
                                    <span className="text-2xl font-semibold text-white tracking-wider leading-none">REYES</span>
                                    <span className="text-base text-white leading-none">&FRIENDS</span>
                                </div>
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