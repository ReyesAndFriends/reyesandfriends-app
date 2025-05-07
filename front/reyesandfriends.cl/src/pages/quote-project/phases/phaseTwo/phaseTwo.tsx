import React from 'react';

type PhaseTwoProps = {
    values: {
        companyName: string;
        companyType: string;
        projectPurpose: string;
    };
    errors: Record<string, string>;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    validate: () => boolean;
};

const PhaseTwo: React.FC<PhaseTwoProps> = ({ values, errors, handleChange }) => {
    return (
        <div className="container mx-auto px-4 max-w-3xl">
            <div className="mt-4 bg-black p-8 rounded-lg shadow-lg">
                <h1 className='block text-white font-bold mb-4'>Fase 2. Empresa y propósito del proyecto</h1>
                
                <div className="mb-4">
                    <label htmlFor="companyName" className="block text-gray-300 font-bold mb-2">Nombre de la empresa (Si aplica)</label>
                    <input 
                        type="text" 
                        id="companyName" 
                        name="companyName" 
                        placeholder="Ejemplo: Reyes&Friends SPA" 
                        value={values.companyName} 
                        onChange={handleChange} 
                        className="w-full p-3 rounded-sm bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                    />
                    {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="companyType" className="block text-gray-300 font-bold mb-2">El proyecto será personal o empresarial (Requerido)</label>
                    <select 
                        id="companyType" 
                        name="companyType" 
                        value={values.companyType} 
                        onChange={handleChange} 
                        className="w-full p-3 rounded-sm bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                    >
                        <option value="" disabled>Selecciona una opción</option>
                        <option value="personal">Personal</option>
                        <option value="business">Empresarial</option>
                    </select>
                    {errors.companyType && <p className="text-red-500 text-sm mt-1">{errors.companyType}</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="projectPurpose" className="block text-gray-300 font-bold mb-2">¿Cuál es el propósito del proyecto? (Requerido)</label>
                    <textarea 
                        id="projectPurpose" 
                        name="projectPurpose" 
                        placeholder="Describe lo que buscas obtener o lograr con este proyecto. min 50, max 2000 caracteres." 
                        value={values.projectPurpose} 
                        onChange={handleChange} 
                        className="w-full p-3 rounded-sm bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                    ></textarea>
                    {errors.projectPurpose && <p className="text-red-500 text-sm mt-1">{errors.projectPurpose}</p>}
                </div>
            </div>
        </div>
    );
};

export default PhaseTwo;
