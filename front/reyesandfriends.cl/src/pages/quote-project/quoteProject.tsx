import React from 'react';
import { useServiceList } from '../../hooks/services/useServiceList';

const QuoteProject: React.FC = () => {
  const serviceList = useServiceList();

  return (
      <div>
        <section className="relative py-48 bg-cover bg-center relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#891818] to-[#5A1410]"></div>
                <div className="container mx-auto px-4 relative z-10">
                      <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                            Cotiza tu proyecto
                        </h1>
                        <div className="w-auto h-1 bg-red-600 mx-auto mb-6"></div>
                        <p className="text-xl mb-8 text-gray-300">
                            Has tomado una gran decisión al elegirnos para tu proyecto!
                            <br />
                            Ahora es momento de que nos cuentes más sobre lo que tienes en mente. Cuéntanos qué necesitas y te enviaremos una cotización personalizada.
                        </p>
                  </div>
            </div>
        </section>

        <section className="py-16">
              <h2 className="text-3xl font-bold mb-12 text-center text-red-500 relative">
                        <span className="px-4 relative z-10 bg-zinc-900 text-white">Rellena este formulario</span>
                        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-red-600/50 -z-0"></div>
              </h2>

            <form action="" method="POST" >
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

            </form>

        </section>



      </div>
  );
};

export default QuoteProject;