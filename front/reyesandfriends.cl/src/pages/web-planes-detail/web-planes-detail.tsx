import { Helmet } from "react-helmet-async";
import { DollarSign } from "lucide-react";
import { useParams } from "react-router-dom";
import { useGetWebPlanDetail } from "./hooks/useGetWebPlanDetail";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const WebPlanesDetail = () => {
    const { slug } = useParams<{ slug: string }>();
    const { data, loading, error, retry } = useGetWebPlanDetail(slug || "");
    const [selectedIndex, setSelectedIndex] = useState(0);

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

            <div className="bg-zinc-900 min-h-screen pt-16">
                <div className="p-4 lg:max-w-7xl max-w-4xl mx-auto">

                    {loading && (
                        <div className="text-center py-12 text-xl font-semibold text-white">Cargando...</div>
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
                        <>
                            <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12 shadow-[0_2px_10px_-3px_rgba(39,39,42,0.8)] p-6 rounded-sm bg-zinc-800">

                                <div className="lg:col-span-3 w-full lg:sticky top-0 text-center">
                                    <div className="px-0 py-10 rounded-sm relative bg-transparent">
                                        {data.images && data.images.length > 0 ? (
                                            <div className="w-full max-w-3xl mx-auto aspect-[16/9] relative">
                                                <img
                                                    src={data.images[selectedIndex].image_url}
                                                    alt={`Imagen ${selectedIndex + 1}`}
                                                    className="absolute inset-0 w-full h-full object-cover rounded-sm pointer-events-none"
                                                />
                                            </div>
                                        ) : (
                                            <div className="text-gray-400">No hay imágenes disponibles.</div>
                                        )}
                                    </div>
                                    {data.images && data.images.length > 1 && (
                                        <div className="mt-4 flex flex-wrap justify-center gap-4 mx-auto">
                                            {data.images.map((img, idx) => (
                                                <button
                                                    key={img.id}
                                                    onClick={() => setSelectedIndex(idx)}
                                                    className={`w-32 aspect-[16/9] flex items-center justify-center rounded-sm p-0 shadow-md cursor-pointer transition-all ${selectedIndex === idx
                                                            ? "ring-2 ring-reyes"
                                                            : "hover:ring-2 hover:ring-reyes-light"
                                                        } bg-transparent overflow-hidden`}
                                                >
                                                    <img
                                                        src={img.image_url}
                                                        alt={`Miniatura ${idx + 1}`}
                                                        className="w-full h-full object-cover object-top rounded-sm pointer-events-none"
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="lg:col-span-2">
                                    <h3 className="text-2xl md:text-4xl font-bold text-white mb-4">
                                        Proyecto <span className="text-reyes-light">{data.name}</span>
                                    </h3>
                                    <div className="flex flex-wrap gap-4 mt-2 items-center">
                                        <p className="text-white text-2xl font-semibold flex items-center">
                                            <DollarSign className="inline mr-1" />
                                            {data.price_clp?.toLocaleString("es-CL")}/mes
                                        </p>
                                    </div>
                                    <p className="text-base text-gray-300 mt-6">{data.description}</p>

                                    <Link
                                        to={`/web-planes/${data.slug}/quote`}
                                        className="mt-4 flex-1 bg-reyes hover:bg-reyes-dark text-white px-6 sm:px-8 py-3 sm:py-4 rounded transition-all duration-300 flex items-center gap-3 font-semibold hover:scale-105 text-base sm:text-lg justify-center min-w-[140px] sm:min-w-[180px] md:mr-2"
                                    >
                                        Contratar este plan
                                        <ChevronRight className="h-6 sm:h-7 w-6 sm:w-7" />
                                    </Link>

                                    <div className="flex justify-center items-center mt-4">
                                        <a
                                            href={`${data.demo_url}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-base text-reyes-light font-semibold hover:underline"
                                        >
                                            Ver Demo Online
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 shadow-[0_2px_10px_-3px_rgba(39,39,42,0.8)] p-6 bg-zinc-800 rounded-sm">
                                <h3 className="text-xl font-semibold text-white mb-6">Información del producto</h3>
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
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default WebPlanesDetail;