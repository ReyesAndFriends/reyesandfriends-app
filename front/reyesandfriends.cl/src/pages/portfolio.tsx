import { Flower } from "lucide-react";
import React from "react";

const Portfolio: React.FC = () => {
    return (
        <>
            <section className="bg-cover bg-center relative min-h-screen flex items-center justify-center">
                <div className="absolute inset-0 bg-hero-section"></div>
                <div className="absolute inset-0">
                    <img
                        src="/img/background/background-web.jpg"
                        alt="fondo de la sección"
                        className="w-full h-full object-cover opacity-5 filter grayscale"
                        draggable={false}
                        onContextMenu={e => e.preventDefault()}
                    />
                </div>
                <div className="relative z-10 flex flex-col items-center text-center">
                    <img
                        src="/img/logo/crown_white.svg"
                        className="w-24 h-24 object-contain mx-auto mb-6"
                        alt="reyes&friends_crown"
                    />
                    <h1 className="text-4xl md:text-5xl mb-4 text-white drop-shadow-lg flex items-center justify-center gap-2 border-b-4 border-red-500 pb-4 inline-block">
                        <Flower className="w-8 h-8" />
                        Algún día habrá rosas aquí...
                    </h1>
                    <p className="text-xl text-red-100 max-w-xl">
                        Esta sección de portafolio está en construcción.<br />
                        Pronto compartiremos nuestros proyectos y logros.<br /><br />
                        ¡Esperen cosas bonitas!
                    </p>
                </div>
            </section>
        </>
    );
};
export default Portfolio;