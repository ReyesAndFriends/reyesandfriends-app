import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useGetWebPlanDetail } from "../web-planes-detail/hooks/useGetWebPlanDetail";

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
    const [region, setRegion] = useState("");
    const [comuna, setComuna] = useState("");
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

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
        if (!region.trim()) errors.region = "Región requerida";
        if (!comuna.trim()) errors.comuna = "Comuna requerida";

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
        region.trim() &&
        comuna.trim();

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
    const handleRegionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRegion(e.target.value);
        setFormErrors({});
    };
    const handleComunaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setComuna(e.target.value);
        setFormErrors({});
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const errors = validateFields();
        setFormErrors(errors);
        if (Object.keys(errors).length > 0) return;
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
                                        <h2 className="text-xl text-white font-semibold mb-6">Detalles de Entrega</h2>
                                        <div className="grid lg:grid-cols-2 gap-y-6 gap-x-4">
                                            <div>
                                                <label className="text-sm text-white font-medium block mb-2">Nombre (Requerido)</label>
                                                <input
                                                    type="text"
                                                    placeholder="Ingrese su nombre"
                                                    className={`px-4 p-3 rounded-sm bg-zinc-800 border ${formErrors.first_name ? "border-red-500" : "border-zinc-700"} text-white w-full text-sm focus:ring-2 focus:ring-reyes`}
                                                    value={firstName}
                                                    onChange={handleFirstNameChange}
                                                    maxLength={MAX_FIRST_NAME_LEN}
                                                />
                                                {formErrors.first_name && <p className="text-red-400 text-xs mt-1">{formErrors.first_name}</p>}
                                            </div>
                                            <div>
                                                <label className="text-sm text-white font-medium block mb-2">Apellido (Requerido)</label>
                                                <input
                                                    type="text"
                                                    placeholder="Ingrese su apellido"
                                                    className={`px-4 p-3 rounded-sm bg-zinc-800 border ${formErrors.last_name ? "border-red-500" : "border-zinc-700"} text-white w-full text-sm focus:ring-2 focus:ring-reyes`}
                                                    value={lastName}
                                                    onChange={handleLastNameChange}
                                                    maxLength={MAX_LAST_NAME_LEN}
                                                />
                                                {formErrors.last_name && <p className="text-red-400 text-xs mt-1">{formErrors.last_name}</p>}
                                            </div>
                                            <div>
                                                <label className="text-sm text-white font-medium block mb-2">Correo electrónico (Requerido)</label>
                                                <input
                                                    type="email"
                                                    placeholder="Ingrese su correo electrónico"
                                                    className={`px-4 p-3 rounded-sm bg-zinc-800 border ${formErrors.email ? "border-red-500" : "border-zinc-700"} text-white w-full text-sm focus:ring-2 focus:ring-reyes`}
                                                    value={email}
                                                    onChange={handleEmailChange}
                                                    maxLength={MAX_EMAIL_LEN}
                                                />
                                                {formErrors.email && <p className="text-red-400 text-xs mt-1">{formErrors.email}</p>}
                                            </div>
                                            <div>
                                                <label className="text-sm text-white font-medium block mb-2">Teléfono (Requerido)</label>
                                                <div className="flex">
                                                    <span className="inline-flex items-center px-3 rounded-l-md bg-zinc-800 text-white border border-r-0 border-zinc-700 select-none">
                                                        +56
                                                    </span>
                                                    <input
                                                        type="tel"
                                                        placeholder="912345678"
                                                        className={`px-4 p-3 rounded-sm bg-zinc-800 border ${formErrors.cellphone ? "border-red-500" : "border-zinc-700"} border-l-0 text-white w-full text-sm focus:ring-2 focus:ring-reyes`}
                                                        value={cellphone}
                                                        onChange={handleCellphoneChange}
                                                        maxLength={9}
                                                        pattern="[0-9]{9}"
                                                        inputMode="numeric"
                                                    />
                                                </div>
                                                {formErrors.cellphone && <p className="text-red-400 text-xs mt-1">{formErrors.cellphone}</p>}
                                            </div>
                                            <div>
                                                <label className="text-sm text-white font-medium block mb-2">Dirección (Requerido)</label>
                                                <input
                                                    type="text"
                                                    placeholder="Ingrese su dirección"
                                                    className={`px-4 p-3 rounded-sm bg-zinc-800 border ${formErrors.address ? "border-red-500" : "border-zinc-700"} text-white w-full text-sm focus:ring-2 focus:ring-reyes`}
                                                    value={address}
                                                    onChange={handleAddressChange}
                                                />
                                                {formErrors.address && <p className="text-red-400 text-xs mt-1">{formErrors.address}</p>}
                                            </div>
                                            <div>
                                                <label className="text-sm text-white font-medium block mb-2">Región (Requerido)</label>
                                                <input
                                                    type="text"
                                                    placeholder="Ingrese su región"
                                                    className={`px-4 p-3 rounded-sm bg-zinc-800 border ${formErrors.region ? "border-red-500" : "border-zinc-700"} text-white w-full text-sm focus:ring-2 focus:ring-reyes`}
                                                    value={region}
                                                    onChange={handleRegionChange}
                                                />
                                                {formErrors.region && <p className="text-red-400 text-xs mt-1">{formErrors.region}</p>}
                                            </div>
                                            <div>
                                                <label className="text-sm text-white font-medium block mb-2">Comuna (Requerido)</label>
                                                <input
                                                    type="text"
                                                    placeholder="Ingrese su comuna"
                                                    className={`px-4 p-3 rounded-sm bg-zinc-800 border ${formErrors.comuna ? "border-red-500" : "border-zinc-700"} text-white w-full text-sm focus:ring-2 focus:ring-reyes`}
                                                    value={comuna}
                                                    onChange={handleComunaChange}
                                                />
                                                {formErrors.comuna && <p className="text-red-400 text-xs mt-1">{formErrors.comuna}</p>}
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
                                    <button
                                        type="button"
                                        className={`w-full bg-reyes text-white font-bold py-3 rounded-sm transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed${isFormValid ? " hover:bg-reyes-dark" : ""}`}
                                        disabled={!isFormValid}
                                        // onClick= Logic here
                                    >
                                        Solicitar Plan Web
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