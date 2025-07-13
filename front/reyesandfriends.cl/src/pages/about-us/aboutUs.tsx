import React from "react";
import { Link } from "react-router-dom";
import { Gem, Mail } from "lucide-react";

const AboutUs: React.FC = () => {
    return (
        <>
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
                <div className="container mx-auto px-4 py-24 relative z-10 flex flex-col items-center justify-center text-center flex-1">
                    <div className="max-w-2xl text-white mx-auto">
                        <img
                            src="/img/logo/crown_white.svg"
                            className="w-32 h-32 object-contain mx-auto mb-6"
                            alt="reyes&friends_crown"
                        />
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 border-b-4 border-red-500 pb-4 inline-block">
                            Sobre Nosotros
                        </h1>
                        <h2 className="text-3xl md:text-3xl font-semibold mb-4">
                            Reyes&Friends
                        </h2>
                        <p className="text-xl mb-8 text-red-100">
                            En Reyes&Friends, nos dedicamos a crear soluciones digitales innovadoras que transforman la forma en que las empresas operan y se conectan con sus clientes.
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-zinc-900 text-white">
                <div className="container mx-auto px-4 max-w-5xl">
                    <h2 className="text-3xl font-bold mb-12 text-center text-red-600">
                        Nuestra Misión es clara:
                    </h2>
                    <p className="text-center text-gray-300 mb-8 text-xl md:text-2xl leading-relaxed">
                        "Brindar soluciones tecnológicas de alta calidad que impulsen el crecimiento y la innovación de nuestros clientes, 
                        con un enfoque en excelencia, creatividad y compromiso".
                    </p>
                </div>
            </section>

            <section className="py-16 text-white">
                <div className="container mx-auto px-4 max-w-5xl grid grid-cols-1 md:grid-cols-2 items-center gap-8">
                    <div className="text-center md:text-left">
                        <h2 className="text-3xl font-bold mb-6 text-red-600">
                            ¿Por qué elegirnos?
                        </h2>
                        <p className="mb-6">
                            Nos enfocamos en entender tus necesidades y ofrecer soluciones personalizadas que generen resultados reales. 
                            Tu éxito es nuestro objetivo.
                        </p>
                    </div>
                    <div className="flex justify-center">
                        <img
                            src="/img/logo/logo_white_2.svg"
                            alt="reyes&friends"
                            className="max-w-[350px] h-auto"
                        />
                    </div>
                </div>
            </section>
        </>
    );
};

export default AboutUs;
