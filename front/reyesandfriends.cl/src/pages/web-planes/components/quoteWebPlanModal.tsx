import React, { useEffect } from "react";
import useWebPlanesList from "../hooks/useWebPlanesList";
import useValidatePlanModal from "../hooks/useValidatePlanModal";
import { X, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface QuoteWebPlanModalProps {
    slug: string;
    open: boolean;
    onClose: () => void;
    onExited?: () => void;
}

const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
};

const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.2 } }
};

const QuoteWebPlanModal: React.FC<QuoteWebPlanModalProps> = ({ slug, open, onClose, onExited }) => {
    const plans = useWebPlanesList();
    const plan = plans.find(p => p.slug === slug);

    const {
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
    } = useValidatePlanModal(plan);

    useEffect(() => {
        if (!open) {
            resetForm();
        }
    }, [open, resetForm]);

    if (!open) return null;

    return (
        <AnimatePresence onExitComplete={onExited}>
            <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center"
                variants={backdropVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                style={{ background: `rgba(9, 9, 11, 0.9)` }}
            >
                <motion.div
                    className="bg-black text-zinc-100 rounded-lg shadow-lg p-8 max-w-3xl w-full border border-zinc-800 relative"
                    variants={modalVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <button
                        className="absolute top-4 right-4 text-white hover:text-reyes transition-colors"
                        onClick={onClose}
                        aria-label="Cerrar"
                        disabled={loading}
                    >
                        <X className="w-6 h-6" />
                    </button>
                    {plan ? (
                        (successMessage || errorMessage) ? (
                            <div className="flex flex-col items-center justify-center py-12">
                                <h2 className="text-2xl font-bold mb-4 text-white">
                                    {successMessage ? "¡Solicitud enviada!" : "Ocurrió un error"}
                                </h2>
                                <div className="mb-8 text-center text-white text-lg">
                                    {successMessage || errorMessage}
                                </div>
                                <button
                                    className="px-6 py-3 rounded-lg font-semibold transition-colors bg-reyes hover:bg-reyes-dark text-white"
                                    onClick={onClose}
                                >
                                    Cerrar
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="flex flex-col items-center justify-center md:items-start md:justify-start">
                                    <div className="flex items-center mb-4">
                                        <Globe className="w-8 h-8 text-white mr-2" />
                                        <h2 className="text-2xl font-bold text-white">{plan.name}</h2>
                                    </div>
                                    <p className="text-sm text-zinc-300 mb-6 text-center md:text-left">"{plan.description}"</p>
                                    <p className="text-lg font-semibold text-zinc-200 mb-4 text-center md:text-left">
                                        Para solicitar este plan, por favor completa el siguiente formulario:
                                    </p>
                                </div>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-gray-300 font-bold mb-2">Nombre</label>
                                        <input
                                            name="first_name"
                                            placeholder="John"
                                            value={form.first_name}
                                            onChange={handleChange}
                                            className="w-full p-3 rounded-sm bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-reyes"
                                            disabled={loading}
                                        />
                                        {errors.first_name && <p className="text-reyes-light text-sm mt-1">{errors.first_name}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-gray-300 font-bold mb-2">Apellidos</label>
                                        <input
                                            name="last_name"
                                            placeholder="Doe"
                                            value={form.last_name}
                                            onChange={handleChange}
                                            className="w-full p-3 rounded-sm bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-reyes"
                                            disabled={loading}
                                        />
                                        {errors.last_name && <p className="text-reyes-light text-sm mt-1">{errors.last_name}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-gray-300 font-bold mb-2">Correo electrónico</label>
                                        <input
                                            name="email"
                                            type="email"
                                            placeholder="john.doe@email.com"
                                            value={form.email}
                                            onChange={handleChange}
                                            className="w-full p-3 rounded-sm bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-reyes"
                                            disabled={loading}
                                        />
                                        {errors.email && <p className="text-reyes-light text-sm mt-1">{errors.email}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-gray-300 font-bold mb-2">Tipo de Cliente</label>
                                        <div className="flex items-center space-x-4">
                                            <label className="flex items-center space-x-1">
                                                <input
                                                    type="radio"
                                                    name="rut_type"
                                                    value="natural"
                                                    checked={form.rut_type === "natural"}
                                                    onChange={handleRutTypeChange}
                                                    className="accent-reyes"
                                                    disabled={loading}
                                                />
                                                <span className="text-sm text-gray-300 select-none">Persona natural</span>
                                            </label>
                                            <label className="flex items-center space-x-1">
                                                <input
                                                    type="radio"
                                                    name="rut_type"
                                                    value="empresa"
                                                    checked={form.rut_type === "empresa"}
                                                    onChange={handleRutTypeChange}
                                                    className="accent-reyes"
                                                    disabled={loading}
                                                />
                                                <span className="text-sm text-gray-300 select-none">Negocio / Empresa</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-gray-300 font-bold mb-2">
                                            {form.rut_type === "empresa" ? "RUT empresa" : "RUT"}
                                        </label>
                                        <input
                                            name="rut"
                                            placeholder="12.345.678-9"
                                            value={form.rut}
                                            onChange={handleRutChange}
                                            className="w-full p-3 rounded-sm bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-reyes"
                                            inputMode="text"
                                            autoComplete="off"
                                            maxLength={12}
                                            disabled={loading}
                                        />
                                        {errors.rut && <p className="text-reyes-light text-sm mt-1">{errors.rut}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-gray-300 font-bold mb-2">Teléfono</label>
                                        <div className="flex">
                                            <span className="inline-flex items-center px-3 rounded-l border border-r-0 border-zinc-700 bg-zinc-800 text-gray-300 select-none">
                                                +56
                                            </span>
                                            <input
                                                name="cellphone"
                                                placeholder="912345678"
                                                value={form.cellphone}
                                                onChange={handleTelefonoChange}
                                                className="w-full p-3 rounded-r-sm bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-reyes"
                                                inputMode="numeric"
                                                autoComplete="off"
                                                maxLength={9}
                                                disabled={loading}
                                            />
                                        </div>
                                        {errors.cellphone && <p className="text-reyes-light text-sm mt-1">{errors.cellphone}</p>}
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full bg-reyes hover:bg-reyes-dark text-white font-bold py-3 rounded-lg transition-colors"
                                        disabled={loading}
                                    >
                                        {loading ? "Enviando solicitud..." : "Solicitar Plan"}
                                    </button>
                                    {errorMessage && (
                                        <div className="text-white text-center font-semibold py-2">{errorMessage}</div>
                                    )}
                                    {successMessage && (
                                        <div className="text-white text-center font-semibold py-8">{successMessage}</div>
                                    )}
                                </form>
                            </div>
                        )
                    ) : (
                        <div className="text-center text-zinc-400">Plan no encontrado.</div>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default QuoteWebPlanModal;