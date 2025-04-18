import { useState } from "react";

interface FormErrors {
    nombre?: string;
    apellido?: string;
    telefono?: string;
    email?: string;
    category?: string;
    message?: string;
}

export const useContactFormValidator = () => {
    const [errors, setErrors] = useState<FormErrors>({});

    const validate = (formData: any) => {
        const newErrors: FormErrors = {};

        if (!formData.nombre) newErrors.nombre = "El nombre es obligatorio.";
        if (!formData.apellido) newErrors.apellido = "El apellido es obligatorio.";
        if (!formData.telefono || !/^\+\d{2,3}\d{8}$/.test(formData.telefono)) {
            newErrors.telefono = "El número de teléfono es inválido.";
        }
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "El email es inválido.";
        }
        if (!formData.category) newErrors.category = "Selecciona una categoría.";
        if (!formData.message) newErrors.message = "El mensaje no puede estar vacío.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (formData: any) => {
        if (validate(formData)) {
            alert("Formulario enviado correctamente.");
        }
    };

    return { errors, handleSubmit };
};
