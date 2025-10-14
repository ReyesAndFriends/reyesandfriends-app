import React from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import TerminalMessage from "./components/TerminalMessage";
import MethodologySteps from "./components/MethodologySteps";
import WhyChooseReyesAndFriends from "./components/WhyChooseReyesAndFriends";
import HomeHeroSection from "./components/HomeHeroSetion";
import { Helmet } from "react-helmet-async";

const Home: React.FC = () => {
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
            
            <HomeHeroSection />

            <section className="py-16 bg-zinc-900 text-white">
                <div className="container mx-auto px-4 max-w-7xl">
                    <h2 className="text-3xl mb-12 text-center relative">
                        <span className="bg-zinc-900 px-4 relative z-10 text-white">¿Qué hacemos?</span>
                        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-reyes-dark -z-0"></div>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h4 className="text-lg text-reyes-light mb-2">Un negocio informático a tu medida</h4>
                            <h2 className="text-4xl mb-4 text-white">Soluciones digitales personalizadas</h2>
                            <p className="text-gray-300 text-lg">
                                Somos un negocio informático con múltiples aptitudes. Nos especializamos en el desarrollo de soluciones digitales personalizadas, abarcando desde sitios web hasta software empresarial y servicios tecnológicos adaptados a las necesidades de cada cliente.
                            </p>
                            <p className="text-gray-300 text-lg mt-4">
                                Haz frente a tu negocio con nuestra experiencia y dedicación. Nos enfocamos en ofrecer soluciones innovadoras que impulsen tu crecimiento digital y mejoren la eficiencia de tus operaciones.
                            </p>
                        </div>
                        <div className="flex justify-center items-center min-h-[200px]">
                            <TerminalMessage />
                        </div>
                    </div>
                    <div className="text-left mt-8">
                        <Link
                            to="/services"
                            className="text-reyes-light hover:underline font-semibold inline-flex items-center gap-1 transition-colors"
                        >
                            Conoce todos nuestros servicios
                            <ChevronRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-zinc-900 text-white">
                <div className="container mx-auto px-4 max-w-7xl">
                    <h2 className="text-3xl mb-12 text-center relative">
                        <span className="bg-zinc-900 px-4 relative z-10 text-white">Nuestra metodología</span>
                        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-reyes-dark -z-0"></div>
                    </h2>

                    <div className="text-center mt-8 mb-12">
                        <p className="text-lg text-gray-300 mb-4">
                            Para garantizar una experiencia de trabajo fluida y satisfactoria, seguimos una metodología ágil que nos permite adaptarnos a tus necesidades y ofrecer resultados de alta calidad. Nuestro proceso se basa en los siguientes pasos:
                        </p>
                    </div>

                    <MethodologySteps />

                </div>
            </section>

            <WhyChooseReyesAndFriends />
        </>
    );
};

export default Home;