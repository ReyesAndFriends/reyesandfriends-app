import { Link } from "react-router";
import { ChevronRight } from "lucide-react";

const WhyChooseReyesAndFriends = () => {

    const ctaLink = "/web-planes";
    const ctaText = "Cotiza tu plan";

    return (
        <section className="py-16 text-white">
            <div className="container mx-auto px-4 max-w-7xl">
                <h2 className="text-3xl mb-12 text-center text-reyes-light relative">
                    <span className="bg-zinc-900 px-4 relative z-10 text-white">¿Por qué elegirnos?</span>
                    <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-reyes-dark -z-0"></div>
                </h2>

                <div className="bg-gradient-to-r from-red-900 via-red-800 to-red-700 rounded p-8 font-medium shadow-lg text-center mb-8">
                    Hoy en dia, todo se hace por internet, por mas que se ignore, hasta ir a comprar el pan, el pago se realiza a travez de una plataforma digital. <br /> En <strong>Reyes&Friends</strong>, entendemos la importancia de tener una presencia digital solida y efectiva para cualquier negocio o proyecto personal. <br /><br /> Nuestro equipo de expertos esta comprometido en brindar soluciones digitales personalizadas que se adapten a las necesidades y objetivos de cada cliente. Ya sea que necesites una pagina web, una aplicacion movil, un software empresarial o cualquier otro servicio relacionado con el mundo digital, estamos aqui para ayudarte a alcanzar el exito en el mundo digital. <br /> Podemos ayudarte con cualquier pieza digital que necesites para tu negocio o proyecto personal.
                </div>
            </div>

            <div className="font-medium text-center mb-8">
                No lo dudes, <strong>Reyes&Friends</strong> es tu mejor aliado en soluciones digitales personalizadas.
            </div>

            <div className="flex flex-col md:flex-row gap-3 max-w-xl mx-auto px-4 mt-8 justify-center md:justify-center">
                <Link
                    to={ctaLink}
                    className="flex-1 bg-reyes hover:bg-reyes-dark text-white px-6 sm:px-8 py-3 sm:py-4 rounded transition-all duration-300 flex items-center gap-3 font-semibold hover:scale-105 text-base sm:text-lg justify-center min-w-[140px] sm:min-w-[180px] md:mr-2"
                    style={{ minWidth: "140px" }}
                >
                    {ctaText}
                    <ChevronRight className="h-6 sm:h-7 w-6 sm:w-7" />
                </Link>
            </div>

        </section>
    );
};

export default WhyChooseReyesAndFriends;