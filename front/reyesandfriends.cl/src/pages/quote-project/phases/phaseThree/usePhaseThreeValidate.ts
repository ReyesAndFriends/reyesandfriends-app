import { useState } from "react";

export const usePhaseThreeValidate = () => {
    const [values, setValues] = useState({
        projectType: "",
        otherProjectType: "",
        notSureProjectType: "",
        hasStartDate: "",
        startDate: "",
        estimatedBudget: "",
        deliveryTimeframe: "",
        projectDetails: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === "estimatedBudget") {
            const numericValue = value.replace(/[^0-9.]/g, "");
            setValues((prev) => ({ ...prev, [name]: numericValue }));
            setErrors((prev) => ({ ...prev, [name]: "" }));
            return;
        }
        setValues((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};

        // projectType required
        if (!values.projectType.trim()) {
            newErrors.projectType = "Selecciona el tipo de proyecto.";
        } else if (values.projectType === "other") {
            // otherProjectType: required, min 3, max 80
            if (!values.otherProjectType.trim()) {
                newErrors.otherProjectType = "Describe el tipo de proyecto que necesitas.";
            } else if (values.otherProjectType.trim().length < 3) {
                newErrors.otherProjectType = "Debe tener al menos 3 caracteres.";
            } else if (values.otherProjectType.trim().length > 80) {
                newErrors.otherProjectType = "No puede exceder 80 caracteres.";
            }
        } else if (values.projectType === "notSure") {
            // notSureProjectType: required, min 10, max 200
            if (!values.notSureProjectType.trim()) {
                newErrors.notSureProjectType = "Describe en palabras qué tipo de página o servicio necesitas.";
            } else if (values.notSureProjectType.trim().length < 10) {
                newErrors.notSureProjectType = "Debe tener al menos 10 caracteres.";
            } else if (values.notSureProjectType.trim().length > 200) {
                newErrors.notSureProjectType = "No puede exceder 200 caracteres.";
            }
        }

        // hasStartDate required
        if (!values.hasStartDate.trim()) {
            newErrors.hasStartDate = "Selecciona si tienes una fecha para iniciar el proyecto.";
        } else if (values.hasStartDate === "yes" && !values.startDate.trim()) {
            newErrors.startDate = "Selecciona una fecha de inicio.";
        }

        // estimatedBudget: optional, must be a valid number if present
        if (values.estimatedBudget && isNaN(Number(values.estimatedBudget))) {
            newErrors.estimatedBudget = "El presupuesto debe ser un número válido.";
        }

        // deliveryTimeframe: optional, min 2, max 80
        if (values.deliveryTimeframe.trim()) {
            if (values.deliveryTimeframe.trim().length < 2) {
                newErrors.deliveryTimeframe = "El plazo debe tener al menos 2 caracteres.";
            } else if (values.deliveryTimeframe.trim().length > 80) {
                newErrors.deliveryTimeframe = "El plazo no puede exceder 80 caracteres.";
            }
        }

        // projectDetails: optional, min 50, max 2000
        if (values.projectDetails && (values.projectDetails.length < 50 || values.projectDetails.length > 2000)) {
            newErrors.projectDetails = "Los detalles adicionales deben tener entre 50 y 2000 caracteres.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    return {
        values,
        errors,
        handleChange,
        validate,
    };
};
