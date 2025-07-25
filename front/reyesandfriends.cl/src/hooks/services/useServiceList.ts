export interface ServiceOption {
    name: string;
    path: string;
    value?: string;
    image?: string;
    description?: string;
}

const serviceList: ServiceOption[] = [
    { 
        name: "Programación web", 
        path: "/services/web-development", 
        value: "webProgramming", 
        image: "/img/services/FullList/web_programming.jpg", 
        description: "Desarrollamos software web innovador y adaptable para cualquier dispositivo." 
    },
];

const contactList: ServiceOption[] = [
    { name: "Contáctanos", path: "/contact"},
    { name: "Cotiza tu proyecto", path: "/quote-project"},
]

export const useServiceList = () => {
    return serviceList;
};

export const useContactList = () => {
    return contactList;
};