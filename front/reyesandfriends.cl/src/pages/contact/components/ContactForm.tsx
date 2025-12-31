import React, { useState, useRef, FormEvent, ChangeEvent } from "react";
import { useGetContactCategories } from "../../../hooks/contact/useGetContactCategories";
import { useContactFormValidator } from "../../../hooks/contact/useContactFormValidator";
import ContactModal from "./ContactModal";
import Turnstile from "react-turnstile";

function capitalizeWords(str: string) {
    return str.replace(/\b\w/g, char => char.toUpperCase()).replace(/\B\w/g, char => char.toLowerCase());
}

const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || "";
const MAX_FIRST_NAME_LEN = 50;
const MAX_LAST_NAME_LEN = 50;
const MAX_EMAIL_LEN = 100;
const MIN_MESSAGE_LEN = 20;
const MAX_MESSAGE_LEN = 1000;

function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const ContactForm: React.FC = () => {
    const { categories, error: categoriesError, loading, refetch } = useGetContactCategories();
    const { errors, handleSubmit, isSubmitting, finalMessage, setFinalMessage } = useContactFormValidator();
    const formRef = useRef<HTMLFormElement>(null);
    const [cellphone, setCellphone] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [category, setCategory] = useState("");
    const [message, setMessage] = useState("");
    const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
    const [turnstileError, setTurnstileError] = useState<string | null>(null);
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

    const handleCellphoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setCellphone(value);
        }
    };

    const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = capitalizeWords(e.target.value);
        setFirstName(value);
    };

    const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = capitalizeWords(e.target.value);
        setLastName(value);
    };

    const validateFields = () => {
        const errors: { [key: string]: string } = {};
        if (typeof firstName !== "string" || !firstName.trim())
            errors.first_name = "Nombre requerido";
        else if (firstName.length > MAX_FIRST_NAME_LEN)
            errors.first_name = `Máximo ${MAX_FIRST_NAME_LEN} caracteres`;

        if (typeof lastName !== "string" || !lastName.trim())
            errors.last_name = "Apellido requerido";
        else if (lastName.length > MAX_LAST_NAME_LEN)
            errors.last_name = `Máximo ${MAX_LAST_NAME_LEN} caracteres`;

        if (typeof email !== "string" || !email.trim())
            errors.email = "Email requerido";
        else if (email.length > MAX_EMAIL_LEN)
            errors.email = `Máximo ${MAX_EMAIL_LEN} caracteres`;
        else if (!email.includes("@"))
            errors.email = "Debe ser un email válido";
        else if (!isValidEmail(email))
            errors.email = "Email inválido";

        if (typeof cellphone !== "string" || !cellphone.trim())
            errors.cellphone = "Teléfono requerido";
        else if (!/^\d{9}$/.test(cellphone))
            errors.cellphone = "Debe tener 9 dígitos";

        if (typeof category !== "string" || !category.trim())
            errors.category = "Categoría requerida";

        if (typeof message !== "string" || !message.trim())
            errors.message = "Mensaje requerido";
        else if (message.length < MIN_MESSAGE_LEN)
            errors.message = `Mínimo ${MIN_MESSAGE_LEN} caracteres`;
        else if (message.length > MAX_MESSAGE_LEN)
            errors.message = `Máximo ${MAX_MESSAGE_LEN} caracteres`;

        return errors;
    };

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const errors = validateFields();
        setFormErrors(errors);
        if (Object.keys(errors).length > 0) return;
        if (!turnstileToken) {
            setTurnstileError("Debes completar el captcha.");
            return;
        }
        setTurnstileError(null);
        const data = {
            first_name: firstName,
            last_name: lastName,
            cellphone: cellphone,
            email: email,
            category: category,
            message: message,
            turnstile_token: turnstileToken,
        };
        handleSubmit(data);
    };

    const handleInputChange = () => {
        setFormErrors({});
        const formData = new FormData(formRef.current as HTMLFormElement);
        const isValid = [
            firstName.trim(),
            lastName.trim(),
            cellphone.trim(),
            formData.get("email"),
            formData.get("category"),
            formData.get("message")
        ].every((value) => {
            if (typeof value === "string") return value.trim() !== "";
            return value !== null && value !== undefined;
        });
    };

    const handleModalClose = () => {
        setFinalMessage(null);
        formRef.current?.reset();
        setCellphone("");
        setFirstName("");
        setLastName("");
        setEmail("");
        setCategory("");
        setMessage("");
        setTurnstileToken(null);
        setTurnstileError(null);
        setFormErrors({});
    };

    // Check if message length is within limits
    const isFormValid =
        firstName.trim() &&
        lastName.trim() &&
        email.trim() &&
        isValidEmail(email) &&
        cellphone.trim() &&
        /^\d{9}$/.test(cellphone) &&
        category.trim() &&
        message.trim().length >= MIN_MESSAGE_LEN &&
        message.trim().length <= MAX_MESSAGE_LEN &&
        !!turnstileToken;

    return (
        <>
            <ContactModal
                message={finalMessage}
                onClose={handleModalClose}
            />
            <div className="bg-black p-8 rounded-lg shadow-lg">
                {(categoriesError || loading) ? (
                    <div className="flex flex-col items-center justify-center py-12">
                        <h2 className="text-reyes text-2xl font-bold mb-2">Error al cargar</h2>
                        <p className="text-white text-lg mb-4 text-center">
                            {loading ? "Recargando..." : categoriesError}
                        </p>
                        <button
                            className="bg-reyes text-white font-bold py-2 px-6 rounded-sm hover:bg-reyes-dark transition-colors"
                            onClick={refetch}
                            disabled={loading}
                        >
                            {loading ? "Recargando..." : "Reintentar"}
                        </button>
                    </div>
                ) : (
                    <form
                        ref={formRef}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                        onSubmit={handleFormSubmit}
                        onChange={handleInputChange}
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
                                onChange={handleFirstNameChange}
                            />
                            {formErrors.first_name && <p className="text-red-400 text-sm">{formErrors.first_name}</p>}
                            {errors.name && <p className="text-reyes text-sm">{errors.name}</p>}
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
                            {errors.last_name && <p className="text-reyes text-sm">{errors.last_name}</p>}
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
                                    onChange={handleCellphoneChange}
                                />
                            </div>
                            {formErrors.cellphone && <p className="text-red-400 text-sm">{formErrors.cellphone}</p>}
                            {errors.cellphone && <p className="text-reyes text-sm">{errors.cellphone}</p>}
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
                            {formErrors.email && <p className="text-red-400 text-sm">{formErrors.email}</p>}
                            {errors.email && <p className="text-reyes text-sm">{errors.email}</p>}
                        </div>
                        <div className="md:col-span-2 col-span-1">
                            <label htmlFor="category" className="block text-gray-300 font-bold mb-2">Categoría (requerido)</label>
                            <select
                                id="category"
                                name="category"
                                className={`w-full p-3 rounded-sm bg-zinc-800 text-white border ${formErrors.category ? "border-red-500" : "border-zinc-700"} focus:outline-none focus:ring-2 focus:ring-reyes`}
                                value={category}
                                onChange={e => setCategory(e.target.value)}
                            >
                                <option value="">Selecciona una categoría</option>
                                {categories.map((category, index) => (
                                    <option key={index} value={category.slug}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                            {formErrors.category && <p className="text-red-400 text-sm">{formErrors.category}</p>}
                            {errors.category && <p className="text-reyes text-sm">{errors.category}</p>}
                        </div>
                        <div className="col-span-1">
                            <label htmlFor="message" className="block text-gray-300 font-bold mb-2 md:hidden">Mensaje (requerido)</label>
                        </div>
                        <div className="md:col-span-2">
                            <label htmlFor="message" className="block text-gray-300 font-bold mb-2 hidden md:block">Mensaje (requerido)</label>
                            <textarea
                                id="message"
                                name="message"
                                rows={5}
                                minLength={MIN_MESSAGE_LEN}
                                maxLength={MAX_MESSAGE_LEN}
                                className={`w-full p-3 rounded-sm bg-zinc-800 text-white border ${formErrors.message ? "border-red-500" : "border-zinc-700"} focus:outline-none focus:ring-2 focus:ring-reyes`}
                                placeholder={`Escribe tu mensaje aquí... (mínimo ${MIN_MESSAGE_LEN} y máximo ${MAX_MESSAGE_LEN} caracteres)`}
                                value={message}
                                onChange={e => setMessage(e.target.value.slice(0, MAX_MESSAGE_LEN))}
                            ></textarea>
                            {formErrors.message && <p className="text-red-400 text-sm">{formErrors.message}</p>}
                            {errors.message && <p className="text-reyes text-sm">{errors.message}</p>}
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
                                className={`w-full bg-reyes text-white font-bold py-3 rounded-sm transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed${(!isSubmitting && isFormValid) ? " hover:bg-reyes-dark" : ""}`}
                                disabled={!isFormValid || isSubmitting}
                            >
                                {isSubmitting ? "Enviando..." : "Enviar"}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </>
    );
};

export default ContactForm;
