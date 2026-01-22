import React from "react";
import { Link } from "react-router-dom";
import WhyChooseReyesAndFriends from "./components/WhyChooseReyesAndFriends";
import HomeHeroSection from "./components/HomeHeroSetion";
import { Helmet } from "react-helmet-async";
import { useServiceList } from "../../hooks/services/useServiceList";
import PortfolioCarousel from "./components/PortfolioCarousel";
import { motion } from "framer-motion";

const Home: React.FC = () => {
    const serviceList = useServiceList();

    return (
        <>
            <Helmet>
                <title>Inicio | Reyes&Friends</title>
                <meta
                    name="description"
                    content="Bienvenido a Reyes&Friends, tu aliado en soluciones digitales personalizadas."
                />
                <meta property="og:title" content="Inicio | Reyes&Friends" />
                <meta property="og:description" content="Bienvenido a Reyes&Friends, tu aliado en soluciones digitales personalizadas." />
                <meta property="og:image" content="/img/open-graph-images/default-style.png" />
                <meta property="og:type" content="website" />

                <meta name="twitter:title" content="Inicio | Reyes&Friends" />
                <meta name="twitter:description" content="Bienvenido a Reyes&Friends, tu aliado en soluciones digitales personalizadas." />
                <meta name="twitter:image" content="/img/open-graph-images/default-style.png" />
            </Helmet>
            
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
            >
                <HomeHeroSection />
            </motion.div>

            <motion.section
                className="py-16 bg-zinc-900 text-white"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            >
                <div className="container mx-auto px-4 max-w-7xl">
                    <h2 className="text-3xl mb-12 text-center relative">
                        <span className="bg-zinc-900 px-4 relative z-10 text-white">Nuestros Servicios</span>
                        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-reyes-dark -z-0"></div>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                        {serviceList.map((service, idx) => (
                            <div
                                key={idx}
                                className="bg-zinc-850 rounded shadow-lg p-6 flex flex-row items-center border border-zinc-700 hover:border-reyes-light transition-all duration-200"
                            >
                                <div className="text-reyes-light flex-shrink-0 mr-6 flex items-center justify-center">
                                    {service.icon}
                                </div>
                                <div className="flex flex-col flex-1">
                                    <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                                    <p className="text-gray-300 mb-4">{service.description}</p>
                                    <Link
                                        to={service.path}
                                        className="text-reyes-light hover:underline font-semibold text-sm mt-auto"
                                    >
                                        Más información
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.section>

            <motion.section
                className="py-16 text-white"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
            >
                <div className="container mx-auto px-4 max-w-7xl">
                    <h2 className="text-3xl mb-12 text-center relative">
                        <span className="bg-zinc-900 px-4 relative z-10 text-white">Portafolio</span>
                        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-reyes-dark -z-0"></div>
                    </h2>
                    <PortfolioCarousel />
                </div>
            </motion.section>

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
            >
                <WhyChooseReyesAndFriends />
            </motion.div>
        </>
    );
};

export default Home;