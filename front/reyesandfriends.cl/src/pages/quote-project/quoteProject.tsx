import React, { useEffect } from "react";
import useQuoteProject from "./useQuoteProject";

const QuoteProject: React.FC = () => {
  const { currentStep, formData, errors, handleChange, handleNext, handleBack, submitForm } = useQuoteProject();

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const steps = [
    <div key="step1" className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <h2 className="col-span-2 text-xl font-bold text-white">🧾 Paso 1: Datos del cliente</h2>
      <div className="col-span-2">
        <label htmlFor="fullName" className="block text-gray-300 font-bold mb-2">Nombre completo</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
          placeholder="Ingresa tu nombre completo"
          className="w-full p-3 rounded-sm bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-600"
        />
        {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
      </div>
      <div className="col-span-2">
        <label htmlFor="email" className="block text-gray-300 font-bold mb-2">Correo electrónico</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Ingresa tu correo electrónico"
          className="w-full p-3 rounded-sm bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-600"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>
      <div className="col-span-2">
        <label htmlFor="phone" className="block text-gray-300 font-bold mb-2">Teléfono (opcional)</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Ingresa tu número de teléfono"
          className="w-full p-3 rounded-sm bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-600"
        />
      </div>
      <div className="col-span-2">
        <label htmlFor="company" className="block text-gray-300 font-bold mb-2">Empresa (si aplica)</label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Ingresa el nombre de tu empresa"
          className="w-full p-3 rounded-sm bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-600"
        />
      </div>
      <div className="col-span-2">
        <label htmlFor="referral" className="block text-gray-300 font-bold mb-2">¿Cómo nos conociste?</label>
        <select
          id="referral"
          name="referral"
          value={formData.referral}
          onChange={handleChange}
          className="w-full p-3 rounded-sm bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-600"
        >
          <option value="">Selecciona una opción</option>
          <option value="Google">Google</option>
          <option value="Recomendación">Recomendación</option>
          <option value="Redes sociales">Redes sociales</option>
          <option value="Otro">Otro</option>
        </select>
      </div>
    </div>,

    <div key="step2" className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <h2 className="col-span-2 text-xl font-bold text-white">🛠️ Paso 2: Tipo de proyecto</h2>
      <div className="col-span-2">
        <label htmlFor="projectType" className="block text-gray-300 font-bold mb-2">Tipo de proyecto</label>
        <select
          id="projectType"
          name="projectType"
          value={formData.projectType}
          required
          onChange={handleChange}
          className="w-full p-3 rounded-sm bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-600"
        >
          <option value="">Selecciona una opción</option>
          <option value="Página web">Página web</option>
          <option value="E-commerce">E-commerce</option>
          <option value="App web">App web</option>
          <option value="App móvil">App móvil</option>
          <option value="Branding / diseño gráfico">Branding / diseño gráfico</option>
          <option value="Soporte / mantención">Soporte / mantención</option>
          <option value="Otro">Otro</option>
        </select>
        {errors.projectType && <p className="text-red-500 text-sm mt-1">{errors.projectType}</p>}
        {formData.projectType === "Otro" && (
          <input
            type="text"
            id="otherProjectType"
            name="otherProjectType"
            value={formData.otherProjectType}
            onChange={handleChange}
            required
            placeholder="Especifica el tipo de proyecto"
            className="w-full mt-2 p-3 rounded-sm bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        )}
        {errors.otherProjectType && <p className="text-red-500 text-sm mt-1">{errors.otherProjectType}</p>}
      </div>
    </div>,

    <div key="step3" className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <h2 className="col-span-2 text-xl font-bold text-white">🧩 Paso 3: Alcance y recursos disponibles</h2>
      <div className="col-span-2">
        <label className="block text-gray-300 font-bold mb-2">Funcionalidades requeridas</label>
        <div className="grid grid-cols-2 gap-2">
          {["Registro/Login", "Panel administrativo", "Pasarela de pago", "Integración con API", "Subida de archivos", "Sistema de turnos / reservas", "Reportes / dashboards", "Otro"].map((feature) => (
            <label key={feature} className="flex items-center text-gray-300">
              <input
                type="checkbox"
                name="requiredFeatures"
                value={feature}
                checked={formData.requiredFeatures.includes(feature)}
                onChange={handleChange}
                className="mr-2"
              />
              {feature}
            </label>
          ))}
        </div>
        {errors.requiredFeatures && <p className="text-red-500 text-sm mt-1">{errors.requiredFeatures}</p>}
        {formData.requiredFeatures.includes("Otro") && (
          <input
            type="text"
            id="otherRequiredFeature"
            name="otherRequiredFeature"
            value={formData.otherRequiredFeature}
            onChange={handleChange}
            placeholder="Especifica otra/s funcionalidad/es"
            className="w-full mt-2 p-3 rounded-sm bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        )}
        {errors.otherRequiredFeature && <p className="text-red-500 text-sm mt-1">{errors.otherRequiredFeature}</p>}
      </div>
    </div>,
    
    <div key="step4" className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <h2 className="col-span-2 text-xl font-bold text-white">⏱️ Paso 4: Tiempo de desarrollo</h2>
      <div className="col-span-2">
        <label htmlFor="startDate" className="block text-gray-300 font-bold mb-2">Fecha ideal de inicio</label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          className="w-full p-3 rounded-sm bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-600"
        />
      </div>
    </div>,
    
    <div key="step5" className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <h2 className="col-span-2 text-xl font-bold text-white">💬 Paso 5: Extras</h2>
      <div className="col-span-2">
        <label htmlFor="additionalInfo" className="block text-gray-300 font-bold mb-2">¿Hay algo más que no mencionamos y quieras contarnos?</label>
        <textarea
          id="additionalInfo"
          name="additionalInfo"
          value={formData.additionalInfo}
          onChange={handleChange}
          placeholder="Escribe aquí cualquier información adicional"
          className="w-full p-3 rounded-sm bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-600"
        />
      </div>
    </div>,

    <div key="step6" className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <h2 className="col-span-2 text-xl font-bold text-white">📋 Paso 6: Resumen del proyecto</h2>
      <div className="col-span-2">
        <p className="text-gray-300 mb-2"><strong>Nombre completo:</strong> {formData.fullName}</p>
        <p className="text-gray-300 mb-2"><strong>Correo electrónico:</strong> {formData.email}</p>
        <p className="text-gray-300 mb-2"><strong>Teléfono:</strong> {formData.phone || "No proporcionado"}</p>
        <p className="text-gray-300 mb-2"><strong>Empresa:</strong> {formData.company || "No proporcionado"}</p>
        <p className="text-gray-300 mb-2"><strong>¿Cómo nos conociste?:</strong> {formData.referral}</p>
        <p className="text-gray-300 mb-2"><strong>Tipo de proyecto:</strong> {formData.projectType === "Otro" ? formData.otherProjectType : formData.projectType}</p>
        <p className="text-gray-300 mb-2"><strong>Funcionalidades requeridas:</strong> {formData.requiredFeatures.join(", ") || "No especificadas"}</p>
        {formData.requiredFeatures.includes("Otro") && (
          <p className="text-gray-300 mb-2"><strong>Otras funcionalidades:</strong> {formData.otherRequiredFeature}</p>
        )}
        <p className="text-gray-300 mb-2"><strong>Fecha ideal de inicio:</strong> {formData.startDate}</p>
        <p className="text-gray-300 mb-2"><strong>Información adicional:</strong> {formData.additionalInfo || "No proporcionada"}</p>
      </div>
      <div className="col-span-2">
        <button
          type="button"
          onClick={() => {
            submitForm();
          }}
          className="bg-green-600 text-white font-bold py-3 px-6 rounded-sm hover:bg-green-700 transition-colors w-full"
        >
          Enviar solicitud
        </button>
      </div>
    </div>,
  ];

  return (
    <>
      <section className="relative py-48 bg-cover bg-center relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#891818] to-[#5A1410]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Cotizar Proyecto
            </h1>
            <div className="w-24 h-1 bg-red-600 mx-auto mb-6"></div>
            <p className="text-xl mb-8 text-gray-300">
              Completa los pasos a continuación para cotizar tu proyecto con nosotros.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-black">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="flex justify-between items-center mb-8">
            <span className="text-gray-300">Paso {currentStep + 1} de {steps.length}</span>
            <div className="flex space-x-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-8 rounded-full ${index <= currentStep ? "bg-red-600" : "bg-gray-600"}`}
                ></div>
              ))}
            </div>
          </div>
          <form>
            {steps[currentStep]}
            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={handleBack}
                disabled={currentStep === 0}
                className="bg-gray-600 text-white font-bold py-3 px-6 rounded-sm hover:bg-gray-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Atrás
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={currentStep === steps.length - 1}
                className="bg-red-600 text-white font-bold py-3 px-6 rounded-sm hover:bg-red-700 transition-colors"
              >
                {currentStep === steps.length - 1 ? "Finalizar" : "Siguiente"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default QuoteProject;