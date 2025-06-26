import React from 'react';
import { ServiceOption } from '../../../../hooks/services/useServiceList';

type PhaseThreeProps = {
    values: {
        projectType: string;
        otherProjectType: string;
        notSureProjectType: string;
        hasStartDate: string;
        startDate: string;
        estimatedBudget: string;
        deliveryTimeframe: string;
        projectDetails: string;
    };
    errors: Record<string, string>;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    validate: () => boolean;
    serviceList: ServiceOption[];
};

const PhaseThree: React.FC<PhaseThreeProps> = ({ values, errors, handleChange, serviceList }) => {
    const filteredServiceList = serviceList.filter(service => service.value !== "fullList");
    const selectedService = filteredServiceList.find(service => (service.value || service.name) === values.projectType);

    return (
        <div className="container mx-auto px-4 max-w-3xl">
            <div className="mt-4 bg-black p-8 rounded-lg shadow-lg">
                <h1 className='block text-white font-bold mb-4'>Fase 3. Alcance técnico y funcional</h1>

                <div className="mb-4">
                    <label htmlFor="projectType" className="block text-gray-300 font-bold mb-2">¿Qué tipo de proyecto necesitas? (Requerido)</label>
                    <select
                        name="projectType"
                        id="projectType"
                        value={values.projectType}
                        onChange={handleChange}
                        className="w-full p-3 rounded-sm bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                    >
                        <option value="" disabled>Selecciona el tipo de proyecto</option>
                        {filteredServiceList.map((service) => (
                            <option key={service.value || service.name} value={service.value || service.name}>
                                {service.name}
                            </option>
                        ))}
                        <option value="other">Otro</option>
                        <option value="notSure">No estoy seguro</option>
                    </select>
                    {errors.projectType && <p className="text-red-500 text-sm mt-1">{errors.projectType}</p>}
                    {selectedService && (
                        <p className="mt-2">
                            <a 
                                href={selectedService.path} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-red-500 hover:text-red-400 underline text-sm"
                            >
                                Ver detalles sobre {selectedService.name}
                            </a>
                        </p>
                    )}
                </div>

                {values.projectType === "other" && (
                    <div className="mb-4">
                        <label htmlFor="otherProjectType" className="block text-gray-300 font-bold mb-2">Describe el tipo de proyecto (Requerido)</label>
                        <textarea
                            id="otherProjectType"
                            name="otherProjectType"
                            value={values.otherProjectType}
                            onChange={handleChange}
                            placeholder='Ej: Aplicación web, App móvil, etc.'
                            className="w-full p-3 rounded-sm bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                        ></textarea>
                        {errors.otherProjectType && <p className="text-red-500 text-sm mt-1">{errors.otherProjectType}</p>}
                    </div>
                )}

                {values.projectType === "notSure" && (
                    <div className="mb-4">
                        <label htmlFor="notSureProjectType" className="block text-gray-300 font-bold mb-2">Describe en palabras lo que necesitas (Requerido)</label>
                        <textarea
                            id="notSureProjectType"
                            name="notSureProjectType"
                            value={values.notSureProjectType}
                            placeholder='Ej: Necesito una aplicación que me ayude a gestionar mis tareas diarias.'
                            onChange={handleChange}
                            className="w-full p-3 rounded-sm bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                        ></textarea>
                        {errors.notSureProjectType && <p className="text-red-500 text-sm mt-1">{errors.notSureProjectType}</p>}
                    </div>
                )}

                <div className="mb-4">
                    <label htmlFor="hasStartDate" className="block text-gray-300 font-bold mb-2">¿Tienes una fecha de inicio? (Requerido)</label>
                    <select
                        id="hasStartDate"
                        name="hasStartDate"
                        value={values.hasStartDate}
                        onChange={handleChange}
                        className="w-full p-3 rounded-sm bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                    >
                        <option value="" disabled>Selecciona una opción</option>
                        <option value="yes">Sí</option>
                        <option value="no">No</option>
                    </select>
                    {errors.hasStartDate && <p className="text-red-500 text-sm mt-1">{errors.hasStartDate}</p>}
                </div>

                {values.hasStartDate === "yes" && (
                    <div className="mb-4">
                        <label htmlFor="startDate" className="block text-gray-300 font-bold mb-2">Fecha de inicio (Requerido)</label>
                        <input
                            type="date"
                            id="startDate"
                            name="startDate"
                            value={values.startDate}
                            onChange={handleChange}
                            className="w-full p-3 rounded-sm bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                        />
                        {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
                    </div>
                )}

                <div className="mb-4">
                    <label htmlFor="estimatedBudget" className="block text-gray-300 font-bold mb-2">¿Tienes un presupuesto estimado? (Opcional)</label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">$</span>
                        <input
                            type="text"
                            id="estimatedBudget"
                            name="estimatedBudget"
                            value={values.estimatedBudget}
                            onChange={handleChange}
                            className="w-full pl-8 p-3 rounded-sm bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                        />
                    </div>
                    {errors.estimatedBudget && <p className="text-red-500 text-sm mt-1">{errors.estimatedBudget}</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="deliveryTimeframe" className="block text-gray-300 font-bold mb-2">Plazo ideal de entrega (Opcional)</label>
                    <select
                        id="deliveryTimeframe"
                        name="deliveryTimeframe"
                        value={values.deliveryTimeframe}
                        onChange={handleChange}
                        className="w-full p-3 rounded-sm bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                    >
                        <option value="" disabled>Selecciona una opción</option>
                        <option value="no">No</option>
                        <option value="lessThan1Month">Menos de 1 mes</option>
                        <option value="1To3Months">1-3 meses</option>
                        <option value="3To6Months">3-6 meses</option>
                        <option value="flexible">Flexible</option>
                    </select>
                    {errors.deliveryTimeframe && <p className="text-red-500 text-sm mt-1">{errors.deliveryTimeframe}</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="projectDetails" className="block text-gray-300 font-bold mb-2">Detalles adicionales (Opcional)</label>
                    <textarea
                        id="projectDetails"
                        name="projectDetails"
                        value={values.projectDetails}
                        onChange={handleChange}
                        placeholder='Información libre para el proyecto Ej: Quiero que mi proyecto haga esto y esto... min 50 max 2000 caracteres.'
                        className="w-full p-3 rounded-sm bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                    ></textarea>
                    {errors.projectDetails && <p className="text-red-500 text-sm mt-1">{errors.projectDetails}</p>}
                </div>
            </div>
        </div>
    );
};

export default PhaseThree;
