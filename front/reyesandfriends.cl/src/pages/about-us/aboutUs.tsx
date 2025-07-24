import React from "react";

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
                        <h1 className="text-4xl md:text-5xl mb-6 border-b-4 border-red-500 pb-4 inline-block">
                            Sobre Nosotros
                        </h1>
                        <p className="text-xl mb-8">
                            En Reyes&Friends, nos dedicamos a crear soluciones digitales innovadoras que transforman la forma en que las empresas operan y se conectan con sus clientes.
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-zinc-900 text-white">
                <div className="container mx-auto px-4 max-w-7xl">
                    <h2 className="text-3xl mb-12 text-center text-red-600 relative">
                        <span className="bg-zinc-900 px-4 relative z-10 text-white">Nuestra Misión</span>
                        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-red-600/50 -z-0"></div>
                    </h2>
                    <div className="flex flex-col items-center">
                        <div className="relative mb-8">
                            <blockquote className="bg-black rounded-xl px-8 py-8 shadow-lg border-l-4 border-red-600 text-center text-xl md:text-2xl text-gray-100 font-semibold relative z-10">
                                “Brindar soluciones tecnológicas de alta calidad que impulsen el crecimiento y la innovación de nuestros clientes, 
                                con un enfoque en excelencia, creatividad y compromiso”.
                            </blockquote>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 text-white bg-zinc-900">
                <div className="container mx-auto px-4 max-w-7xl">
                    <h2 className="text-3xl mb-12 text-center text-red-600 relative">
                        <span className="bg-zinc-900 px-4 relative z-10 text-white">¿Por qué elegirnos?</span>
                        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-red-600/50 -z-0"></div>
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-8">
                        <div className="md:col-span-2">
                            <h4 className="text-lg text-red-500 mb-2">Cada proyecto es único</h4>
                            <h2 className="text-4xl mb-4 text-white">Desarrollamos soluciones digitales personalizadas</h2>
                            <p className="text-gray-300 text-lg">
                                Cada proyecto que realizamos es una pieza única de un rompecabezas. Nos especializamos en entender las necesidades específicas de cada cliente, creando soluciones digitales personalizadas que se adaptan perfectamente a sus objetivos y desafíos.
                            </p>
                            <p className="text-gray-300 text-lg mt-4">
                                Nuestro equipo de expertos trabaja en estrecha colaboración con nuestros clientes para garantizar que cada detalle se ajuste a sus expectativas, desde el diseño hasta la funcionalidad. Creemos que la personalización es clave para el éxito de cualquier proyecto digital.
                            </p>
                        </div>
                        <div className="flex justify-center md:col-span-1">
                            <img
                                src="/img/logo/logo_white_2.svg"
                                alt="reyes&friends"
                                className="max-w-[250px] h-auto"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-zinc-800 text-white">
                <div className="container mx-auto px-4 max-w-7xl">
                    <h2 className="text-3xl mb-12 text-center text-red-600 relative">
                        <span className="bg-zinc-800 px-4 relative z-10 text-white">Nuestro Equipo</span>
                        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-red-600/50 -z-0"></div>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
                        <div className="flex justify-center mb-8 md:mb-0">
                            <img
                                src="/img/aboutUs/team.png"
                                alt="Equipo"
                                className="rounded-lg shadow-lg w-full max-w-md aspect-[16/9] object-cover"
                            />
                        </div>
                        <div>
                            <h4 className="text-lg text-red-500 mb-2">La unión hace la fuerza</h4>
                            <h2 className="text-4xl mb-4 text-white">Personas detrás de Reyes&Friends</h2>
                            <p className="text-lg text-gray-200">
                                El equipo de <strong>Reyes&Friends</strong> está conformado por su fundador, Marcos Reyes y, adivinen... algunos amigos. <br /><br />
                                Juntos, combinamos nuestras habilidades y experiencias para ofrecer soluciones digitales de alta calidad.
                                Creemos que la colaboración y la diversidad de ideas son fundamentales para el éxito de nuestros proyectos.
                                Cada miembro de nuestro equipo aporta su propia perspectiva y experiencia, lo que nos permite abordar los desafíos de manera creativa y efectiva.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-zinc-900 text-white">
                <div className="container mx-auto px-4 max-w-7xl">
                    <h2 className="text-3xl mb-12 text-center text-red-600 relative">
                        <span className="bg-zinc-900 px-4 relative z-10 text-white">Nuestra Historia</span>
                        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-red-600/50 -z-0"></div>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
                        <div className="order-2 md:order-1">
                            <h4 className="text-lg text-red-500 mb-2">"Do you think you can survive?"</h4>
                            <h2 className="text-4xl mb-4 text-white">El nombre de la empresa</h2>
                            <p className="text-lg text-gray-200">
                                <strong>Reyes&Friends</strong> nació con la intención de ser una empresa seria y comprometida con la creación de soluciones digitales innovadoras. Curiosamente, el nombre surge de una portada musical, inspirada en la canción <strong>"The Top"</strong> de <strong>Ken Blast</strong>, donde el “& Friends” aparece solo en una edición especial de la portada. Lo que comenzó como una anécdota divertida terminó representando perfectamente el espíritu colaborativo que queríamos transmitir. Así, decidimos adoptar el nombre, y el resto... es historia.
                            </p>
                        </div>
                        <div className="flex justify-center order-1 md:order-2 mb-8 md:mb-0">
                            <img
                                src="https://picsum.photos/400/300?random=2"
                                alt="Historia de la empresa"
                                className="rounded-lg shadow-lg w-full max-w-xs"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-zinc-800 text-white">
                <div className="container mx-auto px-4 max-w-7xl">
                    <h2 className="text-3xl mb-12 text-center text-red-600 relative">
                        <span className="bg-zinc-800 px-4 relative z-10 text-white">Innovación y Futuro</span>
                        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-red-600/50 -z-0"></div>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
                        <div className="flex justify-center mb-8 md:mb-0">
                            <img
                                src="https://picsum.photos/400/300?random=3"
                                alt="Innovación tecnológica"
                                className="rounded-lg shadow-lg w-full max-w-xs"
                            />
                        </div>
                        <div className="order-2 md:order-1">
                            <h4 className="text-lg text-red-500 mb-2">"Tecnologías robustas, soluciones modernas"</h4>
                            <h2 className="text-4xl mb-4 text-white">Combinando calidad y modernidad</h2>
                            <p className="text-lg text-gray-200">
                                ¿A quién no le gusta contar con un software que funcione bien, sea rápido, eficiente y, además, atractivo? ¿Por qué conformarse con menos si se puede tener todo?
                                En <strong>Reyes&Friends</strong> empleamos tecnologías modernas y robustas para ofrecer soluciones digitales que combinan calidad y vanguardia, creando experiencias de usuario excepcionales.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AboutUs;
