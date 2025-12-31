import React, { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DollarSign } from "lucide-react";
import HeroSection from "../../layouts/components/hero-section/hero-section";
import { useSubmitWebPlan } from "./hooks/useSubmitWebPlan";
import { useSlugList } from "./hooks/useSlugList";
import Turnstile from "react-turnstile";


function capitalizeWords(str: string) {
    return str.replace(/\b\w/g, char => char.toUpperCase()).replace(/\B\w/g, char => char.toLowerCase());
}

function isValidRutFormat(rut: string) {
    return /^\d{7,8}-[\dkK]$/.test(rut);
}

function formatRutInput(value: string) {
    const clean = value.replace(/[^0-9kK]/g, "");
    if (clean.length <= 1) return clean;
    const main = clean.slice(0, -1);
    const dv = clean.slice(-1);
    return `${main}-${dv}`;
}

const MAX_FIRST_NAME_LEN = 50;
const MAX_LAST_NAME_LEN = 50;
const MAX_EMAIL_LEN = 100;

const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || "";

const WebPlanesOrder = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const { isValidSlug } = useSlugList();

    if (!isValidSlug(slug)) {
        return (
            <section className="flex flex-col items-center justify-center min-h-[60vh] bg-zinc-900">
                <div className="bg-black p-8 rounded-lg shadow-lg text-center">
                    <h2 className="text-2xl font-bold text-red-400 mb-4">Plan no válido</h2>
                    <p className="text-white mb-6">El plan solicitado no existe o no está disponible.</p>
                    <button
                        className="bg-reyes text-white font-bold py-2 px-6 rounded-sm hover:bg-reyes-dark transition-colors"
                        onClick={() => navigate("/web-planes")}
                    >
                        Volver a planes
                    </button>
                </div>
            </section>
        );
    }

    const WEBPLAN_SLUG = slug || "not-specified";

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [rut, setRut] = useState("");
    const [cellphone, setCellphone] = useState("");
    const [whatsappResponse, setWhatsappResponse] = useState(true);
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
    const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
    const [turnstileError, setTurnstileError] = useState<string | null>(null);
    const formRef = useRef<HTMLFormElement>(null);

    const {
        isSubmitting,
        finalMessage,
        requestNumber,
        missingFields,
        errorStatus,
        submit,
        reset,
    } = useSubmitWebPlan(WEBPLAN_SLUG);

    const validateFields = () => {
        const errors: { [key: string]: string } = {};
        if (!firstName.trim()) errors.first_name = "Nombre requerido";
        else if (firstName.length > MAX_FIRST_NAME_LEN) errors.first_name = `Máximo ${MAX_FIRST_NAME_LEN} caracteres`;
        if (!lastName.trim()) errors.last_name = "Apellido requerido";
        else if (lastName.length > MAX_LAST_NAME_LEN) errors.last_name = `Máximo ${MAX_LAST_NAME_LEN} caracteres`;
        if (!email.trim()) errors.email = "Email requerido";
        else if (email.length > MAX_EMAIL_LEN) errors.email = `Máximo ${MAX_EMAIL_LEN} caracteres`;
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Email inválido";
        if (!rut.trim()) errors.rut = "RUT requerido";
        else if (!isValidRutFormat(rut)) errors.rut = "Formato RUT inválido (Ej: 12345678-9)";
        if (!cellphone.trim()) errors.cellphone = "Teléfono requerido";
        else if (!/^\d{9}$/.test(cellphone)) errors.cellphone = "Debe tener 9 dígitos";
        return errors;
    };

    const isFormValid = Object.keys(validateFields()).length === 0 && !!turnstileToken;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const errors = validateFields();
        setFormErrors(errors);
        if (Object.keys(errors).length > 0) return;
        if (!turnstileToken) {
            setTurnstileError("Debes completar el captcha.");
            return;
        }
        setTurnstileError(null);

        await submit({
            first_name: firstName,
            last_name: lastName,
            email,
            rut,
            cellphone,
            whatsapp_response: whatsappResponse,
            webplan_slug: WEBPLAN_SLUG,
            turnstile_token: turnstileToken,
        });
    };

    const handleModalClose = () => {
        reset();
        formRef.current?.reset();
        setFirstName("");
        setLastName("");
        setEmail("");
        setRut("");
        setCellphone("");
        setWhatsappResponse(true);
        setFormErrors({});
        setTurnstileToken(null);
        setTurnstileError(null);
    };

    return (
        <>
            <HeroSection
                icon={DollarSign}
                logoImage="/img/plans/code_difference.png"
                title="Ordenar Plan Web"
                subtitle="Completa el formulario para iniciar tu proyecto web fijo. Te contactaremos pronto para empezar tu desarrollo."
            />
            {finalMessage && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                    <div className={`bg-zinc-900 p-8 rounded-lg shadow-lg text-center ${errorStatus ? "border-2 border-red-500" : ""}`}>
                        <h2 className={`text-2xl font-bold mb-2 ${errorStatus ? "text-red-400" : "text-reyes"}`}>
                            {errorStatus === 404
                                ? "Plan no encontrado"
                                : errorStatus === 422
                                    ? "Campos requeridos faltantes"
                                    : errorStatus
                                        ? "Error"
                                        : "¡Listo!"}
                        </h2>
                        <p className="text-white text-lg mb-4">{finalMessage}</p>
                        {missingFields && missingFields.length > 0 && (
                            <div className="text-red-400 mb-4">
                                <p>Campos faltantes:</p>
                                <ul>
                                    {missingFields.map(f => (
                                        <li key={f}>{f}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {requestNumber && !errorStatus && (
                            <p className="text-reyes font-bold mb-2">N° Solicitud: {requestNumber}</p>
                        )}
                        <button
                            className="bg-reyes text-white font-bold py-2 px-6 rounded-sm hover:bg-reyes-dark transition-colors"
                            onClick={handleModalClose}
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}

            <section className="py-16 bg-zinc-900">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="relative mb-12">
                        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-reyes-dark -z-0"></div>
                        <h2 className="text-3xl text-center relative z-10">
                            <span className="bg-zinc-900 px-4 relative z-10 text-white">Envíanos un mensaje</span>
                        </h2>
                    </div>
                    <div className="bg-black p-8 rounded-lg shadow-lg">
                        <form
                            ref={formRef}
                            className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left w-full"
                            onSubmit={handleSubmit}
                            noValidate
                        >
                            <div className="col-span-1">
                                <label htmlFor="first_name" className="block text-gray-300 font-bold mb-2">Nombre (requerido)</label>
                                <input
                                    type="text"
                                    id="first_name"
                                    name="first_name"
                                    maxLength={MAX_FIRST_NAME_LEN}
                                    className={`w-full p-3 rounded-sm bg-zinc-800 text-white border ${formErrors.first_name ? "border-red-500" : "border-zinc-700"} focus:outline-none focus:ring-2 focus:ring-reyes`}
                                    placeholder="Ingresa tu nombre"
                                    value={firstName}
                                    onChange={e => setFirstName(capitalizeWords(e.target.value.slice(0, MAX_FIRST_NAME_LEN)))}
                                />
                                {formErrors.first_name && <span className="text-red-400 text-sm">{formErrors.first_name}</span>}
                            </div>
                            <div className="col-span-1">
                                <label htmlFor="last_name" className="block text-gray-300 font-bold mb-2">Apellido (requerido)</label>
                                <input
                                    type="text"
                                    id="last_name"
                                    name="last_name"
                                    maxLength={MAX_LAST_NAME_LEN}
                                    className={`w-full p-3 rounded-sm bg-zinc-800 text-white border ${formErrors.last_name ? "border-red-500" : "border-zinc-700"} focus:outline-none focus:ring-2 focus:ring-reyes`}
                                    placeholder="Ingresa tu apellido"
                                    value={lastName}
                                    onChange={e => setLastName(capitalizeWords(e.target.value.slice(0, MAX_LAST_NAME_LEN)))}
                                />
                                {formErrors.last_name && <span className="text-red-400 text-sm">{formErrors.last_name}</span>}
                            </div>
                            <div className="col-span-1">
                                <label htmlFor="email" className="block text-gray-300 font-bold mb-2">Email (requerido)</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    maxLength={MAX_EMAIL_LEN}
                                    className={`w-full p-3 rounded-sm bg-zinc-800 text-white border ${formErrors.email ? "border-red-500" : "border-zinc-700"} focus:outline-none focus:ring-2 focus:ring-reyes`}
                                    placeholder="Ingresa tu email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value.slice(0, MAX_EMAIL_LEN))}
                                />
                                {formErrors.email && <span className="text-red-400 text-sm">{formErrors.email}</span>}
                            </div>
                            <div className="col-span-1">
                                <label htmlFor="rut" className="block text-gray-300 font-bold mb-2">RUT (requerido)</label>
                                <input
                                    type="text"
                                    id="rut"
                                    name="rut"
                                    className={`w-full p-3 rounded-sm bg-zinc-800 text-white border ${formErrors.rut ? "border-red-500" : "border-zinc-700"} focus:outline-none focus:ring-2 focus:ring-reyes`}
                                    placeholder="********-*"
                                    value={rut}
                                    onChange={e => {
                                        const formatted = formatRutInput(e.target.value);
                                        setRut(formatted);
                                    }}
                                    maxLength={10}
                                    inputMode="text"
                                />
                                {formErrors.rut && <span className="text-red-400 text-sm">{formErrors.rut}</span>}
                            </div>
                            <div className="col-span-1">
                                <label htmlFor="cellphone" className="block text-gray-300 font-bold mb-2">Número de Teléfono (requerido)</label>
                                <div className="flex">
                                    <span className="inline-flex items-center px-3 rounded-l-sm bg-zinc-800 text-white border border-r-0 border-zinc-700 select-none">
                                        +56
                                    </span>
                                    <input
                                        type="tel"
                                        id="cellphone"
                                        name="cellphone"
                                        maxLength={9}
                                        className={`w-full p-3 rounded-r-sm bg-zinc-800 text-white border ${formErrors.cellphone ? "border-red-500" : "border-zinc-700"} border-l-0 focus:outline-none focus:ring-2 focus:ring-reyes`}
                                        placeholder="912345678"
                                        pattern="[0-9]{9}"
                                        inputMode="numeric"
                                        value={cellphone}
                                        onChange={e => {
                                            const value = e.target.value.replace(/\D/g, "");
                                            setCellphone(value);
                                        }}
                                    />
                                </div>
                                {formErrors.cellphone && <span className="text-red-400 text-sm">{formErrors.cellphone}</span>}
                            </div>
                            <div className="md:col-span-2 col-span-1 flex items-center mt-2 mb-2">
                                <input
                                    type="checkbox"
                                    id="whatsapp_response"
                                    name="whatsapp_response"
                                    checked={whatsappResponse}
                                    onChange={e => setWhatsappResponse(e.target.checked)}
                                    className="mr-2 accent-reyes"
                                />
                                <label htmlFor="whatsapp_response" className="text-gray-300 font-bold">
                                    ¿Recibir respuesta por WhatsApp?
                                </label>
                            </div>
                            <div className="md:col-span-2 col-span-1 flex flex-col items-center mt-2 mb-2">
                                <Turnstile
                                    sitekey={TURNSTILE_SITE_KEY}
                                    onSuccess={token => {
                                        setTurnstileToken(token);
                                        setTurnstileError(null);
                                    }}
                                    onError={() => setTurnstileError("Error al cargar el captcha.")}
                                    onExpire={() => setTurnstileToken(null)}
                                    theme="dark"
                                />
                                {turnstileError && <span className="text-red-400 text-sm mt-2">{turnstileError}</span>}
                            </div>
                            <div className="md:col-span-2 col-span-1">
                                <button
                                    type="submit"
                                    className={`w-full bg-reyes text-white font-bold py-3 rounded-sm transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed mt-4${(!isSubmitting && isFormValid) ? " hover:bg-reyes-dark" : ""}`}
                                    disabled={!isFormValid || isSubmitting}
                                >
                                    {isSubmitting ? "Enviando..." : "Ordenar"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default WebPlanesOrder;
