const useWebPlanesList = () => [
    {
        name: "Plan básico",
        slug: "plan-basico",
        description: "Ideal para emprendedores que comienzan su presencia en línea.",
        price: 99990,
        features: [
            "Sitio web de hasta 3 páginas (ej: Inicio, Servicios, Contacto).",
            "Diseño personalizado con tu logo y colores corporativos.",
            "Formulario de contacto integrado. (solo lectura de emails)",
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
            "Formulario de contacto integrado con panel de administración para leer y responder correos.",
            "Optimización básica para buscadores (SEO).",
            "Incluye hosting y dominio .cl o .com por el primer año.",
            "Soporte técnico prioritario durante el primer año.",
            "Entrega rápida: solo 10-20 días hábiles.",
            "Integración con WhatsApp y redes sociales.",
            "Galería de fotos o catálogo de productos incluido."
        ],
        image: "/img/plans/plan-emprendedor.png"
    },
    {
        name: "Plan premium",
        slug: "plan-premium",
        description: "Escala y centraliza tu presencia digital.",
        price: 299990,
        features: [
            "Sitio web hasta 10 páginas y estructura avanzada.",
            "Diseño personalizado con tu logo y colores corporativos.",
            "Formulario de contacto integrado con panel de administración para leer emails.",
            "Optimización SEO avanzada y analítica web.",
            "Incluye hosting y dominio .cl o .com por el primer año.",
            "Soporte técnico avanzado durante el primer año.",
            "Entrega rápida: solo 15-30 días hábiles.",
            "Integración con WhatsApp y redes sociales.",
            "Galería de fotos o catálogo de productos incluido.",
            "Funciones premium: blog, tienda online, reservas y más.",
            "Integración con sistemas externos (facturación, reservas, etc).",
        ],
        image: "/img/plans/plan-premium.png"
    }
];

export default useWebPlanesList;