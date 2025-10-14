import { useServiceList } from "../../hooks/services/useServiceList";
import { ChevronRight, } from "lucide-react";
import { Link } from "react-router";
import { Menu } from "lucide-react";
import { Helmet } from "react-helmet-async";
import HeroSection from "../../layouts/components/HeroSection/HeroSection";

const Services = () => {
    const services = useServiceList();

    return (
        <>
            <Helmet>
                <title>Servicios | Reyes&Friends</title>
                <meta
                    name="description"
                    content="Explora nuestra completa gama de servicios digitales en Reyes&Friends. Desarrollo web, soluciones empresariales, hosting y más para impulsar tu presencia online."
                />
                <meta property="og:title" content="Servicios | Reyes&Friends" />
                <meta property="og:description" content="Servicios digitales completos: desarrollo web, soluciones empresariales, hosting y más. Descubre cómo podemos ayudarte a crecer online." />
                <meta property="og:image" content="/img/open-graph-images/service-list.png" />
                <meta property="og:type" content="website" />

                <meta name="twitter:title" content="Servicios | Reyes&Friends" />
                <meta name="twitter:description" content="Servicios digitales profesionales: desarrollo web, hosting, soluciones empresariales y más. Tu partner tecnológico de confianza." />
                <meta name="twitter:image" content="/img/open-graph-images/service-list.png" />
            </Helmet>

            <HeroSection 
            icon={Menu}
            logoImage="/img/services/FullList/services-list.png"
            title="Nuestros Servicios"
            subtitle="Ofrecemos una amplia gama de servicios digitales para ayudarte a destacar en el mundo online. Desde desarrollo web hasta un panel empresarial personalizado, tenemos la solución perfecta para ti." 
            />

            <section className="py-16 bg-zinc-900 text-white">
                <div className="container mx-auto px-4 max-w-7xl">
                    <h2 className="text-3xl mb-12 text-center relative">
                        <span className="bg-zinc-900 px-4 relative z-10 text-white">Lista de servicios</span>
                        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-reyes-dark -z-0"></div>
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
                                            className="w-full h-64 object-cover object-center rounded-md pointer-events-none"
                                            style={{ aspectRatio: "1 / 1" }}
                                        />
                                    </div>
                                    <div className="flex-grow">
                                        <h3 className="text-md font-semibold mb-2 text-center flex items-center justify-center gap-2">
                                            <span>{service.icon}</span>
                                            {service.name}
                                        </h3>
                                        <p className="text-xs text-gray-300 text-center line-clamp-3">
                                            {service.description}
                                        </p>
                                    </div>
                                    <div className="flex justify-center mt-3">
                                        <Link
                                            className="bg-reyes hover:bg-reyes-dark text-white px-4 py-2 rounded transition-colors text-sm flex items-center gap-2 font-semibold"
                                            to={service.path}
                                        >
                                            Ver detalles <ChevronRight />
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
