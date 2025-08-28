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
        resetForm
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
                    className="bg-zinc-900 text-zinc-100 rounded-xl shadow-2xl p-8 max-w-3xl w-full border border-zinc-800 relative"
                    variants={modalVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <button
                        className="absolute top-4 right-4 text-zinc-400 hover:text-red-500 transition-colors"
                        onClick={onClose}
                        aria-label="Cerrar"
                    >
                        <X className="w-6 h-6" />
                    </button>
                    {plan ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Columna izquierda: info del plan */}
                            <div className="flex flex-col items-center justify-center md:items-start md:justify-start">
                                <div className="flex items-center mb-4">
                                    <Globe className="w-8 h-8 text-red-600 mr-2" />
                                    <h2 className="text-2xl font-semibold text-red-600">{plan.name}</h2>
                                </div>
                                <p className="text-sm text-zinc-300 mb-6 text-center md:text-left">"{plan.description}"</p>
                                <p className="text-lg font-semibold text-zinc-200 mb-4 text-center md:text-left">
                                    Para solicitar este plan, por favor completa el siguiente formulario:
                                </p>
                            </div>
                            {/* Columna derecha: formulario */}
                            <form onSubmit={handleSubmit} className="space-y-3">
                                <div>
                                    <div className="flex justify-between items-center mb-1">
                                        <label className="block text-sm font-medium text-zinc-400">Nombre</label>
                                        <span className="text-xs text-red-500 min-h-[1em]">
                                            {errors.first_name}
                                        </span>
                                    </div>
                                    <input
                                        name="first_name"
                                        placeholder="John"
                                        value={form.first_name}
                                        onChange={handleChange}
                                        className="w-full border border-zinc-800 bg-zinc-950 rounded px-3 py-2 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-red-600"
                                    />
                                </div>
                                <div>
                                    <div className="flex justify-between items-center mb-1">
                                        <label className="block text-sm font-medium text-zinc-400">Apellidos</label>
                                        <span className="text-xs text-red-500 min-h-[1em]">
                                            {errors.last_name}
                                        </span>
                                    </div>
                                    <input
                                        name="last_name"
                                        placeholder="Doe"
                                        value={form.last_name}
                                        onChange={handleChange}
                                        className="w-full border border-zinc-800 bg-zinc-950 rounded px-3 py-2 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-red-600"
                                    />
                                </div>
                                <div>
                                    <div className="flex justify-between items-center mb-1">
                                        <label className="block text-sm font-medium text-zinc-400">Correo electrónico</label>
                                        <span className="text-xs text-red-500 min-h-[1em]">
                                            {errors.correo}
                                        </span>
                                    </div>
                                    <input
                                        name="correo"
                                        type="email"
                                        placeholder="john.doe@email.com"
                                        value={form.correo}
                                        onChange={handleChange}
                                        className="w-full border border-zinc-800 bg-zinc-950 rounded px-3 py-2 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-red-600"
                                    />
                                </div>
                                <div className="flex items-center space-x-4">
                                    <label className="block text-sm font-medium text-zinc-400 mb-1">Tipo de Cliente</label>
                                    <label className="flex items-center space-x-1">
                                        <input
                                            type="radio"
                                            name="rut_type"
                                            value="natural"
                                            checked={form.rut_type === "natural"}
                                            onChange={handleRutTypeChange}
                                            className="accent-red-600"
                                        />
                                        <span className="text-sm text-zinc-400 select-none">Persona natural</span>
                                    </label>
                                    <label className="flex items-center space-x-1">
                                        <input
                                            type="radio"
                                            name="rut_type"
                                            value="empresa"
                                            checked={form.rut_type === "empresa"}
                                            onChange={handleRutTypeChange}
                                            className="accent-red-600"
                                        />
                                        <span className="text-sm text-zinc-400 select-none">Negocio / Empresa</span>
                                    </label>
                                </div>
                                <div>
                                    <div className="flex justify-between items-center mb-1">
                                        <label className="block text-sm font-medium text-zinc-400">
                                            {form.rut_type === "empresa" ? "RUT empresa" : "RUT"}
                                        </label>
                                        <span className="text-xs text-red-500 min-h-[1em]">
                                            {errors.rut}
                                        </span>
                                    </div>
                                    <input
                                        name="rut"
                                        placeholder="12.345.678-9"
                                        value={form.rut}
                                        onChange={handleRutChange}
                                        className="w-full border border-zinc-800 bg-zinc-950 rounded px-3 py-2 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-red-600"
                                        inputMode="text"
                                        autoComplete="off"
                                        maxLength={12}
                                    />
                                </div>
                                <div>
                                    <div className="flex justify-between items-center mb-1">
                                        <label className="block text-sm font-medium text-zinc-400">Teléfono</label>
                                        <span className="text-xs text-red-500 min-h-[1em]">
                                            {errors.cellphone}
                                        </span>
                                    </div>
                                    <div className="flex">
                                        <span className="inline-flex items-center px-3 rounded-l border border-r-0 border-zinc-800 bg-zinc-950 text-zinc-400 select-none">
                                            +56
                                        </span>
                                        <input
                                            name="cellphone"
                                            placeholder="912345678"
                                            value={form.cellphone}
                                            onChange={handleTelefonoChange}
                                            className="w-full border border-zinc-800 bg-zinc-950 rounded-r px-3 py-2 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-red-600"
                                            inputMode="numeric"
                                            autoComplete="off"
                                            maxLength={9}
                                        />
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-3 rounded-lg transition-colors"
                                >
                                    Enviar
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div className="text-center text-zinc-400">Plan no encontrado.</div>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default QuoteWebPlanModal;