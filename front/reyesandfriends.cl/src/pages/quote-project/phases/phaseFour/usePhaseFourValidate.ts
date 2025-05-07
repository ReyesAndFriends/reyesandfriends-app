import { useState } from "react";

export const usePhaseFourValidate = () => {
    const [values, setValues] = useState({
        hostingService: "",
        hasDomain: "",
        domainName: "",
        domainSuggestion: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setValues((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};

        if (!values.hostingService) {
            newErrors.hostingService = "Selecciona si necesitas un servicio de hosting.";
        }

        if (!values.hasDomain) {
            newErrors.hasDomain = "Selecciona si tienes un dominio para tu proyecto.";
        } else if (values.hasDomain === "yes" && !values.domainName.trim()) {
            newErrors.domainName = "El nombre del dominio es obligatorio si ya tienes uno.";
        } else if (values.hasDomain === "no" && !values.domainSuggestion.trim()) {
            newErrors.domainSuggestion = "Por favor, sugiere un nombre para tu dominio.";
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
