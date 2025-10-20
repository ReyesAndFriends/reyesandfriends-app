import { Helmet } from "react-helmet-async";
import { DollarSign, ViewIcon } from "lucide-react";
import { Link } from "react-router";
import HeroSection from "../../layouts/components/hero-section/hero-section";
import ProjectGallery from "./components/ProjectGallery";

const WebPlanes = () => {
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
                subtitle="Proyectos web fijos y accesibles para emprendedores, pymes y empresas. Elige el plan que más se adapte a tu negocio. ¡Solo paga una vez!"
            />

            <section className="py-16 bg-zinc-900 text-wh640pxite">
                <div className="container mx-auto px-4 max-w-7xl">

                    <h2 className="text-3xl mb-12 text-center relative mb-16">
                        <span className="bg-zinc-900 px-4 relative z-10 text-white">¿Como funcionan?</span>
                        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-reyes-dark -z-0"></div>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
                        <div className="flex flex-col items-center justify-center mb-8 md:mb-0">
                            <img
                                src="/img/plans/mobile-ilustration.png"
                                alt="Referencia de un proyecto"
                                className="w-full max-w-xs object-cover pointer-events-none"
                            />
                            <p className="text-sm text-gray-400 mt-2 text-center">Referencia de un Proyecto Web <Link className="text-reyes-light hover:underline" to="https://demo.landingpro.reyesandfriends.cl/" target="_blank">Ver demo</Link></p>
                        </div>
                        <div>
                            <h4 className="text-lg mb-2 text-reyes">Proyectos adaptados a tus necesidades</h4>
                            <h2 className="text-4xl mb-4 text-white">Elige una opción</h2>
                            <p className="text-lg text-gray-200 mb-4">
                                Nuestros <strong>Planes Web</strong> están diseñados para ofrecer soluciones generales, prácticas y accesibles para emprendedores, pymes y empresas que buscan establecer su presencia online de manera rápida y efectiva. Cada plan incluye un conjunto específico de características y funcionalidades que se adaptan a diferentes necesidades y presupuestos.
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
                    <h2 className="text-3xl mb-8 text-center relative">
                        <span className="bg-zinc-900 px-4 relative z-10 text-white">Lista de Proyectos</span>
                        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-reyes-dark -z-0"></div>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12 p-12 items-start">

                        <div className="flex flex-col justify-center">
                            <img
                                src="/img/plans/landing-pro/landing-pro-home.png"
                                alt="Mockup del proyecto LandingPro"
                                className="rounded shadow-xl w-full max-w-2xl aspect-[16/9] object-cover pointer-events-none mb-6"
                            />
                        </div>

                        <div className="flex flex-col justify-center">
                            <h3 className="text-3xl md:text-5xl text-white mb-4 flex flex-wrap items-center gap-2 md:gap-3 font-bold">
                                Proyecto <span className="text-reyes-light">LandingPro</span>
                            </h3>
                            <h2 className="text-xl text-white mb-6 font-semibold"><DollarSign className="inline" />99.990</h2>
                            <p className="text-xl text-gray-200 mb-6">
                                Página web tipo landing page profesional, ideal para presentar servicios, personas, tu negocio o productos de manera efectiva y atractiva. <br /> <br /> Este proyecto está diseñado para captar la atención de tus visitantes y convertirlos en clientes potenciales.
                            </p>
                        </div>

                        <div>
                            <h4 className="text-lg text-reyes-light mb-3 font-semibold text-center">Características</h4>
                            <ul className="list-disc list-inside text-lg text-gray-200 mb-6 pl-4">
                                <li>Diseño moderno y atractivo</li>
                                <li>Optimización SEO básica, posicionamiento en buscadores</li>
                                <li>Formulario de contacto con validación y respuesta de correo electrónico automática</li>
                                <li>Integración con Google Maps (direcciones y ubicación)</li>
                                <li>Adaptabilidad a dispositivos móviles y tabletas (responsive design)</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-lg text-reyes-light mb-3 font-semibold text-center">Usos prácticos</h4>
                            <ul className="list-disc list-inside text-lg text-gray-200 pl-4">
                                <li>Presentación de servicios o productos</li>
                                <li>Captación de clientes potenciales</li>
                                <li>Portafolio profesional</li>
                                <li>Promoción de eventos o lanzamientos</li>
                            </ul>
                        </div>

                    </div>

                    <h2 className="text-3xl mb-8 text-center relative">
                        <span className="bg-zinc-900 px-4 relative z-10 text-white">Imágenes del Proyecto</span>
                        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-reyes-dark -z-0"></div>
                    </h2>

                    <ProjectGallery images={[
                        "/img/plans/landing-pro/landing-pro-home.png",
                        "/img/plans/landing-pro/about-section.png",
                        "/img/plans/landing-pro/clients-section.png",
                        "/img/plans/landing-pro/contact-section.png"
                    ]} />


                </div>
            </section>

            <section className="py-16 bg-zinc-900 text-white">
                <div className="container mx-auto px-4 max-w-7xl">
                    <h2 className="text-3xl mb-8 text-center relative">
                        <span className="bg-zinc-900 px-4 relative z-10 text-white">¿Qué incluye el proyecto?</span>
                        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-reyes-dark -z-0"></div>
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full rounded-lg overflow-hidden">
                            <thead>
                                <tr className="bg-reyes text-white">
                                    <th className="py-3 px-4 text-left">Incluye</th>
                                    <th className="py-3 px-4 text-left">Descripción</th>
                                </tr>
                            </thead>
                            <tbody className="bg-zinc-800">
                                <tr className="border-b border-zinc-700">
                                    <td className="py-3 px-4">Dominio .cl</td>
                                    <td className="py-3 px-4">Primer año gratis. Renovación anual opcional.</td>
                                </tr>
                                <tr className="border-b border-zinc-700">
                                    <td className="py-3 px-4">Hosting</td>
                                    <td className="py-3 px-4">Primer año gratis. Renovación anual opcional.</td>
                                </tr>
                                <tr className="border-b border-zinc-700">
                                    <td className="py-3 px-4">Diseño personalizado</td>
                                    <td className="py-3 px-4">Adaptado a tu marca y necesidades.</td>
                                </tr>
                                <tr className="border-b border-zinc-700">
                                    <td className="py-3 px-4">Optimización SEO</td>
                                    <td className="py-3 px-4">Mejor posicionamiento en buscadores.</td>
                                </tr>
                                <tr className="border-b border-zinc-700">
                                    <td className="py-3 px-4">Formulario de contacto</td>
                                    <td className="py-3 px-4">Con validación y respuesta automática. Correos con diseño personalizado.</td>
                                </tr>
                                <tr className="border-b border-zinc-700">
                                    <td className="py-3 px-4">Integración Google Maps</td>
                                    <td className="py-3 px-4">Ubicación y direcciones de tu negocio.</td>
                                </tr>
                                <tr className="border-b border-zinc-700">
                                    <td className="py-3 px-4">Diseño responsive</td>
                                    <td className="py-3 px-4">Se adapta a móviles y tabletas.</td>
                                </tr>
                                <tr>
                                    <td className="py-3 px-4">Soporte y asesoría</td>
                                    <td className="py-3 px-4">Durante el proceso de desarrollo y entrega.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 justify-center flex">
                        <Link
                            to="/contact"
                            className="bg-reyes text-white px-8 py-3 rounded-lg font-semibold hover:bg-reyes-dark transition-all text-center hover:scale-105 transform"
                        >
                            <DollarSign className="inline-block mr-2 mb-1" size={16} />
                            Me interesa
                        </Link>
                        <Link
                            to="https://demo.landingpro.reyesandfriends.cl/"
                            target="_blank"
                            className="bg-transparent text-white px-8 py-3 rounded-lg font-semibold border-2 border-white hover:bg-white hover:text-reyes transition-all text-center hover:scale-105 transform"
                        >
                            <ViewIcon className="inline-block mr-2 mb-1" size={16} />
                            Ver demo
                        </Link>
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


        </>
    );
};

export default WebPlanes;