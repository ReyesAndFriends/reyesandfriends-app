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
                        />
                    </div>
                    <div className="max-w-2xl text-white mx-auto md:mx-0 md:pl-12 lg:pl-24 flex flex-col items-center md:items-start">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 border-b-4 border-red-500 pb-4 inline-flex items-center gap-4">
                            <Globe size={40} /> Programación Web
                        </h1>
                        <p className="text-xl mb-8 text-red-100">
                            La programación web, el proceso de crear aplicaciones y sitios web, es esencial para cualquier negocio que quiera tener presencia en línea. En Reyes&Friends, ofrecemos soluciones personalizadas que se adaptan a tus necesidades específicas.
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
                    <h2 className="text-3xl font-bold mb-12 text-center text-red-600 relative">
                        <span className="bg-zinc-900 px-4 relative z-10 text-white">¿Qué podemos hacer por tí?</span>
                        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-red-600/50 -z-0"></div>
                    </h2>
                    <div className="flex flex-wrap justify-center gap-8">
                        <div className="w-full max-w-xs p-4 flex flex-col justify-between bg-black rounded-sm border-t-4 border-red-700">
                            <div className="overflow-hidden rounded-md mb-3">
                                <img
                                    src="/img/services/WebProgramming/webprogramming_code.webp"
                                    alt=""
                                    className="w-full h-64 object-cover object-center rounded-md"
                                />
                            </div>
                            <div className="flex flex-col items-center justify-center mb-3">
                                <h3 className="text-md font-semibold text-center">Desarrollo a medida</h3>
                            </div>
                            <p className="text-s text-gray-300 text-center">
                                Creamos aplicaciones web personalizadas según los requerimientos de tu proyecto.
                            </p>
                        </div>
                        <div className="w-full max-w-xs p-4 flex flex-col justify-between bg-black rounded-sm border-t-4 border-red-700">
                            <div className="overflow-hidden rounded-md mb-3">
                                <img
                                    src="/img/services/WebProgramming/responsive-demo.jpg"
                                    alt=""
                                    className="w-full h-64 object-cover object-center rounded-md"
                                />
                            </div>
                            <div className="flex flex-col items-center justify-center mb-3">
                                <h3 className="text-md font-semibold text-center">Diseño Responsivo</h3>
                            </div>
                            <p className="text-s text-gray-300 text-center">
                                Interfaces que se adaptan a cualquier dispositivo: móviles, tablets y computadores.
                            </p>
                        </div>
                        <div className="w-full max-w-xs p-4 flex flex-col justify-between bg-black rounded-sm border-t-4 border-red-700">
                            <div className="overflow-hidden rounded-md mb-3">
                                <img
                                    src="/img/services/WebProgramming/website-purposes.png"
                                    alt=""
                                    className="w-full h-64 object-cover object-center rounded-md"
                                />
                            </div>
                            <div className="flex flex-col items-center justify-center mb-3">
                                <h3 className="text-md font-semibold text-center">Múltiples propósitos</h3>
                            </div>
                            <p className="text-s text-gray-300 text-center">
                                Podemos desarrollar cualquier tipo de sitio web que necesites, si nos cuentas tu idea, te ayudamos a hacerla realidad.
                            </p>
                        </div>
                        <div className="w-full max-w-xs p-4 flex flex-col justify-between bg-black rounded-sm border-t-4 border-red-700">
                            <div className="overflow-hidden rounded-md mb-3">
                                <img
                                    src="/img/services/WebProgramming/2799915.jpg"
                                    alt=""
                                    className="w-full h-64 object-cover object-center rounded-md"
                                />
                            </div>
                            <div className="flex flex-col items-center justify-center mb-3">
                                <h3 className="text-md font-semibold text-center">Sistemas de gestión</h3>
                            </div>
                            <p className="text-s text-gray-300 text-center">
                                Podemos crear un panel personalizado para que gestiones tu negocio de manera eficiente y única.
                            </p>
                        </div>
                    </div>
                </div>

            </section>
        </>
    );
};

export default WebProgramming;