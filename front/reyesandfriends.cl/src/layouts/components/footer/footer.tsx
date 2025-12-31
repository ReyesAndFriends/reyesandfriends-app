import React from 'react';
import { Link } from 'react-router';
import { usePageTheme } from '../../../hooks/theme/usePageTheme';
import { Copyright } from 'lucide-react';

const Footer: React.FC = () => {
    const { theme, setTheme, validThemes } = usePageTheme();

    // Show switch only if there's a holiday theme available
    const showThemeSwitch = validThemes.length > 1;

    return (
        <>
            <footer className="bg-black text-white py-8">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-stretch">
                        <div className="w-full md:w-1/3 mb-6 md:mb-0 flex flex-col justify-center">
                            <div className="flex items-center mb-4">
                                <img
                                    src="/img/logo/logo_white_2.svg"
                                    className="w-36 object-contain mr-4 pointer-events-none"
                                    alt="Logo de Reyes&Friends"
                                />
                            </div>
                            <p className="text-sm">
                                Realizando soluciones personalizadas y únicas para tu emprendimiento desde 2025.
                            </p>
                            <p className="text-xs mt-4 text-gray-500">
                                <Copyright className="inline mr-1" size={14} /> {new Date().getFullYear()} Reyes&Friends. Todos los derechos reservados.
                            </p>
                        </div>
                        <div className="w-full md:w-1/3 mb-6 md:mb-0 flex flex-col justify-center items-center">
                            <h3 className="text-md font-semibold text-white mb-4">Enlaces rápidos</h3>
                            <ul className="text-sm space-y-2">
                                <li><Link to="/" className="hover:underline">Inicio</Link></li>
                                <li><Link to="/about" className="hover:underline">Sobre nosotros</Link></li>
                                <li><Link to="/services" className="hover:underline">Servicios</Link></li>
                                <li><Link to="/portfolio" className="hover:underline">Portafolio</Link></li>
                                <li><Link to="/contact" className="hover:underline">Contacto</Link></li>
                            </ul>
                        </div>
                        {showThemeSwitch && validThemes.length === 2 && (
                            <div className="w-full md:w-1/3 flex flex-col md:justify-end md:items-end items-center mt-6 md:mt-0">
                                <span className="text-xs text-gray-400 mr-3">Tema actual:</span>
                                <label className="flex items-center cursor-pointer space-x-3">
                                    <div className="flex items-center">
                                        <div className="relative">
                                            <input
                                                type="checkbox"
                                                checked={theme === validThemes[1]}
                                                onChange={() => setTheme(theme === validThemes[0] ? validThemes[1] : validThemes[0])}
                                                className="sr-only"
                                            />
                                            <div className="w-10 h-5 bg-gray-700 rounded-full p-1 flex items-center transition">
                                                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${theme === validThemes[1] ? 'translate-x-5' : ''}`}></div>
                                            </div>
                                        </div>
                                    </div>
                                    <span className="ml-2 text-xs font-semibold text-reyes-light">
                                        {theme === 'reyes' ? 'Reyes&Friends' : theme === 'reyes-halloween' ? 'Halloween' : theme === 'reyes-christmas' ? 'Navidad' : theme}
                                    </span>
                                </label>
                            </div>
                        )}
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;