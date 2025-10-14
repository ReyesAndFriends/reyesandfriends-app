import { Film, Star, Joystick, Gem, Users, Gamepad2, Image, Share, Bot } from "lucide-react";
import { Link } from "react-router";
import { Helmet } from "react-helmet-async";

const Entertainment = () => {
    return (
        <>
            <Helmet>
                <title>Entertainment | Reyes&Friends</title>
                <meta name="description" content="Servicios personalizados para la industria del entretenimiento: desarrollo de plataformas, blogs, foros, bots de Discord y contenido multimedia que capturan la esencia de tu marca." />
                <meta property="og:title" content="Entertainment | Reyes&Friends" />
                <meta property="og:description" content="Desarrollamos plataformas de entretenimiento únicas: blogs, foros, bots de Discord y soluciones multimedia personalizadas para tu marca o proyecto creativo." />
                <meta property="og:image" content="/img/open-graph-images/entertainment.png" />
                <meta property="og:type" content="website" />
                <meta name="twitter:title" content="Entertainment | Reyes&Friends" />
                <meta name="twitter:description" content="Servicios de desarrollo para entretenimiento: plataformas creativas, bots, foros y contenido multimedia personalizado." />
                <meta name="twitter:image" content="/img/open-graph-images/entertainment.png" />
            </Helmet>
            <section className="bg-cover bg-center relative min-h-[700px] flex items-center">
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
                <div className="container mx-auto px-4 py-24 relative z-10 grid grid-cols-1 md:grid-cols-2 items-center gap-8">
                    <div className="flex justify-center hidden md:block">
                        <img
                            src="/img/services/Entertainment/logo.png"
                            alt="Entertainment"
                            className="max-w-lg pointer-events-none"
                        />
                    </div>
                    <div className="max-w-2xl text-white mx-auto md:mx-0 md:pl-12 lg:pl-24 flex flex-col items-center md:items-start">
                        <h1 className="text-4xl md:text-5xl mb-6 border-b-4 border-reyes-dark pb-4 inline-flex items-center gap-4">
                            <Joystick size={40} /> Entretenimiento y más
                        </h1>
                        <p className="text-xl mb-8">
                           Sabemos que no todo siempre tiene que ser serio, el entretenimiento también es importante. Por eso ofrecemos servicios personalizados para la industria del entretenimiento, desarrollando plataformas como blogs, foros y contenido multimedia que capturan la esencia de tu marca o persona.
                        </p>

                        <Link
                            to="/quote-project?service=entertainment"
                            className="bg-reyes hover:bg-reyes-dark text-white px-6 py-3 rounded transition-all duration-300 flex items-center gap-2 font-semibold transform hover:scale-105"
                        >
                            <Gem className="h-5 w-5" />
                            Me interesa, cotizar servicio
                        </Link>

                    </div>
                </div>
            </section>

            <section className="py-16 bg-zinc-900 text-white">
                <div className="container mx-auto px-4 max-w-7xl">
                    <h2 className="text-3xl mb-12 text-center relative">
                        <span className="bg-zinc-900 px-4 relative z-10 text-white">Características de este servicio</span>
                        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-reyes-dark -z-0"></div>
                    </h2>
                    <div className="flex flex-col gap-16">

                        <div className="flex flex-col md:flex-row items-stretch gap-0 rounded-lg overflow-hidden shadow-lg bg-black">
                            <div className="md:w-1/2 w-full flex items-center justify-center">
                                <img
                                    src="/img/services/Entertainment/server.png"
                                    alt="Servidor minecraft"
                                    className="max-h-[150px] w-auto object-contain pointer-events-none"
                                />
                            </div>
                            <div className="md:w-1/2 w-full flex flex-col justify-center p-8">
                                <h3 className="text-2xl font-semibold mb-2 text-reyes-light">Lo que quieras, le hacemos</h3>
                                <p className="text-zinc-200">
                                    Desde <strong>plataformas de blogs y foros</strong> hasta <strong>bots personalizados para Discord</strong>, pasando por <strong>aplicaciones interactivas y contenido multimedia</strong>. Nos adaptamos a tus necesidades y objetivos para crear soluciones que realmente funcionen.
                                    Incluso un servidor de Minecraft si así lo deseas.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row items-stretch gap-0 rounded-lg overflow-hidden shadow-lg bg-black">

                            <div className="md:w-1/2 w-full flex items-center justify-center">
                                <img
                                    src="/img/services/Entertainment/Social-Media.webp"
                                    alt="Integración con plataformas"
                                    className="max-h-[100px] w-auto object-contain pointer-events-none"
                                />
                            </div>

                            <div className="md:w-1/2 w-full flex flex-col justify-center p-8">
                                <h3 className="text-2xl font-semibold mb-2 text-reyes-light">Integración con plataformas populares</h3>
                                <p className="text-zinc-200">
                                    Conectamos tu proyecto con <strong>Discord, Twitch, YouTube y redes sociales</strong>. Desarrollamos bots personalizados, sistemas de moderación automática y herramientas de engagement para tu comunidad.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row items-stretch gap-0 rounded-lg overflow-hidden shadow-lg bg-black">
                            <div className="md:w-1/2 w-full flex items-center justify-center">
                                <Users size={80} className="text-white" />
                            </div>
                            <div className="md:w-1/2 w-full flex flex-col justify-center p-8">
                                <h3 className="text-2xl font-semibold mb-2 text-reyes-light">Comunidades interactivas</h3>
                                <p className="text-zinc-200">
                                    Creamos espacios digitales donde tu audiencia puede <strong>interactuar, compartir contenido y participar activamente</strong>. Desde foros especializados hasta plataformas de streaming personalizadas.
                                </p>
                            </div>
                        </div>
                    
                        <div className="flex flex-col items-center justify-center gap-6 rounded-lg overflow-hidden shadow-lg bg-black p-8">
                            <h3 className="text-2xl font-semibold mb-2 text-reyes-light text-center">¿Tienes una idea creativa?</h3>
                            <p className="text-zinc-200 mb-6 text-center">
                                No importa si es un proyecto gaming, contenido multimedia, plataforma de streaming o cualquier idea innovadora de entretenimiento. Estamos aquí para hacerla realidad.
                            </p>
                            <Link
                                to="/quote-project?service=entertainment"
                                className="bg-reyes hover:bg-reyes-dark text-white px-8 py-4 rounded transition-all duration-300 flex items-center justify-center gap-3 font-semibold text-lg transform hover:scale-105 w-full max-w-md"
                            >
                                <Gem className="h-6 w-6" />
                                Me interesa, hacer magia
                            </Link>
                        </div>

                    </div>
                </div>
            </section>

            <section className="py-16 bg-zinc-900 text-white">
                <div className="container mx-auto px-4 max-w-7xl">
                    <h2 className="text-3xl mb-12 text-center relative">
                        <span className="bg-zinc-900 px-4 relative z-10 text-white">Ejemplos de proyectos</span>
                        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-reyes-dark -z-0"></div>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        
                        <div className="bg-black rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
                            <div className="flex items-center gap-3 mb-4">
                                <Gamepad2 className="h-8 w-8 text-reyes-light" />
                                <h3 className="text-xl font-semibold">Blogs informativos con moderación</h3>
                            </div>
                            <p className="text-zinc-200 mb-4">
                                Te gustaria crear tu propio blog, compartir lo que haces, que otros puedan unirse, subir contenido y crear toda una comunidad? Podemos ayudarte a crear un blog con todas las funcionalidades que necesitas.
                            </p>
                            <ul className="text-sm text-zinc-300 space-y-1">
                                <li className="flex items-center gap-2">
                                    <Users className="h-4 w-4 text-reyes-light" />
                                    Moderación, roles de usuario
                                </li>
                                <li className="flex items-center gap-2">
                                    <Image className="h-4 w-4 text-reyes-light" />
                                    Soporte de Markdown, imágenes y videos
                                </li>
                                <li className="flex items-center gap-2">
                                    <Share className="h-4 w-4 text-reyes-light" />
                                    Integración con redes sociales
                                </li>
                            </ul>
                        </div>

                        <div className="bg-black rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
                            <div className="flex items-center gap-3 mb-4">
                                <Bot className="h-8 w-8 text-reyes-light" />
                                <h3 className="text-xl font-semibold">Bot para Discord</h3>
                            </div>
                            <p className="text-zinc-200 mb-4">
                                Bot para Discord con integración de comandos personalizados, gestión de roles y moderación de chat.
                            </p>
                            <ul className="text-sm text-zinc-300 space-y-1">
                                <li className="flex items-center gap-2">
                                    <Users className="h-4 w-4 text-reyes-light" />
                                    Gestión de roles y permisos
                                </li>
                                <li className="flex items-center gap-2">
                                    <Joystick className="h-4 w-4 text-reyes-light" />
                                    Comandos personalizados
                                </li>
                                <li className="flex items-center gap-2">
                                    <Star className="h-4 w-4 text-reyes-light" />
                                    Sistema de niveles y recompensas
                                </li>
                                <li className="flex items-center gap-2">
                                    <Gem className="h-4 w-4 text-reyes-light" />
                                    Las travesuras que quieras
                                </li>
                            </ul>
                        </div>

                        <div className="bg-black rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
                            <div className="flex items-center gap-3 mb-4">
                                <Film className="h-8 w-8 text-reyes-light" />
                                <h3 className="text-xl font-semibold">Aplicaciones con fines de entretenimiento</h3>
                            </div>
                            <p className="text-zinc-200 mb-4">
                                Desarrollo de apps interactivas, juegos web, quizzes, sorteos y experiencias digitales para captar y divertir a tu audiencia.
                            </p>
                            <ul className="text-sm text-zinc-300 space-y-1">
                                <li className="flex items-center gap-2">
                                    <Star className="h-4 w-4 text-reyes-light" />
                                    Gamificación y recompensas
                                </li>
                                <li className="flex items-center gap-2">
                                    <Gem className="h-4 w-4 text-reyes-light" />
                                    Integración multimedia
                                </li>
                                <li className="flex items-center gap-2">
                                    <Joystick className="h-4 w-4 text-reyes-light" />
                                    Juegos y dinámicas personalizadas
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
};

export default Entertainment;
