import { Building2, Gem } from "lucide-react";
import { Link } from "react-router";
import { Helmet } from "react-helmet-async";
import ServicesHeroSection from "../components/ServicesHeroSection/ServicesHeroSection";

const EnterpriseSoftware = () => {
    return (
        <>
            <Helmet>
                <title>Software Empresarial | Reyes&Friends</title>
                <meta name="description" content="Software empresarial personalizado para optimizar los procesos de tu negocio." />
                <meta property="og:title" content="Software Empresarial | Reyes&Friends" />
                <meta property="og:description" content="Software empresarial personalizado para optimizar los procesos de tu negocio." />
                <meta property="og:image" content="/img/open-graph-images/enterprise-software.png" />
                <meta property="og:type" content="website" />
                <meta name="twitter:title" content="Software Empresarial | Reyes&Friends" />
                <meta name="twitter:description" content="Software empresarial personalizado para optimizar los procesos de tu negocio." />
                <meta name="twitter:image" content="/img/open-graph-images/enterprise-software.png" />
            </Helmet>

            <ServicesHeroSection
                logoImage="/img/services/EnterpriseSoftware/logo.png"
                title="Software Empresarial"
                description={`Necesitas implementar un POS? alguna automatización de procesos? o un ERP? Podemos crear una solución personalizada a las necesidades de tu empresa.`}
                icon={Building2}
                quoteService="enterprise-software"
                buttonText="Me interesa, cotizar un software empresarial"
                altText="Ilustración de fondo - Edificios"
            />

            <section className="py-16 bg-zinc-900 text-white">
                <div className="container mx-auto px-4 max-w-7xl">
                    <h2 className="text-3xl mb-12 text-center relative">
                        <span className="bg-zinc-900 px-4 relative z-10 text-white">Características del Software Empresarial</span>
                        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-reyes-dark -z-0"></div>
                    </h2>
                    <div className="flex flex-col gap-16">

                        <div className="flex flex-col md:flex-row items-stretch gap-0 rounded-lg overflow-hidden shadow-lg bg-black">
                            <div className="md:w-1/2 w-full flex items-center justify-center">
                                <img
                                    src="/img/services/EnterpriseSoftware/security.png"
                                    alt="Ilustración de seguridad empresarial"
                                    className="max-h-[150px] w-auto object-contain pointer-events-none"
                                />
                            </div>
                            <div className="md:w-1/2 w-full flex flex-col justify-center p-8">
                                <h3 className="text-2xl font-semibold mb-2 text-reyes-light">Seguridad avanzada para tu información</h3>
                                <p className="text-zinc-200">
                                    Sabemos que <strong>los detalles importan.</strong> Por esta razón, verificamos cada línea de código o posible vulnerabilidad en tu software, asegurando que tu información y la de tus clientes esté siempre protegida.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row items-stretch gap-0 rounded-lg overflow-hidden shadow-lg bg-black">

                            <div className="md:w-1/2 w-full flex flex-col justify-center p-8">
                                <h3 className="text-2xl font-semibold mb-2 text-reyes-light">Automatización de procesos</h3>
                                <p className="text-zinc-200">
                                    Documentas mucho? Realizas procesos tediosos manualmente? Nuestro software puede automatizar tareas repetitivas,
                                    liberando tiempo para que tu equipo se enfoque en lo que realmente importa: <strong>hacer crecer tu negocio</strong>.
                                </p>
                            </div>

                            <div className="md:w-1/2 w-full flex items-center justify-center">
                                <img
                                    src="/img/services/EnterpriseSoftware/automatize.png"
                                    alt="Robot automatizando tareas"
                                    className="max-h-[250px] w-auto object-contain pointer-events-none"
                                />
                            </div>

                        </div>

                        <div className="flex flex-col md:flex-row items-stretch gap-0 rounded-lg overflow-hidden shadow-lg bg-black">

                            <div className="md:w-1/2 w-full flex items-center justify-center">
                                <img
                                    src="/img/services/EnterpriseSoftware/pos-terminal.png"
                                    alt="Terminal POS"
                                    className="max-h-[300px] w-auto object-contain pointer-events-none"
                                />
                            </div>

                            <div className="md:w-1/2 w-full flex flex-col justify-center p-8">
                                <h3 className="text-2xl font-semibold mb-2 text-reyes-light">Implementación de hardware o equipos</h3>
                                <p className="text-zinc-200">
                                    Quieres implementar un sistema de puntos de venta (POS), lectores de códigos de barra, o cualquier otro hardware especializado?
                                    Podemos integrar y configurar estos dispositivos para que funcionen perfectamente con tu software empresarial.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col items-center justify-center gap-6 rounded-lg overflow-hidden shadow-lg bg-black p-8">
                            <h3 className="text-2xl font-semibold mb-2 text-reyes-light text-center">Impulsa tu empresa al siguiente nivel</h3>
                            <p className="text-zinc-200 mb-6 text-center">
                                No te quedes atrás. Da el paso hacia la transformación digital y lleva la eficiencia de tu negocio a nuevas alturas con soluciones empresariales a medida.
                            </p>
                            <Link
                                to="/quote-project?service=enterprise-software"
                                className="bg-reyes hover:bg-reyes-dark text-white px-8 py-4 rounded transition-all duration-300 flex items-center justify-center gap-3 font-semibold text-lg transform hover:scale-105 w-full max-w-md"
                            >
                                <Gem className="h-6 w-6" />
                                Me interesa, cotizar un software
                            </Link>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
};

export default EnterpriseSoftware;