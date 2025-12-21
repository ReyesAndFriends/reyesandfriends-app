import { useState, useCallback } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export interface WebPlanFormData {
    first_name: string;
    last_name: string;
    email: string;
    rut: string;
    cellphone: string;
    webplan_slug: string;
    whatsapp_response?: boolean;
    turnstile_token?: string;
}

export interface SubmitResult {
    success: boolean;
    message: string;
    request_number?: string;
    missing_fields?: string[];
}

export function useSubmitWebPlan(defaultSlug: string) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [finalMessage, setFinalMessage] = useState<string | null>(null);
    const [requestNumber, setRequestNumber] = useState<string | null>(null);
    const [missingFields, setMissingFields] = useState<string[] | null>(null);
    const [errorStatus, setErrorStatus] = useState<number | null>(null);

    const validateForm = useCallback((data: WebPlanFormData) => {
        const missing: string[] = [];
        if (!data.first_name.trim()) missing.push("first_name");
        if (!data.last_name.trim()) missing.push("last_name");
        if (!data.email.trim()) missing.push("email");
        if (!data.rut.trim()) missing.push("rut");
        if (!data.cellphone.trim()) missing.push("cellphone");
        if (!data.webplan_slug.trim()) missing.push("webplan_slug");
        if (!data.turnstile_token) missing.push("turnstile_token");
        return missing;
    }, []);

    const submit = useCallback(async (
        formData: WebPlanFormData
    ) => {
        setIsSubmitting(true);
        setFinalMessage(null);
        setRequestNumber(null);
        setMissingFields(null);
        setErrorStatus(null);

        const data: WebPlanFormData = { ...formData };
        const missing = validateForm(data);


        if (missing.length > 0) {
            console.log("Campos faltantes en frontend:", missing);
            setMissingFields(missing);
            setFinalMessage("Faltan campos requeridos");
            setErrorStatus(422);
            setIsSubmitting(false);
            return { success: false, message: "Faltan campos requeridos", missing_fields: missing };
        }

        try {
            const res = await axios.post(`${API_URL}/webplans`, data);
            console.log("Petición exitosa");
            if (res.status === 201) {
                setFinalMessage(res.data.message);
                setRequestNumber(res.data.request_number);
                setIsSubmitting(false);
                setErrorStatus(null);
                return { success: true, message: res.data.message, request_number: res.data.request_number };
            }
        } catch (err: any) {
            console.log("Error recibido del backend:", err?.response?.data, "Status:", err?.response?.status);
            if (err.response?.status === 422) {
                setMissingFields(err.response.data.missing_fields);
                setFinalMessage(err.response.data.error);
                setErrorStatus(422);
                setIsSubmitting(false);
                return { success: false, message: err.response.data.error, missing_fields: err.response.data.missing_fields };
            }
            if (err.response?.status === 404) {
                setFinalMessage(err.response.data?.error || "No se encontró el plan web para el slug proporcionado");
                setErrorStatus(404);
                setIsSubmitting(false);
                return { success: false, message: err.response.data?.error || "No se encontró el plan web para el slug proporcionado" };
            }
            setFinalMessage("Hubo un error al enviar la solicitud. Intenta nuevamente.");
            setErrorStatus(500);
            setIsSubmitting(false);
            return { success: false, message: "Hubo un error al enviar la solicitud." };
        }
    }, [validateForm]);

    const reset = useCallback(() => {
        setFinalMessage(null);
        setRequestNumber(null);
        setMissingFields(null);
        setIsSubmitting(false);
        setErrorStatus(null);
    }, []);

    return {
        isSubmitting,
        finalMessage,
        requestNumber,
        missingFields,
        errorStatus,
        submit,
        reset,
    };
}

