import { Helmet } from "react-helmet-async";
import { DollarSign } from "lucide-react";
import { useParams } from "react-router-dom";
import { useGetWebPlanDetail } from "./hooks/useGetWebPlanDetail";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Info } from "lucide-react";
import { motion } from "framer-motion";

const WebPlanesDetail = () => {
    const { slug } = useParams<{ slug: string }>();
    const { data, loading, error, retry } = useGetWebPlanDetail(slug || "");
    const [selectedIndex, setSelectedIndex] = useState(0);

    return (
        <>
            <Helmet>
                <title>{`Detalles del Plan Web | ${data?.name || "Reyes&Friends"}`}</title>
                <meta
                    name="description"
                    content={`${data?.description || "Planes web para emprendedores, pymes y empresas. Elige el tuyo y potencia tu negocio online."}`}
                />
                <meta property="og:title" content={`Detalles del Plan Web | ${data?.name || "Reyes&Friends"}`} />
                <meta property="og:description" content={`${data?.description || "Planes web para emprendedores, pymes y empresas. Elige el tuyo y potencia tu negocio online."}`} />
                <meta property="og:image" content={`${data?.images?.[0] || "/img/open-graph-images/web-plans.png"}`} />
                <meta property="og:type" content="website" />
                <meta name="twitter:title" content={`Detalles del Plan Web | ${data?.name || "Reyes&Friends"}`} />
                <meta name="twitter:description" content={`${data?.description || "Planes web para emprendedores, pymes y empresas. Elige el tuyo y potencia tu negocio online."}`} />
                <meta name="twitter:image" content={`${data?.images?.[0] || "/img/open-graph-images/web-plans.png"}`} />
            </Helmet>

            <motion.div
                className="bg-zinc-900 min-h-screen pt-16"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <div className="p-4 lg:max-w-7xl max-w-4xl mx-auto">

                    <h2 className="text-3xl mt-12 mb-12 text-center relative">
                        <span className="bg-zinc-900 px-4 relative z-10 text-white">Detalles del Plan Web</span>
                        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-reyes-dark -z-0"></div>
                    </h2>

                    {loading && (
                        <div className="min-h-screen flex items-center justify-center bg-black py-12 rounded-lg">
                            <div className="flex flex-col items-center">
                                <div className="text-gray-400 text-xl font-semibold">Cargando...</div>
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="min-h-screen flex items-center justify-center bg-black py-12 rounded-lg">
                            <div className="flex flex-col items-center">
                                <h1 className="text-2xl md:text-4xl font-bold text-white mb-4">Error</h1>
                                <div className="text-reyes-light mb-4 font-semibold">{error}</div>
                                <button
                                    onClick={retry}
                                    className="bg-reyes hover:bg-reyes-dark text-white px-6 py-3 rounded font-semibold transition-all"
                                >
                                    Reintentar
                                </button>
                            </div>
                        </div>
                    )}

                    {!loading && !error && data && (
                        <>
                            <motion.div
                                className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12 shadow-[0_2px_10px_-3px_rgba(39,39,42,0.8)] p-6 rounded-sm bg-zinc-800"
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                            >
                                <div className="lg:col-span-3 w-full lg:sticky top-0 text-center">
                                    <div className="px-0 py-10 rounded-sm relative bg-transparent">
                                        {data.images && data.images.length > 0 ? (
                                            <motion.div
                                                className="w-full max-w-3xl mx-auto aspect-[16/9] relative"
                                                key={selectedIndex}
                                                initial={{ opacity: 0, scale: 0.96 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ duration: 0.4 }}
                                            >
                                                <img
                                                    src={data.images[selectedIndex].image_url}
                                                    alt={`Imagen ${selectedIndex + 1}`}
                                                    className="absolute inset-0 w-full h-full object-cover rounded-sm pointer-events-none"
                                                />
                                            </motion.div>
                                        ) : (
                                            <div className="text-gray-400">No hay imágenes disponibles.</div>
                                        )}
                                    </div>
                                    {data.images && data.images.length > 1 && (
                                        <div className="mt-4 flex flex-wrap justify-center gap-4 mx-auto">
                                            {data.images.map((img, idx) => (
                                                <motion.button
                                                    key={img.id}
                                                    onClick={() => setSelectedIndex(idx)}
                                                    className={`w-32 aspect-[16/9] flex items-center justify-center rounded-sm p-0 shadow-md cursor-pointer transition-all ${selectedIndex === idx
                                                        ? "ring-2 ring-reyes"
                                                        : "hover:ring-2 hover:ring-reyes-light"
                                                        } bg-transparent overflow-hidden`}
                                                    whileHover={{ scale: 1.06 }}
                                                    whileTap={{ scale: 0.97 }}
                                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                                >
                                                    <img
                                                        src={img.image_url}
                                                        alt={`Miniatura ${idx + 1}`}
                                                        className="w-full h-full object-cover object-top rounded-sm pointer-events-none"
                                                    />
                                                </motion.button>
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
                                    <p className="text-base text-gray-300 mt-6 mb-6">{data.description}</p>

                                    <div className="flex flex-col md:flex-row md:items-center md:gap-4">
                                        <div className="flex items-center gap-4 p-4 relative rounded-md max-w-4xl mx-auto shadow-[0_2px_16px_-3px_rgba(144,144,144,0.4)] bg-white" role="alert">
                                            <span className="block absolute w-1 rounded-full h-[80%] my-auto top-0 bottom-0 left-2 bg-blue-500"></span>
                                            <div className="flex sm:items-center gap-4 ml-3 max-sm:flex-col">
                                                <Info className="shrink-0 w-6 h-6 text-blue-500 hidden md:block" strokeWidth={2} />
                                                <div>
                                                    <h6 className="text-slate-900 text-base font-medium">Llegar y usar? Sin complicaciones.</h6>
                                                    <p className="text-slate-500 text-[13px] mt-1">
                                                        Este proyecto incluye <strong>actualizaciones y mejoras continuas</strong>, <strong>dominio.cl, alojamiento</strong> y <strong>certificado SSL</strong>, todo gestionado por nosotros para que no tengas que preocuparte de nada.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

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
                            </motion.div>
                            <motion.div
                                className="mt-12 shadow-[0_2px_10px_-3px_rgba(39,39,42,0.8)] p-6 bg-zinc-800 rounded-sm"
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
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
                            </motion.div>
                        </>
                    )}
                </div>
            </motion.div>
        </>
    );
};

export default WebPlanesDetail;