import { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export interface PhaseOne {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  contactMethod: string;
}

export interface PhaseTwo {
  companyName: string;
  companyType: string;
  projectPurpose: string;
}

export interface PhaseThree {
  projectType: string;
  otherProjectType: string;
  notSureProjectType: string;
  hasStartDate: string;
  startDate: string;
  estimatedBudget: string;
  deliveryTimeframe: string;
  projectDetails: string;
}

export interface PhaseFour {
  hostingService: string;
  hasDomain: string;
  domainName: string;
  domainSuggestion: string;
}

export interface PhaseFive {
  technologyPreference: string;
  technologyList: string;
  avoidTechnologyList: string;
  keyFunctionalities: string;
  additionalComments: string;
}

export interface QuoteRequestData {
  phaseOne: PhaseOne;
  phaseTwo: PhaseTwo;
  phaseThree: PhaseThree;
  phaseFour: PhaseFour;
  phaseFive: PhaseFive;
}

export interface QuoteResponse {
  success: boolean;
  message: string;
  quote?: {
    id: number;
    quote_number: string;
    status: string;
    submitted_at: string;
    customer_name: string;
    email: string;
    project_type: string;
  };
  error?: string;
}

export const useSubmitQuote = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [quoteResponse, setQuoteResponse] = useState<QuoteResponse | null>(null);

  const submitQuote = async (quoteData: QuoteRequestData): Promise<QuoteResponse> => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    setQuoteResponse(null);

    try {
      console.log('Enviando cotización:', quoteData);
      
      const response = await axios.post<QuoteResponse>(
        `${API_URL}/api/quote-project`,
        quoteData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Respuesta del servidor:', response.data);

      if (response.data.success) {
        setSuccess(true);
        setQuoteResponse(response.data);
        return response.data;
      } else {
        throw new Error(response.data.error || 'Error al enviar la cotización');
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || err.message || 'Error al enviar la cotización';
      console.error('Error enviando cotización:', err);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const resetState = () => {
    setError(null);
    setSuccess(false);
    setQuoteResponse(null);
    setIsLoading(false);
  };

  return {
    submitQuote,
    isLoading,
    error,
    success,
    quoteResponse,
    resetState,
  };
};
