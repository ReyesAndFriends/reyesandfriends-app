import { Info } from "lucide-react";
import { Helmet } from "react-helmet-async";
import HeroSection from "../../layouts/components/HeroSection/HeroSection";

const AboutUs = () => {
    return (
        <>
            <Helmet>
                <title>Sobre Nosotros | Reyes&Friends</title>
                <meta
                    name="description"
                    content="Conoce más sobre Reyes&Friends y nuestro compromiso con la innovación y la excelencia en el desarrollo de soluciones digitales."
                />
                <meta property="og:title" content="Sobre Nosotros | Reyes&Friends" />
                <meta property="og:description" content="Descubre la misión, visión y valores que impulsan a Reyes&Friends en la creación de soluciones digitales." />
                <meta property="og:image" content="/img/open-graph-images/about-us.png" />
                <meta property="og:type" content="website" />

                <meta name="twitter:title" content="Sobre Nosotros | Reyes&Friends" />
                <meta name="twitter:description" content="Información sobre Reyes&Friends y nuestro enfoque en la innovación y la excelencia." />
                <meta name="twitter:image" content="/img/open-graph-images/about-us.png" />
            </Helmet>

            <HeroSection 
            icon={Info}
            logoImage="/img/about-us/illustration.png"
            title="Sobre Nosotros"
            subtitle="En Reyes&Friends, nos dedicamos a crear soluciones digitales innovadoras que transforman la forma en que las empresas operan y se conectan con sus clientes." 
            />

            <section className="py-16 text-white">
                <div className="container mx-auto px-4 max-w-7xl">
                    <h2 className="text-3xl mb-12 text-center relative">
                        <span className="bg-zinc-900 px-4 relative z-10 text-white">Nuestra Misión</span>
                        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-reyes-dark -z-0"></div>
                    </h2>
                    <div className="flex flex-col items-center">
                        <div className="relative mb-8">
                            <blockquote className="bg-black rounded-xl px-8 py-8 shadow-lg border-l-4 border-reyes-dark text-center text-xl md:text-2xl text-gray-100 font-semibold relative z-10">
                                “Brindar soluciones tecnológicas de alta calidad que impulsen el crecimiento y la innovación de nuestros clientes, 
                                con un enfoque en excelencia, creatividad y compromiso”.
                            </blockquote>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-zinc-900 text-white">
                <div className="container mx-auto px-4 max-w-7xl">
                    <h2 className="text-3xl mb-12 text-center relative">
                        <span className="bg-zinc-900 px-4 relative z-10 text-white">Nuestro Equipo</span>
                        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-reyes-dark -z-0"></div>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
                        <div className="flex justify-center mb-8 md:mb-0">
                            <img
                                src="/img/about-us/team.png"
                                alt="Imagen ilustrativa del equipo de Reyes&Friends"
                                className="rounded-lg shadow-lg w-full max-w-md aspect-[16/9] object-cover pointer-events-none"
                            />
                        </div>
                        <div>
                            <h4 className="text-lg text-reyes-light mb-2">La unión hace la fuerza</h4>
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

            <section className="py-16 text-white">
                <div className="container mx-auto px-4 max-w-7xl">
                    <h2 className="text-3xl mb-12 text-center relative">
                        <span className="bg-zinc-900 px-4 relative z-10 text-white">Nuestra Historia</span>
                        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-reyes-dark -z-0"></div>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
                        <div className="order-2 md:order-1">
                            <h4 className="text-lg text-reyes-light mb-2">"Do you think you can survive?"</h4>
                            <h2 className="text-4xl mb-4 text-white">El nombre de la empresa</h2>
                            <p className="text-lg text-gray-200">
                                <strong>Reyes&Friends</strong> nació con la intención de ser una empresa seria y comprometida con la creación de soluciones digitales innovadoras. Curiosamente, el nombre surge de una portada musical, inspirada en la canción <strong>"The Top"</strong> de <strong>Ken Blast</strong>, donde el “& Friends” aparece solo en una edición especial de la portada. Lo que comenzó como una anécdota divertida terminó representando perfectamente el espíritu colaborativo que queríamos transmitir. Así, decidimos adoptar el nombre, y el resto... es historia.
                            </p>
                        </div>
                        <div className="flex justify-center order-1 md:order-2 mb-8 md:mb-0">
                            <img
                                src="/img/about-us/reyesandfriends-theme.png"
                                alt="El logo de Reyes&Friends como si fuera un tema de Spotify"
                                className="rounded-lg shadow-lg w-full max-w-xs pointer-events-none"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-zinc-900 text-white">
                <div className="container mx-auto px-4 max-w-7xl">
                    <h2 className="text-3xl mb-12 text-center relative">
                        <span className="bg-zinc-900 px-4 relative z-10 text-white">Innovación y Futuro</span>
                        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-reyes-dark -z-0"></div>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
                        <div className="flex justify-center mb-8 md:mb-0">
                            <img
                                src="/img/about-us/frameworks.png"
                                alt="Ilustración de tecnologías modernas"
                                className="pointer-events-none"
                            />
                        </div>
                        <div className="order-2 md:order-1">
                            <h4 className="text-lg text-reyes-light mb-2">Tecnologías robustas, soluciones modernas</h4>
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
