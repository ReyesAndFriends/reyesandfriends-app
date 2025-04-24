import { useState } from "react";

const useQuoteProject = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    referral: "",
    projectType: "",
    otherProjectType: "",
    projectNature: "",
    projectGoal: "",
    targetAudience: "",
    requiredFeatures: [] as string[],
    otherRequiredFeature: "",
    currentResources: [] as string[],
    startDate: "",
    hasDeadline: false,
    deadline: "",
    budget: "",
    phasedDevelopment: false,
    additionalInfo: "",
    contactViaWhatsApp: false,
    projectReferences: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    setFormData((prev) => {
      if (type === "checkbox" && Array.isArray(prev[name as keyof typeof formData])) {
        const updatedArray = checked
          ? [...(prev[name as keyof typeof formData] as string[]), value]
          : (prev[name as keyof typeof formData] as string[]).filter((item) => item !== value);
        return { ...prev, [name]: updatedArray };
      }
      return { ...prev, [name]: type === "checkbox" ? checked : value };
    });

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateField = (field: string, value: string | string[]) => {
    if (field === "fullName" && typeof value === "string" && !value.trim()) return "Este campo es obligatorio.";
    if (field === "email" && typeof value === "string" && !value.trim()) return "Este campo es obligatorio.";
    if (field === "projectType" && typeof value === "string" && !value.trim()) return "Este campo es obligatorio.";
    if (field === "otherProjectType" && formData.projectType === "Otro" && typeof value === "string" && !value.trim()) return "Este campo es obligatorio.";
    if (field === "requiredFeatures" && Array.isArray(value) && value.length === 0) return "Seleccione al menos una opción.";
    if (field === "otherRequiredFeature" && formData.requiredFeatures.includes("Otro") && typeof value === "string" && !value.trim()) return "Este campo es obligatorio.";
    if (field === "startDate" && typeof value === "string" && !value.trim()) return "Este campo es obligatorio.";
    return "";
  };

  const validateStep = () => {
    const stepFields: Record<number, string[]> = {
      0: ["fullName", "email"],
      1: ["projectType", "otherProjectType"],
      2: ["requiredFeatures", "otherRequiredFeature"],
      3: ["startDate"],
    };

    const currentFields = stepFields[currentStep] || [];
    const newErrors: Record<string, string> = {};

    currentFields.forEach((field) => {
      const error = validateField(field, formData[field as keyof typeof formData] as string | string[]);
      if (error) newErrors[field] = error;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep() && currentStep < 5) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  const submitForm = () => {
    console.log("Solicitud enviada:", JSON.stringify(formData, null, 2));
  };

  return { currentStep, formData, errors, handleChange, handleNext, handleBack, submitForm };
};

export default useQuoteProject;
