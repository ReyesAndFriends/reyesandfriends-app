import { ShoppingCart, Gem, CreditCard } from "lucide-react";
import { Link } from "react-router";
import { Helmet } from "react-helmet-async";
import ServicesHeroSection from "../components/ServicesHeroSection/ServicesHeroSection";

const ECommerce = () => {
    return (
        <>
            <Helmet>
                <title>E-commerce | Reyes&Friends</title>
                <meta name="description" content="Tiendas online personalizadas para impulsar tus ventas digitales y hacer crecer tu negocio." />
                <meta property="og:title" content="E-commerce | Reyes&Friends" />
                <meta property="og:description" content="Tiendas online personalizadas para impulsar tus ventas digitales y hacer crecer tu negocio." />
                <meta property="og:image" content="/img/open-graph-images/e-commerce.png" />
                <meta property="og:type" content="website" />
                <meta name="twitter:title" content="E-commerce | Reyes&Friends" />
                <meta name="twitter:description" content="Tiendas online personalizadas para impulsar tus ventas digitales y hacer crecer tu negocio." />
                <meta name="twitter:image" content="/img/open-graph-images/e-commerce.png" />
            </Helmet>

            <ServicesHeroSection
                logoImage="/img/services/E-commerce/logo.png"
                title="E-commerce"
                description={`Necesitas una tienda online? Quieres vender tus productos por internet? Podemos crear una plataforma de e-commerce personalizada que impulse las ventas de tu negocio.`}
                icon={ShoppingCart}
                quoteService="e-commerce"
                buttonText="Me interesa, cotizar una tienda online"
                altText="Ilustración de fondo - Edificios"
            />

            <section className="py-16 bg-zinc-900 text-white">
                <div className="container mx-auto px-4 max-w-7xl">
                    <h2 className="text-3xl mb-12 text-center relative">
                        <span className="bg-zinc-900 px-4 relative z-10 text-white">Características de tu E-commerce</span>
                        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-reyes-dark -z-0"></div>
                    </h2>
                    <div className="flex flex-col gap-16">

                        <div className="flex flex-col md:flex-row items-stretch gap-0 rounded-lg overflow-hidden shadow-lg bg-black">
                            <div className="md:w-1/2 w-full flex items-center justify-center">
                                <img
                                    src="/img/services/E-commerce/SSL.png"
                                    alt="Ilustración de pagos seguros"
                                    className="max-h-[150px] w-auto object-contain pointer-events-none"
                                />
                            </div>
                            <div className="md:w-1/2 w-full flex flex-col justify-center p-8">
                                <h3 className="text-2xl font-semibold mb-2 text-reyes-light">Pagos seguros y confiables</h3>
                                <p className="text-zinc-200">
                                    Implementamos <strong>sistemas de pago seguros</strong> que protegen tanto a ti como a tus clientes. Certificados SSL, encriptación de datos y integración con las principales pasarelas de pago para garantizar transacciones seguras.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row items-stretch gap-0 rounded-lg overflow-hidden shadow-lg bg-black">

                            <div className="md:w-1/2 w-full flex items-center justify-center">
                                <img
                                    src="/img/services/E-commerce/webpay-12-cuotas-sin-interes.png"
                                    alt="Múltiples pasarelas de pago"
                                    className="max-h-[100px] w-auto object-contain pointer-events-none"
                                />
                            </div>

                            <div className="md:w-1/2 w-full flex flex-col justify-center p-8">
                                <h3 className="text-2xl font-semibold mb-2 text-reyes-light">Siempre más de una pasarela de pago</h3>
                                <p className="text-zinc-200">
                                    Tu tienda contará <strong>siempre con más de una pasarela de pago operativa</strong>, para que tus clientes puedan elegir cómo pagar y nunca pierdas una venta por problemas con un proveedor. Garantizamos alternativas seguras y confiables para tus transacciones.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row items-stretch gap-0 rounded-lg overflow-hidden shadow-lg bg-black">

                            <div className="md:w-1/2 w-full flex flex-col justify-center p-8">
                                <h3 className="text-2xl font-semibold mb-2 text-reyes-light">Control total de tu tienda y productos</h3>
                                <p className="text-zinc-200">
                                    Gestiona tu inventario, stock, productos, clientes, etc. desde un panel de administración fácil de usar. Actualiza productos, precios y promociones en tiempo real para mantener tu tienda siempre al día.
                                </p>
                            </div>

                            <div className="md:w-1/2 w-full flex items-center justify-center">
                                <img
                                    src="/img/services/E-commerce/inventory.png"
                                    alt="Gestión de inventario"
                                    className="max-h-[150px] w-auto object-contain pointer-events-none"
                                />
                            </div>

                        </div>

                    
                        <div className="flex flex-col items-center justify-center gap-6 rounded-lg overflow-hidden shadow-lg bg-black p-8">
                            <h3 className="text-2xl font-semibold mb-2 text-reyes-light text-center">Lleva tu negocio al mundo digital</h3>
                            <p className="text-zinc-200 mb-6 text-center">
                                No pierdas más ventas. Expande tu alcance y vende las 24 horas del día con una tienda online profesional que convierta visitantes en clientes.
                            </p>
                            <Link
                                to="/quote-project?service=e-commerce"
                                className="bg-reyes hover:bg-reyes-dark text-white px-8 py-4 rounded transition-all duration-300 flex items-center justify-center gap-3 font-semibold text-lg transform hover:scale-105 w-full max-w-md"
                            >
                                <Gem className="h-6 w-6" />
                                Me interesa, cotizar mi e-commerce
                            </Link>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
};

export default ECommerce;