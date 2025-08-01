import { useState } from "react";

const features = [
    {
        key: "unique",
        title: "Cada proyecto es único",
        subtitle: "Soluciones digitales personalizadas",
        description: (
            <>
                <p className="text-gray-300 text-lg">
                    Nos enfocamos en entender tus necesidades y crear soluciones digitales que se adapten a tus objetivos. Personalización y atención al detalle en cada etapa.
                </p>
            </>
        ),
        image: `/img/home/unique.png`,
    },
    {
        key: "speed",
        title: "Velocidad en desarrollo y producción",
        subtitle: "Entrega rápida y eficiente",
        description: (
            <>
                <p className="text-gray-300 text-lg">
                    Entregamos tus proyectos rápido y sin perder calidad. Usamos metodologías ágiles y optimizamos el rendimiento para una mejor experiencia de usuario.
                </p>
            </>
        ),
        image: "/img/home/speed.png",
    },
    {
        key: "security",
        title: "Seguridad ante todo",
        subtitle: "Protegemos tus datos",
        description: (
            <>
                <p className="text-gray-300 text-lg">
                    Aplicamos buenas prácticas para proteger tu información y mantener tus datos seguros frente a amenazas digitales.
                </p>
            </>
        ),
        image: "/img/home/security.png",
    },
];

const WhyChooseReyesAndFriends = () => {
    const [selected, setSelected] = useState(features[0].key);

    const currentFeature = features.find(f => f.key === selected);

    return (
        <section className="py-16 text-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl mb-12 text-center text-red-600 relative">
                    <span className="bg-zinc-900 px-4 relative z-10 text-white">¿Por qué elegirnos?</span>
                    <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-red-600/50 -z-0"></div>
                </h2>

                <p className="text-white text-lg text-center mb-8">
                    Cuéntanos lo que necesitas y lo hacemos realidad, fácil y rápido.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    {features.map(f => (
                        <button
                            key={f.key}
                            onClick={() => setSelected(f.key)}
                            className={`w-full px-6 py-2 rounded-full font-semibold transition-all
                                ${selected === f.key ? "bg-red-600 text-white shadow-lg" : "bg-zinc-800 text-red-400 hover:bg-red-700 hover:text-white"}
                            `}
                        >
                            {f.title}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-8">
                    <div className="md:col-span-2 order-2 md:order-1">
                        <h4 className="text-lg text-red-500 mb-2">{currentFeature?.title}</h4>
                        <h2 className="text-2xl md:text-4xl mb-4 text-white">{currentFeature?.subtitle}</h2>
                        {currentFeature?.description}
                    </div>
                    <div className="flex justify-center md:col-span-1 order-1 md:order-2 mb-6 md:mb-0">
                        <img
                            src={currentFeature?.image}
                            alt="reyes&friends"
                            className="w-full h-auto max-w-xs md:max-w-md object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseReyesAndFriends;