import React from 'react';

const PhaseFive: React.FC = () => {
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
                      className="w-full p-3 rounded-sm bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                      onChange={(e) => {
                      const techListField = document.getElementById("technologyListField");
                      const avoidTechListField = document.getElementById("avoidTechnologyListField");
                      if (e.target.value === "yes") {
                        techListField?.classList.remove("hidden");
                        avoidTechListField?.classList.remove("hidden");
                      } else {
                        techListField?.classList.add("hidden");
                        avoidTechListField?.classList.add("hidden");
                      }
                      }}
                    >
                      <option value="" disabled selected>Selecciona una opción</option>
                      <option value="yes">Sí</option>
                      <option value="no">No</option>
                    </select>
                    </div>

                    <div id="technologyListField" className="mb-4 hidden">
                    <label htmlFor="technologyList" className="block text-gray-300 font-bold mb-2">
                      Escribe una o varias tecnologías que deseas usar, separadas por comas
                    </label>
                    <textarea
                      id="technologyList"
                      name="technologyList"
                      placeholder="Ejemplo: React, Tailwind, Node.js"
                      className="w-full p-3 rounded-sm bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                    ></textarea>
                    </div>

                    <div id="avoidTechnologyListField" className="mb-4 hidden">
                    <label htmlFor="avoidTechnologyList" className="block text-gray-300 font-bold mb-2">
                      Escribe una o varias tecnologías que deseas evitar, separadas por comas
                    </label>
                    <textarea
                      id="avoidTechnologyList"
                      name="avoidTechnologyList"
                      placeholder="Ejemplo: PHP, jQuery"
                      className="w-full p-3 rounded-sm bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                    ></textarea>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="keyFunctionalities" className="block text-gray-300 font-bold mb-2">
                        ¿Hay alguna funcionalidad clave que sí o sí debe incluir el proyecto? (Opcional)
                      </label>
                      <textarea
                        id="keyFunctionalities"
                        name="keyFunctionalities"
                        placeholder="Describe las funcionalidades clave que necesitas en el proyecto. min 50, max 2000 caracteres."
                        className="w-full p-3 rounded-sm bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                      ></textarea>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="additionalComments" className="block text-gray-300 font-bold mb-2">
                        Comentarios o dudas adicionales (Opcional)
                      </label>
                      <textarea
                        id="additionalComments"
                        name="additionalComments"
                        placeholder="Escribe aquí cualquier comentario o duda adicional que tengas. min 50, max 2000 caracteres."
                        className="w-full p-3 rounded-sm bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                      ></textarea>
                    </div>

                </div>
            </div>
    );
};

export default PhaseFive;