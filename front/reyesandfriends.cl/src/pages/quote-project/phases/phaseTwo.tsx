import React from 'react';

const PhaseTwo: React.FC = () => {
    return (

        <div className="container mx-auto px-4 max-w-3xl">
            <div className="mt-4 bg-black p-8 rounded-lg shadow-lg">
            <h1 className='block text-white font-bold mb-4'>Fase 2. Empresa y propósito del proyecto</h1>
            
            <div className="mb-4">
                <label htmlFor="companyName" className="block text-gray-300 font-bold mb-2">Nombre de la empresa (si aplica)</label>
                <input type="text" id="companyName" placeholder="Ejemplo: Reyes&Friends SPA" name="companyName" className="w-full p-3 rounded-sm bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-600"/>
            </div>

            <div className="mb-4">
                <label htmlFor="companyType" className="block text-gray-300 font-bold mb-2">El proyecto será personal o empresarial</label>
                <select id="companyType" name="companyType" required className="w-full p-3 rounded-sm bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-600">
                        <option value="" disabled selected>Selecciona una opción</option>
                        <option value="personal">Personal</option>
                        <option value="business">Empresarial</option>
                </select>
            </div>

            <div className="mb-4">
                <label htmlFor="projectPurpose" className="block text-gray-300 font-bold mb-2">¿Cuál es el propósito del proyecto? (requerido)</label>
                <textarea id="projectPurpose" name="projectPurpose" placeholder="Describe lo que buscas obtener o lograr con este proyecto. min 50, max 2000 caracteres." required className="w-full p-3 rounded-sm bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-600"></textarea>
            </div>

            </div>
        </div>
    );
};

export default PhaseTwo;