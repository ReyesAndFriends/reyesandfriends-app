import { Building2, Gem, Zap } from "lucide-react";
import { Link } from "react-router";
import { Helmet } from "react-helmet-async";

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
                            src="/img/services/EnterpriseSoftware/logo.png"
                            alt="Software Empresarial"
                            className="max-w-full h-auto pointer-events-none"
                        />
                    </div>
                    <div className="max-w-2xl text-white mx-auto md:mx-0 md:pl-12 lg:pl-24 flex flex-col items-center md:items-start">
                        <h1 className="text-4xl md:text-5xl mb-6 border-b-4 border-red-500 pb-4 inline-flex items-center gap-4">
                            <Building2 size={40} /> Software Empresarial
                        </h1>
                        <p className="text-xl mb-8">
                            Necesitas implementar un POS? alguna automatización de procesos? o un ERP? Podemos crear una solución personalizada a las necesidades de tu empresa.
                        </p>

                        <Link
                            to="/quote-project?service=enterprise-software"
                            className="bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded transition-all duration-300 flex items-center gap-2 font-semibold transform hover:scale-105"
                        >
                            <Gem className="h-5 w-5" />
                            Me interesa, cotizar un software empresarial
                        </Link>

                    </div>
                </div>
            </section>

            <section className="py-16 bg-zinc-900 text-white">
                <div className="container mx-auto px-4 max-w-7xl">
                    <h2 className="text-3xl mb-12 text-center relative">
                        <span className="bg-zinc-900 px-4 relative z-10 text-white">Características del Software Empresarial</span>
                        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-red-600/50 -z-0"></div>
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
                                <h3 className="text-2xl font-semibold mb-2 text-red-500">Seguridad avanzada para tu información</h3>
                                <p className="text-zinc-200">
                                    Sabemos que <strong>los detalles importan.</strong> Por esta razón, verificamos cada línea de código o posible vulnerabilidad en tu software, asegurando que tu información y la de tus clientes esté siempre protegida.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row items-stretch gap-0 rounded-lg overflow-hidden shadow-lg bg-black">

                            <div className="md:w-1/2 w-full flex flex-col justify-center p-8">
                                <h3 className="text-2xl font-semibold mb-2 text-red-500">Automatización de procesos</h3>
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
                                <h3 className="text-2xl font-semibold mb-2 text-red-500">Implementación de hardware o equipos</h3>
                                <p className="text-zinc-200">
                                    Quieres implementar un sistema de puntos de venta (POS), lectores de códigos de barra, o cualquier otro hardware especializado?
                                    Podemos integrar y configurar estos dispositivos para que funcionen perfectamente con tu software empresarial.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col items-center justify-center gap-6 rounded-lg overflow-hidden shadow-lg bg-black p-8">
                            <h3 className="text-2xl font-semibold mb-2 text-red-500 text-center">Impulsa tu empresa al siguiente nivel</h3>
                            <p className="text-zinc-200 mb-6 text-center">
                                No te quedes atrás. Da el paso hacia la transformación digital y lleva la eficiencia de tu negocio a nuevas alturas con soluciones empresariales a medida.
                            </p>
                            <Link
                                to="/quote-project?service=enterprise-software"
                                className="bg-red-700 hover:bg-red-800 text-white px-8 py-4 rounded transition-all duration-300 flex items-center justify-center gap-3 font-semibold text-lg transform hover:scale-105 w-full max-w-md"
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
