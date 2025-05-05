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

        if (!values.companyType.trim()) {
            newErrors.companyType = "Selecciona si el proyecto es personal o empresarial.";
        }

        if (!values.projectPurpose.trim()) {
            newErrors.projectPurpose = "El propósito del proyecto es obligatorio.";
        } else if (values.projectPurpose.length < 50 || values.projectPurpose.length > 2000) {
            newErrors.projectPurpose = "El propósito debe tener entre 50 y 2000 caracteres.";
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
