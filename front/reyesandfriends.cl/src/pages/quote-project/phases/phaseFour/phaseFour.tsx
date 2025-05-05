import React from 'react';

type PhaseFourProps = {
    values: {
        hostingService: string;
        hasDomain: string;
        domainName: string;
        domainSuggestion: string;
    };
    errors: Record<string, string>;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    validate: () => boolean;
};

const PhaseFour: React.FC<PhaseFourProps> = ({ values, errors, handleChange, validate }) => {
    return (
        <div className="container mx-auto px-4 max-w-3xl">
            <div className="mt-4 bg-black p-8 rounded-lg shadow-lg">
                <h1 className="block text-white font-bold mb-4">Fase 4. Despliegue y servicios adicionales</h1>
                
                <div className="mb-4">
                    <label htmlFor="hostingService" className="block text-gray-300 font-bold mb-2">
                        ¿Necesitas un servicio de hosting? (Opcional)
                    </label>
                    <select
                        id="hostingService"
                        name="hostingService"
                        value={values.hostingService}
                        onChange={handleChange}
                        className="w-full p-3 rounded-sm bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                    >
                        <option value="" disabled>Selecciona una opción</option>
                        <option value="yes">Sí</option>
                        <option value="no">No</option>
                    </select>
                    {errors.hostingService && <p className="text-red-500 text-sm mt-1">{errors.hostingService}</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="hasDomain" className="block text-gray-300 font-bold mb-2">
                        ¿Tienes un dominio para tu proyecto? (Opcional)
                    </label>
                    <select
                        id="hasDomain"
                        name="hasDomain"
                        value={values.hasDomain}
                        onChange={handleChange}
                        className="w-full p-3 rounded-sm bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                    >
                        <option value="" disabled>Selecciona una opción</option>
                        <option value="yes">Sí, utilizaré mi dominio en este proyecto</option>
                        <option value="no">No, voy a necesitar un dominio</option>
                        <option value="notSure">No estoy seguro</option>
                    </select>
                    {errors.hasDomain && <p className="text-red-500 text-sm mt-1">{errors.hasDomain}</p>}
                </div>

                {values.hasDomain === "yes" && (
                    <div className="mb-4">
                        <label htmlFor="domainName" className="block text-gray-300 font-bold mb-2">
                            Por favor, escribe el nombre de tu dominio (requerido)
                        </label>
                        <input
                            type="text"
                            id="domainName"
                            name="domainName"
                            value={values.domainName}
                            onChange={handleChange}
                            placeholder="Ejemplo: www.miempresa.com"
                            className="w-full p-3 rounded-sm bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                        />
                        {errors.domainName && <p className="text-red-500 text-sm mt-1">{errors.domainName}</p>}
                    </div>
                )}

                {values.hasDomain === "no" && (
                    <div className="mb-4">
                        <label htmlFor="domainSuggestion" className="block text-gray-300 font-bold mb-2">
                            ¿Tienes en mente algún nombre para tu dominio? (opcional)
                        </label>
                        <input
                            type="text"
                            id="domainSuggestion"
                            name="domainSuggestion"
                            value={values.domainSuggestion}
                            onChange={handleChange}
                            placeholder="Ejemplo: www.miempresa.com"
                            className="w-full p-3 rounded-sm bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                        />
                        {errors.domainSuggestion && <p className="text-red-500 text-sm mt-1">{errors.domainSuggestion}</p>}
                    </div>
                )}

                {values.hasDomain === "notSure" && (
                    <p className="mt-2 text-sm text-gray-300">
                        No te preocupes, podemos discutir esto en un futuro a más detalle.
                    </p>
                )}
            </div>
        </div>
    );
};

export default PhaseFour;