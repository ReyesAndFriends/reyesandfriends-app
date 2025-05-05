import React from 'react';
import { useServiceList } from '../../../hooks/services/useServiceList';

const PhaseThree: React.FC = () => {

    const serviceList = useServiceList();

    return (
            <div className="container mx-auto px-4 max-w-3xl">
                <div className="mt-4 bg-black p-8 rounded-lg shadow-lg">
                  <h1 className='block text-white font-bold mb-4'>Fase 3. Alcance técnico y funcional</h1>
                  
                  <div className="mb-4">
                    <label htmlFor="projectType" className="block text-gray-300 font-bold mb-2">¿Qué tipo de proyecto necesitas? (requerido)</label>
                    <select
                      name="projectType"
                      id="projectType"
                      required
                      className="w-full p-3 rounded-sm bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                      onChange={(e) => {
                      const otherField = document.getElementById("otherProjectTypeField");
                      const notSureField = document.getElementById("notSureProjectTypeField");
                      if (e.target.value === "other") {
                        otherField?.classList.remove("hidden");
                        notSureField?.classList.add("hidden");
                      } else if (e.target.value === "notSure") {
                        notSureField?.classList.remove("hidden");
                        otherField?.classList.add("hidden");
                      } else {
                        otherField?.classList.add("hidden");
                        notSureField?.classList.add("hidden");
                      }
                      }}
                    >
                      <option value="" disabled selected>Selecciona el tipo de proyecto</option>
                      {serviceList.map((service) => (
                      <option key={service.value || service.name} value={service.value || service.name}>
                        {service.name}
                      </option>
                      ))}
                      <option value="other">Otro</option>
                      <option value="notSure">No estoy seguro</option>
                    </select>
                    </div>

                    <div id="otherProjectTypeField" className="mb-4 hidden">
                    <label htmlFor="otherProjectType" className="block text-gray-300 font-bold mb-2">Por favor, describe qué tipo de proyecto necesitas</label>
                    <textarea
                      id="otherProjectType"
                      name="otherProjectType"
                      placeholder="Describe el tipo de proyecto que necesitas"
                      className="w-full p-3 rounded-sm bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                    ></textarea>
                    </div>

                    <div id="notSureProjectTypeField" className="mb-4 hidden">
                    <label htmlFor="notSureProjectType" className="block text-gray-300 font-bold mb-2">Describe en palabras qué tipo de página o servicio necesitas para poder ayudarte</label>
                    <textarea
                      id="notSureProjectType"
                      name="notSureProjectType"
                      placeholder="Describe lo que tienes en mente para que podamos ayudarte"
                      className="w-full p-3 rounded-sm bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                    ></textarea>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="hasStartDate" className="block text-gray-300 font-bold mb-2">¿Tienes alguna fecha para iniciar el proyecto? (Requerido)</label>
                      <select
                        id="hasStartDate"
                        name="hasStartDate"
                        required
                        className="w-full p-3 rounded-sm bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                        onChange={(e) => {
                          const startDateField = document.getElementById("startDateField");
                          if (e.target.value === "yes") {
                            startDateField?.classList.remove("hidden");
                          } else {
                            startDateField?.classList.add("hidden");
                          }
                        }}
                      >
                        <option value="" disabled selected>Selecciona una opción</option>
                        <option value="yes">Sí</option>
                        <option value="no">No</option>
                      </select>
                    </div>

                    <div id="startDateField" className="mb-4 hidden">
                      <label htmlFor="startDate" className="block text-gray-300 font-bold mb-2">Selecciona la fecha de inicio (Requerido)</label>
                      <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        className="w-full p-3 rounded-sm bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="estimatedBudget" className="block text-gray-300 font-bold mb-2">¿Tienes un presupuesto estimado? (Opcional)</label>
                      <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">$</span>
                      <input
                        type="text"
                        id="estimatedBudget"
                        name="estimatedBudget"
                        placeholder="Ingresa tu presupuesto estimado en CLP"
                        className="w-full pl-8 p-3 rounded-sm bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                      />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="deliveryTimeframe" className="block text-gray-300 font-bold mb-2">¿Tienes un plazo ideal de entrega? (Opcional)</label>
                      <select
                        id="deliveryTimeframe"
                        name="deliveryTimeframe"
                        className="w-full p-3 rounded-sm bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                      >
                        <option value="" disabled selected>Selecciona una opción</option>
                        <option value="no">No</option>
                        <option value="lessThan1Month">Menos de 1 mes</option>
                        <option value="1To3Months">1-3 meses</option>
                        <option value="3To6Months">3-6 meses</option>
                        <option value="flexible">Flexible</option>
                      </select>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="projectDetails" className="block text-gray-300 font-bold mb-2">¿Tienes algún detalle adicional que quieras compartir? (Opcional)</label>
                      <textarea
                        id="projectDetails"
                        name="projectDetails"
                        placeholder="Describe cualquier detalle adicional que quieras compartir. min 50, max 2000 caracteres."
                        className="w-full p-3 rounded-sm bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                      ></textarea>
                    </div>
                </div>
            </div>
    );
};

export default PhaseThree;