import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet-async";
import { HandHeart } from "lucide-react";
import HeroSection from '../../layouts/components/hero-section/hero-section';

const SocialMedia = () => {

    const socialMediaItems = [
        {
            name: "Instagram",
            description: "Síguenos en Instagram para ver nuestro contenido diario y las últimas novedades.",
            image: "/img/social-media/instagram.png",
            route: "https://www.instagram.com/reyesandfriends.cl/"
        },
        {
            name: "Facebook",
            description: "Únete a nuestra comunidad en Facebook y mantente conectado con nosotros.",
            image: "/img/social-media/facebook.webp",
            route: "https://www.facebook.com/people/ReyesFriends/61580531925223/"
        },
        {
            name: "Whatsapp",
            description: "Contáctanos directamente a través de WhatsApp para consultas rápidas y soporte.",
            image: "/img/social-media/whatsapp.jpg",
            route: "https://wa.me/56982034567?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20sus%20servicios."
        }
    ];

    return (
        <>
            <Helmet>
                <title>Redes Sociales | Reyes&Friends</title>
                <meta
                    name="description"
                    content="Aquí se muestran nuestras redes sociales. Síguenos para estar al día con nuestras novedades y contenido exclusivo."
                />
                <meta property="og:title" content="Redes Sociales | Reyes&Friends" />
                <meta property="og:description" content="Descubre y sigue todas nuestras redes sociales para mantenerte conectado con Reyes&Friends." />
                <meta property="og:image" content="/img/open-graph-images/social-media.png" />
                <meta property="og:type" content="website" />
                <meta name="twitter:title" content="Redes Sociales | Reyes&Friends" />
                <meta name="twitter:description" content="Síguenos en nuestras redes sociales y mantente informado sobre todas nuestras novedades." />
                <meta name="twitter:image" content="/img/open-graph-images/social-media.png" />
            </Helmet>

            <HeroSection 
            icon={HandHeart}
            logoImage="/img/social-media/illustration.png"
            title="Redes Sociales"
            subtitle="Conecta con nosotros a través de nuestras redes sociales. Síguenos para estar al día con nuestras novedades y contenido exclusivo." 
            />


            <section className="py-16 bg-zinc-900 text-white">
                <div className="container mx-auto px-4 max-w-7xl">
                    <h2 className="text-3xl mb-12 text-center relative">
                        <span className="bg-zinc-900 px-4 relative z-10 text-white">Lista de Redes Sociales</span>
                        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-reyes-dark -z-0"></div>
                    </h2>
                    <div className="flex flex-wrap justify-center gap-8">
                        {socialMediaItems.map((item, index) => (
                            <div
                                key={index}
                                className="w-full max-w-xs bg-black rounded-lg shadow-lg p-4 flex flex-col justify-between"
                            >
                                <div className="overflow-hidden rounded-md mb-3">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-64 object-cover object-center rounded-md pointer-events-none"
                                        style={{ aspectRatio: "1 / 1" }}
                                    />
                                </div>
                                <div className="flex-grow">
                                    <h3 className="text-md font-semibold mb-2 text-center">{item.name}</h3>
                                    <p className="text-xs text-gray-300 text-center line-clamp-3">
                                        {item.description}
                                    </p>
                                </div>
                                <div className="flex justify-center mt-3">
                                    <Link
                                        className="bg-reyes hover:bg-reyes-dark text-white px-4 py-2 rounded transition-colors text-sm flex items-center gap-2 font-semibold hover:scale-105"
                                        to={item.route}
                                        target="_blank"
                                    >
                                        Ver detalles
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </>
    );
};

export default SocialMedia;