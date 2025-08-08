import { Ban } from "lucide-react";
import { Link } from "react-router";

const Error = () => {
    return (
            <section className="bg-cover bg-center relative min-h-screen flex items-center justify-center">
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
                <div className="relative z-10 flex flex-col items-center text-center">
                    <img
                        src="/img/logo/crown_white.svg"
                        className="w-24 h-24 object-contain mx-auto mb-6"
                        alt="reyes&friends_crown"
                    />
                    <h1 className="text-4xl md:text-5xl mb-4 text-white drop-shadow-lg flex items-center justify-center gap-2 border-b-4 border-red-500 pb-4 inline-block">
                        <Ban className="w-8 h-8" />
                        La página que has accedido no existe.
                    </h1>
                    <p className="text-xl text-red-100 max-w-xl mb-4">
                       Es posible que la URL sea incorrecta o que la página haya sido eliminada. Por favor, verifica la dirección o vuelve a la página principal.
                    </p>
                    <Link
                        to="/" className="bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded transition-all duration-300 flex items-center gap-2 font-semibold transform hover:scale-105">
                        Volver a la página principal
                    </Link>
                </div>
            </section>
    );
};

export default Error;
