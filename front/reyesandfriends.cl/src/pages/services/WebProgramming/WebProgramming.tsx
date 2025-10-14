import { Globe, Gem, Ban, Download } from "lucide-react";
import { Link } from "react-router";
import { Helmet } from "react-helmet-async";
import ServicesHeroSection from "../components/ServicesHeroSection/ServicesHeroSection";

const WebProgramming = () => {
    return (
        <>
            <Helmet>
                <title>Servicio de Programación Web | Reyes&Friends</title>
                <meta
                    name="description"
                    content="Ofrecemos servicios de programación web a medida para tu negocio." />
                <meta property="og:title" content="Servicio de Programación Web | Reyes&Friends" />
                <meta property="og:description" content="Ofrecemos servicios de programación web a medida para tu negocio." />
                <meta property="og:image" content="/img/open-graph-images/web-programming.png" />
                <meta property="og:type" content="website" />
                <meta name="twitter:title" content="Servicio de Programación Web | Reyes&Friends" />
                <meta name="twitter:description" content="Ofrecemos servicios de programación web a medida para tu negocio." />
                <meta name="twitter:image" content="/img/open-graph-images/web-programming.png" />
            </Helmet>

            <ServicesHeroSection
                logoImage="/img/services/WebProgramming/logo.png"
                title="Programación Web"
                description={`La programación web consiste en crear páginas y aplicaciones que funcionan en internet. En Reyes&Friends, te ayudamos a tener tu propio sitio web de manera fácil y personalizada.`}
                icon={Globe}
                quoteService="web-development"
                buttonText="Me interesa, cotizar mi sitio web"
                altText="Ilustración de fondo - Edificios"
            />

            <section className="py-16 bg-zinc-900 text-white">
                <div className="container mx-auto px-4 max-w-7xl">
                    <h2 className="text-3xl mb-12 text-center relative">
                        <span className="bg-zinc-900 px-4 relative z-10 text-white">Características de la Programación Web</span>
                        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-reyes-dark -z-0"></div>
                    </h2>
                    <div className="flex flex-col gap-16">

                        <div className="flex flex-col md:flex-row items-stretch gap-0 rounded-lg overflow-hidden shadow-lg bg-black">
                            <div className="md:w-1/2 w-full flex items-center justify-center">
                                <img
                                    src="/img/services/WebProgramming/responsive.png"
                                    alt="Ilustración de diseño responsivo"
                                    className="max-h-[350px] w-auto object-contain pointer-events-none"
                                />
                            </div>
                            <div className="md:w-1/2 w-full flex flex-col justify-center p-8">
                                <h3 className="text-2xl font-semibold mb-2 text-reyes-light">Diseño responsivo: utilízalo en cualquier dispositivo</h3>
                                <p className="text-zinc-200">
                                    El mayor atractivo de una página web es que pueda verse en cualquier dispositivo,
                                    ya sea un teléfono móvil, una tableta o computadora, simplemente adaptándose de manera automática
                                    a cualquier resolución.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row items-stretch gap-0 rounded-lg overflow-hidden shadow-lg bg-black">

                            <div className="md:w-1/2 w-full flex flex-col justify-center p-8">
                                <h3 className="text-2xl font-semibold mb-2 text-reyes-light">No necesitas descargar nada</h3>
                                <p className="text-zinc-200">
                                    Una de las ventajas de la programación web es que no necesitas descargar ningún software para utilizar una aplicación web.
                                    Todo se ejecuta en el navegador, lo que facilita el acceso y la actualización constante.
                                </p>
                            </div>

                            <div className="md:w-1/2 w-full flex items-center justify-center">
                                <div className="relative w-32 h-32 flex items-center justify-center">
                                    <Download className="w-20 h-20 text-white" />
                                    <Ban className="w-32 h-32 text-reyes-light absolute top-0 left-0" />
                                </div>
                            </div>

                        </div>

                        <div className="flex flex-col md:flex-row items-stretch gap-0 rounded-lg overflow-hidden shadow-lg bg-black">

                            <div className="md:w-1/2 w-full flex items-center justify-center">
                                <img
                                    src="/img/services/WebProgramming/SEO.png"
                                    alt="Un gráfico de SEO en 3D"
                                    className="max-h-[350px] w-auto object-contain pointer-events-none"
                                />
                            </div>

                            <div className="md:w-1/2 w-full flex flex-col justify-center p-8">
                                <h3 className="text-2xl font-semibold mb-2 text-reyes-light">Optimización SEO: Mejora tu visibilidad en línea</h3>
                                <p className="text-zinc-200">
                                    La optimización para motores de búsqueda (SEO) es crucial para mejorar la visibilidad de tu sitio web.
                                    Implementamos las mejores prácticas de SEO para asegurarnos de que tu sitio sea fácilmente encontrado por los usuarios.
                                </p>
                            </div>

                        </div>

                        <div className="flex flex-col md:flex-row items-stretch gap-0 rounded-lg overflow-hidden shadow-lg bg-black">

                            <div className="md:w-1/2 w-full flex flex-col justify-center p-8">
                                <h3 className="text-2xl font-semibold mb-2 text-reyes-light">Personalizable como tu empresa</h3>
                                <p className="text-zinc-200">
                                    Ofrecemos opciones de personalización total para que tu aplicación web se adapte a tus necesidades específicas.
                                    Desde el diseño hasta la funcionalidad, trabajamos contigo para crear una solución a medida. Replica la imagen de tu marca y haz que tu sitio web sea único.
                                </p>
                            </div>

                            <div className="md:w-1/2 w-full flex items-center justify-center">
                                <img
                                    src="/img/services/WebProgramming/suit-image.png"
                                    alt="Un traje elegante como tu empresa"
                                    className="object-contain max-h-[150px] w-auto pointer-events-none"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col items-center justify-center gap-6 rounded-lg overflow-hidden shadow-lg bg-black p-8">
                            <h3 className="text-2xl font-semibold mb-2 text-reyes-light text-center">Haz crecer tu presencia en línea</h3>
                            <p className="text-zinc-200 mb-6 text-center">
                                Lleva tu negocio al mundo digital con una página web profesional y funcional. Aumenta tu alcance, conecta con más clientes y destaca frente a la competencia con soluciones web personalizadas.
                            </p>
                            <Link
                                to="/quote-project?service=web-development"
                                className="bg-reyes hover:bg-reyes-dark text-white px-8 py-4 rounded transition-all duration-300 flex items-center justify-center gap-3 font-semibold text-lg transform hover:scale-105 w-full max-w-md"
                            >
                                <Gem className="h-6 w-6" />
                                Me interesa, cotizar mi sitio web
                            </Link>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
};

export default WebProgramming;