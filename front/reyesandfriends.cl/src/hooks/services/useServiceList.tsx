import { Globe, Mail, Gem } from "lucide-react";

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
        value: "webProgramming", 
        image: "/img/services/FullList/web_programming.jpeg", 
        description: "Desarrollamos software web innovador y adaptable para cualquier dispositivo.",
        icon: (() => <Globe size={18} className="inline mr-2" />)()
    },

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