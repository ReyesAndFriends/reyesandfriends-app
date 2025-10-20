import { Helmet } from "react-helmet-async";
import { Contact2 } from "lucide-react";
import HeroSection from "../../layouts/components/hero-section/hero-section";
import ContactForm from "./components/ContactForm";

const Contact = () => {
    return (
        <>
            <Helmet>
                <title>Contacto | Reyes&Friends</title>
                <meta
                    name="description"
                    content="Ponte en contacto con Reyes&Friends para consultas, soporte y más información sobre nuestros servicios."
                />
                <meta property="og:title" content="Contacto | Reyes&Friends" />
                <meta property="og:description" content="Ponte en contacto con Reyes&Friends para consultas, soporte y más información sobre nuestros servicios." />
                <meta property="og:image" content="/img/open-graph-images/contact-us.png" />
                <meta property="og:type" content="website" />
                <meta name="twitter:title" content="Contacto | Reyes&Friends" />
                <meta name="twitter:description" content="Ponte en contacto con Reyes&Friends para consultas, soporte y más información sobre nuestros servicios." />
                <meta name="twitter:image" content="/img/open-graph-images/contact-us.png" />
            </Helmet>
            <HeroSection 
                icon={Contact2}
                logoImage="/img/contact/illustration.png"
                title="Contacto"
                subtitle="En Reyes&Friends, estamos aquí para ayudarte. Si tienes alguna pregunta o inquietud, no dudes en ponerte en contacto con nosotros."
            />
            <section className="py-16 bg-zinc-900">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="relative mb-12">
                        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-reyes-dark -z-0"></div>
                        <h2 className="text-3xl text-center relative z-10">
                            <span className="bg-zinc-900 px-4 relative z-10 text-white">Envíanos un mensaje</span>
                        </h2>
                    </div>
                    <ContactForm />
                </div>
            </section>
        </>
    );
};

export default Contact;