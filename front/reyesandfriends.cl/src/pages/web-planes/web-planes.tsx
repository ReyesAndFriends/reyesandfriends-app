import { Helmet } from "react-helmet-async";
import { DollarSign } from "lucide-react";
import useWebPlanesList from "./hooks/useWebPlanesList";
import QuoteWebPlanModal from "./components/quoteWebPlanModal";
import React, { useState } from "react";

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
        // No limpiamos selectedSlug aquí, lo haremos en onExitComplete
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
                            className="h-96 w-auto object-contain"
                        />
                    </div>
                    <div className="max-w-2xl text-white mx-auto md:mx-0 md:pl-12 lg:pl-24 flex flex-col items-center md:items-start">
                        <span className="mb-4 bg-red-600 rounded-full px-4 py-1 text-sm font-semibold">
                            ¡Planes sencillos y accesibles!
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
                    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
                        <div className="flex justify-center mb-8 md:mb-0">
                            <img
                                src="/img/planes/ilustracion-planes-fijos.png"
                                alt="Ilustracion de planes fijos"
                                className="rounded-lg shadow-lg w-full max-w-md aspect-[16/9] object-cover"
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
                    <h2 className="text-3xl mb-12 text-center text-red-600 relative">
                        <span className="bg-zinc-900 px-4 relative z-10 text-white">Nuestros planes web</span>
                        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-red-600/50 -z-0"></div>
                    </h2>
                    <div className="flex flex-wrap justify-center gap-8 items-stretch">
                        {webPlans.map((plan, idx) => (
                            <div
                                key={idx}
                                className="w-full max-w-xs bg-black rounded-lg shadow-lg p-6 flex flex-col h-[540px] justify-between"
                            >
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
                                    <ul className="text-xs text-gray-200 mb-4 list-disc list-inside overflow-auto max-h-32">
                                        {plan.features.map((feature, i) => (
                                            <li key={i}>{feature}</li>
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
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 text-white">
                <div className="container mx-auto px-4 max-w-7xl">
                    <h2 className="text-3xl mb-12 text-center text-red-600 relative">
                        <span className="bg-zinc-900 px-4 relative z-10 text-white">Páginas simples, lindas y funcionales</span>
                        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-red-600/50 -z-0"></div>
                    </h2>
                    <div className="flex flex-col items-center">
                        <div className="relative mb-8">
                            <blockquote className="bg-black rounded-xl px-8 py-8 shadow-lg border-l-4 border-red-600 text-center text-xl md:text-2xl text-gray-100 relative z-10">
                                Nuestros planes fijos son perfectos si buscas una web sencilla, bonita y lista en poco tiempo, sin complicaciones. Ideales para quienes quieren estar online rápido y sin preocuparse por detalles técnicos. Si necesitas algo más avanzado, como una tienda o un sistema a medida, revisa nuestros servicios personalizados.
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