import React from "react";
import { Globe, ChevronRight, Building, Gem, Store, Speech, HandHeart, MonitorSmartphone, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import useHomeGetMethodologySteps from "./useHomeGetMethodologySteps";

const Home: React.FC = () => {
    const methodologySteps = useHomeGetMethodologySteps();

    return (
        <>
            <section className="bg-cover bg-center relative min-h-[800px] md:min-h-[800px] flex items-center">
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
                <div className="container mx-auto px-4 py-24 relative z-10 flex flex-col items-center justify-center text-center flex-1">
                    <div className="max-w-2xl text-white mx-auto">
                        <img
                        src="/img/logo/crown_white.svg"
                        className="w-36 h-36 object-contain mx-auto"
                        alt="reyes&friends_crown"
                        />
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 border-b-4 border-red-500 pb-4 inline-block">
                            Impulsamos tu crecimiento digital
                        </h1>
                        <p className="text-xl mb-8 text-red-100">
                            Desarrollamos software y soluciones tecnológicas a medida para empresas y emprendedores. 
                            Desde sitios web hasta plataformas avanzadas, hacemos realidad tus ideas.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/quote-project" className="bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded transition-colors flex items-center gap-2 font-semibold">
                                <Gem className="h-5 w-5" />
                                Cotiza tu proyecto
                            </Link>
                            <Link to="/contact" className="bg-transparent hover:bg-red-800/30 text-white px-6 py-3 rounded border-2 border-white transition-colors flex items-center gap-2 font-semibold">
                                <Mail className="h-5 w-5" />
                                Contáctanos
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-zinc-900 text-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-12 text-center text-red-600 relative">
                        <span className="bg-zinc-900 px-4 relative z-10 text-white">¿Que hacemos?</span>
                        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-red-600/50 -z-0"></div>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                        <div className="bg-black p-6 rounded-sm shadow-md border-t-4 border-red-700 hover:shadow-lg transition-shadow flex flex-col items-center">
                            <div className="w-16 h-16 bg-red-900/30 rounded-full flex items-center justify-center mb-4">
                                <Globe className="h-8 w-8 text-red-500" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-red-500 text-center">Programación web</h3>
                            <p className="text-gray-300 mb-4 text-center">
                                Necesitas un sitio web atractivo y funcional? Creamos páginas web personalizadas, optimizadas para SEO y adaptadas a tus necesidades.
                            </p>
                            <Link to="/services/web-development" className="text-red-500 hover:text-red-400 flex items-center gap-1">
                                Más información <ChevronRight className="h-4 w-4" />
                            </Link>
                        </div>

                        <div className="bg-black p-6 rounded-sm shadow-md border-t-4 border-red-700 hover:shadow-lg transition-shadow flex flex-col items-center">
                            <div className="w-16 h-16 bg-red-900/30 rounded-full flex items-center justify-center mb-4">
                                <Building className="h-8 w-8 text-red-500" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-red-500 text-center">Software empresarial</h3>
                            <p className="text-gray-300 mb-4 text-center">
                                Necesitas algún software específico para tu empresa? Desarrollamos aplicaciones a medida que optimizan tus procesos y mejoran la productividad.
                            </p>
                            <Link to="/services/bussiness-software" className="text-red-500 hover:text-red-400 flex items-center gap-1">
                                Más información <ChevronRight className="h-4 w-4" />
                            </Link>
                        </div>

                        <div className="bg-black p-6 rounded-sm shadow-md border-t-4 border-red-700 hover:shadow-lg transition-shadow flex flex-col items-center">
                            <div className="w-16 h-16 bg-red-900/30 rounded-full flex items-center justify-center mb-4">
                                <Gem className="h-8 w-8 text-red-500" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-red-500 text-center">Páginas web promocionales</h3>
                            <p className="text-gray-300 mb-4 text-center">
                                Quieres promocionar tu negocio | emprendimiento? Creamos páginas web promocionales que destacan tus productos y servicios, ayudando a atraer más clientes. Podemos integrar formularios de contacto, conectar redes sociales y más.
                            </p>
                            <Link to="/services/promotional-web" className="text-red-500 hover:text-red-400 flex items-center gap-1">
                                Más información <ChevronRight className="h-4 w-4" />
                            </Link>
                        </div>

                        <div className="bg-black p-6 rounded-sm shadow-md border-t-4 border-red-700 hover:shadow-lg transition-shadow flex flex-col items-center">
                            <div className="w-16 h-16 bg-red-900/30 rounded-full flex items-center justify-center mb-4">
                                <Store className="h-8 w-8 text-red-500" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-red-500 text-center">Páginas E-Commerce</h3>
                            <p className="text-gray-300 mb-4 text-center">
                                Vende tus productos en línea con nuestras soluciones de comercio electrónico. Creamos tiendas virtuales seguras con implementación de pasarelas de pago.
                            </p>
                            <Link to="/services/ecommerce-web" className="text-red-500 hover:text-red-400 flex items-center gap-1">
                                Más información <ChevronRight className="h-4 w-4" />
                            </Link>
                        </div>

                    </div>
                </div>
            </section>

            <section className="py-16 bg-black text-white">
                <div className="container mx-auto px-4 max-w-5xl grid grid-cols-1 md:grid-cols-2 items-center gap-8">
                    <div className="text-center md:text-left">
                        <h2 className="text-3xl font-bold mb-6 text-red-600">
                            Comparte lo último de tu negocio
                        </h2>
                        <p className="mb-6">
                            Muestra tus productos, servicios o novedades de una manera atractiva y profesional. Creamos soluciones visuales que capturan la atención de tus clientes y destacan lo mejor de tu negocio.
                        </p>
                        <Link
                            to="/quote-project"
                            className="inline-flex items-center gap-2 bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded transition-colors font-semibold shadow-md"
                        >
                            <Gem className="h-5 w-5" />
                            Cotiza tu proyecto
                        </Link>
                    </div>
                    <div className="flex justify-center">
                        <img
                            src="/img/index/business1.jpg"
                            alt="Business showcase"
                            className="rounded shadow-md max-w-full h-auto"
                        />
                    </div>
                </div>
            </section>

            <section className="py-16 bg-zinc-900 text-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-12 text-center text-red-600 relative">
                        <span className="bg-zinc-900 px-4 relative z-10 text-white">Nuestra metodología de trabajo</span>
                        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-red-600/50 -z-0"></div>
                    </h2>
                    <div className="flex justify-between items-center relative">
                        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-red-600/50 -z-0"></div>
                        {methodologySteps.map(({ step, title, description, Icon }, index) => (
                            <div key={index} className="bg-black p-4 shadow-md border-t-4 border-red-700 hover:shadow-lg transition-shadow flex flex-col items-center w-1/5 relative z-10">
                                <div className="w-12 h-12 bg-red-900/30 rounded-full flex items-center justify-center mb-2">
                                    <Icon className="h-6 w-6 text-red-500" />
                                </div>
                                <h3 className="text-lg font-bold mb-2 text-red-500 text-center">{step}. {title}</h3>
                                <p className="text-gray-300 text-center text-sm">{description}</p>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-8">
                        <p>
                            "De esta manera, garantizamos un proceso claro y efectivo que nos permite entregar resultados de alta calidad, adaptados a las necesidades de cada cliente.""
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-zinc-900 text-white">
                <div className="container mx-auto px-4 max-w-5xl">
                    <h2 className="text-3xl font-bold mb-12 text-center text-red-600">
                        Lleva tu negocio más allá
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-red-900/30 rounded-full flex items-center justify-center mb-4 mx-auto">
                                <Speech className="h-8 w-8 text-red-500" />
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-red-500">Comunícate con tus clientes</h3>
                            <p className="text-gray-300">
                                Utiliza formularios personalizados para recibir consultas y mejorar la interacción con tus clientes.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-red-900/30 rounded-full flex items-center justify-center mb-4 mx-auto">
                                <MonitorSmartphone className="h-8 w-8 text-red-500" />
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-red-500">Conecta con redes sociales</h3>
                            <p className="text-gray-300">
                                Integra tus publicaciones con redes sociales para aumentar tu alcance y visibilidad.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-red-900/30 rounded-full flex items-center justify-center mb-4 mx-auto">
                                <HandHeart className="h-8 w-8 text-red-500" />
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-red-500">Mejora tu imagen</h3>
                            <p className="text-gray-300">
                                Una web atractiva y profesional es clave para captar la atención de tus clientes. Creamos diseños únicos y personalizados.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 text-white">
                <div className="container mx-auto px-4 max-w-5xl grid grid-cols-1 md:grid-cols-2 items-center gap-8">
                    <div className="text-center md:text-left">
                        <h2 className="text-3xl font-bold mb-6 text-red-600">
                            ¿Listo para llevar tu negocio al siguiente nivel?
                        </h2>
                        <p className="mb-8">
                            Contáctanos hoy mismo y descubre cómo podemos ayudarte a alcanzar tus objetivos digitales.
                        </p>
                        <Link to="/contact" className="bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded transition-colors">
                            Contáctanos
                        </Link>
                    </div>
                    <div className="flex justify-center">
                        <img 
                            src="/img/logo/logo_white_1.svg" 
                            alt="Logo vertical" 
                            className="max-w-full h-auto w-32 md:w-48"
                        />
                    </div>
                </div>
            </section>

        </>
    );
};

export default Home;