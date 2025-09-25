import React from 'react';
import { User, Building2, Code2, Server, Settings2, Mail, Phone, BadgeCheck, Globe, DollarSign, Calendar, Info, Layers, ListChecks, MessageCircle } from 'lucide-react';

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
  other: "Otro",
  notSure: "No está seguro",
};

const companyTypeMap: Record<string, string> = {
  personal: "Proyecto Personal",
  business: "Proyecto Empresarial",
};

const hostingMap: Record<string, string> = {
  yes: "Sí, necesita hosting",
  no: "No necesita hosting",
};

const domainMap: Record<string, string> = {
  yes: "Sí, tiene dominio propio",
  no: "No tiene dominio y necesita uno",
  notSure: "No está seguro todavía",
};

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

const contactMethodMap: Record<string, string> = {
  email: "Correo electrónico",
  whatsapp: "WhatsApp",
  both: "Ambas (Correo o WhatsApp)",
};

const getValue = (val?: string) => val?.trim() || "No especificado";

const Section = ({
  icon,
  title,
  children,
  color = "text-red-700",
  className = "",
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  color?: string;
  className?: string;
}) => (
  <div className={`rounded-xl bg-zinc-900 border border-zinc-700 shadow-lg p-6 mb-6 ${className}`}>
    <div className="flex items-center mb-4 gap-2">
      <span className={`rounded-full bg-zinc-800 p-2 ${color}`}>{icon}</span>
      <h2 className="text-xl font-bold text-white">{title}</h2>
    </div>
    <div className="pl-2">{children}</div>
  </div>
);

const Badge = ({ children, color = "bg-green-700" }: { children: React.ReactNode; color?: string }) => (
  <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${color} text-white mr-2 mb-1`}>
    {children}
  </span>
);

const ResumeProject: React.FC<ResumeProjectProps> = ({ formData }) => {
  return (
    <div className="container mx-auto px-4 max-w-7xl mt-10">

      <div className="relative mb-12">
        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-red-600/50 -z-0"></div>
        <h2 className="text-3xl text-center text-red-500 relative z-10">
          <span className="bg-zinc-900 px-4 relative z-10 text-white">Detalle de su Cotización</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Section icon={<User size={22} />} title="Fase 1: Información Personal" className="hover:scale-105 transition-transform duration-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
              <Badge color="bg-zinc-700"><Mail size={14} className="inline mr-1" /> Email</Badge>
              <div className="text-white">{getValue(formData.phaseOne.email)}</div>
            </div>
            <div>
              <Badge color="bg-zinc-700"><Phone size={14} className="inline mr-1" /> Teléfono</Badge>
              <div className="text-white">{getValue(formData.phaseOne.phone)}</div>
            </div>
            <div className="md:col-span-2">
              <Badge color="bg-zinc-700"><User size={14} className="inline mr-1" /> Nombre</Badge>
              <span className="text-white">{getValue(`${formData.phaseOne.firstName} ${formData.phaseOne.lastName}`)}</span>
            </div>
            <div className="md:col-span-2">
              <Badge color="bg-zinc-700"><BadgeCheck size={14} className="inline mr-1" /> Método de Contacto</Badge>
              <span className="text-white">
                {contactMethodMap[formData.phaseOne.contactMethod] || getValue(formData.phaseOne.contactMethod)}
              </span>
            </div>
          </div>
        </Section>

        <Section icon={<Building2 size={22} />} title="Fase 2: Empresa" className="hover:scale-105 transition-transform duration-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
              <Badge color="bg-zinc-700">Empresa</Badge>
              <span className="text-white">{getValue(formData.phaseTwo.companyName)}</span>
            </div>
            <div>
              <Badge color="bg-zinc-700">Tipo</Badge>
              <span className="text-white">
                {companyTypeMap[formData.phaseTwo.companyType] || getValue(formData.phaseTwo.companyType)}
              </span>
            </div>
            <div className="md:col-span-2">
              <Badge color="bg-zinc-700">Propósito</Badge>
              <span className="text-white">{getValue(formData.phaseTwo.projectPurpose)}</span>
            </div>
          </div>
        </Section>

        <Section icon={<Code2 size={22} />} title="Fase 3: Alcance Técnico y Funcional" className="hover:scale-105 transition-transform duration-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
              <Badge color="bg-zinc-700"><Layers size={14} className="inline mr-1" /> Tipo de Proyecto</Badge>
              <span className="text-white">{projectTypeMap[formData.phaseThree.projectType] || getValue(formData.phaseThree.projectType)}</span>
            </div>
            <div>
              <Badge color="bg-zinc-700"><DollarSign size={14} className="inline mr-1" /> Presupuesto</Badge>
              <span className="text-white">{new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(Number(formData.phaseThree.estimatedBudget) || 0)}</span>
            </div>
            <div>
              <Badge color="bg-zinc-700"><Calendar size={14} className="inline mr-1" /> Plazo</Badge>
              <span className="text-white">{deliveryMap[formData.phaseThree.deliveryTimeframe] || getValue(formData.phaseThree.deliveryTimeframe)}</span>
            </div>
            <div>
              <Badge color="bg-zinc-700"><BadgeCheck size={14} className="inline mr-1" /> ¿Fecha de Inicio?</Badge>
              <span className="text-white">{booleanMap[formData.phaseThree.hasStartDate] || getValue(formData.phaseThree.hasStartDate)}</span>
            </div>
            {formData.phaseThree.hasStartDate === "yes" && (
              <div className="md:col-span-2">
                <Badge color="bg-zinc-700"><Calendar size={14} className="inline mr-1" /> Fecha de Inicio</Badge>
                <span className="text-white">{getValue(formData.phaseThree.startDate)}</span>
              </div>
            )}
            {(formData.phaseThree.projectType === "other" || formData.phaseThree.projectType === "notSure") && (
              <div className="md:col-span-2">
                <Badge color="bg-zinc-700"><Info size={14} className="inline mr-1" /> Descripción</Badge>
                <span className="text-white">
                  {formData.phaseThree.projectType === "other"
                    ? getValue(formData.phaseThree.otherProjectType)
                    : getValue(formData.phaseThree.notSureProjectType)}
                </span>
              </div>
            )}
            <div className="md:col-span-2">
              <Badge color="bg-zinc-700"><ListChecks size={14} className="inline mr-1" /> Detalles</Badge>
              <span className="text-white">{getValue(formData.phaseThree.projectDetails)}</span>
            </div>
          </div>
        </Section>

        <Section icon={<Server size={22} />} title="Fase 4: Despliegue y Servicios" className="hover:scale-105 transition-transform duration-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
              <Badge color="bg-zinc-700"><Server size={14} className="inline mr-1" /> Hosting</Badge>
              <span className="text-white">{hostingMap[formData.phaseFour.hostingService] || getValue(formData.phaseFour.hostingService)}</span>
            </div>
            <div>
              <Badge color="bg-zinc-700"><Globe size={14} className="inline mr-1" /> Dominio</Badge>
              <span className="text-white">{domainMap[formData.phaseFour.hasDomain] || getValue(formData.phaseFour.hasDomain)}</span>
            </div>
            {formData.phaseFour.hasDomain === "yes" && (
              <div className="md:col-span-2">
                <Badge color="bg-zinc-700"><Globe size={14} className="inline mr-1" /> Dominio</Badge>
                <span className="text-white">{getValue(formData.phaseFour.domainName)}</span>
              </div>
            )}
            {formData.phaseFour.hasDomain === "no" && (
              <div className="md:col-span-2">
                <Badge color="bg-zinc-700"><Globe size={14} className="inline mr-1" /> Sugerencia de Dominio</Badge>
                <span className="text-white">{getValue(formData.phaseFour.domainSuggestion)}</span>
              </div>
            )}
          </div>
        </Section>
      </div>

      <div className="mt-2">
        <Section
          icon={<Settings2 size={22} />}
          title="Fase 5: Preferencias Técnicas"
          className="md:col-span-2 hover:scale-105 transition-transform duration-200"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
              <Badge color="bg-zinc-700"><BadgeCheck size={14} className="inline mr-1" /> ¿Preferencias?</Badge>
              <span className="text-white">{booleanMap[formData.phaseFive.technologyPreference] || getValue(formData.phaseFive.technologyPreference)}</span>
            </div>
            {formData.phaseFive.technologyPreference === "yes" && (
              <>
                <div>
                  <Badge color="bg-zinc-700"><Code2 size={14} className="inline mr-1" /> Tecnologías Preferidas</Badge>
                  <span className="text-white">{getValue(formData.phaseFive.technologyList)}</span>
                </div>
                <div>
                  <Badge color="bg-zinc-700"><Code2 size={14} className="inline mr-1" /> A evitar</Badge>
                  <span className="text-white">{getValue(formData.phaseFive.avoidTechnologyList)}</span>
                </div>
              </>
            )}
            <div className="md:col-span-2">
              <Badge color="bg-zinc-700"><ListChecks size={14} className="inline mr-1" /> Funcionalidades clave</Badge>
              <span className="text-white">{getValue(formData.phaseFive.keyFunctionalities)}</span>
            </div>
            <div className="md:col-span-2">
              <Badge color="bg-zinc-700"><MessageCircle size={14} className="inline mr-1" /> Comentarios</Badge>
              <span className="text-white">{getValue(formData.phaseFive.additionalComments)}</span>
            </div>
          </div>
        </Section>
      </div>

    </div>
  );
};

export default ResumeProject;
