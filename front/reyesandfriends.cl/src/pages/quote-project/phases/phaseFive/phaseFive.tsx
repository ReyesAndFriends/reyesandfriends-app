import React from 'react';

type PhaseFiveProps = {
    values: {
        technologyPreference: string;
        technologyList: string;
        avoidTechnologyList: string;
        keyFunctionalities: string;
        additionalComments: string;
    };
    errors: Record<string, string>;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    validate: () => boolean;
};

const PhaseFive: React.FC<PhaseFiveProps> = ({ values, errors, handleChange }) => {
    return (
        <div className="container mx-auto px-4 max-w-3xl">
            <div className="mt-4 bg-black p-8 rounded-lg shadow-lg">
                <h1 className='block text-white font-bold mb-4'>Fase 5. Extras e información final</h1>

                <div className="mb-4">
                    <label htmlFor="technologyPreference" className="block text-gray-300 font-bold mb-2">
                        ¿Hay algún sistema o tecnología específica que deseas usar o evitar? (Opcional)
                    </label>
                    <select
                        id="technologyPreference"
                        name="technologyPreference"
                        value={values.technologyPreference}
                        onChange={handleChange}
                        className="w-full p-3 rounded-sm bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                    >
                        <option value="" disabled>Selecciona una opción</option>
                        <option value="yes">Sí</option>
                        <option value="no">No</option>
                    </select>
                    {errors.technologyPreference && <p className="text-red-500 text-sm mt-1">{errors.technologyPreference}</p>}
                </div>

                {values.technologyPreference === "yes" && (
                    <>
                        <div className="mb-4">
                            <label htmlFor="technologyList" className="block text-gray-300 font-bold mb-2">
                                Escribe una o varias tecnologías que deseas usar, separadas por comas
                            </label>
                            <textarea
                                id="technologyList"
                                name="technologyList"
                                value={values.technologyList}
                                onChange={handleChange}
                                placeholder="Ejemplo: React, Tailwind, Node.js"
                                className="w-full p-3 rounded-sm bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                            ></textarea>
                            {errors.technologyList && <p className="text-red-500 text-sm mt-1">{errors.technologyList}</p>}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="avoidTechnologyList" className="block text-gray-300 font-bold mb-2">
                                Escribe una o varias tecnologías que deseas evitar, separadas por comas
                            </label>
                            <textarea
                                id="avoidTechnologyList"
                                name="avoidTechnologyList"
                                value={values.avoidTechnologyList}
                                onChange={handleChange}
                                placeholder="Ejemplo: PHP, jQuery"
                                className="w-full p-3 rounded-sm bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                            ></textarea>
                            {errors.avoidTechnologyList && <p className="text-red-500 text-sm mt-1">{errors.avoidTechnologyList}</p>}
                        </div>
                    </>
                )}

                <div className="mb-4">
                    <label htmlFor="keyFunctionalities" className="block text-gray-300 font-bold mb-2">
                        ¿Hay alguna funcionalidad clave que sí o sí debe incluir el proyecto? (Opcional)
                    </label>
                    <textarea
                        id="keyFunctionalities"
                        name="keyFunctionalities"
                        value={values.keyFunctionalities}
                        onChange={handleChange}
                        placeholder="Describe las funcionalidades clave que necesitas en el proyecto. min 50, max 2000 caracteres."
                        className="w-full p-3 rounded-sm bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                    ></textarea>
                    {errors.keyFunctionalities && <p className="text-red-500 text-sm mt-1">{errors.keyFunctionalities}</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="additionalComments" className="block text-gray-300 font-bold mb-2">
                        Comentarios o dudas adicionales (Opcional)
                    </label>
                    <textarea
                        id="additionalComments"
                        name="additionalComments"
                        value={values.additionalComments}
                        onChange={handleChange}
                        placeholder="Escribe aquí cualquier comentario o duda adicional que tengas. min 50, max 2000 caracteres."
                        className="w-full p-3 rounded-sm bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                    ></textarea>
                    {errors.additionalComments && <p className="text-red-500 text-sm mt-1">{errors.additionalComments}</p>}
                </div>
            </div>
        </div>
    );
};

export default PhaseFive;