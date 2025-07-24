import { Globe, Gem } from "lucide-react";
import { Link } from "react-router";

const WebProgramming = () => {
    return (
        <>
            <section className="bg-cover bg-center relative min-h-[700px] flex items-center">
                <div className="absolute inset-0 bg-hero-section"></div>
                <div className="absolute inset-0">
                    <img
                        src="/img/background/background-web.jpg"
                        alt="fondo de la sección"
                        className="w-full h-full object-cover opacity-5 filter grayscale"
                        draggable={false}
                        onContextMenu={e => e.preventDefault()}
                    />
                </div>
                <div className="container mx-auto px-4 py-24 relative z-10 grid grid-cols-1 md:grid-cols-2 items-center gap-8">
                    <div className="flex justify-center">
                        <img
                            src="/img/services/WebProgramming/logo.png"
                            alt="Programación Web"
                            className="max-w-full h-auto"
                            style={{ filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.5))" }}
                        />
                    </div>
                    <div className="max-w-2xl text-white mx-auto md:mx-0 md:pl-12 lg:pl-24 flex flex-col items-center md:items-start">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 border-b-4 border-red-500 pb-4 inline-flex items-center gap-4">
                            <Globe size={40} /> Programación Web
                        </h1>
                        <p className="text-xl mb-8">
                            La programación web consiste en crear páginas y aplicaciones que funcionan en internet. En <strong>Reyes&Friends</strong>, te ayudamos a tener tu propio sitio web de manera fácil y personalizada.
                        </p>

                            <Link
                                to="/quote-project?service=webProgramming"
                                className="bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded transition-all duration-300 flex items-center gap-2 font-semibold transform hover:scale-105"
                            >
                                <Gem className="h-5 w-5" />
                                Me interesa, cotizar un proyecto
                            </Link>

                    </div>
                </div>
            </section>

            <section className="py-16 bg-zinc-900 text-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-12 text-center relative">
                        <span className="bg-zinc-900 px-4 relative z-10 text-white">Características de la Programación Web</span>
                        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-red-600/50 -z-0"></div>
                    </h2>
                    <div className="flex flex-col gap-16">

                        <div className="flex flex-col md:flex-row items-stretch gap-0 rounded-lg overflow-hidden shadow-lg bg-zinc-800">
                            <div className="md:w-1/2 w-full flex items-center justify-center">
                                <img
                                    src="/img/services/WebProgramming/responsive.png"
                                    alt="Desarrollo Responsive"
                                    className="max-h-[350px] w-auto object-contain"
                                />
                            </div>
                            <div className="md:w-1/2 w-full flex flex-col justify-center p-8">
                                <h3 className="text-2xl font-semibold mb-2 text-red-500">Diseño responsivo: utilízalo en cualquier dispositivo</h3>
                                <p className="text-zinc-200">
                                    El mayor atractivo de una página web es que pueda verse en cualquier dispositivo, 
                                    ya sea un teléfono móvil, una tableta o computadora, simplemente adaptándose de manera automática
                                    a cualquier resolución.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row items-stretch gap-0 rounded-lg overflow-hidden shadow-lg bg-zinc-800">

                            <div className="md:w-1/2 w-full flex flex-col justify-center p-8">
                                <h3 className="text-2xl font-semibold mb-2 text-red-500">No necesitas descargar nada</h3>
                                <p className="text-zinc-200">
                                    Una de las ventajas de la programación web es que no necesitas descargar ningún software para utilizar una aplicación web. 
                                    Todo se ejecuta en el navegador, lo que facilita el acceso y la actualización constante.
                                </p>
                            </div>

                            <div className="md:w-1/2 w-full flex">
                                <img
                                    src="/img/services/WebProgramming/responsive-demo.jpg"
                                    alt="Desarrollo Responsive"
                                    className="object-cover w-full h-full min-h-[260px] max-h-[340px]"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row items-stretch gap-0 rounded-lg overflow-hidden shadow-lg bg-zinc-800">

                            <div className="md:w-1/2 w-full flex items-center justify-center">
                                <img
                                    src="/img/services/WebProgramming/seo.png"
                                    alt="Optimización SEO"
                                    className="max-h-[350px] w-auto object-contain"
                                />
                            </div>

                            <div className="md:w-1/2 w-full flex flex-col justify-center p-8">
                                <h3 className="text-2xl font-semibold mb-2 text-red-500">Optimización SEO: Mejora tu visibilidad en línea</h3>
                                <p className="text-zinc-200">
                                    La optimización para motores de búsqueda (SEO) es crucial para mejorar la visibilidad de tu sitio web. 
                                    Implementamos las mejores prácticas de SEO para asegurarnos de que tu sitio sea fácilmente encontrado por los usuarios.
                                </p>
                            </div>

                        </div>

                        <div className="flex flex-col md:flex-row items-stretch gap-0 rounded-lg overflow-hidden shadow-lg bg-zinc-800">

                            <div className="md:w-1/2 w-full flex flex-col justify-center p-8">
                                <h3 className="text-2xl font-semibold mb-2 text-red-500">Personalizable como tu empresa</h3>
                                <p className="text-zinc-200">
                                    Ofrecemos opciones de personalización total para que tu aplicación web se adapte a tus necesidades específicas. 
                                    Desde el diseño hasta la funcionalidad, trabajamos contigo para crear una solución a medida. Replica la imagen de tu marca y haz que tu sitio web sea único.
                                </p>
                            </div>

                            <div className="md:w-1/2 w-full flex">
                                <img
                                    src="/img/services/WebProgramming/responsive-demo.jpg"
                                    alt="Desarrollo Responsive"
                                    className="object-cover w-full h-full min-h-[260px] max-h-[340px]"
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
};

export default WebProgramming;