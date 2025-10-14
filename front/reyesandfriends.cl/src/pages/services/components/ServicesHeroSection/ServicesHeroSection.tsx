import { LucideIcon, Gem } from "lucide-react";
import { Link } from "react-router";

interface ServicesHeroSectionProps {
    logoImage: string;
    title: string;
    description: string;
    icon: LucideIcon;
    quoteService: string;
    buttonText: string;
    altText?: string;
}

const ServicesHeroSection = ({
    logoImage,
    title,
    description,
    icon: Icon,
    quoteService,
    buttonText,
    altText = "Ilustración de fondo"
}: ServicesHeroSectionProps) => {
    return (
        <section className="bg-cover bg-center relative min-h-[700px] flex items-center">
            <div className="absolute inset-0 bg-hero-section z-10"></div>
            <div className="absolute inset-0">
                <img
                    src="/img/background/background-web.jpg" 
                    alt={altText}
                    className="w-full h-full object-cover filter grayscale z-0"
                    draggable={false}
                    onContextMenu={e => e.preventDefault()}
                />
            </div>
            <div className="container mx-auto px-4 py-24 relative z-10 grid grid-cols-1 md:grid-cols-2 items-center gap-8">
                <div className="flex justify-center hidden md:block">
                    <img
                        src={logoImage}
                        alt={title}
                        className="max-w-xl pointer-events-none"
                    />
                </div>
                <div className="max-w-2xl text-white mx-auto md:mx-0 md:pl-12 lg:pl-24 flex flex-col items-center md:items-start">
                    <h1 className="text-4xl md:text-5xl mb-6 border-b-4 border-reyes-dark pb-4 inline-flex items-center gap-4">
                        <Icon size={40} /> {title}
                    </h1>
                    <p className="text-xl mb-8">
                        {description}
                    </p>

                    <Link
                        to={`/quote-project?service=${quoteService}`}
                        className="bg-reyes hover:bg-reyes-dark text-white px-6 py-3 rounded transition-all duration-300 flex items-center gap-2 font-semibold transform hover:scale-105"
                    >
                        <Gem className="h-5 w-5" />
                        {buttonText}
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ServicesHeroSection;
