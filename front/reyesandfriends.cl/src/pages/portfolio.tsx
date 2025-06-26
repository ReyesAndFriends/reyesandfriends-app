import { ArrowRight, Calendar, Check, ChevronRight, Tag, Users } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { usePortfolioProjects } from "../hooks/usePortfolioProjects";

const Portfolio: React.FC = () => {
    const { projects, filterProjects, selectedCategory } = usePortfolioProjects();

    return (
        <>
            <section className="relative py-48 bg-cover bg-center relative">
                <div className="absolute inset-0 bg-hero-section"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                            Nuestro Portafolio
                        </h1>
                        <div className="w-24 h-1 bg-red-600 mx-auto mb-6"></div>
                        <p className="text-xl mb-8 text-gray-300">
                            Descubra los proyectos que hemos desarrollado para empresas líderes en diversos sectores, demostrando
                            nuestra experiencia y capacidad de innovación.
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-16">
                <div className="container mx-auto px-4">

                    <h2 className="text-3xl font-bold mb-12 text-center text-white relative">
                        <span className="bg-zinc-900 px-4 relative z-10">Proyecto Destacado</span>
                        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-red-600/50 -z-0"></div>
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="relative">
                            <div className="absolute inset-0 -translate-x-6 -translate-y-6"></div>
                            <img src="/img/projects/turnomaster.png" alt="Proyecto Destacado" width={700} height={500} className="relative z-10 border-4 border-red-700"/>
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="bg-red-700 text-white text-xs px-3 py-1 rounded-sm">EN PROGRESO</span>
                                <span className="text-gray-400 text-sm flex items-center gap-1">
                                    <Calendar className="h-4 w-4" /> 2024 - Presente
                                </span>
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-red-500">TurnoMaster</h3>
                            <p className="text-gray-300 mb-4">
                                    TurnoMaster es una solución integral para la gestión de turnos en empresas, diseñada para optimizar el
                                    control de asistencia y mejorar la eficiencia operativa. Con un sistema intuitivo y fácil de usar, permite
                                    a los empleados registrar sus entradas y salidas de manera rápida y sencilla.
                            </p>
                            <div className="mb-6">
                                <h4 className="text-lg font-semibold mb-2 text-white">Tecnologías Utilizadas:</h4>
                                <div className="flex flex-wrap gap-2">
                                    <span className="bg-zinc-800 text-gray-300 text-xs px-3 py-1 rounded-full">Laravel</span>
                                    <span className="bg-zinc-800 text-gray-300 text-xs px-3 py-1 rounded-full">Tailwind</span>
                                    <span className="bg-zinc-800 text-gray-300 text-xs px-3 py-1 rounded-full">MySQL</span>
                                    <span className="bg-zinc-800 text-gray-300 text-xs px-3 py-1 rounded-full">Apache</span>
                                    <span className="bg-zinc-800 text-gray-300 text-xs px-3 py-1 rounded-full">React</span>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h4 className="text-lg font-semibold mb-2 text-white">Resultados esperados:</h4>
                                <ul className="space-y-2">
                                    <li className="flex items-start gap-2">
                                        <Check className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                                        <span className="text-gray-300">Gestión de registros más eficiente</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <Check className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                                        <span className="text-gray-300">Mejoras en la forma de justificar inasistencias por parte de empleados</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <Check className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                                        <span className="text-gray-300">Reportes y estadísticas detalladas para informes</span>
                                    </li>
                                </ul>
                            </div>

                            <Link to="/projects/turnomaster" className="inline-flex items-center gap-2 bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-sm transition-colors">
                                Detalles del proyecto <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-black py-8 border-y border-zinc-800">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap justify-center gap-4">
                        {["Todos", "Empresas e IoT", "Entretenimiento", "Desarrollo web"].map((category) => (
                            <button
                                key={category}
                                onClick={() => filterProjects(category)}
                                className={`px-4 py-2 rounded-sm transition-colors ${
                                    selectedCategory === category
                                        ? "bg-red-700 text-white hover:bg-red-800"
                                        : "bg-zinc-800 text-white hover:bg-zinc-700"
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 bg-zinc-900">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-12 text-center text-white relative">
                        <span className="bg-zinc-900 px-4 relative z-10">Nuestros Proyectos</span>
                        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-red-600/50 -z-0"></div>
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project) => (
                            <div key={project.id} className="bg-black p-6 rounded-sm shadow-md border-t-4 border-red-700 hover:shadow-lg transition-shadow group">
                                <div className="relative mb-4 overflow-hidden">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <div className={`absolute top-2 right-2 ${project.status === "COMPLETADO" ? "bg-red-700" : "bg-zinc-700"} text-white text-xs px-2 py-1 rounded-sm`}>
                                        {project.status}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 mb-2">
                                    <Tag className="h-4 w-4 text-red-500" />
                                    <span className="text-gray-400 text-sm">{project.category}</span>
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-red-500">{project.title}</h3>
                                <p className="text-gray-300 mb-4 line-clamp-3">{project.description}</p>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-1 text-gray-400 text-sm">
                                        <Users className="h-4 w-4" />
                                        <span>{project.client}</span>
                                    </div>
                                    <Link to="#" className="text-red-500 hover:text-red-400 flex items-center gap-1">
                                        Detalles <ChevronRight className="h-4 w-4" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-12 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-6">¿Listo para ser nuestro próximo caso de éxito?</h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto">
                        Contáctenos hoy para discutir su proyecto y descubrir cómo podemos ayudarle a alcanzar sus objetivos
                        tecnológicos.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="quote-project" className="bg-red-700 text-white hover:bg-red-800 px-8 py-3 rounded-sm font-bold transition-colors">
                            Cotizar proyecto
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
};
export default Portfolio;