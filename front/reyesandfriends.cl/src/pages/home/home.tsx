import React, { useEffect, useState } from "react";
import { ChevronRight, } from "lucide-react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import TerminalMessage from "./components/TerminalMessage";
import MethodologySteps from "./components/MethodologySteps";
import WhyChooseReyesAndFriends from "./components/WhyChooseReyesAndFriends";
import { Helmet } from "react-helmet-async";

const Home: React.FC = () => {

    const subtitles = [
        "tu crecimiento digital",
        "tu éxito en línea",
        "tu presencia web",
        "tu transformación digital",
        "tu innovación tecnológica",
        "tu futuro digital",
        "tu negocio en la nube",
        "tu solución tecnológica",
        "tu plataforma digital",
        "tu estrategia en línea",
        "tu imperio digital",
        "tu marca en línea",
        "tu proyecto web",
        "tu sueño digital",
    ];

    const [currentSubtitleIndex, setCurrentSubtitleIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSubtitleIndex((prevIndex) => 
                (prevIndex + 1) % subtitles.length
            );
        }, 4000);

        return () => clearInterval(interval);
    }, [subtitles.length]);
    
    return (
        <>
            <Helmet>
                <title>Inicio | Reyes&Friends</title>
                <meta
                    name="description"
                    content="Bienvenido a Reyes&Friends, tu aliado en soluciones digitales personalizadas."
                />
                <meta property="og:title" content="Inicio | Reyes&Friends" />
                <meta property="og:description" content="Bienvenido a Reyes&Friends, tu aliado en soluciones digitales personalizadas." />
                <meta property="og:image" content="/img/open-graph-images/default-style.png" />
                <meta property="og:type" content="website" />

                <meta name="twitter:title" content="Inicio | Reyes&Friends" />
                <meta name="twitter:description" content="Bienvenido a Reyes&Friends, tu aliado en soluciones digitales personalizadas." />
                <meta name="twitter:image" content="/img/open-graph-images/default-style.png" />
            </Helmet>
            
            <section className="bg-cover bg-center relative min-h-[800px] md:min-h-[800px] flex items-center">
                <div className="absolute inset-0 bg-hero-section z-10"></div>
                <div className="absolute inset-0">
                    <img
                        src="/img/background/background-web.jpg"
                        alt="Ilustración de fondo - Edificios"  
                        className="w-full h-full object-cover filter grayscale z-0"
                        draggable={false}
                        onContextMenu={e => e.preventDefault()}
                    />
                </div>
                <div className="container mx-auto px-4 py-24 relative z-10 flex flex-col md:flex-row items-center justify-center text-center md:text-left flex-1">
                    <div className="flex-1 flex flex-col items-center md:items-start justify-center max-w-2xl mx-auto">
                        <h1 className="text-5xl md:text-6xl mb-2 text-white drop-shadow-lg tracking-tight">
                            Impulsamos
                        </h1>
                        <h1 className="text-4xl md:text-5xl mb-6 inline-block text-white drop-shadow">
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.span
                                    key={subtitles[currentSubtitleIndex]}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ 
                                        duration: 0.3,
                                        ease: "easeInOut"
                                    }}
                                    className="text-red-600"
                                >
                                    {subtitles[currentSubtitleIndex]}
                                </motion.span>
                            </AnimatePresence>
                        </h1>
                        <div className="mb-8 w-full flex flex-col items-center">
                            <p className="text-2xl text-white drop-shadow-sm">
                                ¡Transforma tu negocio con tecnología a tu medida!<br />
                                Creamos sitios web, plataformas y soluciones digitales innovadoras para que tu empresa crezca y destaque en el mundo digital.
                            </p>
                        </div>
                        <div className="flex flex-col gap-4 justify-center md:justify-start">
                            <Link
                                to="/quote-project"
                                className="bg-red-700 hover:bg-red-800 text-white px-10 py-5 rounded transition-all duration-300 flex items-center gap-4 font-semibold hover:scale-105 text-2xl"
                            >
                                Trabajemos juntos
                                <ChevronRight className="h-7 w-7" />
                            </Link>
                        </div>
                    </div>
                    <div className="hidden md:flex flex-1 justify-center items-center ml-8">
                        <img
                            src="/img/home/laptop-mockup.png"
                            alt="Mockup laptop"
                            className="max-w-md md:max-w-lg lg:max-w-xl w-full h-auto drop-shadow-2xl"
                            draggable={false}
                            onContextMenu={e => e.preventDefault()}
                        />
                    </div>
                </div>
            </section>

            <section className="py-16 bg-zinc-900 text-white">
                <div className="container mx-auto px-4 max-w-7xl">
                    <h2 className="text-3xl mb-12 text-center text-red-600 relative">
                        <span className="bg-zinc-900 px-4 relative z-10 text-white">¿Qué hacemos?</span>
                        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-red-600/50 -z-0"></div>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h4 className="text-lg text-red-500 mb-2">Un negocio informático a tu medida</h4>
                            <h2 className="text-4xl mb-4 text-white">Soluciones digitales personalizadas</h2>
                            <p className="text-gray-300 text-lg">
                                Somos un negocio informático con múltiples aptitudes. Nos especializamos en el desarrollo de soluciones digitales personalizadas, abarcando desde sitios web hasta software empresarial y servicios tecnológicos adaptados a las necesidades de cada cliente.
                            </p>
                            <p className="text-gray-300 text-lg mt-4">
                                Haz frente a tu negocio con nuestra experiencia y dedicación. Nos enfocamos en ofrecer soluciones innovadoras que impulsen tu crecimiento digital y mejoren la eficiencia de tus operaciones.
                            </p>
                        </div>
                        <div className="flex justify-center items-center min-h-[200px]">
                            <TerminalMessage />
                        </div>
                    </div>
                    <div className="text-left mt-8">
                        <Link
                            to="/services"
                            className="text-red-500 hover:underline font-semibold inline-flex items-center gap-1 transition-colors"
                        >
                            Conoce todos nuestros servicios
                            <ChevronRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-zinc-900 text-white">
                <div className="container mx-auto px-4 max-w-7xl">
                    <h2 className="text-3xl mb-12 text-center text-red-600 relative">
                        <span className="bg-zinc-900 px-4 relative z-10 text-white">Nuestra metodología</span>
                        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-red-600/50 -z-0"></div>
                    </h2>

                    <div className="text-center mt-8 mb-12">
                        <p className="text-lg text-gray-300 mb-4">
                            Para garantizar una experiencia de trabajo fluida y satisfactoria, seguimos una metodología ágil que nos permite adaptarnos a tus necesidades y ofrecer resultados de alta calidad. Nuestro proceso se basa en los siguientes pasos:
                        </p>
                    </div>

                    <MethodologySteps />

                </div>
            </section>

            <WhyChooseReyesAndFriends />

        </>
    );
};

export default Home;