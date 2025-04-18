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


const API_URL = `${import.meta.env.VITE_API_URL}/contact`;

export const useContactFormValidator = () => {
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validate = (formData: any) => {
        const newErrors: FormErrors = {};

        if (!formData.name) newErrors.name = "'name' is required";
        if (!formData.last_name) newErrors.last_name = "'last_name' is required";
        if (!formData.cellphone || !/^\+\d{2,3}\d{8}$/.test(formData.cellphone)) {
            newErrors.cellphone = "'cellphone' is required and must be valid";
        }
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "'email' is required and must be valid";
        }
        if (!formData.category) newErrors.category = "'category' is required";
        if (!formData.message) newErrors.message = "'message' is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (formData: any) => {
        if (!validate(formData)) return;

        setIsSubmitting(true);
        try {
            const response = await axios.post(API_URL, formData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 201) {
                alert(response.data.message);
            }
        } catch (error: any) {
            if (error.response?.status === 422) {
                const backendErrors: FormErrors = {};
                error.response.data.errors.forEach((err: string) => {
                    const field = err.match(/'(.*?)'/)?.[1];
                    if (field) backendErrors[field] = err;
                });
                setErrors(backendErrors);
            } else {
                console.error("Error submitting form:", error);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return { errors, handleSubmit, isSubmitting };
};
