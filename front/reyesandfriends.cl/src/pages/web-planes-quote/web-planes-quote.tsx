import { useNavigate, useParams } from "react-router-dom";
import Turnstile from "react-turnstile";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { useGetWebPlanDetail } from "../web-planes-detail/hooks/useGetWebPlanDetail";

import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || "";

function capitalizeWords(str: string) {
    return str.replace(/\b\w/g, char => char.toUpperCase()).replace(/\B\w/g, char => char.toLowerCase());
}

const MAX_FIRST_NAME_LEN = 50;
const MAX_LAST_NAME_LEN = 50;
const MAX_EMAIL_LEN = 100;

function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function WebPlanesQuote() {
    const navigate = useNavigate();
    const { slug } = useParams<{ slug: string }>();
    const { data, loading, error, retry } = useGetWebPlanDetail(slug || "");

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [cellphone, setCellphone] = useState("");
    const [address, setAddress] = useState("");
    const [regionId, setRegionId] = useState<number | "">("");
    const [communeId, setCommuneId] = useState<number | "">("");

    const [regions, setRegions] = useState<{ id: number; name: string }[]>([]);
    const [communes, setCommunes] = useState<{ id: number; name: string }[]>([]);

    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
    const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
    const [turnstileError, setTurnstileError] = useState<string | null>(null);

    const [submitLoading, setSubmitLoading] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
    const [submitError, setSubmitError] = useState<string | null>(null);

    useEffect(() => {
        axios.get(`${API_URL}/utils/regions`)
            .then(res => setRegions(res.data))
            .catch(() => setRegions([]));
    }, []);

    useEffect(() => {
        if (regionId) {
            setCommuneId(""); // reset commune
            axios.get(`${API_URL}/utils/communes/${regionId}`)
                .then(res => setCommunes(res.data))
                .catch(() => setCommunes([]));
        } else {
            setCommunes([]);
            setCommuneId("");
        }
    }, [regionId]);

    const validateFields = () => {
        const errors: { [key: string]: string } = {};
        if (!firstName.trim()) errors.first_name = "Nombre requerido";
        else if (firstName.length > MAX_FIRST_NAME_LEN) errors.first_name = `Máximo ${MAX_FIRST_NAME_LEN} caracteres`;

        if (!lastName.trim()) errors.last_name = "Apellido requerido";
        else if (lastName.length > MAX_LAST_NAME_LEN) errors.last_name = `Máximo ${MAX_LAST_NAME_LEN} caracteres`;

        if (!email.trim()) errors.email = "Email requerido";
        else if (email.length > MAX_EMAIL_LEN) errors.email = `Máximo ${MAX_EMAIL_LEN} caracteres`;
        else if (!isValidEmail(email)) errors.email = "Email inválido";

        if (!cellphone.trim()) errors.cellphone = "Teléfono requerido";
        else if (!/^\d{9}$/.test(cellphone)) errors.cellphone = "Debe tener 9 dígitos";

        if (!address.trim()) errors.address = "Dirección requerida";
        if (!regionId) errors.region = "Región requerida";
        if (!communeId) errors.commune = "Comuna requerida";

        if (!turnstileToken) errors.turnstile = "Debes completar el captcha.";

        return errors;
    };

    const isFormValid =
        firstName.trim() &&
        lastName.trim() &&
        email.trim() &&
        isValidEmail(email) &&
        cellphone.trim() &&
        /^\d{9}$/.test(cellphone) &&
        address.trim() &&
        regionId &&
        communeId;

    const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(capitalizeWords(e.target.value).slice(0, MAX_FIRST_NAME_LEN));
        setFormErrors({});
    };
    const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(capitalizeWords(e.target.value).slice(0, MAX_LAST_NAME_LEN));
        setFormErrors({});
    };
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value.slice(0, MAX_EMAIL_LEN));
        setFormErrors({});
    };
    const handleCellphoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, "");
        setCellphone(value.slice(0, 9));
        setFormErrors({});
    };
    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(e.target.value);
        setFormErrors({});
    };
    const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value ? Number(e.target.value) : "";
        setRegionId(value);
        setFormErrors({});
    };
    const handleCommuneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value ? Number(e.target.value) : "";
        setCommuneId(value);
        setFormErrors({});
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const errors = validateFields();
        setFormErrors(errors);
        setSubmitError(null);
        setSubmitSuccess(null);
        if (Object.keys(errors).length > 0) return;
    };

    // Build the JSON object from form state
    const buildFormJson = () => ({
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        email: email.trim(),
        cellphone: cellphone.trim() ? `+56${cellphone.trim()}` : "",
        address: address.trim(),
        region_id: regionId,
        commune_id: communeId,
        plan_slug: slug,
        turnstile_token: turnstileToken,
    });

    // Print the JSON to the console on submit
    const handleFormSubmit = async () => {
        const errors = validateFields();
        setFormErrors(errors);
        setSubmitError(null);
        setSubmitSuccess(null);
        if (Object.keys(errors).length > 0) {
            if (errors.turnstile) setTurnstileError(errors.turnstile);
            return;
        }
        setTurnstileError(null);
        const json = buildFormJson();
        setSubmitLoading(true);
        try {
            const res = await axios.post(`${API_URL}/web_planes/request`, json);
            setSubmitSuccess("¡Solicitud enviada con éxito! Pronto te contactaremos.");
            setFirstName("");
            setLastName("");
            setEmail("");
            setCellphone("");
            setAddress("");
            setRegionId("");
            setCommuneId("");
            setFormErrors({});
            setTurnstileToken(null);
        } catch (err: any) {
            if (err.response?.data?.error) {
                setSubmitError(err.response.data.error);
            } else {
                setSubmitError("Ocurrió un error al enviar la solicitud.");
            }
        } finally {
            setSubmitLoading(false);
        }
    };

    return (
        <motion.div
            className="container mx-auto px-4 max-w-7xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <div className="sm:px-8 py-6 mt-24">
                <h2 className="text-3xl mb-12 text-center relative">
                    <span className="bg-zinc-900 px-4 relative z-10 text-white">Adquirir Plan Web</span>
                    <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-reyes-dark -z-0"></div>
                </h2>

                {error ? (
                    <div className="max-w-xl mx-auto bg-black py-12 px-8 rounded-lg shadow-lg flex flex-col items-center justify-center min-h-[220px]">
                        <span className="text-red-400 text-center mb-4">{error}</span>
                        <button
                            onClick={retry}
                            className="bg-reyes hover:bg-reyes-dark text-white px-4 py-2 rounded text-sm font-semibold"
                        >
                            Reintentar
                        </button>
                    </div>
                ) : (
                    <div className="max-w-screen-xl max-md:max-w-xl mx-auto bg-black py-8 px-12 rounded-lg shadow-lg">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8 lg:gap-x-12">
                            <div className="lg:col-span-2">
                                <form onSubmit={handleSubmit} noValidate>
                                    <div>
                                        <h2 className="text-xl text-white font-semibold mb-6">Formulario de Información</h2>
                                        <p className="text-white mb-6">Con esta información podremos contactarte y procesar tu solicitud de manera eficiente.</p>
                                        <div className="grid lg:grid-cols-2 gap-y-6 gap-x-4">
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
                                                    onChange={handleFirstNameChange}
                                                />
                                                {formErrors.first_name && <p className="text-red-400 text-sm">{formErrors.first_name}</p>}
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
                                                    onChange={handleLastNameChange}
                                                />
                                                {formErrors.last_name && <p className="text-red-400 text-sm">{formErrors.last_name}</p>}
                                            </div>
                                            <div className="col-span-1">
                                                <label htmlFor="email" className="block text-gray-300 font-bold mb-2">Correo electrónico (requerido)</label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    maxLength={MAX_EMAIL_LEN}
                                                    className={`w-full p-3 rounded-sm bg-zinc-800 text-white border ${formErrors.email ? "border-red-500" : "border-zinc-700"} focus:outline-none focus:ring-2 focus:ring-reyes`}
                                                    placeholder="Ingresa tu correo electrónico"
                                                    value={email}
                                                    onChange={handleEmailChange}
                                                />
                                                {formErrors.email && <p className="text-red-400 text-sm">{formErrors.email}</p>}
                                            </div>
                                            <div className="col-span-1">
                                                <label htmlFor="cellphone" className="block text-gray-300 font-bold mb-2">Número de Teléfono (requerido)</label>
                                                <div className="flex">
                                                    <span className="inline-flex items-center px-3 rounded-l-sm bg-zinc-700 text-white border border-r-0 border-zinc-700 select-none">
                                                        +56
                                                    </span>
                                                    <input
                                                        type="tel"
                                                        id="cellphone"
                                                        name="cellphone"
                                                        maxLength={9}
                                                        className={`w-full p-3 rounded-r-sm bg-zinc-800 text-white border ${formErrors.cellphone ? "border-red-500" : "border-zinc-700"} border-l-0 focus:outline-none focus:ring-2 focus:ring-reyes text-sm`}
                                                        placeholder="912345678"
                                                        pattern="[0-9]{9}"
                                                        inputMode="numeric"
                                                        value={cellphone}
                                                        onChange={handleCellphoneChange}
                                                    />
                                                </div>
                                                {formErrors.cellphone && <p className="text-red-400 text-sm">{formErrors.cellphone}</p>}
                                            </div>
                                            <div className="col-span-1">
                                                <label htmlFor="address" className="block text-gray-300 font-bold mb-2">Dirección (requerido)</label>
                                                <input
                                                    type="text"
                                                    id="address"
                                                    name="address"
                                                    className={`w-full p-3 rounded-sm bg-zinc-800 text-white border ${formErrors.address ? "border-red-500" : "border-zinc-700"} focus:outline-none focus:ring-2 focus:ring-reyes`}
                                                    placeholder="Ingresa tu dirección"
                                                    value={address}
                                                    onChange={handleAddressChange}
                                                />
                                                {formErrors.address && <p className="text-red-400 text-sm">{formErrors.address}</p>}
                                            </div>
                                            <div className="col-span-1">
                                                <label htmlFor="region" className="block text-gray-300 font-bold mb-2">Región (requerido)</label>
                                                <select
                                                    id="region"
                                                    name="region"
                                                    className={`w-full p-3 h-[48px] rounded-sm bg-zinc-800 text-white border ${formErrors.region ? "border-red-500" : "border-zinc-700"} focus:outline-none focus:ring-2 focus:ring-reyes`}
                                                    value={regionId}
                                                    onChange={handleRegionChange}
                                                >
                                                    <option value="">Seleccione una región</option>
                                                    {regions.map(region => (
                                                        <option key={region.id} value={region.id}>{region.name}</option>
                                                    ))}
                                                </select>
                                                {formErrors.region && <p className="text-red-400 text-sm">{formErrors.region}</p>}
                                            </div>
                                            <div className="col-span-1">
                                                <label htmlFor="commune" className="block text-gray-300 font-bold mb-2">Comuna (requerido)</label>
                                                <select
                                                    id="commune"
                                                    name="commune"
                                                    className={`w-full p-3 h-[48px] rounded-sm bg-zinc-800 text-white border ${formErrors.commune ? "border-red-500" : "border-zinc-700"} focus:outline-none focus:ring-2 focus:ring-reyes`}
                                                    value={communeId}
                                                    onChange={handleCommuneChange}
                                                    disabled={!regionId || communes.length === 0}
                                                >
                                                    {(!regionId || communes.length === 0) ? (
                                                        <option value="">Primero seleccione una región</option>
                                                    ) : (
                                                        <option value="">Seleccione una comuna</option>
                                                    )}
                                                    {communes.map(commune => (
                                                        <option key={commune.id} value={commune.id}>{commune.name}</option>
                                                    ))}
                                                </select>
                                                {formErrors.commune && <p className="text-red-400 text-sm">{formErrors.commune}</p>}
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>

                            <div className="relative">
                                <h2 className="text-xl text-white font-semibold mb-6">Resumen de la Orden</h2>
                                {loading && (
                                    <div className="flex items-center justify-center min-h-[180px]">
                                        <span className="text-gray-400">Cargando...</span>
                                    </div>
                                )}
                                {!loading && data && (
                                    <>
                                        <div className="mb-6 flex flex-col gap-4 items-center">
                                            <img
                                                src={data.images?.[0]?.image_url || ""}
                                                alt={data.name}
                                                className="w-32 object-cover rounded mb-2 pointer-events-none"
                                            />
                                            <span className="text-white font-semibold">{data.name}</span>
                                        </div>
                                        <ul className="text-zinc-400 font-medium space-y-4">
                                            <li className="flex flex-wrap gap-4 text-sm">
                                                Subtotal <span className="ml-auto font-semibold text-white">${data.price_clp?.toLocaleString("es-CL")}</span>
                                            </li>
                                            <li className="flex flex-wrap gap-4 text-sm">
                                                Descuento <span className="ml-auto font-semibold text-white">$0.00</span>
                                            </li>
                                            <hr className="border-zinc-700" />
                                            <li className="flex flex-wrap gap-4 text-[15px] font-semibold text-white">
                                                Total <span className="ml-auto">${data.price_clp?.toLocaleString("es-CL")}</span>
                                            </li>
                                        </ul>
                                    </>
                                )}
                                <div className="space-y-4 mt-8">
                                    {submitSuccess && (
                                        <div className="bg-green-700 text-white text-center py-2 rounded">{submitSuccess}</div>
                                    )}
                                    {submitError && (
                                        <div className="bg-red-700 text-white text-center py-2 rounded">{submitError}</div>
                                    )}
                                    <div className="flex flex-col items-center">
                                        <Turnstile
                                            sitekey={TURNSTILE_SITE_KEY}
                                            onSuccess={token => {
                                                setTurnstileToken(token);
                                                setTurnstileError(null);
                                            }}
                                            onError={() => setTurnstileError("Error al cargar el captcha.")}
                                            onExpire={() => setTurnstileToken(null)}
                                            theme="light"
                                        />
                                        {turnstileError && <span className="text-red-400 text-sm mt-2">{turnstileError}</span>}
                                    </div>
                                    <button
                                        type="button"
                                        className={`w-full bg-reyes text-white font-bold py-3 rounded-sm transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed${isFormValid ? " hover:bg-reyes-dark" : ""}`}
                                        disabled={!isFormValid || submitLoading}
                                        onClick={handleFormSubmit}
                                    >
                                        {submitLoading ? "Enviando..." : "Solicitar Plan Web"}
                                    </button>
                                    <button
                                        type="button"
                                        className="w-full bg-zinc-800 text-white font-bold py-3 rounded-sm border border-zinc-700 transition-colors hover:bg-zinc-700"
                                        onClick={() => navigate("/web-planes")}
                                    >
                                        Cancelar pedido
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
}

export default WebPlanesQuote;