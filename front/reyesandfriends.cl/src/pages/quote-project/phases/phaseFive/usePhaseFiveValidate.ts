import { useState } from "react";

export const usePhaseFiveValidate = () => {
    const [values, setValues] = useState({
        technologyPreference: "",
        technologyList: "",
        avoidTechnologyList: "",
        keyFunctionalities: "",
        additionalComments: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setValues((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const validate = (): boolean => {
        const newErrors: Record<string, string> = {};

        // If technologyPreference is yes, technologyList and avoidTechnologyList required
        if (values.technologyPreference === "yes") {
            // technologyList: required, min 2, max 200
            if (!values.technologyList.trim()) {
                newErrors.technologyList = "Por favor, especifica las tecnologías que deseas usar.";
            } else if (values.technologyList.trim().length < 2) {
                newErrors.technologyList = "Debe tener al menos 2 caracteres.";
            } else if (values.technologyList.trim().length > 200) {
                newErrors.technologyList = "No puede exceder 200 caracteres.";
            }
            // avoidTechnologyList: required, min 2, max 200
            if (!values.avoidTechnologyList.trim()) {
                newErrors.avoidTechnologyList = "Por favor, especifica las tecnologías que deseas evitar.";
            } else if (values.avoidTechnologyList.trim().length < 2) {
                newErrors.avoidTechnologyList = "Debe tener al menos 2 caracteres.";
            } else if (values.avoidTechnologyList.trim().length > 200) {
                newErrors.avoidTechnologyList = "No puede exceder 200 caracteres.";
            }
        }

        // keyFunctionalities: optional, min 10, max 1000
        if (values.keyFunctionalities.trim() && (values.keyFunctionalities.length < 10 || values.keyFunctionalities.length > 1000)) {
            newErrors.keyFunctionalities = "Las funcionalidades clave deben tener entre 10 y 1000 caracteres.";
        }

        // additionalComments: optional, min 20, max 2000
        if (values.additionalComments.trim() && (values.additionalComments.length < 20 || values.additionalComments.length > 2000)) {
            newErrors.additionalComments = "Los comentarios adicionales deben tener entre 20 y 2000 caracteres.";
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
