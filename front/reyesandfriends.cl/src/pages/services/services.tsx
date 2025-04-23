import { useServiceList } from "../../hooks/services/useServiceList";
import { Link } from "react-router";

const Services = () => {
    const services = useServiceList();

    return (
        <>
            <section className="bg-cover bg-center relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#891818] to-[#5A1410]"></div>
                <div className="container mx-auto px-4 py-24 relative z-10 grid grid-cols-1 md:grid-cols-2 items-center gap-8">
                    <div className="flex justify-center">
                        <img
                            src="/img/services/servers.png"
                            alt="Computer illustration"
                            className="max-w-full h-auto"
                        />
                    </div>
                    <div className="max-w-2xl text-white mx-auto md:mx-0 md:pl-12 lg:pl-24">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 border-b-4 border-red-500 pb-4 inline-block">
                            Nuestros servicios
                        </h1>
                        <p className="text-xl mb-8 text-red-100">
                            En Reyes&Friends buscamos adaptarnos a cada necesidad de nuestros clientes, por lo que ofrecemos distintas soluciones
                            informáticas que puedan beneficiar a tu empresa. Revisa la lista completa de nuestros servicios a continuación.
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-zinc-900 text-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-8 text-center">Explora Nuestros Servicios</h2>
                    <div className="flex flex-wrap justify-center gap-8">
                        {services
                            .filter((service) => service.name !== "Lista completa")
                            .map((service, index) => (
                                <div
                                    key={index}
                                    className="w-full max-w-xs bg-gradient-to-b from-red-700 to-black rounded-lg shadow-lg p-4 flex flex-col justify-between"
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
                                            className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded transition-colors text-sm"
                                            to={service.path}
                                        >
                                            Ver detalles
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
