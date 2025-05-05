import React from 'react';

const QuoteProject: React.FC = () => {
  return (
      <div>
        <section className="relative py-48 bg-cover bg-center relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#891818] to-[#5A1410]"></div>
                <div className="container mx-auto px-4 relative z-10">
                      <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                            Cotiza tu proyecto
                        </h1>
                      <div className="w-24 h-1 bg-red-600 mx-auto mb-6"></div>
                        <p className="text-xl mb-8 text-gray-300">
                            Has tomado una gran decisión al elegirnos para tu proyecto!
                            <br />
                            Ahora es momento de que nos cuentes más sobre lo que tienes en mente. Cuéntanos qué necesitas y te enviaremos una cotización personalizada.
                        </p>
                  </div>
            </div>
        </section>

        <section className="py-16">
              <h2 className="text-3xl font-bold mb-12 text-center text-red-500 relative">
                        <span className="px-4 relative z-10 bg-zinc-900 text-white">Rellena este formulario</span>
                        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-red-600/50 -z-0"></div>
              </h2>

            <form action="" method="POST" >
              <div className="max-w-4xl mx-auto px-12 bg-black p-8 rounded-lg shadow-md">
                  
                     <h1 className='block text-white font-bold mb-4'>Fase 1. Datos personales</h1>

                      <div className="mb-4 flex gap-4">
                          <div className="w-1/2">
                              <label htmlFor="firstName" className="block text-gray-300 font-bold mb-2">Nombre (requerido)</label>
                              <input type="text" id="firstName" name="firstName" required className="w-full p-3 rounded-sm bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-600"/>
                          </div>
                          <div className="w-1/2">
                              <label htmlFor="lastName" className="block text-gray-300 font-bold mb-2">Apellido (requerido)</label>
                              <input type="text" id="lastName" name="lastName" required className="w-full p-3 rounded-sm bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-600"/>
                          </div>
                      </div>

                    <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-300 font-bold mb-2">Email (requerido)</label>
                            <input type="email" id="email" name="email" required className="w-full p-3 rounded-sm bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-600"/>
                    </div>

                    <div className="mb-4">
                            <label htmlFor="phone" className="block text-gray-300 font-bold mb-2">Teléfono (requerido)</label>
                            <input type="tel" id="phone" name="phone" required className="w-full p-3 rounded-sm bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-600"/>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="contactMethod" className="block text-gray-300 font-bold mb-2">¿Cómo quieres que te contactemos? (requerido)</label>
                        <select id="contactMethod" name="contactMethod" required className="w-full p-3 rounded-sm bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-600">
                            <option value="" disabled selected>Selecciona una opción</option>
                            <option value="email">Email</option>
                            <option value="whatsapp">WhatsApp</option>
                        </select>
                    </div>
              </div>

              <div className="mt-4 max-w-4xl mx-auto px-12 bg-black p-8 rounded-lg shadow-md">
                <h1 className='block text-white font-bold mb-4'>Fase 2. Empresa y propósito del proyecto</h1>
                
                <div className="mb-4">
                    <label htmlFor="companyName" className="block text-gray-300 font-bold mb-2">Nombre de la empresa (requerido)</label>
                    <input type="text" id="companyName" name="companyName" required className="w-full p-3 rounded-sm bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-600"/>
                </div>

              </div>

              <div className="mt-4 max-w-4xl mx-auto px-12 bg-black p-8 rounded-lg shadow-md">
                <h1 className='block text-white font-bold mb-4'>Fase 3. Alcance técnico y funcional</h1>

              </div>

              <div className="mt-4 max-w-4xl mx-auto px-12 bg-black p-8 rounded-lg shadow-md">
                <h1 className='block text-white font-bold mb-4'>Fase 4. Extras e información final</h1>

              </div>

            </form>

        </section>



      </div>
  );
};

export default QuoteProject;