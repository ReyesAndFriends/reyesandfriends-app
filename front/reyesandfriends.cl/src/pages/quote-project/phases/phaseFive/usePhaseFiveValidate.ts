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

        if (values.technologyPreference === "yes") {
            if (!values.technologyList.trim()) {
                newErrors.technologyList = "Por favor, especifica las tecnologías que deseas usar.";
            }
            if (!values.avoidTechnologyList.trim()) {
                newErrors.avoidTechnologyList = "Por favor, especifica las tecnologías que deseas evitar.";
            }
        }

        if (values.keyFunctionalities.trim() && (values.keyFunctionalities.length < 50 || values.keyFunctionalities.length > 2000)) {
            newErrors.keyFunctionalities = "Las funcionalidades clave deben tener entre 50 y 2000 caracteres.";
        }

        if (values.additionalComments.trim() && (values.additionalComments.length < 50 || values.additionalComments.length > 2000)) {
            newErrors.additionalComments = "Los comentarios adicionales deben tener entre 50 y 2000 caracteres.";
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
