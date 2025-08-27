import React, { useEffect, useState } from "react";
import useWebPlanesList from "../hooks/useWebPlanesList";
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

    const [form, setForm] = useState({
        nombre: "",
        apellidos: "",
        correo: "",
        rut: "",
        tipoRut: "natural"
    });

    const handleTipoRutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, tipoRut: e.target.value });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ ...form, plan });
    };

    return (
        <AnimatePresence onExitComplete={onExited}>
            {open && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center"
                    variants={backdropVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    style={{ background: `rgba(9, 9, 11, 0.9)` }}
                >
                    <motion.div
                        className="bg-zinc-900 text-zinc-100 rounded-xl shadow-2xl p-8 max-w-md w-full border border-zinc-800 relative"
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
                            <>
                                <div className="flex items-center justify-center mb-4">
                                    <Globe className="w-8 h-8 text-red-600 mr-2" />
                                    <h2 className="text-2xl font-semibold text-red-600">{plan.name}</h2>
                                </div>
                                <p className="text-sm text-zinc-300 mb-6 text-center">"{plan.description}"</p>
                                <p className="text-lg font-semibold text-zinc-200 mb-4 text-center">
                                    Para solicitar este plan, por favor completa el siguiente formulario:
                                </p>
                                <form onSubmit={handleSubmit} className="space-y-3">
                                    <div>
                                        <label className="block text-sm font-medium text-red-600 mb-1">Nombre</label>
                                        <input
                                            name="nombre"
                                            placeholder="John"
                                            value={form.nombre}
                                            onChange={handleChange}
                                            className="w-full border border-zinc-800 bg-zinc-950 rounded px-3 py-2 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-red-600"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-red-600 mb-1">Apellidos</label>
                                        <input
                                            name="apellidos"
                                            placeholder="Doe"
                                            value={form.apellidos}
                                            onChange={handleChange}
                                            className="w-full border border-zinc-800 bg-zinc-950 rounded px-3 py-2 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-red-600"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-red-600 mb-1">Correo electrónico</label>
                                        <input
                                            name="correo"
                                            type="email"
                                            placeholder="john.doe@email.com"
                                            value={form.correo}
                                            onChange={handleChange}
                                            className="w-full border border-zinc-800 bg-zinc-950 rounded px-3 py-2 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-red-600"
                                            required
                                        />
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <label className="block text-sm font-medium text-red-600 mb-1">Tipo de Cliente</label>
                                        <label className="flex items-center space-x-1">
                                            <input
                                                type="radio"
                                                name="tipoRut"
                                                value="natural"
                                                checked={form.tipoRut === "natural"}
                                                onChange={handleTipoRutChange}
                                                className="accent-red-600"
                                            />
                                            <span className="text-sm text-zinc-400 select-none">Persona natural</span>
                                        </label>
                                        <label className="flex items-center space-x-1">
                                            <input
                                                type="radio"
                                                name="tipoRut"
                                                value="empresa"
                                                checked={form.tipoRut === "empresa"}
                                                onChange={handleTipoRutChange}
                                                className="accent-red-600"
                                            />
                                            <span className="text-sm text-zinc-400 select-none">Negocio / Empresa</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-zinc-400 mb-1">
                                            {form.tipoRut === "empresa" ? "RUT empresa" : "RUT"}
                                        </label>
                                        <input
                                            name="rut"
                                            placeholder="12.345.678-9"
                                            value={form.rut}
                                            onChange={handleChange}
                                            className="w-full border border-zinc-800 bg-zinc-950 rounded px-3 py-2 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-red-600"
                                            required
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-3 rounded-lg transition-colors"
                                    >
                                        Enviar
                                    </button>
                                </form>
                            </>
                        ) : (
                            <div className="text-center text-zinc-400">Plan no encontrado.</div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default QuoteWebPlanModal;