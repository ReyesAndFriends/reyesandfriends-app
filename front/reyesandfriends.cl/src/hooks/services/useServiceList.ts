export interface ServiceOption {
    name: string;
    path: string;
    image?: string;
    description?: string;
}

const serviceList: ServiceOption[] = [
    { name: "Programación web", path: "/services/web-development", image: "/img/services/image.png", description: "Transforma tus ideas en realidad con software web innovador. Desde páginas impactantes hasta paneles híbridos para cualquier dispositivo, ¡lo hacemos posible!" },
    { name: "Software empresarial", path: "/services/bussiness-software", image: "/img/services/image.png", description: "¿Tu negocio necesita un impulso? Creamos soluciones personalizadas que se adaptan a tus necesidades y te llevan al siguiente nivel." },
    { name: "Páginas web promocionales", path: "/services/promotional-web", image: "/img/services/image.png", description: "Haz que tu marca brille. Diseñamos páginas promocionales que capturan la esencia de tu proyecto y lo llevan al mundo." },
    { name: "Páginas E-Commerce", path: "/services/ecommerce-web", image: "/img/services/image.png", description: "Lleva tu negocio al mundo digital. Creamos tiendas online que conectan con tus clientes y maximizan tus ventas." },
    { name: "Lista completa", path: "/services", image: "/img/services/image.png", description: "Descubre todo lo que podemos hacer por ti. Explora nuestra lista completa de servicios y encuentra la solución perfecta." },
];

export const useServiceList = () => {
    return serviceList;
};
