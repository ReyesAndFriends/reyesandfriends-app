import { Globe, Building2, Mail, Gem, Smartphone, ShoppingCart, Joystick } from "lucide-react";

export interface ServiceOption {
    name: string;
    path: string;
    value?: string;
    image?: string;
    description?: string;
    icon?: React.ReactNode;
}

const serviceList: ServiceOption[] = [
    { 
        name: "Programación web", 
        path: "/services/web-development", 
        value: "web-development", 
        image: "/img/services/FullList/web-programming.jpeg", 
        description: "Desarrollamos software web innovador y adaptable para cualquier dispositivo.",
        icon: (() => <Globe size={18} className="inline mr-2" />)()
    },
    {
        name: "Software Empresarial",
        path: "/services/enterprise-software",
        value: "enterprise-software",
        image: "/img/services/FullList/enterprise-software.webp",
        description: "Desarrollamos soluciones empresariales a la medida para optimizar tus operaciones, automatizar procesos y mejorar la eficiencia de tu negocio.",
        icon: (() => <Building2 size={18} className="inline mr-2" />)()
    },
    {
        name: "Aplicaciones móviles",
        path: "/services/mobile-apps",
        value: "mobile-apps",
        image: "/img/services/FullList/mobile-apps.jpg",
        description: "Creamos aplicaciones móviles para Android, ofreciendo experiencias nativas y multiplataforma.",
        icon: (() => <Smartphone size={18} className="inline mr-2" />)()
    },
    {
        name: "E-commerce",
        path: "/services/e-commerce",
        value: "e-commerce",
        image: "/img/services/FullList/e-commerce.webp",
        description: "Desarrollamos soluciones de comercio electrónico personalizadas para impulsar tu negocio en línea.",
        icon: (() => <ShoppingCart size={18} className="inline mr-2" />)()
    },
    {
        name: "Entretenimiento y más",
        path: "/services/entertainment",
        value: "entertainment",
        image: "/img/services/FullList/entertainment.jpg",
        description: "Realizamos páginas web, servicios y aplicaciones para la industria del entretenimiento, tales como música, cine, videojuegos y más.",
        icon: (() => <Joystick size={18} className="inline mr-2" />)()
    }
];

const contactList: ServiceOption[] = [
    { name: "Contáctanos", path: "/contact", icon: (() => <Mail size={18} className="inline mr-2" />)() },
    { name: "Cotiza tu proyecto", path: "/quote-project", icon: (() => <Gem size={18} className="inline mr-2" />)() },
]

export const useServiceList = () => {
    return serviceList;
};

export const useContactList = () => {
    return contactList;
};