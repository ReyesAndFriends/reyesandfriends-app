const useWebPlanesList = () => [
    {
        name: "Plan básico",
        slug:"plan-basico",
        description: "Ideal para emprendedores que recién empiezan.",
        price: 90000,
        features: [
            "1 página web tipo “landing” (presentación de tu negocio).",
            "Diseño sencillo y profesional.",
            "Hasta 3 secciones (Inicio, Servicios, Contacto).",
            "Formulario de contacto.",
            "Optimización básica en Google.",
            "Incluye hosting y dominio .cl / .com el primer año.",
            "Tiempo estimado de entrega: 10-20 días hábiles"
        ],
        image: "/img/plans/plan-basico.png"
    },
    {
        name: "Plan emprendedor",
        slug:"plan-emprendedor",
        description: "Para negocios que necesitan más presencia.",
        price: 150000,
        features: [
            "Sitio web de hasta 5 páginas.",
            "Diseño personalizado con tu logo y colores.",
            "Integración con WhatsApp y redes sociales.",
            "Galería de fotos o catálogo de productos.",
            "Optimización SEO básica + Google Maps.",
            "Hosting y dominio incluidos el primer año.",
            "Tiempo estimado de entrega: 10-20 días hábiles"
        ],
        image: "/img/plans/plan-emprendedor.png"
    },
    {
        name: "Plan premium",
        slug:"plan-premium",
        description: "Para empresas que quieren escalar y tener todo centralizado.",
        price: 300000,
        features: [
            "Web ilimitada en páginas.",
            "Tienda online avanzada (stock, envíos, pagos).",
            "Integración con sistemas externos (facturación, reservas, etc).",
            "Correos corporativos incluidos (ejemplo: ventas@tudominio.com).",
            "Hosting y dominio incluidos el primer año."
        ],
        image: "/img/plans/plan-premium.png"
    }
];

export default useWebPlanesList;
