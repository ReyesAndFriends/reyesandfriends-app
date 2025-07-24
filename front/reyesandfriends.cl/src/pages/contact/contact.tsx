import { useGetContactCategories } from "../../hooks/contact/useGetContactCategories";
import { useContactFormValidator } from "../../hooks/contact/useContactFormValidator";
import { useState, useRef } from "react";
import ContactModal from "./modal/contactModal";

function capitalizeWords(str: string) {
    return str.replace(/\b\w/g, char => char.toUpperCase()).replace(/\B\w/g, char => char.toLowerCase());
}

const Contact = () => {
    const { categories, error: categoriesError, loading, refetch } = useGetContactCategories();
    const { errors, handleSubmit, isSubmitting, finalMessage, setFinalMessage } = useContactFormValidator();
    const [isFormValid, setIsFormValid] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);
    const [cellphone, setCellphone] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

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
        const formData = new FormData(e.currentTarget);
        const data = {
            first_name: firstName,
            last_name: lastName,
            cellphone: cellphone,
            email: formData.get("email"),
            category: formData.get("category"),
            message: formData.get("message"),
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
    };

    return (
        <>
            <ContactModal 
                message={finalMessage} 
                onClose={handleModalClose} 
            />
            <section className="bg-cover bg-center relative min-h-[700px] flex items-center">
                <div className="absolute inset-0 bg-hero-section"></div>
                <div className="absolute inset-0">
                    <img
                        src="/img/background/background-web.jpg"
                        alt="fondo de la sección"
                        className="w-full h-full object-cover opacity-5 filter grayscale"
                        draggable={false}
                        onContextMenu={e => e.preventDefault()}
                    />
                </div>
                <div className="container mx-auto px-4 py-24 relative z-10 flex flex-col items-center justify-center text-center flex-1">
                    <div className="max-w-2xl text-white mx-auto">
                        <img
                            src="/img/logo/crown_white.svg"
                            className="w-32 h-32 object-contain mx-auto mb-6"
                            alt="reyes&friends_crown"
                        />
                        <h1 className="text-4xl md:text-5xl mb-6 border-b-4 border-red-500 pb-4 inline-block">
                            Contáctanos
                        </h1>
                        <p className="text-xl mb-8 text-red-100">
                            Si tienes alguna pregunta o inquietud, no dudes en ponerte en contacto con nosotros. 
                            Estamos aquí para ayudarte y responder a tus consultas.
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-zinc-900">
                <div className="container mx-auto px-4">
                    <div className="relative mb-12">
                        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-red-600/50 -z-0"></div>
                        <h2 className="text-3xl text-center text-red-500 relative z-10">
                            <span className="bg-zinc-900 px-4 relative z-10 text-white">Envíanos un mensaje</span>
                        </h2>
                    </div>
                    <div className="bg-black p-8 rounded-lg shadow-lg">
                        {(categoriesError || loading) ? (
                            <div className="flex flex-col items-center justify-center py-12">
                                <h2 className="text-red-500 text-2xl font-bold mb-2">Error al cargar</h2>
                                <p className="text-white text-lg mb-4 text-center">
                                    {loading ? "Recargando..." : categoriesError}
                                </p>
                                <button
                                    className="bg-red-600 text-white font-bold py-2 px-6 rounded-sm hover:bg-red-700 transition-colors"
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
                        >
                            <div className="col-span-1">
                                <label htmlFor="name" className="block text-gray-300 font-bold mb-2">Nombre (requerido)</label>
                                <input 
                                    type="text" 
                                    id="first_name" 
                                    name="first_name" 
                                    className="w-full p-3 rounded-sm bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                                    placeholder="Ingresa tu nombre"
                                    value={firstName}
                                    onChange={handleFirstNameChange}
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
                                    value={lastName}
                                    onChange={handleLastNameChange}
                                />
                                {errors.last_name && <p className="text-red-500 text-sm">{errors.last_name}</p>}
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
                                        className="w-full p-3 rounded-r-sm bg-zinc-800 text-white border border-zinc-700 border-l-0 focus:outline-none focus:ring-2 focus:ring-red-600"
                                        placeholder="912345678"
                                        pattern="[0-9]{9}"
                                        inputMode="numeric"
                                        value={cellphone}
                                        onChange={handleCellphoneChange}
                                    />
                                </div>
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
                            <div className="col-span-1">
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
                            <div className="col-span-1">
                                <label htmlFor="message" className="block text-gray-300 font-bold mb-2 md:hidden">Mensaje (requerido)</label>
                            </div>
                            <div className="md:col-span-2">
                                <label htmlFor="message" className="block text-gray-300 font-bold mb-2 hidden md:block">Mensaje (requerido)</label>
                                <textarea 
                                    id="message" 
                                    name="message" 
                                    rows={5} 
                                    className="w-full p-3 rounded-sm bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                                    placeholder="Escribe tu mensaje aquí..."
                                ></textarea>
                                {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
                            </div>
                            <div className="md:col-span-2 col-span-1">
                                <button 
                                    type="submit" 
                                    className="w-full bg-red-600 text-white font-bold py-3 rounded-sm hover:bg-red-700 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
                                    disabled={!isFormValid || isSubmitting}
                                >
                                    {isSubmitting ? "Enviando..." : "Enviar"}
                                </button>
                            </div>
                        </form>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Contact;