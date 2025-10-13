import { ShoppingCart, Gem, CreditCard } from "lucide-react";
import { Link } from "react-router";
import { Helmet } from "react-helmet-async";

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
            <section className="bg-cover bg-center relative min-h-[700px] flex items-center">
                <div className="absolute inset-0 bg-hero-section z-10"></div>
                <div className="absolute inset-0">
                    <img
                        src="/img/background/background-web.jpg"
                        alt="Ilustración de fondo - Edificios"  
                        className="w-full h-full object-cover filter grayscale z-0"
                        draggable={false}
                        onContextMenu={e => e.preventDefault()}
                    />
                </div>
                <div className="container mx-auto px-4 py-24 relative z-10 grid grid-cols-1 md:grid-cols-2 items-center gap-8">
                    <div className="flex justify-center hidden md:block">
                        <img
                            src="/img/services/E-commerce/logo.png"
                            alt="E-commerce"
                            className="max-w-lg pointer-events-none"
                        />
                    </div>
                    <div className="max-w-2xl text-white mx-auto md:mx-0 md:pl-12 lg:pl-24 flex flex-col items-center md:items-start">
                        <h1 className="text-4xl md:text-5xl mb-6 border-b-4 border-red-500 pb-4 inline-flex items-center gap-4">
                            <ShoppingCart size={40} /> E-commerce
                        </h1>
                        <p className="text-xl mb-8">
                            Necesitas una tienda online? Quieres vender tus productos por internet? Podemos crear una plataforma de e-commerce personalizada que impulse las ventas de tu negocio.
                        </p>

                        <Link
                            to="/quote-project?service=e-commerce"
                            className="bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded transition-all duration-300 flex items-center gap-2 font-semibold transform hover:scale-105"
                        >
                            <Gem className="h-5 w-5" />
                            Me interesa, cotizar una tienda online
                        </Link>

                    </div>
                </div>
            </section>

            <section className="py-16 bg-zinc-900 text-white">
                <div className="container mx-auto px-4 max-w-7xl">
                    <h2 className="text-3xl mb-12 text-center relative">
                        <span className="bg-zinc-900 px-4 relative z-10 text-white">Características de tu E-commerce</span>
                        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-red-600/50 -z-0"></div>
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
                                <h3 className="text-2xl font-semibold mb-2 text-red-500">Pagos seguros y confiables</h3>
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
                                <h3 className="text-2xl font-semibold mb-2 text-red-500">Siempre más de una pasarela de pago</h3>
                                <p className="text-zinc-200">
                                    Tu tienda contará <strong>siempre con más de una pasarela de pago operativa</strong>, para que tus clientes puedan elegir cómo pagar y nunca pierdas una venta por problemas con un proveedor. Garantizamos alternativas seguras y confiables para tus transacciones.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row items-stretch gap-0 rounded-lg overflow-hidden shadow-lg bg-black">

                            <div className="md:w-1/2 w-full flex flex-col justify-center p-8">
                                <h3 className="text-2xl font-semibold mb-2 text-red-500">Control total de tu tienda y productos</h3>
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
                            <h3 className="text-2xl font-semibold mb-2 text-red-500 text-center">Lleva tu negocio al mundo digital</h3>
                            <p className="text-zinc-200 mb-6 text-center">
                                No pierdas más ventas. Expande tu alcance y vende las 24 horas del día con una tienda online profesional que convierta visitantes en clientes.
                            </p>
                            <Link
                                to="/quote-project?service=e-commerce"
                                className="bg-red-700 hover:bg-red-800 text-white px-8 py-4 rounded transition-all duration-300 flex items-center justify-center gap-3 font-semibold text-lg transform hover:scale-105 w-full max-w-md"
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
