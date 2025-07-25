import { useServiceList } from "../../hooks/services/useServiceList";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

const Services = () => {
    const services = useServiceList();

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
                            src="/img/services/FullList/logo.png"
                            alt="Ilustración de servicios"
                            className="max-w-full h-auto"
                        />
                    </div>
                    <div className="max-w-2xl text-white mx-auto md:mx-0 md:pl-12 lg:pl-24 flex flex-col items-center md:items-start">
                        <img
                            src="/img/logo/crown_white.svg"
                            className="w-20 h-20 object-contain mx-auto mb-4"
                            alt="reyes&friends_crown"
                        />
                        <h1 className="text-4xl md:text-5xl mb-6 border-b-4 border-red-500 pb-4 inline-block">
                            Nuestros servicios
                        </h1>
                        <p className="text-xl mb-8">
                            En Reyes&Friends buscamos adaptarnos a cada necesidad de nuestros clientes, por lo que ofrecemos distintas soluciones
                            informáticas que puedan beneficiar a tu empresa. Revisa la lista completa de nuestros servicios a continuación.
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-zinc-900 text-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl mb-12 text-center text-red-600 relative">
                        <span className="bg-zinc-900 px-4 relative z-10 text-white">Lista de servicios</span>
                        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-red-600/50 -z-0"></div>
                    </h2>
                    <div className="flex flex-wrap justify-center gap-8">
                        {services
                            .filter((service) => service.name !== "Lista completa")
                            .map((service, index) => (
                                <div
                                    key={index}
                                    className="w-full max-w-xs bg-black rounded-lg shadow-lg p-4 flex flex-col justify-between"
                                >
                                    <div className="overflow-hidden rounded-md mb-3">
                                        <img
                                            src={service.image}
                                            alt={service.name}
                                            className="w-full h-64 object-cover object-center rounded-md"
                                            style={{ aspectRatio: "1 / 1" }}
                                        />
                                    </div>
                                    <div className="flex-grow">
                                        <h3 className="text-md font-semibold mb-2 text-center">{service.name}</h3>
                                        <p className="text-xs text-gray-300 text-center line-clamp-3">
                                            {service.description}
                                        </p>
                                    </div>
                                    <div className="flex justify-center mt-3">
                                        <Link
                                            className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded transition-colors text-sm flex items-center gap-2"
                                            to={service.path}
                                        >
                                            Ver detalles
                                            <ArrowRight size={16} />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Services;
