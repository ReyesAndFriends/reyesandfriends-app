import React, { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedMockups from "./AnimatedMockups";

interface HomeHeroSectionProps {
    title?: string;
    subtitles?: string[];
    description?: string;
    ctaText?: string;
    ctaLink?: string;
    backgroundImage?: string;
    backgroundAlt?: string;
    animationInterval?: number;
    showMockups?: boolean;
}

const HomeHeroSection: React.FC<HomeHeroSectionProps> = ({
    title = "Impulsamos",
    subtitles = [
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
    ],
    description = "¡Transforma tu negocio con tecnología a tu medida!\nCreamos sitios web, plataformas y soluciones digitales innovadoras para que tu empresa crezca y destaque en el mundo digital.",
    ctaText = "Cotiza tu proyecto",
    ctaLink = "/quote-project",
    backgroundImage = "/img/background/background-web.jpg",
    backgroundAlt = "Ilustración de fondo - Edificios",
    animationInterval = 4000,
    showMockups = true
}) => {
    const [currentSubtitleIndex, setCurrentSubtitleIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSubtitleIndex((prevIndex) => 
                (prevIndex + 1) % subtitles.length
            );
        }, animationInterval);

        return () => clearInterval(interval);
    }, [subtitles.length, animationInterval]);

    // Check background from theme system
    const [theme, setTheme] = useState<string>("reyes");

    useEffect(() => {
        const savedTheme = localStorage.getItem("page_theme");
        if (savedTheme) setTheme(savedTheme);
    }, []);

    const heroBackgroundImage =
        theme === "reyes-halloween"
            ? "/img/background/background-halloween.jpg"
            : backgroundImage;

    return (
        <section className="bg-cover bg-center relative min-h-[800px] md:min-h-[800px] flex items-center">
            <div className="absolute inset-0 bg-hero-section z-10"></div>
            <div className="absolute inset-0">
                <img
                    src={heroBackgroundImage}
                    alt={backgroundAlt}  
                    className="w-full h-full object-cover filter grayscale z-0"
                    draggable={false}
                    onContextMenu={e => e.preventDefault()}
                />
            </div>
            <div className="container mx-auto px-4 py-24 relative z-10 flex flex-col md:flex-row items-center justify-center text-center md:text-left flex-1">
                <div className="flex-1 flex flex-col items-center md:items-start justify-center max-w-2xl mx-auto">
                    <h1 className="text-5xl md:text-6xl mb-2 text-white drop-shadow-lg tracking-tight font-semibold">
                        {title}
                    </h1>
                    <h1 className="text-4xl md:text-5xl mb-6 inline-block text-white drop-shadow font-semibold">
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
                                className="text-reyes"
                            >
                                {subtitles[currentSubtitleIndex]}
                            </motion.span>
                        </AnimatePresence>
                    </h1>
                    <div className="mb-8 w-full flex flex-col items-center">
                        <p className="text-2xl text-white drop-shadow-sm">
                            {description.split('\n').map((line, index) => (
                                <React.Fragment key={index}>
                                    {line}
                                    {index < description.split('\n').length - 1 && <br />}
                                </React.Fragment>
                            ))}
                        </p>
                    </div>
                    <div className="flex flex-col gap-4 justify-center md:justify-start">
                        <Link
                            to={ctaLink}
                            className="bg-reyes hover:bg-reyes-dark text-white px-10 py-5 rounded transition-all duration-300 flex items-center gap-4 font-semibold hover:scale-105 text-2xl"
                        >
                            {ctaText}
                            <ChevronRight className="h-7 w-7" />
                        </Link>
                    </div>
                </div>
                {showMockups && (
                    <div className="hidden md:flex flex-1 justify-center items-center ml-8">
                        <AnimatedMockups />
                    </div>
                )}
            </div>
        </section>
    );
};

export default HomeHeroSection;
