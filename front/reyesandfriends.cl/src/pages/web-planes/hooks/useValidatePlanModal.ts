import { useState, useCallback } from "react";

const API_URL = import.meta.env.VITE_API_URL;

interface FormState {
    first_name: string;
    last_name: string;
    email: string;
    rut: string;
    rut_type: string;
    cellphone: string; 
}

export default function useValidatePlanModal(plan: any) {
    const [form, setForm] = useState<FormState>({
        first_name: "",
        last_name: "",
        email: "",
        rut: "",
        rut_type: "natural",
        cellphone: "" 
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const validarRut = (rut: string) => {
        rut = rut.replace(/\./g, '').replace(/-/g, '').toUpperCase();
        if (!/^\d{7,8}[0-9K]$/.test(rut)) return false;
        let cuerpo = rut.slice(0, -1);
        let dv = rut.slice(-1);
        let suma = 0, multiplo = 2;
        for (let i = cuerpo.length - 1; i >= 0; i--) {
            suma += parseInt(cuerpo[i]) * multiplo;
            multiplo = multiplo < 7 ? multiplo + 1 : 2;
        }
        const dvNum = 11 - (suma % 11);
        const dvEsperado = dvNum === 11 ? '0' : dvNum === 10 ? 'K' : dvNum.toString();
        return dv === dvEsperado;
    };

    const formatearRut = (rut: string) => {
        rut = rut.replace(/\./g, '').replace(/-/g, '').toUpperCase();
        if (rut.length < 2) return rut;
        let cuerpo = rut.slice(0, -1);
        let dv = rut.slice(-1);
        let cuerpoFormateado = "";
        while (cuerpo.length > 3) {
            cuerpoFormateado = "." + cuerpo.slice(-3) + cuerpoFormateado;
            cuerpo = cuerpo.slice(0, -3);
        }
        cuerpoFormateado = cuerpo + cuerpoFormateado;
        return cuerpoFormateado + "-" + dv;
    };

    const handleRutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/[^0-9kK]/g, "").toUpperCase();
        // Permitir hasta 8 dígitos + 1 DV (máximo 9 caracteres), pero si el usuario pega el RUT completo, permitir hasta 10
        value = value.slice(0, 10);
        if (value.length > 1) {
            value = formatearRut(value);
        }
        value = value.slice(0, 12); // por si acaso, para no exceder el input
        setForm(f => ({ ...f, rut: value }));
    };

    const handleRutTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm(f => ({ ...f, rut_type: e.target.value }));
    };

    const capitalizeWords = (str: string) => {
        return str.replace(/\p{L}+/gu, word =>
            word.charAt(0).toLocaleUpperCase() + word.slice(1).toLocaleLowerCase()
        );
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        let newValue = value;
        if (name === "first_name" || name === "last_name") {
            newValue = capitalizeWords(value);
        }
        setForm(f => ({ ...f, [name]: newValue }));
        setErrors(errs => ({ ...errs, [name]: "" }));
    };

    const handleTelefonoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length > 0) {
            value = value.replace(/^([^9])/, "");
            value = value.slice(0, 9);
        }
        setForm(f => ({ ...f, cellphone: value })); 
        setErrors(errs => ({ ...errs, cellphone: "" })); 
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSuccessMessage(null);
        setErrorMessage(null);
        const newErrors: { [key: string]: string } = {};

        if (!form.first_name.trim()) newErrors.first_name = "El nombre es obligatorio.";
        if (!form.last_name.trim()) newErrors.last_name = "Los apellidos son obligatorios.";
        if (!form.email.trim()) newErrors.email = "El correo es obligatorio.";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Correo inválido.";
        if (!form.rut.trim()) newErrors.rut = "El RUT es obligatorio.";
        else if (!validarRut(form.rut)) newErrors.rut = "RUT inválido.";
        if (!form.cellphone.trim()) newErrors.cellphone = "El teléfono es obligatorio."; 
        else if (!/^9\d{8}$/.test(form.cellphone)) newErrors.cellphone = "Teléfono inválido. Debe comenzar con 9 y tener 9 dígitos."; 

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            setLoading(true);
            const rutSinFormato = form.rut.replace(/\./g, '').replace(/-/g, '');
            try {
                const res = await fetch(`${API_URL}/webplans/request`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        ...form,
                        rut: rutSinFormato,
                        plan: plan?.slug
                    })
                });
                if (res.status === 201) {
                    const data = await res.json();
                    setSuccessMessage(data.message);
                } else {
                    setErrorMessage("En estos momentos no se pudo enviar la solicitud. Intenta más tarde.");
                }
            } catch {
                setErrorMessage("En estos momentos no se pudo enviar la solicitud. Intenta más tarde.");
            } finally {
                setLoading(false);
            }
        }
    };

    const resetForm = useCallback(() => {
        setForm({
            first_name: "",
            last_name: "",
            email: "",
            rut: "",
            rut_type: "natural",
            cellphone: "" 
        });
        setErrors({});
        setSuccessMessage(null);
        setErrorMessage(null);
        setLoading(false);
    }, []);

    return {
        form,
        errors,
        handleChange,
        handleRutChange,
        handleRutTypeChange,
        handleTelefonoChange,
        handleSubmit,
        resetForm,
        loading,
        successMessage,
        errorMessage
    };
}
