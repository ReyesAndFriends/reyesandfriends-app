import React from 'react';

type ResumeProjectProps = {
  formData: {
    phaseOne: Record<string, string>;
    phaseTwo: Record<string, string>;
    phaseThree: Record<string, string>;
    phaseFour: Record<string, string>;
    phaseFive: Record<string, string>;
  };
};

const projectTypeMap: Record<string, string> = {
    webProgramming: "Programación web",
    enterpriseSoftware: "Software empresarial",
    promotionalWeb: "Páginas web promocionales",
    ecommerceWeb: "Páginas E-Commerce",
    fullList: "Lista completa",
    other: "Otro",
    notSure: "Usuario no está seguro",
  };
  

const ResumeProject: React.FC<ResumeProjectProps> = ({ formData }) => {
  const getValue = (val?: string) => val?.trim() || "No especificado";

  const deliveryMap: Record<string, string> = {
    no: "No",
    lessThan1Month: "Menos de 1 mes",
    "1To3Months": "1 a 3 meses",
    "3To6Months": "3 a 6 meses",
    flexible: "Flexible",
  };

  const booleanMap: Record<string, string> = {
    yes: "Sí",
    no: "No",
  };

  return (
    <div className="container mx-auto px-4 max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">

        <div className="border border-zinc-700 rounded-lg p-6 bg-zinc-900 text-gray-300">
          <h2 className="text-lg font-bold text-white mb-3">Fase 1: Información Personal</h2>
          <p><strong>Nombre:</strong> {getValue(`${formData.phaseOne.firstName} ${formData.phaseOne.lastName}`)}</p>
          <p><strong>Email:</strong> {getValue(formData.phaseOne.email)}</p>
          <p><strong>Teléfono:</strong> {getValue(formData.phaseOne.phone)}</p>
          <p><strong>Método de Contacto:</strong> {getValue(formData.phaseOne.contactMethod)}</p>
        </div>

        <div className="border border-zinc-700 rounded-lg p-6 bg-zinc-900 text-gray-300">
          <h2 className="text-lg font-bold text-white mb-3">Fase 2: Información de la Empresa</h2>
          <p><strong>Empresa:</strong> {getValue(formData.phaseTwo.companyName)}</p>
          <p><strong>Tipo:</strong> {getValue(formData.phaseTwo.companyType)}</p>
          <p><strong>Propósito:</strong> {getValue(formData.phaseTwo.projectPurpose)}</p>
        </div>

        <div className="border border-zinc-700 rounded-lg p-6 bg-zinc-900 text-gray-300">
          <h2 className="text-lg font-bold text-white mb-3">Fase 3: Alcance Técnico y Funcional</h2>
          <p><strong>Tipo de Proyecto:</strong> {projectTypeMap[formData.phaseThree.projectType] || getValue(formData.phaseThree.projectType)}</p>
          {formData.phaseThree.projectType === "other" && (
            <p><strong>Descripción:</strong> {getValue(formData.phaseThree.otherProjectType)}</p>
          )}
          {formData.phaseThree.projectType === "notSure" && (
            <p><strong>Descripción:</strong> {getValue(formData.phaseThree.notSureProjectType)}</p>
          )}
          <p><strong>¿Fecha de Inicio?:</strong> {booleanMap[formData.phaseThree.hasStartDate] || getValue(formData.phaseThree.hasStartDate)}</p>
          {formData.phaseThree.hasStartDate === "yes" && (
            <p><strong>Fecha de Inicio:</strong> {getValue(formData.phaseThree.startDate)}</p>
          )}
          <p><strong>Presupuesto:</strong> {new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(Number(formData.phaseThree.estimatedBudget) || 0)}</p>
          <p><strong>Plazo:</strong> {deliveryMap[formData.phaseThree.deliveryTimeframe] || getValue(formData.phaseThree.deliveryTimeframe)}</p>
          <p><strong>Detalles:</strong> {getValue(formData.phaseThree.projectDetails)}</p>
        </div>

        <div className="border border-zinc-700 rounded-lg p-6 bg-zinc-900 text-gray-300">
          <h2 className="text-lg font-bold text-white mb-3">Fase 4: Despliegue y Servicios</h2>
          <p><strong>¿Hosting?:</strong> {booleanMap[formData.phaseFour.hostingService] || getValue(formData.phaseFour.hostingService)}</p>
          <p><strong>¿Dominio?:</strong> {booleanMap[formData.phaseFour.hasDomain] || getValue(formData.phaseFour.hasDomain)}</p>
          {formData.phaseFour.hasDomain === "yes" && (
            <p><strong>Dominio:</strong> {getValue(formData.phaseFour.domainName)}</p>
          )}
          {formData.phaseFour.hasDomain === "no" && (
            <p><strong>Sugerencia:</strong> {getValue(formData.phaseFour.domainSuggestion)}</p>
          )}
        </div>

        <div className="border border-zinc-700 rounded-lg p-6 bg-zinc-900 text-gray-300 col-span-1 md:col-span-2">
          <h2 className="text-lg font-bold text-white mb-3">Fase 5: Preferencias Técnicas</h2>
          <p><strong>¿Preferencias?:</strong> {booleanMap[formData.phaseFive.technologyPreference] || getValue(formData.phaseFive.technologyPreference)}</p>
          <p><strong>Tecnologías Preferidas:</strong> {getValue(formData.phaseFive.technologyList)}</p>
          <p><strong>A evitar:</strong> {getValue(formData.phaseFive.avoidTechnologyList)}</p>
          <p><strong>Funcionalidades clave:</strong> {getValue(formData.phaseFive.keyFunctionalities)}</p>
          <p><strong>Comentarios:</strong> {getValue(formData.phaseFive.additionalComments)}</p>
        </div>

      </div>
    </div>
  );
};

export default ResumeProject;
