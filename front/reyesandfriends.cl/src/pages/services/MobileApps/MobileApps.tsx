import { Smartphone, Gem } from "lucide-react";
import { Link } from "react-router";
import { Helmet } from "react-helmet-async";

const MobileApps = () => {
    return (
        <>
            <Helmet>
                <title>Aplicaciones Móviles Android | Reyes&Friends</title>
                <meta name="description" content="Desarrollo de aplicaciones móviles Android nativas y personalizadas para tu negocio." />
                <meta property="og:title" content="Aplicaciones Móviles Android | Reyes&Friends" />
                <meta property="og:description" content="Desarrollo de aplicaciones móviles Android nativas y personalizadas para tu negocio." />
                <meta property="og:image" content="/img/open-graph-images/mobile-apps.png" />
                <meta property="og:type" content="website" />
                <meta name="twitter:title" content="Aplicaciones Móviles Android | Reyes&Friends" />
                <meta name="twitter:description" content="Desarrollo de aplicaciones móviles Android nativas y personalizadas para tu negocio." />
                <meta name="twitter:image" content="/img/open-graph-images/mobile-apps.png" />
            </Helmet>
            <section className="bg-cover bg-center relative min-h-[700px] flex items-center">
                <div className="absolute inset-0 bg-hero-section z-10"></div>
                <div className="absolute inset-0">
                    <img
                        src="/img/background/background-web.jpg"
                        alt="Ilustración de fondo - Tecnología móvil"  
                        className="w-full h-full object-cover filter grayscale z-0"
                        draggable={false}
                        onContextMenu={e => e.preventDefault()}
                    />
                </div>
                <div className="container mx-auto px-4 py-24 relative z-10 grid grid-cols-1 md:grid-cols-2 items-center gap-8">
                    <div className="flex justify-center hidden md:block">
                        <img
                            src="/img/services/MobileApps/logo.png"
                            alt="Aplicaciones Móviles Android"
                            className="max-w-lg h-auto pointer-events-none"
                        />
                    </div>
                    <div className="max-w-2xl text-white mx-auto md:mx-0 md:pl-12 lg:pl-24 flex flex-col items-center md:items-start">
                        <h1 className="text-4xl md:text-5xl mb-6 border-b-4 border-red-500 pb-4 inline-flex items-center gap-4">
                            <Smartphone size={40} /> Aplicaciones Móviles
                        </h1>
                        <p className="text-xl mb-8">
                            ¿Necesitas una app para Android? ¿Una aplicación que conecte con tu negocio? Desarrollamos aplicaciones móviles nativas y personalizadas que se adaptan perfectamente a las necesidades de tu empresa.
                        </p>

                        <Link
                            to="/quote-project?service=mobile-apps"
                            className="bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded transition-all duration-300 flex items-center gap-2 font-semibold transform hover:scale-105"
                        >
                            <Gem className="h-5 w-5" />
                            Me interesa, cotizar una app móvil
                        </Link>

                    </div>
                </div>
            </section>

            <section className="py-16 bg-zinc-900 text-white">
                <div className="container mx-auto px-4 max-w-7xl">
                    <h2 className="text-3xl mb-12 text-center relative">
                        <span className="bg-zinc-900 px-4 relative z-10 text-white">Características de nuestras Apps Móviles</span>
                        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-red-600/50 -z-0"></div>
                    </h2>
                    <div className="flex flex-col gap-16">

                        <div className="flex flex-col md:flex-row items-stretch gap-0 rounded-lg overflow-hidden shadow-lg bg-black">
                            <div className="md:w-1/2 w-full flex items-center justify-center">
                                <img
                                    src="/img/services/MobileApps/native-performance.png"
                                    alt="Ilustración de rendimiento nativo"
                                    className="max-h-[200px] w-auto object-contain pointer-events-none"
                                />
                            </div>
                            <div className="md:w-1/2 w-full flex flex-col justify-center p-8">
                                <h3 className="text-2xl font-semibold mb-2 text-red-500">Rendimiento nativo optimizado</h3>
                                <p className="text-zinc-200">
                                    Desarrollamos aplicaciones nativas para Android que aprovechan al máximo las capacidades del dispositivo. 
                                    <strong> Velocidad, fluidez y experiencia de usuario excepcional</strong> son nuestras prioridades.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row items-stretch gap-0 rounded-lg overflow-hidden shadow-lg bg-black">

                            <div className="md:w-1/2 w-full flex flex-col justify-center p-8">
                                <h3 className="text-2xl font-semibold mb-2 text-red-500">Integración con sistemas existentes</h3>
                                <p className="text-zinc-200">
                                    ¿Ya tienes un sistema empresarial? ¿Una página web? Podemos crear aplicaciones móviles que se conecten perfectamente 
                                    con tus sistemas existentes, <strong>unificando tu ecosistema digital</strong>.
                                </p>
                            </div>

                            <div className="md:w-1/2 w-full flex items-center justify-center">
                                <img
                                    src="/img/services/MobileApps/integration.png"
                                    alt="Integración de sistemas"
                                    className="max-h-[200px] w-auto object-contain pointer-events-none"
                                />
                            </div>

                        </div>

                        <div className="flex flex-col md:flex-row items-stretch gap-0 rounded-lg overflow-hidden shadow-lg bg-black">

                            <div className="md:w-1/2 w-full flex items-center justify-center">
                                <img
                                    src="/img/services/MobileApps/ui-design.png"
                                    alt="Diseño de interfaz móvil"
                                    className="max-h-[250px] w-auto object-contain pointer-events-none"
                                />
                            </div>

                            <div className="md:w-1/2 w-full flex flex-col justify-center p-8">
                                <h3 className="text-2xl font-semibold mb-2 text-red-500">Diseño intuitivo y atractivo</h3>
                                <p className="text-zinc-200">
                                    Creamos interfaces modernas y fáciles de usar que siguen las mejores prácticas de Material Design. 
                                    Tu app no solo funcionará bien, sino que también <strong>se verá increíble</strong> y será fácil de usar.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col items-center justify-center gap-6 rounded-lg overflow-hidden shadow-lg bg-black p-8">
                            <h3 className="text-2xl font-semibold mb-2 text-red-500 text-center">Lleva tu negocio al móvil</h3>
                            <p className="text-zinc-200 mb-6 text-center">
                                En la era digital, tener presencia móvil es esencial. Desarrollemos juntos la aplicación que transformará la forma en que tus clientes interactúan con tu negocio.
                            </p>
                            <Link
                                to="/quote-project?service=mobile-apps"
                                className="bg-red-700 hover:bg-red-800 text-white px-8 py-4 rounded transition-all duration-300 flex items-center justify-center gap-3 font-semibold text-lg transform hover:scale-105 w-full max-w-md"
                            >
                                <Gem className="h-6 w-6" />
                                Me interesa, cotizar una app
                            </Link>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
};

export default MobileApps;