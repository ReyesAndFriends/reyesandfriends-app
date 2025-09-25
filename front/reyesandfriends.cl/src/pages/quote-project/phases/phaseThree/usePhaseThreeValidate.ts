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

        if (!values.projectType.trim()) {
            newErrors.projectType = "Selecciona el tipo de proyecto.";
        } else if (values.projectType === "other" && !values.otherProjectType.trim()) {
            newErrors.otherProjectType = "Describe el tipo de proyecto que necesitas.";
        } else if (values.projectType === "notSure" && !values.notSureProjectType.trim()) {
            newErrors.notSureProjectType = "Describe en palabras qué tipo de página o servicio necesitas.";
        }

        if (!values.hasStartDate.trim()) {
            newErrors.hasStartDate = "Selecciona si tienes una fecha para iniciar el proyecto.";
        } else if (values.hasStartDate === "yes" && !values.startDate.trim()) {
            newErrors.startDate = "Selecciona una fecha de inicio.";
        }

        if (values.estimatedBudget && isNaN(Number(values.estimatedBudget))) {
            newErrors.estimatedBudget = "El presupuesto debe ser un número válido.";
        }

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
