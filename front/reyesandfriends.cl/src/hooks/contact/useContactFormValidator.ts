import { useState } from "react";
import axios from "axios";

interface FormErrors {
    name?: string;
    last_name?: string;
    cellphone?: string;
    email?: string;
    category?: string;
    message?: string;
    [key: string]: string | undefined;
}

const CONTACT_URL = `${import.meta.env.VITE_API_URL}/contact`;

export const useContactFormValidator = () => {
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [finalMessage, setFinalMessage] = useState<string | null>(null);

    const validate = (formData: any) => {
        const newErrors: FormErrors = {};

        if (!formData.first_name) newErrors.first_name = "Su nombre es requerido.";
        if (!formData.last_name) newErrors.last_name = "Su apellido es requerido.";
        if (!formData.cellphone || !/^\d{9}$/.test(formData.cellphone)) {
            newErrors.cellphone = "Su número telefónico es requerido y debe tener 9 dígitos (ejemplo: 912345678).";
        }
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Su correo electrónico es requerido y debe ser válido.";
        }
        if (!formData.category) newErrors.category = "Escoja una categoría.";
        if (!formData.message) newErrors.message = "Debe escribir un mensaje.";
        else if (formData.message.length < 20) {
            newErrors.message = "El mensaje debe tener al menos 20 caracteres.";
        }
        else if (formData.message.length > 500) {
            newErrors.message = "El mensaje no debe exceder los 500 caracteres.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (formData: any) => {
        // Prepare number with +56 Chilean prefix before send
        const dataToSend = {
            ...formData,
            cellphone: formData.cellphone ? `+56${formData.cellphone}` : "",
        };
        if (!validate(formData)) return;

        setIsSubmitting(true);
        try {
            const response = await axios.post(CONTACT_URL, dataToSend, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 201) {
                setFinalMessage(response.data.message);
            }
        } catch (error: any) {
            if (error.response?.status === 422) {
                const backendErrors: FormErrors = {};
                error.response.data.errors.forEach((err: string) => {
                    const field = err.match(/'(.*?)'/)?.[1];
                    if (field) backendErrors[field] = err;
                });
                setErrors(backendErrors);
                setFinalMessage("Hubo un error al enviar el mensaje. Por favor, revisa los campos.");
            } else {
                console.error("Error submitting form:", error);
                setFinalMessage("Ocurrió un error inesperado. Inténtalo nuevamente más tarde.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return { errors, handleSubmit, isSubmitting, finalMessage, setFinalMessage };
};
