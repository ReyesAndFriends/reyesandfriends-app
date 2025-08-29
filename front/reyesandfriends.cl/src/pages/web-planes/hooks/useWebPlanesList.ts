const useWebPlanesList = () => [
    {
        name: "Plan básico",
        slug: "plan-basico",
        description: "Ideal para emprendedores que comienzan su presencia en línea.",
        price: 99990,
        features: [
            "Sitio web de hasta 3 páginas (ej: Inicio, Servicios, Contacto).",
            "Diseño profesional y adaptable a dispositivos móviles.",
            "Formulario de contacto integrado.",
            "Optimización básica para buscadores (SEO).",
            "Incluye hosting y dominio .cl o .com por el primer año.",
            "Soporte técnico básico durante el primer año.",
            "Entrega rápida: solo 7-15 días hábiles."
        ],
        image: "/img/plans/plan-basico.png"
    },
    {
        name: "Plan emprendedor",
        slug: "plan-emprendedor",
        description: "Destaca y conecta con tus clientes.",
        price: 149990,
        features: [
            "Sitio web de hasta 5 páginas (ej: Inicio, Servicios, Galería, Contacto, Nosotros).",
            "Diseño personalizado con tu logo y colores corporativos.",
            "Integración con WhatsApp y redes sociales.",
            "Galería de fotos o catálogo de productos incluido.",
            "Optimización SEO básica y ubicación en Google Maps.",
            "Incluye hosting y dominio .cl o .com por el primer año.",
            "Soporte técnico prioritario durante el primer año.",
            "Entrega rápida: solo 10-20 días hábiles."
        ],
        image: "/img/plans/plan-emprendedor.png"
    },
    {
        name: "Plan premium",
        slug: "plan-premium",
        description: "Escala y centraliza tu presencia digital.",
        price: 299990,
        features: [
            "Sitio web con páginas ilimitadas y estructura avanzada.",
            "Funciones premium: blog, tienda online, reservas y más.",
            "Integración con sistemas externos (facturación, reservas, etc).",
            "Correos corporativos personalizados (ej: ventas@tudominio.com).",
            "Optimización SEO avanzada y analítica web.",
            "Incluye hosting y dominio .cl o .com por el primer año.",
            "Soporte técnico premium durante el primer año.",
            "Entrega rápida: solo 15-30 días hábiles."
        ],
        image: "/img/plans/plan-premium.png"
    }
];

export default useWebPlanesList;
