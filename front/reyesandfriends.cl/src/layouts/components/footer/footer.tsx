import React from 'react';
import { useContactLinkValidator } from '../../../helpers/ContactLinkValidator/useContactLinkValidator';
import RouterContactModal from '../../../helpers/routerContactModal/routerContactModal';

const Footer: React.FC = () => {
    const {
        isModalOpen,
        handleLinkClick,
        confirmNavigation,
        cancelNavigation
    } = useContactLinkValidator();

    return (
        <>
            <footer className="bg-black text-white py-8">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap justify-between">
                        <div className="w-full md:w-1/3 mb-6 md:mb-0">
                            <h2 className="text-lg font-bold text-white mb-4">Reyes&Friends.cl</h2>
                            <p className="text-sm">
                                Realizando soluciones personalizadas y únicas para tu emprendimiento desde 2024.
                            </p>
                            <p className="text-xs mt-4 text-gray-500">&copy; {new Date().getFullYear()} Reyes&Friends. Todos los derechos reservados.</p>
                        </div>
                        <div className="w-full md:w-1/3 mb-6 md:mb-0">
                            <h3 className="text-md font-semibold text-white mb-4">Enlaces rápidos</h3>
                            <ul className="text-sm space-y-2">
                                <li><button onClick={() => handleLinkClick("/")} className="hover:underline">Inicio</button></li>
                                <li><button onClick={() => handleLinkClick("/about")} className="hover:underline">Sobre nosotros</button></li>
                                <li><button onClick={() => handleLinkClick("/services")} className="hover:underline">Servicios</button></li>
                                <li><button onClick={() => handleLinkClick("/portfolio")} className="hover:underline">Portafolio</button></li>
                                <li><button onClick={() => handleLinkClick("/contact")} className="hover:underline">Contacto</button></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
            {isModalOpen && (
                <RouterContactModal
                    onConfirm={confirmNavigation}
                    onCancel={cancelNavigation}
                />
            )}
        </>
    );
};

export default Footer;