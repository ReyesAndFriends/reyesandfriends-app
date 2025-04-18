import { useGetContactCategories } from "../../hooks/contact/useGetContactCategories";
import { useContactFormValidator } from "../../hooks/contact/useContactFormValidator";
import { useState, useEffect } from "react";

const Contact = () => {
    const categories = useGetContactCategories();
    const { errors, handleSubmit } = useContactFormValidator();
    const [isFormValid, setIsFormValid] = useState(false);

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = {
            nombre: formData.get("nombre"),
            apellido: formData.get("apellido"),
            telefono: `${formData.get("codigo")}${formData.get("telefono")}`,
            email: formData.get("email"),
            category: formData.get("category"),
            message: formData.get("message"),
        };
        handleSubmit(data);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLFormElement>) => {
        const formData = new FormData(e.currentTarget);
        const isValid = ["nombre", "apellido", "codigo", "telefono", "email", "category", "message"].every(
            (field) => formData.get(field)?.toString().trim() !== ""
        );
        setIsFormValid(isValid);
    };

    return (
        <>
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

            <section className="py-16 bg-black">
                <div className="container mx-auto px-4 max-w-3xl">
                    <h2 className="text-3xl font-bold mb-12 text-center text-red-500 relative">
                        <span className="bg-black px-4 relative z-10">Envíanos un mensaje</span>
                        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-red-600/50 -z-0"></div>
                    </h2>
                    <form 
                        className="grid grid-cols-1 md:grid-cols-2 gap-4" 
                        onSubmit={handleFormSubmit} 
                        onChange={handleInputChange}
                    >
                        <div className="col-span-1">
                            <label htmlFor="nombre" className="block text-gray-300 font-bold mb-2">Nombre</label>
                            <input 
                                type="text" 
                                id="nombre" 
                                name="nombre" 
                                className="w-full p-3 rounded-sm bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                                placeholder="Ingresa tu nombre"
                            />
                            {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre}</p>}
                        </div>
                        <div className="col-span-1">
                            <label htmlFor="apellido" className="block text-gray-300 font-bold mb-2">Apellido</label>
                            <input 
                                type="text" 
                                id="apellido" 
                                name="apellido" 
                                className="w-full p-3 rounded-sm bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                                placeholder="Ingresa tu apellido"
                            />
                            {errors.apellido && <p className="text-red-500 text-sm">{errors.apellido}</p>}
                        </div>
                        <div className="col-span-1">
                            <label htmlFor="telefono" className="block text-gray-300 font-bold mb-2">Número de Teléfono</label>
                            <div className="flex">
                                <select 
                                    id="codigo" 
                                    name="codigo" 
                                    className="w-20 p-3 rounded-l-sm bg-zinc-700 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                                >
                                    <option value="+569">+569</option>
                                    <option value="+562">+562</option>
                                </select>
                                <input 
                                    type="tel" 
                                    id="telefono" 
                                    name="telefono" 
                                    maxLength={8}
                                    className="w-full p-3 rounded-r-sm bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                                    placeholder="Ingresa tu número de teléfono"
                                />
                            </div>
                            {errors.telefono && <p className="text-red-500 text-sm">{errors.telefono}</p>}
                        </div>
                        <div className="col-span-1">
                            <label htmlFor="email" className="block text-gray-300 font-bold mb-2">Email</label>
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
                            <label htmlFor="category" className="block text-gray-300 font-bold mb-2">Categoría</label>
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
                            <label htmlFor="message" className="block text-gray-300 font-bold mb-2">Mensaje</label>
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
                                disabled={!isFormValid}
                            >
                                Enviar
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
};

export default Contact;