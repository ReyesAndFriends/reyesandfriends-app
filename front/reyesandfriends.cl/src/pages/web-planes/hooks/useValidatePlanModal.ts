import { useState, useCallback } from "react";

interface FormState {
    first_name: string;
    last_name: string;
    correo: string;
    rut: string;
    rut_type: string;
    telefono: string;
}

export default function useValidatePlanModal(plan: any) {
    const [form, setForm] = useState<FormState>({
        first_name: "",
        last_name: "",
        correo: "",
        rut: "",
        rut_type: "natural",
        telefono: ""
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const validarRut = (rut: string) => {
        rut = rut.replace(/\./g, '').replace(/-/g, '');
        if (rut.length < 8) return false;
        let cuerpo = rut.slice(0, -1);
        let dv = rut.slice(-1).toUpperCase();
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
        rut = rut.replace(/\D/g, "");
        if (rut.length === 0) return "";
        let dv = rut.slice(-1);
        let cuerpo = rut.slice(0, -1);
        let cuerpoFormateado = "";
        while (cuerpo.length > 3) {
            cuerpoFormateado = "." + cuerpo.slice(-3) + cuerpoFormateado;
            cuerpo = cuerpo.slice(0, -3);
        }
        cuerpoFormateado = cuerpo + cuerpoFormateado;
        return cuerpoFormateado + "-" + dv;
    };

    const handleRutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/[^0-9kK]/g, "");
        value = value.slice(0, 9);
        if (value.length > 1) {
            value = formatearRut(value);
        }
        value = value.slice(0, 12);
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
        setForm(f => ({ ...f, telefono: value }));
        setErrors(errs => ({ ...errs, telefono: "" }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: { [key: string]: string } = {};

        if (!form.first_name.trim()) newErrors.first_name = "El nombre es obligatorio.";
        if (!form.last_name.trim()) newErrors.last_name = "Los apellidos son obligatorios.";
        if (!form.correo.trim()) newErrors.correo = "El correo es obligatorio.";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo)) newErrors.correo = "Correo inválido.";
        if (!form.rut.trim()) newErrors.rut = "El RUT es obligatorio.";
        else if (!validarRut(form.rut)) newErrors.rut = "RUT inválido.";
        if (!form.telefono.trim()) newErrors.telefono = "El teléfono es obligatorio.";
        else if (!/^9\d{8}$/.test(form.telefono)) newErrors.telefono = "Teléfono inválido. Debe comenzar con 9 y tener 9 dígitos.";

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            const rutSinFormato = form.rut.replace(/\./g, '').replace(/-/g, '');
            console.log({
                ...form,
                rut: rutSinFormato,
                plan
            });
            // form send here
        }
    };

    const resetForm = useCallback(() => {
        setForm({
            first_name: "",
            last_name: "",
            correo: "",
            rut: "",
            rut_type: "natural",
            telefono: ""
        });
        setErrors({});
    }, []);

    return {
        form,
        errors,
        handleChange,
        handleRutChange,
        handleRutTypeChange,
        handleTelefonoChange,
        handleSubmit,
        resetForm
    };
}
