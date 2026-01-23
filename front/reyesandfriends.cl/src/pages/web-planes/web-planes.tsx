import { Helmet } from "react-helmet-async";
import { ChevronRight, DollarSign } from "lucide-react";
import { Link } from "react-router";
import HeroSection from "../../layouts/components/hero-section/hero-section";
import { useGetWebPlanes } from "./hooks/useGetWebPlanes";

const WebPlanes = () => {
    const { data, loading, error, retry } = useGetWebPlanes();

    return (
        <>
            <Helmet>
                <title>Planes Web | Reyes&Friends</title>
                <meta
                    name="description"
                    content="Conoce nuestros planes web fijos para facilitar tu presencia online. Elige el plan que más se adapte a tu negocio."
                />
                <meta property="og:title" content="Planes Web | Reyes&Friends" />
                <meta property="og:description" content="Planes web para emprendedores, pymes y empresas. Elige el tuyo y potencia tu negocio online." />
                <meta property="og:image" content="/img/open-graph-images/web-plans.png" />
                <meta property="og:type" content="website" />
                <meta name="twitter:title" content="Planes Web | Reyes&Friends" />
                <meta name="twitter:description" content="Planes web fijos y accesibles para tu negocio. Descubre nuestras opciones." />
                <meta name="twitter:image" content="/img/open-graph-images/web-plans.png" />
            </Helmet>

            <HeroSection
                icon={DollarSign}
                logoImage="img/plans/web-plans-hero.png"
                title="Cotiza tu Plan Web"
                subtitle="¡Lleva tu presencia online al siguiente nivel con nuestros planes web por suscripción mensual! Personaliza el diseño, agrega contenido nuevo cada mes y olvídate de lo técnico: nosotros nos encargamos del hosting, mantenimiento y soporte. Tú solo enfócate en crecer, nosotros hacemos el resto."
            />

            <section className="py-16 bg-zinc-900 text-white">
                <div className="container mx-auto px-4 max-w-7xl">
                    <h2 className="text-3xl mb-8 text-center relative">
                        <span className="bg-zinc-900 px-4 relative z-10 text-white">Planes Web Disponibles</span>
                        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-reyes-dark -z-0"></div>
                    </h2>

                    {loading && (
                        <div className="text-center py-12 text-xl font-semibold">Cargando...</div>
                    )}

                    {error && (
                        <div className="text-center py-12">
                            <div className="text-red-400 mb-4">{error}</div>
                            <button
                                onClick={retry}
                                className="bg-reyes hover:bg-reyes-dark text-white px-6 py-3 rounded font-semibold transition-all"
                            >
                                Reintentar
                            </button>
                        </div>
                    )}

                    {!loading && !error && data && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12 p-12 items-start">
                            <div className="flex flex-col justify-center">
                                {data.images && data.images.length > 0 && (
                                    <img
                                        src={data.images[0].image_url}
                                        alt={`Mockup del proyecto ${data.name}`}
                                        className="rounded shadow-xl w-full max-w-2xl aspect-[16/9] object-cover pointer-events-none mb-6"
                                    />
                                )}
                            </div>
                            <div className="flex flex-col justify-center">
                                <h3 className="text-3xl md:text-5xl text-white mb-4 flex flex-wrap items-center gap-2 md:gap-3 font-bold">
                                    Proyecto <span className="text-reyes-light">{data.name}</span>
                                </h3>
                                <h2 className="text-xl text-white mb-6 font-semibold">
                                    <DollarSign className="inline" />
                                    {data.price_clp?.toLocaleString("es-CL")}/mes
                                </h2>
                                <p className="text-xl text-gray-200 mb-6">
                                    {data.description}
                                </p>
                                <Link
                                    to={`/web-planes/${data.slug}`}
                                    className="flex-1 bg-reyes hover:bg-reyes-dark text-white px-6 sm:px-8 py-3 sm:py-4 rounded transition-all duration-300 flex items-center gap-3 font-semibold hover:scale-105 text-base sm:text-lg justify-center min-w-[140px] sm:min-w-[180px] md:mr-2"
                                >
                                    Ver Detalles
                                    <ChevronRight className="h-6 sm:h-7 w-6 sm:w-7" />
                                </Link>
                            </div>
                        </div>
                    )}

                    {!loading && !error && data && (
                        <div className="mt-12 shadow-[0_2px_10px_-3px_rgba(39,39,42,0.8)] p-6 bg-zinc-800 rounded-sm">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="text-lg font-semibold text-white mb-2">Características</h4>
                                    <ul className="list-disc list-inside space-y-2 text-gray-200 font-semibold">
                                        {data.features.map((f) => (
                                            <li key={f.id}>{f.feature_description}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-white mb-2">Usos prácticos</h4>
                                    <ul className="list-disc list-inside space-y-2 text-gray-200 font-semibold">
                                        {data.usages.map((u) => (
                                            <li key={u.id}>{u.usage_description}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default WebPlanes;