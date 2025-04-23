import React from "react";
import { Bot, Code, Rat } from "lucide-react";

const AboutUs: React.FC = () => {
    return (
        <>
            <section className="bg-cover bg-center relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#891818] to-[#5A1410]"></div>
                <div className="container mx-auto px-4 py-24 relative z-10 grid grid-cols-1 md:grid-cols-2 items-center gap-8">
                    <div className="max-w-2xl text-white mx-auto md:mx-0 md:pl-12 lg:pl-24">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 border-b-4 border-red-500 pb-4 inline-block">
                            Sobre Nosotros
                        </h1>
                        <p className="text-xl mb-8 text-red-100">
                            En Reyes&Friends, nos dedicamos a crear soluciones digitales innovadoras que transforman la forma en que las empresas operan y se conectan con sus clientes.
                        </p>
                    </div>
                    <div className="flex flex-col items-center">
                        <img 
                            src="/img/crown_white.png" 
                            className="max-w-[350px] h-auto"
                        />
                        <p className="text-white text-center mt-4">
                            Innovación y excelencia en cada proyecto.
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
                        Brindar soluciones tecnológicas de alta calidad que impulsen el crecimiento y la innovación de nuestros clientes, 
                        con un enfoque en excelencia, creatividad y compromiso.
                    </p>
                </div>
            </section>

            <section className="py-16 bg-black text-white">
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
                            src="/img/reyesandfriends.svg"
                            alt="Team"
                            className="rounded shadow-md max-w-full h-auto"
                        />
                    </div>
                </div>
            </section>

            <section className="py-16 text-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-12 text-center text-red-600">
                        Nuestras Secciones
                    </h2>
                    <p className="text-center text-gray-300 mb-8 text-xl md:text-2xl leading-relaxed">
                        En Reyes&Friends a parte de ofrecer servicios personalizados, también ofrecemos diversos servicios a la comunidad con el fin de contribuir, por esta razón hemos clasificado en secciones:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-zinc-900 p-6 rounded-lg shadow-md text-center">
                            <h3 className="text-xl font-bold mb-4 text-red-500 flex items-center justify-center gap-2">
                                <Bot className="w-6 h-6" /> AbbyBot Team
                            </h3>
                            <p className="text-gray-300">
                                Equipo de desarrollo dedicado a la creación de AbbyBot, un asistente virtual que mejora la experiencia del usuario y comunidades gestionando servidores de Discord.
                            </p>
                        </div>
                        <div className="bg-zinc-900 p-6 rounded-lg shadow-md text-center">
                            <h3 className="text-xl font-bold mb-4 text-red-500 flex items-center justify-center gap-2">
                                <Code className="w-6 h-6" /> Sección para Open Source
                            </h3>
                            <p className="text-gray-300">
                                Contribuimos al ecosistema de código abierto con proyectos innovadores y útiles para todos.
                            </p>
                        </div>
                        <div className="bg-zinc-900 p-6 rounded-lg shadow-md text-center">
                            <h3 className="text-xl font-bold mb-4 text-red-500 flex items-center justify-center gap-2">
                                <Rat className="w-6 h-6" /> Sección MiceLab
                            </h3>
                            <p className="text-gray-300">
                                Ayudamos en la elaboración de MiceLab, una herramienta para el gestionamiento de pruebas en software.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AboutUs;
