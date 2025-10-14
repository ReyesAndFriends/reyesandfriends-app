import { Smartphone, Gem } from "lucide-react";
import { Link } from "react-router";
import { Helmet } from "react-helmet-async";
import ServicesHeroSection from "../components/ServicesHeroSection/ServicesHeroSection";

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

            <ServicesHeroSection
                logoImage="/img/services/MobileApps/logo.png"
                title="Aplicaciones Móviles"
                description={`¿Necesitas una app para Android? ¿Una aplicación que conecte con tu negocio? Desarrollamos aplicaciones móviles nativas y personalizadas que se adaptan perfectamente a las necesidades de tu empresa.`}
                icon={Smartphone}
                quoteService="mobile-apps"
                buttonText="Me interesa, cotizar una app móvil"
                altText="Ilustración de fondo - Tecnología móvil"
            />

            <section className="py-16 bg-zinc-900 text-white">
                <div className="container mx-auto px-4 max-w-7xl">
                    <h2 className="text-3xl mb-12 text-center relative">
                        <span className="bg-zinc-900 px-4 relative z-10 text-white">Características de nuestras Apps Móviles</span>
                        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-reyes-dark -z-0"></div>
                    </h2>
                    <div className="flex flex-col gap-16">

                        <div className="flex flex-col md:flex-row items-stretch gap-0 rounded-lg overflow-hidden shadow-lg bg-black">
                            <div className="md:w-1/2 w-full flex items-center justify-center">
                                <img
                                    src="/img/services/MobileApps/design-mobile.png"
                                    alt="Ilustración de diseño móvil"
                                    className="max-h-[200px] w-auto object-contain pointer-events-none"
                                />
                            </div>
                            <div className="md:w-1/2 w-full flex flex-col justify-center p-8">
                                <h3 className="text-2xl font-semibold mb-2 text-reyes-light">Diseño atractivo</h3>
                                <p className="text-zinc-200">
                                    Nuestras aplicaciones buscan un diseño atractivo y funcional, adaptado a las necesidades de tu negocio y a las expectativas de tus usuarios.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row items-stretch gap-0 rounded-lg overflow-hidden shadow-lg bg-black">

                            <div className="md:w-1/2 w-full flex flex-col justify-center p-8">
                                <h3 className="text-2xl font-semibold mb-2 text-reyes-light">Integración con sistemas existentes</h3>
                                <p className="text-zinc-200">
                                    ¿Ya tienes un sistema empresarial? ¿Una página web? Podemos crear aplicaciones móviles que se conecten perfectamente 
                                    con tus sistemas existentes, <strong>unificando tu ecosistema digital</strong>.
                                </p>
                            </div>

                            <div className="md:w-1/2 w-full flex items-center justify-center">
                                <img
                                    src="/img/services/MobileApps/api-integration.png"
                                    alt="Integración de API móvil"
                                    className="max-h-[200px] w-auto object-contain pointer-events-none"
                                />
                            </div>

                        </div>

                        <div className="flex flex-col items-center justify-center gap-6 rounded-lg overflow-hidden shadow-lg bg-black p-8">
                            <h3 className="text-2xl font-semibold mb-2 text-reyes-light text-center">Lleva tu negocio al móvil</h3>
                            <p className="text-zinc-200 mb-6 text-center">
                                En la era digital, tener presencia móvil es esencial. Desarrollemos juntos la aplicación que transformará la forma en que tus clientes interactúan con tu negocio.
                            </p>
                            <Link
                                to="/quote-project?service=mobile-apps"
                                className="bg-reyes hover:bg-reyes-dark text-white px-8 py-4 rounded transition-all duration-300 flex items-center justify-center gap-3 font-semibold text-lg transform hover:scale-105 w-full max-w-md"
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