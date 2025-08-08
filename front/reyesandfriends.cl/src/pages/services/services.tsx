import { useServiceList } from "../../hooks/services/useServiceList";
import { Link } from "react-router";
import { List } from "lucide-react";
import { Helmet } from "react-helmet-async";

const Services = () => {
    const services = useServiceList();

    return (
        <>
            <Helmet>
                <title>Servicios | Reyes&Friends</title>
                <meta
                    name="description"
                    content="Descubre los servicios que ofrecemos en Reyes&Friends. Esta sección está en construcción, pero pronto podrás ver todo lo que hemos preparado para ti."
                />
                <meta property="og:title" content="Servicios | Reyes&Friends" />
                <meta property="og:description" content="Esta sección está en construcción. Muy pronto mostraremos nuestros servicios y soluciones TI." />
                <meta property="og:image" content="/img/open-graph-images/service-list.png" />
                <meta property="og:type" content="website" />

                <meta name="twitter:title" content="Servicios | Reyes&Friends" />
                <meta name="twitter:description" content="Servicios y soluciones desarrolladas por Reyes&Friends. Próximamente disponible." />
                <meta name="twitter:image" content="/img/open-graph-images/service-list.png" />
            </Helmet>
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
                            src="/img/services/FullList/services-list.png"
                            alt="Ilustración de servicios"
                            className="h-96 w-auto object-contain"
                        />
                    </div>
                    <div className="max-w-2xl text-white mx-auto md:mx-0 md:pl-12 lg:pl-24 flex flex-col items-center md:items-start">
                        <h1 className="text-4xl md:text-5xl mb-6 border-b-4 border-red-500 pb-4 inline-flex items-center gap-4">
                            <List size={40} /> Nuestros Servicios
                        </h1>
                        <p className="text-xl mb-8">
                            Ofrecemos una amplia gama de servicios digitales para ayudarte a destacar en el mundo online. Desde desarrollo web hasta un panel empresarial personalizado, tenemos la solución perfecta para ti.
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
                                            className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded transition-colors text-sm flex items-center gap-2 font-semibold"
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
