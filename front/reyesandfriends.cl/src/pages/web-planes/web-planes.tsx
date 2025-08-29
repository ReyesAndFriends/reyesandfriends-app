import { Helmet } from "react-helmet-async";
import { DollarSign, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import useWebPlanesList from "./hooks/useWebPlanesList";
import QuoteWebPlanModal from "./components/quoteWebPlanModal";
import { useState } from "react";
import { Link } from "react-router";

const WebPlanes = () => {
    const webPlans = useWebPlanesList();
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

    const handleSelectPlan = (slug: string) => {
        setSelectedSlug(slug);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

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
                            src="/img/plans/web-plans-hero.png"
                            alt="Ilustración de planes web"
                            className="h-96 w-auto object-contain pointer-events-none"
                        />
                    </div>
                    <div className="max-w-2xl text-white mx-auto md:mx-0 md:pl-12 lg:pl-24 flex flex-col items-center md:items-start">
                        <span className="mb-4 bg-red-600 rounded-full px-4 py-1 text-sm font-semibold">
                            ¡Solo pagas una vez!
                        </span>
                        <h1 className="text-4xl md:text-5xl mb-6 border-b-4 border-red-500 pb-4 inline-flex items-center gap-4">
                            <DollarSign size={40} /> Planes Web Fijos
                        </h1>
                        <p className="text-xl mb-8">
                            Necesitas un todo en uno sin tanta complejidad? Nuestros planes web fijos están diseñados para ofrecerte una solución completa y asequible, adaptada a las necesidades de tu negocio.
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-zinc-900 text-white">
                <div className="container mx-auto px-4 max-w-7xl">

                    <h2 className="text-3xl mb-12 text-center text-red-600 relative mb-16">
                        <span className="bg-zinc-900 px-4 relative z-10 text-white">Planes Web Fijos</span>
                        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-red-600/50 -z-0"></div>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
                        <div className="flex justify-center mb-8 md:mb-0">
                            <img
                                src="/img/plans/ilustracion-planes-fijos.jpg"
                                alt="Ilustracion de planes fijos"
                                className="rounded-lg shadow-lg w-full max-w-md aspect-[16/9] object-cover pointer-events-none"
                            />
                        </div>
                        <div>
                            <h4 className="text-lg text-red-500 mb-2">Rápido, simple y funcional</h4>
                            <h2 className="text-4xl mb-4 text-white">¿Qué incluyen nuestros planes web fijos?</h2>
                            <p className="text-lg text-gray-200 mb-4">
                                Nuestros planes web fijos están diseñados para quienes buscan una solución rápida, sencilla y funcional. Son paquetes ya preparados que nos permiten crear tu sitio en menos tiempo, sin sacrificar calidad ni diseño.
                            </p>
                            <ul className="list-disc list-inside mb-4 text-base md:text-lg text-gray-200">
                                <li>Pago único por el desarrollo inicial de tu sitio web.</li>
                                <li>Incluye dominio .cl y hosting gratis por el primer año.</li>
                                <li>Una vez entregado tu sitio, solo pagas el mantenimiento anual y la renovación del dominio si decides continuar.</li>
                                <li>Ideal para proyectos simples: páginas informativas, portafolios, emprendimientos y negocios que quieren estar online rápido.</li>
                            </ul>
                            <p className="text-lg text-gray-200">
                                Así puedes tener presencia online profesional, sin complicaciones ni costos mensuales. Si en el futuro necesitas algo más avanzado, siempre podrás migrar a un servicio personalizado.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-zinc-900 text-white">
                <div className="container mx-auto px-4 max-w-7xl">
                    <h2 className="text-3xl mb-12 text-center text-red-600 relative mb-16">
                        <span className="bg-zinc-900 px-4 relative z-10 text-white">Planes disponibles</span>
                        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-red-600/50 -z-0"></div>
                    </h2>
                    <div className="flex flex-wrap justify-center gap-8 items-stretch">
                        {webPlans.map((plan, idx) => {
                            const isRecommended = idx === 1;
                            const Card = isRecommended ? motion.div : "div";
                            return (
                                <Card
                                    key={idx}
                                    className={`w-full max-w-xs bg-black rounded-lg shadow-lg p-6 flex flex-col justify-between relative ${
                                        isRecommended ? "border-2 border-red-600 shadow-xl scale-105 z-10" : ""
                                    }`}
                                    {...(isRecommended
                                        ? {
                                              initial: { scale: 0.95, boxShadow: "0 0 0px #dc2626" },
                                              animate: { scale: 1.05, boxShadow: "0 0 32px #dc262655" },
                                              transition: { type: "spring", stiffness: 200, damping: 15 }
                                          }
                                        : {})}
                                >
                                    {isRecommended && (
                                        <motion.div
                                            className="absolute -top-5 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg z-20"
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                                        >
                                            ★ Recomendado
                                        </motion.div>
                                    )}
                                    <div className="overflow-hidden rounded-md mb-3">
                                        <img
                                            src={plan.image}
                                            alt={plan.name}
                                            className="w-full h-48 object-cover object-center rounded-md pointer-events-none"
                                            style={{ aspectRatio: "1 / 1" }}
                                        />
                                    </div>
                                    <div className="flex-grow flex flex-col items-center">
                                        <h3 className="text-lg font-bold mb-2 text-center">{plan.name}</h3>
                                        <p className="text-xs text-gray-300 text-center mb-3">{plan.description}</p>
                                        <ul className="text-xs text-gray-200 mb-4 space-y-2">
                                            {plan.features.map((feature, i) => (
                                                <li key={i} className="flex items-start gap-2">
                                                    <CheckCircle className="text-red-600 flex-shrink-0 mt-0.5" size={18} />
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="mt-auto flex flex-col items-center">
                                        <div className="text-2xl font-semibold text-red-500 mb-2">
                                            {plan.price.toLocaleString("es-CL", { style: "currency", currency: "CLP", minimumFractionDigits: 0 })}
                                        </div>
                                        <button
                                            className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded transition-colors text-sm font-semibold cursor-pointer w-full"
                                            onClick={() => handleSelectPlan(plan.slug)}
                                        >
                                            Seleccionar plan
                                        </button>
                                    </div>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="py-16 bg-zinc-900 text-white">
                <div className="container mx-auto px-4 max-w-7xl">

                    <h2 className="text-3xl mb-12 text-center text-red-600 relative mb-16">
                        <span className="bg-zinc-900 px-4 relative z-10 text-white">La gran diferencia</span>
                        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-red-600/50 -z-0"></div>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 mb-8">
                        <div>
                            <h4 className="text-lg text-red-500 mb-2">Una forma diferente de hacer las cosas</h4>
                            <h2 className="text-4xl mb-4 text-white">¿En qué se diferencian los planes fijos del cotizador de proyectos?</h2>
                            <p className="text-lg text-gray-200 mb-4">
                                A diferencia de nuestro cotizador de proyectos, ideal para soluciones a medida y de mayor complejidad, nuestros planes web fijos están pensados para quienes buscan una alternativa ágil, sencilla y funcional. Son paquetes predefinidos que nos permiten desarrollar tu sitio en menos tiempo, sin sacrificar calidad ni diseño.
                            </p>
                            <ul className="list-disc list-inside mb-4 text-base md:text-lg text-gray-200">
                                <li>Precios fijos y totalmente transparentes.</li>
                                <li>Entrega rápida y eficiente.</li>
                                <li>Soluciones simples y efectivas.</li>
                                <li>Tiempo de desarrollo reducido.</li>
                                <li>Ideales para proyectos sencillos: páginas informativas, portafolios, emprendimientos y negocios que desean estar online rápidamente.</li>
                            </ul>
                        </div>
                        <div className="flex justify-center mb-8 md:mb-0">
                            <img
                                src="/img/plans/code_difference.png"
                                alt="Diferencia de código"
                                className="w-full max-w-md object-cover pointer-events-none"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="relative mb-8">
                            <blockquote className="bg-black rounded-xl px-8 py-8 shadow-lg border-l-4 border-red-600 text-center text-xl md:text-2xl text-gray-100 relative z-10">
                                ¿Buscas una solución rápida y sin complicaciones? Nuestros planes web fijos son la opción perfecta para ti. Si en el futuro requieres algo más avanzado, siempre podrás utilizar nuestro <Link to="/quote-project" className="text-red-500 underline">cotizador para proyectos personalizados</Link> o actualizar tu sitio existente.
                            </blockquote>
                        </div>
                    </div>
                </div>
            </section>


            {selectedSlug && (
                <QuoteWebPlanModal
                    slug={selectedSlug}
                    open={modalOpen}
                    onClose={handleCloseModal}
                />
            )}
        </>
    );
};

export default WebPlanes;