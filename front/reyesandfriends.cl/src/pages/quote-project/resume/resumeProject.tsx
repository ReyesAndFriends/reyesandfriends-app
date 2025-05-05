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

const ResumeProject: React.FC<ResumeProjectProps> = ({ formData }) => {
    const getValue = (value: string | undefined) => value || "No especificado";

    return (
        <div className="container mx-auto px-4 max-w-5xl">
            <div className="mt-7 bg-black p-8 rounded-lg shadow-lg">
                <div className="grid grid-cols-2 gap-6 text-gray-300">
                    <div>
                        <h2 className="font-bold text-lg text-white mb-2">Fase 1: Información Personal</h2>
                        <p>Nombre: {getValue(`${formData.phaseOne.firstName} ${formData.phaseOne.lastName}`)}</p>
                        <p>Email: {getValue(formData.phaseOne.email)}</p>
                        <p>Teléfono: {getValue(formData.phaseOne.phone)}</p>
                        <p>Método de Contacto: {getValue(formData.phaseOne.contactMethod)}</p>
                    </div>
                    <div>
                        <h2 className="font-bold text-lg text-white mb-2">Fase 2: Información de la Empresa</h2>
                        <p>Nombre de la Empresa: {getValue(formData.phaseTwo.companyName)}</p>
                        <p>Tipo de Empresa: {getValue(formData.phaseTwo.companyType)}</p>
                        <p>Propósito del Proyecto: {getValue(formData.phaseTwo.projectPurpose)}</p>
                    </div>
                    <div>
                        <h2 className="font-bold text-lg text-white mb-2">Fase 3: Alcance Técnico y Funcional</h2>
                        <p>Tipo de Proyecto: {getValue(formData.phaseThree.projectType)}</p>
                        {formData.phaseThree.projectType === "other" && (
                            <p>Descripción: {getValue(formData.phaseThree.otherProjectType)}</p>
                        )}
                        {formData.phaseThree.projectType === "notSure" && (
                            <p>Descripción: {getValue(formData.phaseThree.notSureProjectType)}</p>
                        )}
                        <p>¿Tiene Fecha de Inicio?: {getValue(formData.phaseThree.hasStartDate)}</p>
                        {formData.phaseThree.hasStartDate === "yes" && (
                            <p>Fecha de Inicio: {getValue(formData.phaseThree.startDate)}</p>
                        )}
                        <p>Presupuesto Estimado: ${getValue(formData.phaseThree.estimatedBudget)}</p>
                        <p>Plazo de Entrega: {getValue(formData.phaseThree.deliveryTimeframe)}</p>
                        <p>Detalles Adicionales: {getValue(formData.phaseThree.projectDetails)}</p>
                    </div>
                    <div>
                        <h2 className="font-bold text-lg text-white mb-2">Fase 4: Despliegue y Servicios Adicionales</h2>
                        <p>¿Necesita Hosting?: {getValue(formData.phaseFour.hostingService)}</p>
                        <p>¿Tiene Dominio?: {getValue(formData.phaseFour.hasDomain)}</p>
                        {formData.phaseFour.hasDomain === "yes" && (
                            <p>Nombre del Dominio: {getValue(formData.phaseFour.domainName)}</p>
                        )}
                        {formData.phaseFour.hasDomain === "no" && (
                            <p>Sugerencia de Dominio: {getValue(formData.phaseFour.domainSuggestion)}</p>
                        )}
                    </div>
                    <div>
                        <h2 className="font-bold text-lg text-white mb-2">Fase 5: Preferencias Técnicas</h2>
                        <p>¿Tiene Preferencias Tecnológicas?: {getValue(formData.phaseFive.technologyPreference)}</p>
                        <p>Tecnologías Preferidas: {getValue(formData.phaseFive.technologyList)}</p>
                        <p>Tecnologías a Evitar: {getValue(formData.phaseFive.avoidTechnologyList)}</p>
                        <p>Funcionalidades Clave: {getValue(formData.phaseFive.keyFunctionalities)}</p>
                        <p>Comentarios Adicionales: {getValue(formData.phaseFive.additionalComments)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResumeProject;