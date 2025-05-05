import { useGetContactCategories } from "../../hooks/contact/useGetContactCategories";
import { useContactFormValidator } from "../../hooks/contact/useContactFormValidator";
import { useState, useRef } from "react";
import ContactModal from "./modal/contactModal";

const Contact = () => {
    const categories = useGetContactCategories();
    const { errors, handleSubmit, isSubmitting, finalMessage, setFinalMessage } = useContactFormValidator();
    const [isFormValid, setIsFormValid] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get("name"),
            last_name: formData.get("last_name"),
            cellphone: formData.get("cellphone"),
            email: formData.get("email"),
            category: formData.get("category"),
            message: formData.get("message"),
        };
        handleSubmit(data);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLFormElement>) => {
        const formData = new FormData(e.currentTarget);
        const isValid = ["name", "last_name", "cellphone", "email", "category", "message"].every(
            (field) => formData.get(field)?.toString().trim() !== ""
        );
        setIsFormValid(isValid);
    };

    const handleModalClose = () => {
        setFinalMessage(null);
        formRef.current?.reset();
        setIsFormValid(false);
    };

    return (
        <>
            <ContactModal 
                message={finalMessage} 
                onClose={handleModalClose} 
            />
            <section className="relative py-48 bg-cover bg-center relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#891818] to-[#5A1410]"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                            Contacto
                        </h1>
                        <div className="w-24 h-1 bg-red-600 mx-auto mb-6"></div>
                        <p className="text-xl mb-8 text-gray-300">
                            Si tienes alguna pregunta o inquietud, no dudes en ponerte en contacto con nosotros. 
                            Estamos aquí para ayudarte y responder a tus consultas.
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-zinc-900">
                    <h2 className="text-3xl font-bold mb-12 text-center text-red-500 relative">
                        <span className="bg-black px-4 relative z-10 bg-zinc-900 text-white">Envíanos un mensaje</span>
                        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-red-600/50 -z-0"></div>
                    </h2>
                <div className="container mx-auto px-4 max-w-3xl">
                    <div className="bg-black p-8 rounded-lg shadow-lg">
                        <form 
                            ref={formRef}
                            className="grid grid-cols-1 md:grid-cols-2 gap-4" 
                            onSubmit={handleFormSubmit} 
                            onChange={handleInputChange}
                        >
                            <div className="col-span-1">
                                <label htmlFor="name" className="block text-gray-300 font-bold mb-2">Nombre (requerido)</label>
                                <input 
                                    type="text" 
                                    id="name" 
                                    name="name" 
                                    className="w-full p-3 rounded-sm bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                                    placeholder="Ingresa tu nombre"
                                />
                                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                            </div>
                            <div className="col-span-1">
                                <label htmlFor="last_name" className="block text-gray-300 font-bold mb-2">Apellido (requerido)</label>
                                <input 
                                    type="text" 
                                    id="last_name" 
                                    name="last_name" 
                                    className="w-full p-3 rounded-sm bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                                    placeholder="Ingresa tu apellido"
                                />
                                {errors.last_name && <p className="text-red-500 text-sm">{errors.last_name}</p>}
                            </div>
                            <div className="col-span-1">
                                <label htmlFor="cellphone" className="block text-gray-300 font-bold mb-2">Número de Teléfono (requerido)</label>
                                <input 
                                    type="tel" 
                                    id="cellphone" 
                                    name="cellphone" 
                                    maxLength={12}
                                    className="w-full p-3 rounded-sm bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                                    placeholder="Ejemplo: +56912345678"
                                />
                                {errors.cellphone && <p className="text-red-500 text-sm">{errors.cellphone}</p>}
                            </div>
                            <div className="col-span-1">
                                <label htmlFor="email" className="block text-gray-300 font-bold mb-2">Email (requerido)</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    name="email" 
                                    className="w-full p-3 rounded-sm bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                                    placeholder="Ingresa tu email"
                                />
                                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                            </div>
                            <div className="col-span-2">
                                <label htmlFor="category" className="block text-gray-300 font-bold mb-2">Categoría (requerido)</label>
                                <select 
                                    id="category" 
                                    name="category" 
                                    className="w-full p-3 rounded-sm bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                                >
                                    <option value="">Selecciona una categoría</option>
                                    {categories.map((category, index) => (
                                        <option key={index} value={category.slug}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
                            </div>
                            <div className="col-span-2">
                                <label htmlFor="message" className="block text-gray-300 font-bold mb-2">Mensaje (requerido)</label>
                                <textarea 
                                    id="message" 
                                    name="message" 
                                    rows={5} 
                                    className="w-full p-3 rounded-sm bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                                    placeholder="Escribe tu mensaje aquí..."
                                ></textarea>
                                {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
                            </div>
                            <div className="col-span-2">
                                <button 
                                    type="submit" 
                                    className="w-full bg-red-600 text-white font-bold py-3 rounded-sm hover:bg-red-700 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
                                    disabled={!isFormValid || isSubmitting}
                                >
                                    {isSubmitting ? "Enviando..." : "Enviar"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Contact;