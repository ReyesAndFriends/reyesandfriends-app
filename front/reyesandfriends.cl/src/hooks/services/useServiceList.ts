export interface ServiceOption {
    name: string;
    path: string;
    value?: string;
    image?: string;
    description?: string;
}

const serviceList: ServiceOption[] = [
    { name: "Programación web", path: "/services/web-development", value: "webProgramming", image: "/img/services/web_programming.jpg", description: "Transforma tus ideas en realidad con software web innovador. Desde páginas impactantes hasta paneles híbridos para cualquier dispositivo, ¡lo hacemos posible!" },
    { name: "Lista completa", path: "/services", value: "fullList", image: "/img/services/image.png", description: "Descubre todo lo que podemos hacer por ti. Explora nuestra lista completa de servicios y encuentra la solución perfecta." },
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
