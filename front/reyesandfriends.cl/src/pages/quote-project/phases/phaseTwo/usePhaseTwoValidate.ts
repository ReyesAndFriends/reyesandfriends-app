import { useState } from "react";

export const usePhaseTwoValidate = () => {
    const [values, setValues] = useState({
        companyName: "",
        companyType: "",
        projectPurpose: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setValues((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};

        // companyType is required
        if (!values.companyType.trim()) {
            newErrors.companyType = "Selecciona si el proyecto es personal o empresarial.";
        }

        // companyName: optional, but if present, min 2, max 80
        if (values.companyName.trim()) {
            if (values.companyName.trim().length < 2) {
                newErrors.companyName = "El nombre de la empresa debe tener al menos 2 caracteres.";
            } else if (values.companyName.trim().length > 80) {
                newErrors.companyName = "El nombre de la empresa no puede exceder 80 caracteres.";
            }
        }

        // projectPurpose: required, min 10, max 2000
        if (!values.projectPurpose.trim()) {
            newErrors.projectPurpose = "El propósito del proyecto es obligatorio.";
        } else if (values.projectPurpose.length < 10 || values.projectPurpose.length > 2000) {
            newErrors.projectPurpose = "El propósito debe tener entre 10 y 2000 caracteres.";
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
