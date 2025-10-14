import { useEffect, useState } from "react";
import { LucideIcon, Gem } from "lucide-react";
import { Link } from "react-router";

interface ServicesHeroSectionProps {
    logoImage: string;
    title: string;
    description: string;
    icon: LucideIcon;
    quoteService: string;
    buttonText: string;
    altText?: string;
}

const ServicesHeroSection = ({
    logoImage,
    title,
    description,
    icon: Icon,
    quoteService,
    buttonText,
    altText = "Ilustración de fondo"
}: ServicesHeroSectionProps) => {

    const [theme, setTheme] = useState<string>("reyes");

    useEffect(() => {
        const savedTheme = localStorage.getItem("page_theme");
        if (savedTheme) setTheme(savedTheme);
    }, []);

    const heroBackgroundImage =
        theme === "reyes-halloween"
            ? "/img/background/background-halloween.jpg"
            : "/img/background/background-web.jpg";

    // Typewriter states for title
    const [displayedTitle, setDisplayedTitle] = useState(title[0]);
    const [titleCursorVisible, setTitleCursorVisible] = useState(true);

    useEffect(() => {
        let typingTimeout: NodeJS.Timeout;
        let cursorTimeout: NodeJS.Timeout;

        if (displayedTitle.length < title.length) {
            typingTimeout = setTimeout(() => {
                setDisplayedTitle(title.slice(0, displayedTitle.length + 1));
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
    }, [displayedTitle, title, titleCursorVisible]);

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
            <section className="bg-cover bg-center relative min-h-[700px] flex items-center">
                <div className="absolute inset-0 bg-hero-section z-10"></div>
                <div className="absolute inset-0">
                    <img
                        src={heroBackgroundImage}
                        alt={altText}
                        className="w-full h-full object-cover filter grayscale z-0"
                        draggable={false}
                        onContextMenu={e => e.preventDefault()}
                    />
                </div>
                <div className="container mx-auto px-4 py-24 relative z-10 grid grid-cols-1 md:grid-cols-2 items-center gap-8">
                    <div className="flex justify-center hidden md:block">
                        <img
                            src={logoImage}
                            alt={title}
                            className="max-w-xl pointer-events-none"
                        />
                    </div>
                    <div className="max-w-2xl text-white mx-auto md:mx-0 md:pl-12 lg:pl-24 flex flex-col items-center md:items-start">
                        <div className="flex items-center gap-4 mb-2">
                            <Icon
                                size={48}
                                className={
                                    theme === "reyes-halloween"
                                        ? "text-orange-500 drop-shadow-lg"
                                        : "text-reyes drop-shadow-lg"
                                }
                            />
                            <h1 className="text-4xl md:text-5xl text-white drop-shadow-lg tracking-tight font-semibold 3xl:text-6xl">
                                {displayedTitle}
                                {titleCursorVisible && (
                                    <span className="typewriter-cursor-title">&nbsp;</span>
                                )}
                            </h1>
                        </div>
                        <p className="text-xl mb-8">
                            {description}
                        </p>

                        <Link
                            to={`/quote-project?service=${quoteService}`}
                            className="bg-reyes hover:bg-reyes-dark text-white px-10 py-5 rounded transition-all duration-300 flex items-center gap-4 font-semibold hover:scale-105 text-xl"
                        >
                            <Gem className="h-5 w-5" />
                            {buttonText}
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ServicesHeroSection;