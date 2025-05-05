import React from 'react';

const PhaseFour: React.FC = () => {
    return (
            <div className="container mx-auto px-4 max-w-3xl">
                <div className="mt-4 bg-black p-8 rounded-lg shadow-lg">
                  <h1 className="block text-white font-bold mb-4">Fase 4. Despliegue y servicios adicionales</h1>
                  
                  <div className="mb-4">
                  <label htmlFor="hostingService" className="block text-gray-300 font-bold mb-2">
                    ¿Necesitas un servicio de hosting? (Opcional)
                    <span id="whatIsThisHosting" className="text-blue-500 cursor-pointer ml-2">¿Qué es esto?</span>
                  </label>
                  <select
                    id="hostingService"
                    name="hostingService"
                    className="w-full p-3 rounded-sm bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                    onChange={(e) => {
                    const hostingMessage = document.getElementById("hostingMessage");
                    if (e.target.value === "yes") {
                    hostingMessage!.innerHTML =
                    "¡Excelente elección! Nuestro servicio de hosting garantiza máxima velocidad, seguridad y soporte técnico 24/7 para que tu proyecto esté siempre en las mejores manos.";
                    hostingMessage!.classList.remove("hidden");
                    } else if (e.target.value === "no") {
                    hostingMessage!.innerHTML =
                    "Te recomendamos considerar nuestro servicio de hosting. Ofrecemos beneficios exclusivos como alta disponibilidad, soporte técnico especializado y optimización para tu proyecto.";
                    hostingMessage!.classList.remove("hidden");
                    } else {
                    hostingMessage!.classList.add("hidden");
                    }
                    }}
                  >
                    <option value="" disabled selected>
                    Selecciona una opción
                    </option>
                    <option value="yes">Sí</option>
                    <option value="no">No</option>
                  </select>
                  <p
                    id="hostingMessage"
                    className="mt-2 text-sm text-gray-300 hidden"
                  ></p>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="hasDomain" className="block text-gray-300 font-bold mb-2">
                    ¿Tienes un dominio para tu proyecto? (Opcional) <span id="whatIsThisDomain" className="text-blue-500 cursor-pointer ml-2">¿Qué es esto?</span>
                    </label>
                    <select
                    id="hasDomain"
                    name="hasDomain"
                    className="w-full p-3 rounded-sm bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                    onChange={(e) => {
                      const domainField = document.getElementById("domainField");
                      const domainNameField = document.getElementById("domainNameField");
                      const domainNotSureMessage = document.getElementById("domainNotSureMessage");
                      if (e.target.value === "yes") {
                      domainField?.classList.remove("hidden");
                      domainNameField?.classList.add("hidden");
                      domainNotSureMessage?.classList.add("hidden");
                      } else if (e.target.value === "no") {
                      domainField?.classList.add("hidden");
                      domainNameField?.classList.remove("hidden");
                      domainNotSureMessage?.classList.add("hidden");
                      } else if (e.target.value === "notSure") {
                      domainField?.classList.add("hidden");
                      domainNameField?.classList.add("hidden");
                      domainNotSureMessage?.classList.remove("hidden");
                      }
                    }}
                    >
                    <option value="" disabled selected>Selecciona una opción</option>
                    <option value="yes">Si, utilizaré mi dominio en este proyecto (se solicitarán accesos en un futuro)</option>
                    <option value="no">No, voy a necesitar un dominio</option>
                    <option value="notSure">No estoy seguro</option>
                    </select>
                  </div>

                  <div id="domainField" className="mb-4 hidden">
                    <label htmlFor="domainName" className="block text-gray-300 font-bold mb-2">
                    Por favor, escribe el nombre de tu dominio (requerido)
                    </label>
                    <input
                    type="text"
                    id="domainName"
                    required
                    name="domainName"
                    placeholder="Ejemplo: www.miempresa.com"
                    className="w-full p-3 rounded-sm bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                    />
                  </div>

                  <div id="domainNameField" className="mb-4 hidden">
                    <label htmlFor="domainSuggestion" className="block text-gray-300 font-bold mb-2">
                    ¿Tienes en mente algún nombre para tu dominio? (opcional)
                    </label>
                    <input
                    type="text"
                    id="domainSuggestion"
                    name="domainSuggestion"
                    placeholder="Ejemplo: www.miempresa.com"
                    className="w-full p-3 rounded-sm bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                    />
                  </div>

                  <p id="domainNotSureMessage" className="mt-2 text-sm text-gray-300 hidden">
                    No te preocupes, podemos discutir esto en un futuro a más detalle.
                  </p>
                </div>
            </div>
    );
};

export default PhaseFour;