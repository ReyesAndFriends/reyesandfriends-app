import { 
  PhaseOne, 
  PhaseTwo, 
  PhaseThree, 
  PhaseFour, 
  PhaseFive, 
  QuoteRequestData 
} from '../hooks/quote/useSubmitQuote';

/**
 * Helper to build quote data from the wizard validation hooks
 */
export const buildQuoteRequestData = (
  phaseOneValues: Record<string, string>,
  phaseTwoValues: Record<string, string>,
  phaseThreeValues: Record<string, string>,
  phaseFourValues: Record<string, string>,
  phaseFiveValues: Record<string, string>
): QuoteRequestData => {
  
  const phaseOne: PhaseOne = {
    firstName: phaseOneValues.firstName || '',
    lastName: phaseOneValues.lastName || '',
    email: phaseOneValues.email || '',
    phone: phaseOneValues.phone || '',
    contactMethod: phaseOneValues.contactMethod || '',
  };

  const phaseTwo: PhaseTwo = {
    companyName: phaseTwoValues.companyName || '',
    companyType: phaseTwoValues.companyType || '',
    projectPurpose: phaseTwoValues.projectPurpose || '',
  };

  const phaseThree: PhaseThree = {
    projectType: phaseThreeValues.projectType || '',
    otherProjectType: phaseThreeValues.otherProjectType || '',
    notSureProjectType: phaseThreeValues.notSureProjectType || '',
    hasStartDate: phaseThreeValues.hasStartDate || '',
    startDate: phaseThreeValues.startDate || '',
    estimatedBudget: phaseThreeValues.estimatedBudget || '',
    deliveryTimeframe: phaseThreeValues.deliveryTimeframe || '',
    projectDetails: phaseThreeValues.projectDetails || '',
  };

  const phaseFour: PhaseFour = {
    hostingService: phaseFourValues.hostingService || '',
    hasDomain: phaseFourValues.hasDomain || '',
    domainName: phaseFourValues.domainName || '',
    domainSuggestion: phaseFourValues.domainSuggestion || '',
  };

  const phaseFive: PhaseFive = {
    technologyPreference: phaseFiveValues.technologyPreference || '',
    technologyList: phaseFiveValues.technologyList || '',
    avoidTechnologyList: phaseFiveValues.avoidTechnologyList || '',
    keyFunctionalities: phaseFiveValues.keyFunctionalities || '',
    additionalComments: phaseFiveValues.additionalComments || '',
  };

  return {
    phaseOne,
    phaseTwo,
    phaseThree,
    phaseFour,
    phaseFive,
  };
};

/**
 * Helper to validate that required data is present before submission
 */
export const validateQuoteData = (data: QuoteRequestData): string[] => {
  const errors: string[] = [];

  // Validate Phase 1 (Required)
  if (!data.phaseOne.firstName.trim()) {
    errors.push('El nombre es requerido');
  }
  if (!data.phaseOne.lastName.trim()) {
    errors.push('El apellido es requerido');
  }
  if (!data.phaseOne.email.trim()) {
    errors.push('El email es requerido');
  }
  if (!data.phaseOne.phone.trim()) {
    errors.push('El teléfono es requerido');
  }
  if (!data.phaseOne.contactMethod.trim()) {
    errors.push('El método de contacto es requerido');
  }

  // Validate Phase 3 (Required)
  if (!data.phaseThree.projectType.trim()) {
    errors.push('El tipo de proyecto es requerido');
  }
  if (!data.phaseThree.hasStartDate.trim()) {
    errors.push('La preferencia de fecha de inicio es requerida');
  }

  // Validate Phase 4 (Required)
  if (!data.phaseFour.hostingService.trim()) {
    errors.push('La preferencia de hosting es requerida');
  }
  if (!data.phaseFour.hasDomain.trim()) {
    errors.push('La preferencia de dominio es requerida');
  }

  return errors;
};
/**
 * Project type map to convert slugs to readable names
 */
const projectTypeMap: Record<string, string> = {
  webProgramming: "Programación web",
  enterpriseSoftware: "Software empresarial",
  promotionalWeb: "Páginas web promocionales",
  ecommerceWeb: "Páginas E-Commerce",
  fullList: "Lista completa",
  other: "Otro",
  notSure: "No está seguro",
};

/**
 * Helper to format response data for displaying to the user
 */
export const formatQuoteResponse = (response: any) => {
  if (!response || !response.quote) {
    return null;
  }

  return {
    quoteNumber: response.quote.quote_number,
    customerName: response.quote.customer_name,
    projectType: projectTypeMap[response.quote.project_type] || response.quote.project_type,
    status: response.quote.status,
    submittedAt: new Date(response.quote.submitted_at).toLocaleDateString('es-CL'),
  };
};
