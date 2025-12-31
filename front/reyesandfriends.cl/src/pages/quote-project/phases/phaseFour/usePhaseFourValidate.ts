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

        // hostingService required
        if (!values.hostingService) {
            newErrors.hostingService = "Selecciona si necesitas un servicio de hosting.";
        }

        // hasDomain required
        if (!values.hasDomain) {
            newErrors.hasDomain = "Selecciona si tienes un dominio para tu proyecto.";
        } else if (values.hasDomain === "yes") {
            // domainName required, min 3, max 80
            if (!values.domainName.trim()) {
                newErrors.domainName = "El nombre del dominio es obligatorio si ya tienes uno.";
            } else if (values.domainName.trim().length < 3) {
                newErrors.domainName = "El nombre del dominio debe tener al menos 3 caracteres.";
            } else if (values.domainName.trim().length > 80) {
                newErrors.domainName = "El nombre del dominio no puede exceder 80 caracteres.";
            }
        } else if (values.hasDomain === "no") {
            // domainSuggestion required, min 3, max 80
            if (!values.domainSuggestion.trim()) {
                newErrors.domainSuggestion = "Por favor, sugiere un nombre para tu dominio.";
            } else if (values.domainSuggestion.trim().length < 3) {
                newErrors.domainSuggestion = "La sugerencia debe tener al menos 3 caracteres.";
            } else if (values.domainSuggestion.trim().length > 80) {
                newErrors.domainSuggestion = "La sugerencia no puede exceder 80 caracteres.";
            }
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
