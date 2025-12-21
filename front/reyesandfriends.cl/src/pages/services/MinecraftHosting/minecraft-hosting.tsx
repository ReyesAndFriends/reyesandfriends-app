import { useEffect, useState } from "react";
import { Gem, Box } from "lucide-react";
import { Helmet } from "react-helmet-async";

const MinecraftHosting = () => {
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
    const [displayedTitle, setDisplayedTitle] = useState("H");
    const [titleCursorVisible, setTitleCursorVisible] = useState(true);

    useEffect(() => {
        let typingTimeout: NodeJS.Timeout;
        let cursorTimeout: NodeJS.Timeout;

        if (displayedTitle.length < "Hosting de Minecraft".length) {
            typingTimeout = setTimeout(() => {
                setDisplayedTitle("Hosting de Minecraft".slice(0, displayedTitle.length + 1));
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
    }, [displayedTitle, titleCursorVisible]);

    return (
        <>
            <Helmet>
                <title>Hosting de Minecraft en Chile | Reyes&Friends</title>
                <meta name="description" content="Hosting profesional de servidores Minecraft en Chile. Panel administrativo, subdominio personalizado, soporte técnico y alto rendimiento para tu comunidad." />
                <meta property="og:title" content="Hosting de Minecraft en Chile | Reyes&Friends" />
                <meta property="og:description" content="Hosting profesional de servidores Minecraft en Chile. Panel administrativo, subdominio personalizado, soporte técnico y alto rendimiento para tu comunidad." />
                <meta property="og:image" content="/img/open-graph-images/minecraft-hosting.png" />
                <meta property="og:type" content="website" />
                <meta property="og:locale" content="es_CL" />
                <meta name="twitter:title" content="Hosting de Minecraft en Chile | Reyes&Friends" />
                <meta name="twitter:description" content="Hosting profesional de servidores Minecraft en Chile. Panel administrativo, subdominio personalizado, soporte técnico y alto rendimiento para tu comunidad." />
                <meta name="twitter:card" content="summary_large_image" />
            </Helmet>

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
                        alt="Ilustración de fondo - Minecraft"
                        className="w-full h-full object-cover filter grayscale z-0"
                        draggable={false}
                        onContextMenu={e => e.preventDefault()}
                    />
                </div>
                <div className="container mx-auto px-4 py-24 relative z-10 grid grid-cols-1 md:grid-cols-2 items-center gap-8">
                    <div className="flex justify-center hidden md:block">
                        <img
                            src="/img/services/MinecraftHosting/logo.png"
                            alt="Hosting de Minecraft"
                            className="max-w-xl pointer-events-none"
                        />
                    </div>
                    <div className="max-w-2xl text-white mx-auto md:mx-0 md:pl-12 lg:pl-24 flex flex-col items-center md:items-start">
                        <div className="flex items-center gap-4 mb-2">
                            <Box
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
                            Quieres echar unas partidas con tus amigos sin lag? Nuestro servicio de Hosting de Minecraft en <img src="/img/services/MinecraftHosting/Chile.svg" alt="Chile" className="inline h-6 pointer-events-none" /> te ofrece todo lo que necesitas para crear y gestionar tu propio servidor de Minecraft de manera fácil y rápida.
                        </p>

                        <a
                            href="https://reyeshosting.cl"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-reyes hover:bg-reyes-dark text-white px-10 py-5 rounded transition-all duration-300 flex items-center gap-4 font-semibold hover:scale-105 text-xl"
                        >
                            <Gem className="h-5 w-5" />
                            Visitar ReyesHosting.cl
                        </a>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-zinc-900 text-white">
                <div className="container mx-auto px-4 max-w-7xl">
                    <h2 className="text-3xl mb-12 text-center relative">
                        <span className="bg-zinc-900 px-4 relative z-10 text-white">Características de nuestro Hosting</span>
                        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-reyes-dark -z-0"></div>
                    </h2>
                    <div className="flex flex-col gap-16">

                        <div className="flex flex-col md:flex-row items-stretch gap-0 rounded-lg overflow-hidden shadow-lg bg-black">
                            <div className="md:w-1/2 w-full flex items-center justify-center">
                                <img
                                    src="/img/services/MinecraftHosting/dawn-of.png"
                                    alt="Ilustración de diseño Minecraft"
                                    className="max-h-[200px] w-auto object-contain pointer-events-none"
                                />
                            </div>
                            <div className="md:w-1/2 w-full flex flex-col justify-center p-8">
                                <h3 className="text-2xl font-semibold mb-2 text-reyes-light">Mods, Plugins, Tu Mundo</h3>
                                <p className="text-zinc-200">
                                    Puedes utilizar cualquier mod o plugin que desees, así como subir tu propio mundo personalizado. Nuestro hosting es compatible con las versiones más populares de Minecraft, Forge, Mohist, Spigot, Paper y más.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row items-stretch gap-0 rounded-lg overflow-hidden shadow-lg bg-black">

                            <div className="md:w-1/2 w-full flex flex-col justify-center p-8">
                                <h3 className="text-2xl font-semibold mb-2 text-reyes-light">Panel de Control Pterodactyl</h3>
                                <p className="text-zinc-200">
                                    Adquiere tu servidor y te entregamos una cuenta en nuestro panel de control enriquecido por <strong>Pterodactyl</strong>, un panel muy popular en la comunidad de Minecraft por su facilidad de uso y funcionalidades avanzadas. Desde el panel podrás gestionar tu servidor, instalar mods y plugins, configurar ajustes y mucho más.
                                </p>
                            </div>

                            <div className="md:w-1/2 w-full flex items-center justify-center">
                                <img
                                    src="/img/services/MinecraftHosting/pterodactyl.svg"
                                    alt="Integración de Pterodactyl"
                                    className="max-h-[200px] w-auto object-contain pointer-events-none"
                                />
                            </div>

                        </div>

                        <div className="flex flex-col items-center justify-center gap-6 rounded-lg overflow-hidden shadow-lg bg-black p-8">
                            <h3 className="text-2xl font-semibold mb-2 text-reyes-light text-center">Lleva tu servidor al siguiente nivel</h3>
                            <p className="text-zinc-200 mb-6 text-center">
                                Si es Chileno... es bueno <img src="/img/services/MinecraftHosting/Chile.svg" alt="Chile" className="inline h-4 pointer-events-none" />. No esperes más y únete a la comunidad de ReyesHosting.cl para disfrutar de un servicio de hosting de Minecraft confiable, rápido y seguro. ¡Crea tu servidor hoy mismo y comienza a jugar con tus amigos sin límites!
                            </p>
                            <a
                                href="https://reyeshosting.cl"
                                className="bg-reyes hover:bg-reyes-dark text-white px-8 py-4 rounded transition-all duration-300 flex items-center justify-center gap-3 font-semibold text-lg transform hover:scale-105 w-full max-w-md"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Gem className="h-6 w-6" />
                                Me interesa, visitar ReyesHosting.cl
                            </a>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
};

export default MinecraftHosting;