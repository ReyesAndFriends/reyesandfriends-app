import { Helmet } from "react-helmet-async";
import { DollarSign, CheckCircle } from "lucide-react";
import useWebPlanesList from "./hooks/useWebPlanesList";
import QuoteWebPlanModal from "./components/quoteWebPlanModal";
import { useState } from "react";
import { Link } from "react-router";
import HeroSection from "../../layouts/components/hero-section/hero-section";

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

            <HeroSection 
            icon={DollarSign}
            logoImage="img/plans/web-plans-hero.png"
            title="Planes Web"
            subtitle="Necesitas algo más simple y rápido? Revisa nuestros planes web fijos y accede a una solución profesional para tu negocio. ¡Solo pagas una vez!"
            />

            <section className="py-16 bg-zinc-900 text-white">
                <div className="container mx-auto px-4 max-w-7xl">

                    <h2 className="text-3xl mb-12 text-center relative mb-16">
                        <span className="bg-zinc-900 px-4 relative z-10 text-white">Planes Web Fijos</span>
                        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-reyes-dark -z-0"></div>
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
                            <h4 className="text-lg mb-2">Rápido, simple y funcional</h4>
                            <h2 className="text-4xl mb-4 text-white">¿Qué incluyen nuestros planes web fijos?</h2>
                            <p className="text-lg text-gray-200 mb-4">
                                Nuestros planes web fijos están diseñados para quienes buscan una solución rápida, sencilla y funcional. Son paquetes ya preparados que nos permiten crear tu sitio en menos tiempo, sin sacrificar calidad ni diseño.
                            </p>
                            <ul className="list-disc list-inside mb-4 text-base md:text-lg text-gray-200">
                                <li>
                                    <strong>Pago único:</strong> Pagas una sola vez y <strong>no te preocupas más</strong>.
                                </li>
                                <li>
                                    <strong>Dominio y hosting incluidos:</strong> Incluye dominio .cl y hosting gratis por el primer año.
                                    <span> Para <strong>dominios .com</strong> u otros, se aplican costos adicionales.</span>
                                </li>
                                <li>
                                    <strong>Mantenimiento anual:</strong> Una vez entregado tu sitio, solo pagas el mantenimiento anual y la renovación del dominio si decides continuar.
                                </li>
                                <li>
                                    <strong>Ideal para proyectos simples:</strong> Páginas informativas, portafolios, emprendimientos y negocios que quieren estar online rápido.
                                </li>
                                <li>
                                    <strong>Diseño moderno y SEO:</strong> Diseños modernos, adaptativos y optimizados para SEO.
                                </li>
                                <li>
                                    <strong>Despliegue incluido:</strong> Nos encargamos del desarrollo completo y la puesta en marcha de tu sitio.
                                </li>
                                <li>
                                    <strong>Escalable:</strong> Puedes agregar más funcionalidades en el futuro sin importar que sea un sitio web fijo.
                                </li>
                            </ul>
                            <p className="text-lg text-gray-200">
                                Con estos proyectos, aseguras una presencia online profesional y efectiva sin complicaciones. Si en el futuro necesitas algo más avanzado, siempre puedes utilizar nuestro <Link to="/quote-project" className="text-reyes hover:text-reyes-light hover:underline transition-all">cotizador para proyectos personalizados</Link> o actualizar tu sitio existente.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-zinc-900 text-white">
                <div className="container mx-auto px-4 max-w-7xl">
                    <h2 className="text-3xl mb-12 text-center relative mb-16">
                        <span className="bg-zinc-900 px-4 relative z-10 text-white">Planes disponibles</span>
                        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-reyes-dark -z-0"></div>
                    </h2>
                    <div className="flex flex-wrap justify-center gap-8 items-stretch">
                        {webPlans.map((plan, idx) => {
                            const isRecommended = idx === 1;
                            return (
                                <div
                                    key={idx}
                                    className={`w-full max-w-xs bg-black rounded-lg shadow-lg p-6 flex flex-col justify-between relative ${isRecommended ? "border-2 border-reyes-dark" : ""
                                        }`}
                                >
                                    {isRecommended && (
                                        <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-reyes text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg z-20">
                                            ★ Recomendado
                                        </div>
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
                                                    <CheckCircle className="text-reyes-light flex-shrink-0 mt-0.5" size={18} />
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="mt-auto flex flex-col items-center">
                                        <div className="text-2xl font-semibold text-reyes-light mb-2">
                                            {plan.price.toLocaleString("es-CL", { style: "currency", currency: "CLP", minimumFractionDigits: 0 })}
                                        </div>
                                        <button
                                            className="bg-reyes hover:bg-reyes-dark text-white px-4 py-2 rounded transition-all text-sm font-semibold cursor-pointer w-full transform hover:scale-105"
                                            onClick={() => handleSelectPlan(plan.slug)}
                                        >
                                            Seleccionar plan
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="py-16 bg-zinc-900 text-white">
                <div className="container mx-auto px-4 max-w-7xl">

                    <h2 className="text-3xl mb-12 text-center relative mb-16">
                        <span className="bg-zinc-900 px-4 relative z-10 text-white">Planes vs. Cotizador</span>
                        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-reyes-dark -z-0"></div>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 mb-8">
                        <div>
                            <h4 className="text-lg text-reyes-light mb-2">Sin importar la opción, te ayudamos</h4>
                            <h2 className="text-4xl mb-4 text-white">¿En qué se diferencian los planes fijos del cotizador de proyectos?</h2>
                            <p className="text-lg text-gray-200 mb-4">
                                A diferencia de nuestro <Link to="/quote-project" className="text-reyes hover:text-reyes-light hover:underline transition-all">cotizador para proyectos</Link>, ideal para soluciones a medida y de mayor complejidad, nuestros planes web fijos están pensados para quienes buscan una alternativa ágil, sencilla y funcional. Son paquetes predefinidos que nos permiten desarrollar tu sitio en menos tiempo, sin sacrificar calidad ni diseño.
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
                            <blockquote className="bg-black rounded-xl px-8 py-8 shadow-lg border-l-4 border-reyes-dark text-center text-xl md:text-2xl text-gray-100 relative z-10">
                                Si no estás seguro de qué opción elegir, siempre podrás utilizar nuestro <Link to="/quote-project" className="text-reyes hover:text-reyes-light hover:underline transition-all">cotizador para proyectos personalizados</Link> y potenciar tu sitio web!
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