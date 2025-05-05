import React from 'react';

const PhaseOne: React.FC = () => {
    return (
        <div className="container mx-auto px-4 max-w-3xl">
            <div className="bg-black p-8 rounded-lg shadow-lg">
                
                <h1 className='block text-white font-bold mb-4'>Fase 1. Datos personales</h1>

                <div className="mb-4">
                        <label htmlFor="firstName" className="block text-gray-300 font-bold mb-2">Nombre (requerido)</label>
                        <input type="text" id="firstName" placeholder="Ingresa tu nombre" name="firstName" required className="w-full p-3 rounded-sm bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-600"/>
                </div>

                <div className="mb-4">
                <label htmlFor="lastName" className="block text-gray-300 font-bold mb-2">Apellido (requerido)</label>
                <input type="text" id="lastName" placeholder="Ingresa tu apellido" name="lastName" required className="w-full p-3 rounded-sm bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-600"/>
                </div>

            <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-300 font-bold mb-2">Email (requerido)</label>
                    <input type="email" id="email" placeholder="Ingresa tu email" name="email" required className="w-full p-3 rounded-sm bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-600"/>
            </div>

            <div className="mb-4">
                    <label htmlFor="phone" className="block text-gray-300 font-bold mb-2">Teléfono (requerido)</label>
                    <input type="tel" id="phone" placeholder="Ejemplo: +56912345678" name="phone" required className="w-full p-3 rounded-sm bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-600"/>
            </div>

            <div className="mb-4">
                <label htmlFor="contactMethod" className="block text-gray-300 font-bold mb-2">¿Cómo quieres que te contactemos? (requerido)</label>
                <select id="contactMethod" name="contactMethod" required className="w-full p-3 rounded-sm bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-600">
                    <option value="" disabled selected>Selecciona una opción</option>
                    <option value="email">Email</option>
                    <option value="whatsapp">WhatsApp</option>
                </select>
            </div>
            </div>
        </div>
    );
};

export default PhaseOne;