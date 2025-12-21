import React, { useState, useRef, FormEvent, ChangeEvent } from "react";
import { useGetContactCategories } from "../../../hooks/contact/useGetContactCategories";
import { useContactFormValidator } from "../../../hooks/contact/useContactFormValidator";
import ContactModal from "./ContactModal";
import Turnstile from "react-turnstile";

function capitalizeWords(str: string) {
    return str.replace(/\b\w/g, char => char.toUpperCase()).replace(/\B\w/g, char => char.toLowerCase());
}

const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || "";

const ContactForm: React.FC = () => {
    const { categories, error: categoriesError, loading, refetch } = useGetContactCategories();
    const { errors, handleSubmit, isSubmitting, finalMessage, setFinalMessage } = useContactFormValidator();
    const [isFormValid, setIsFormValid] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);
    const [cellphone, setCellphone] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
    const [turnstileError, setTurnstileError] = useState<string | null>(null);

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

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!turnstileToken) {
            setTurnstileError("Debes completar el captcha.");
            return;
        }
        setTurnstileError(null);
        const formData = new FormData(e.currentTarget);
        const data = {
            first_name: firstName,
            last_name: lastName,
            cellphone: cellphone,
            email: formData.get("email"),
            category: formData.get("category"),
            message: formData.get("message"),
            turnstile_token: turnstileToken,
        };
        handleSubmit(data);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLFormElement>) => {
        const formData = new FormData(e.currentTarget);
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
        setIsFormValid(isValid);
    };

    const handleModalClose = () => {
        setFinalMessage(null);
        formRef.current?.reset();
        setCellphone("");
        setFirstName("");
        setLastName("");
        setIsFormValid(false);
        setTurnstileToken(null);
        setTurnstileError(null);
    };

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
                            <label htmlFor="name" className="block text-gray-300 font-bold mb-2">Nombre (requerido)</label>
                            <input
                                type="text"
                                id="first_name"
                                name="first_name"
                                className="w-full p-3 rounded-sm bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-reyes"
                                placeholder="Ingresa tu nombre"
                                value={firstName}
                                onChange={handleFirstNameChange}
                            />
                            {errors.name && <p className="text-reyes text-sm">{errors.name}</p>}
                        </div>
                        <div className="col-span-1">
                            <label htmlFor="last_name" className="block text-gray-300 font-bold mb-2">Apellido (requerido)</label>
                            <input
                                type="text"
                                id="last_name"
                                name="last_name"
                                className="w-full p-3 rounded-sm bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-reyes"
                                placeholder="Ingresa tu apellido"
                                value={lastName}
                                onChange={handleLastNameChange}
                            />
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
                                    className="w-full p-3 rounded-r-sm bg-zinc-800 text-white border border-zinc-700 border-l-0 focus:outline-none focus:ring-2 focus:ring-reyes"
                                    placeholder="912345678"
                                    pattern="[0-9]{9}"
                                    inputMode="numeric"
                                    value={cellphone}
                                    onChange={handleCellphoneChange}
                                />
                            </div>
                            {errors.cellphone && <p className="text-reyes text-sm">{errors.cellphone}</p>}
                        </div>
                        <div className="col-span-1">
                            <label htmlFor="email" className="block text-gray-300 font-bold mb-2">Email (requerido)</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="w-full p-3 rounded-sm bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-reyes"
                                placeholder="Ingresa tu email"
                            />
                            {errors.email && <p className="text-reyes text-sm">{errors.email}</p>}
                        </div>
                        <div className="md:col-span-2 col-span-1">
                            <label htmlFor="category" className="block text-gray-300 font-bold mb-2">Categoría (requerido)</label>
                            <select
                                id="category"
                                name="category"
                                className="w-full p-3 rounded-sm bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-reyes"
                            >
                                <option value="">Selecciona una categoría</option>
                                {categories.map((category, index) => (
                                    <option key={index} value={category.slug}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
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
                                className="w-full p-3 rounded-sm bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-reyes"
                                placeholder="Escribe tu mensaje aquí..."
                            ></textarea>
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
