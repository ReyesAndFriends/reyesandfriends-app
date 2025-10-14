import { Ban, ChevronRight } from "lucide-react";
import { Link } from "react-router";
import { useEffect, useState } from "react";

const Error = () => {
    // Festive theme logic
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
            : "/img/background/background-web.jpg";

    // Typewriter states for title
    const errorTitle = "Página no encontrada";
    const [displayedTitle, setDisplayedTitle] = useState(errorTitle[0]);
    const [titleCursorVisible, setTitleCursorVisible] = useState(true);

    useEffect(() => {
        let typingTimeout: NodeJS.Timeout;
        let cursorTimeout: NodeJS.Timeout;

        if (displayedTitle.length < errorTitle.length) {
            typingTimeout = setTimeout(() => {
                setDisplayedTitle(errorTitle.slice(0, displayedTitle.length + 1));
            }, 65);
        } else if (titleCursorVisible) {
            cursorTimeout = setTimeout(() => {
                setTitleCursorVisible(false);
            }, 1800);
        }

        return () => {
            clearTimeout(typingTimeout);
            clearTimeout(cursorTimeout);
        };
    }, [displayedTitle, errorTitle, titleCursorVisible]);

    return (
        <>
            <style>
                {`
                .typewriter-cursor-title {
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
            <section className="bg-cover bg-center relative min-h-screen flex items-center justify-center">
                <div className="absolute inset-0 bg-hero-section z-10"></div>
                <div className="absolute inset-0">
                    <img
                        src={heroBackgroundImage}
                        alt="Ilustración de fondo - Edificios"  
                        className="w-full h-full object-cover filter grayscale z-0"
                        draggable={false}
                        onContextMenu={e => e.preventDefault()}
                    />
                </div>
                <div className="container mx-auto px-4 py-24 relative z-10 grid grid-cols-1 items-center gap-8">
                    <div className="max-w-2xl text-white mx-auto flex flex-col items-center">
                        <div className="flex items-center gap-4 mb-2">
                            <Ban size={48} className="text-reyes drop-shadow-lg" />
                            <h1 className="text-4xl md:text-5xl text-white drop-shadow-lg tracking-tight font-semibold 3xl:text-6xl">
                                {displayedTitle}
                                {titleCursorVisible && (
                                    <span className="typewriter-cursor-title">&nbsp;</span>
                                )}
                            </h1>
                        </div>
                        <p className="text-xl mb-8 text-center max-w-xl">
                            La URL que has ingresado no existe o ha sido movida. Por favor, verifica la dirección o regresa a la página principal.
                        </p>
                        <Link
                            to="/"
                            className="bg-reyes hover:bg-reyes-dark text-white px-10 py-5 rounded transition-all duration-300 flex items-center gap-4 font-semibold hover:scale-105 text-2xl"
                        >
                            Volver a la página principal
                            <ChevronRight className="h-7 w-7" />
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Error;
