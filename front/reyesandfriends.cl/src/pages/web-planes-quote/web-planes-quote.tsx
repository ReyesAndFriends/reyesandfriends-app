import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function WebPlanesQuote() {
    const navigate = useNavigate();

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

                <div className="max-w-screen-xl max-md:max-w-xl mx-auto bg-black py-8 px-12 rounded-lg shadow-lg">
                    <div className="flex items-start mb-16">
                        <div className="w-full">
                            <div className="flex items-center w-full">
                                <div className="w-8 h-8 shrink-0 mx-[-1px] bg-reyes p-1.5 flex items-center justify-center rounded-full">
                                    <span className="text-sm text-white font-semibold">1</span>
                                </div>
                                <div className="w-full h-[3px] mx-4 rounded-lg bg-reyes"></div>
                            </div>
                            <div className="mt-2 mr-4">
                                <h6 className="text-sm font-semibold text-white">Carrito</h6>
                            </div>
                        </div>
                        <div className="w-full">
                            <div className="flex items-center w-full">
                                <div className="w-8 h-8 shrink-0 mx-[-1px] bg-reyes p-1.5 flex items-center justify-center rounded-full">
                                    <span className="text-sm text-white font-semibold">2</span>
                                </div>
                                <div className="w-full h-[3px] mx-4 rounded-lg bg-zinc-700"></div>
                            </div>
                            <div className="mt-2 mr-4">
                                <h6 className="text-sm font-semibold text-white">Pago</h6>
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center">
                                <div className="w-8 h-8 shrink-0 mx-[-1px] bg-zinc-700 p-1.5 flex items-center justify-center rounded-full">
                                    <span className="text-sm text-white font-semibold">3</span>
                                </div>
                            </div>
                            <div className="mt-2">
                                <h6 className="text-sm font-semibold text-zinc-400">Orden</h6>
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8 lg:gap-x-12">
                        <div className="lg:col-span-2">
                            <form>
                                <div>
                                    <h2 className="text-xl text-white font-semibold mb-6">Detalles de Entrega</h2>
                                    <div className="grid lg:grid-cols-2 gap-y-6 gap-x-4">
                                        <div>
                                            <label className="text-sm text-white font-medium block mb-2">Nombre</label>
                                            <input type="text" placeholder="Ingrese su nombre"
                                                className="px-4 py-2.5 bg-zinc-800 border border-zinc-700 text-white w-full text-sm rounded-md focus:ring-2 focus:ring-reyes" />
                                        </div>
                                        <div>
                                            <label className="text-sm text-white font-medium block mb-2">Apellido</label>
                                            <input type="text" placeholder="Ingrese su apellido"
                                                className="px-4 py-2.5 bg-zinc-800 border border-zinc-700 text-white w-full text-sm rounded-md focus:ring-2 focus:ring-reyes" />
                                        </div>
                                        <div>
                                            <label className="text-sm text-white font-medium block mb-2">Correo electrónico</label>
                                            <input type="email" placeholder="Ingrese su correo electrónico"
                                                className="px-4 py-2.5 bg-zinc-800 border border-zinc-700 text-white w-full text-sm rounded-md focus:ring-2 focus:ring-reyes" />
                                        </div>
                                        <div>
                                            <label className="text-sm text-white font-medium block mb-2">Teléfono</label>
                                            <input type="number" placeholder="Ingrese su teléfono"
                                                className="px-4 py-2.5 bg-zinc-800 border border-zinc-700 text-white w-full text-sm rounded-md focus:ring-2 focus:ring-reyes" />
                                        </div>
                                        <div>
                                            <label className="text-sm text-white font-medium block mb-2">Dirección</label>
                                            <input type="text" placeholder="Ingrese su dirección"
                                                className="px-4 py-2.5 bg-zinc-800 border border-zinc-700 text-white w-full text-sm rounded-md focus:ring-2 focus:ring-reyes" />
                                        </div>
                                        <div>
                                            <label className="text-sm text-white font-medium block mb-2">Región</label>
                                            <input type="text" placeholder="Ingrese su región"
                                                className="px-4 py-2.5 bg-zinc-800 border border-zinc-700 text-white w-full text-sm rounded-md focus:ring-2 focus:ring-reyes" />
                                        </div>
                                        <div>
                                            <label className="text-sm text-white font-medium block mb-2">Comuna</label>
                                            <input type="text" placeholder="Ingrese su comuna"
                                                className="px-4 py-2.5 bg-zinc-800 border border-zinc-700 text-white w-full text-sm rounded-md focus:ring-2 focus:ring-reyes" />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-12">
                                    <h2 className="text-xl text-white font-semibold mb-6">Pago</h2>
                                    <div className="grid gap-4 lg:grid-cols-2">
                                        <div className="bg-zinc-800 p-4 rounded-md border border-zinc-700 max-w-sm">
                                            <div>
                                                <div className="flex items-center">
                                                    <input type="radio" name="method" className="w-5 h-5 cursor-pointer focus:ring-2 focus:ring-reyes" id="card" defaultChecked />
                                                    <label htmlFor="card" className="ml-4 flex gap-2 cursor-pointer">
                                                        <img src="https://readymadeui.com/images/visa.webp" className="w-12" alt="card1" />
                                                    </label>
                                                </div>
                                            </div>
                                            <p className="mt-4 text-sm text-zinc-400 font-medium">Paga con tu tarjeta de débito o crédito</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-12 max-w-md">
                                    <p className="text-white text-sm font-medium mb-2">¿Tienes un código promocional?</p>
                                    <div className="flex gap-4">
                                        <input type="email" placeholder="Código promocional"
                                            className="px-4 py-2.5 bg-zinc-800 border border-zinc-700 text-white w-full text-sm rounded-md focus:ring-2 focus:ring-reyes" />
                                        <button type='button' className="flex items-center justify-center font-medium tracking-wide bg-reyes hover:bg-reyes-dark px-4 py-2.5 rounded-md text-sm text-white cursor-pointer focus:ring-2 focus:ring-reyes">
                                            Aplicar
                                        </button>
                                    </div>
                                </div>

                            </form>
                        </div>

                        <div className="relative">
                            <h2 className="text-xl text-white font-semibold mb-6">Resumen de la Orden</h2>

                            <div className="mb-6 flex flex-col gap-4 items-center">
                                <img
                                    src=""
                                    alt="Imagen de resumen"
                                    className="w-32  object-cover rounded mb-2 pointer-events-none"
                                />
                                <span className="text-white font-semibold">Título de la imagen</span>
                            </div>
                            <ul className="text-zinc-400 font-medium space-y-4">
                                <li className="flex flex-wrap gap-4 text-sm">Subtotal <span className="ml-auto font-semibold text-white">$72.00</span></li>
                                <li className="flex flex-wrap gap-4 text-sm">Descuento <span className="ml-auto font-semibold text-white">$0.00</span></li>
                                <hr className="border-zinc-700" />
                                <li className="flex flex-wrap gap-4 text-[15px] font-semibold text-white">Total <span className="ml-auto">$72.00</span></li>
                            </ul>
                            <div className="space-y-4 mt-8">
                                <button type="button" className="rounded-md px-4 py-2.5 w-full text-sm font-medium tracking-wide bg-reyes hover:bg-reyes-dark text-white cursor-pointer focus:ring-2 focus:ring-reyes">Completar Compra</button>
                                <button
                                    type="button"
                                    className="rounded-md px-4 py-2.5 w-full text-sm font-medium tracking-wide bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white cursor-pointer"
                                    onClick={() => navigate("/web-planes")}
                                >
                                    Cancelar pedido
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default WebPlanesQuote;