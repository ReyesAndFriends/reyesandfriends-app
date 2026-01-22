import React, { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
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
    title = "Desarrollamos",

    subtitles = [
        "tu sitio web ideal",
        "tu plataforma personalizada",
        "tu solución digital innovadora",
        "tu presencia en línea",
        "tu negocio digital exitoso",
        "tu futuro tecnológico",
        "lo que tu empresa necesita",
        "tu crecimiento en línea"
    ],

    description = "¡Transforma tu negocio con tecnología a tu medida!\nCreamos sitios web, plataformas y soluciones digitales innovadoras para que tu empresa crezca y destaque en el mundo digital.",
    ctaText = "Cotiza tu plan",
    ctaLink = "/web-planes",
    backgroundImage = "/img/background/background-web.jpg",
    backgroundAlt = "Ilustración de fondo - Edificios",
    animationInterval = 4000,
    showMockups = true
}) => {
    const [currentSubtitleIndex, setCurrentSubtitleIndex] = useState(0);
    // Typewriter states
    const [displayedText, setDisplayedText] = useState(subtitles[0]);
    const [isDeleting, setIsDeleting] = useState(false);
    const [typeSpeed, setTypeSpeed] = useState(45);

    useEffect(() => {
        let typingTimeout: NodeJS.Timeout;

        const currentFullText = subtitles[currentSubtitleIndex];

        if (isDeleting) {
            typingTimeout = setTimeout(() => {
                setDisplayedText(prev => prev.slice(0, -1));
            }, typeSpeed / 2);
        } else {
            typingTimeout = setTimeout(() => {
                setDisplayedText(prev => currentFullText.slice(0, prev.length + 1));
            }, typeSpeed);
        }

        // When finishes typing, wait and start deleting
        if (!isDeleting && displayedText === currentFullText) {
            typingTimeout = setTimeout(() => setIsDeleting(true), animationInterval - 1000);
        }
        // When finishes deleting, go to the next subtitle and start typing
        if (isDeleting && displayedText === "") {
            setIsDeleting(false);
            setCurrentSubtitleIndex((prev) => (prev + 1) % subtitles.length);
        }

        return () => clearTimeout(typingTimeout);
    }, [displayedText, isDeleting, currentSubtitleIndex, subtitles, animationInterval, typeSpeed]);

    useEffect(() => {
        setDisplayedText("");
    }, [currentSubtitleIndex]);

    // Check background from theme system
    const [theme, setTheme] = useState<string>("reyes");

    useEffect(() => {
        const savedTheme = localStorage.getItem("page_theme");
        if (savedTheme) setTheme(savedTheme);
    }, []);

    const heroBackgroundImage =
        theme === "reyes-halloween"
            ? "/img/background/background-halloween.jpg"
            : theme === "reyes-christmas"
            ? "/img/background/background-christmas.jpg"
            : backgroundImage;

    return (
        <>
            <style>
                {`
                .typewriter-cursor {
                    border-right: 2px solid #fff;
                    margin-left: 0.25rem;
                    animation: blink-cursor 0.7s steps(1) infinite;
                }
                @keyframes blink-cursor {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
                `}
            </style>
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
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-2 text-white drop-shadow-lg tracking-tight font-semibold">
                            {title}
                        </h1>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 inline-block text-white drop-shadow font-semibold">
                            <span className="text-reyes">
                                {displayedText}
                                <span className="typewriter-cursor">&nbsp;</span>
                            </span>
                        </h1>
                        <div className="mb-8 w-full flex flex-col items-center">
                            <p className="text-lg sm:text-xl md:text-2xl text-white drop-shadow-sm">
                                {description.split('\n').map((line, index) => (
                                    <React.Fragment key={index}>
                                        {line}
                                        {index < description.split('\n').length - 1 && <br />}
                                    </React.Fragment>
                                ))}
                            </p>
                            <div className="text-base sm:text-lg md:text-xl text-gray-200 text-center md:text-left w-full mt-6">
                                Planes web desde{" "}
                                <span className="font-semibold text-white text-xl sm:text-2xl md:text-3xl">
                                    <p className="text-3xl sm:text-4xl md:text-5xl">$19.990 al mes</p>
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-3 justify-center md:justify-start w-full">
                            <div className="flex flex-col md:flex-row gap-3 w-full">
                                <Link
                                    to={ctaLink}
                                    className="flex-1 bg-reyes hover:bg-reyes-dark text-white px-6 sm:px-8 py-3 sm:py-4 rounded transition-all duration-300 flex items-center gap-3 font-semibold hover:scale-105 text-base sm:text-lg justify-center min-w-[140px] sm:min-w-[180px] md:mr-2"
                                    style={{ minWidth: "140px" }}
                                >
                                    {ctaText}
                                    <ChevronRight className="h-6 sm:h-7 w-6 sm:w-7" />
                                </Link>
                            </div>
                        </div>
                    </div>
                    {showMockups && (
                        <div className="md:flex flex-1 justify-center items-center ml-8">
                            <AnimatedMockups />
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default HomeHeroSection;
