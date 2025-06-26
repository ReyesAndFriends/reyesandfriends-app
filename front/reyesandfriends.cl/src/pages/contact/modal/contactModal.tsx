import React, { useEffect, useState } from "react";
import { AlertTriangle, X } from "lucide-react";

interface ContactModalProps {
    message: string | null;
    onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ message, onClose }) => {
    const [visible, setVisible] = useState(false);
    const [closing, setClosing] = useState(false);

    useEffect(() => {
        setVisible(true);
    }, []);

    const handleClose = () => {
        setClosing(true);
        setTimeout(() => {
            onClose();
        }, 200);
    };

    if (!message) return null;

    return (
        <div
            className={`fixed inset-0 bg-zinc-950 bg-opacity-90 flex items-center justify-center z-50 transition-opacity duration-200 ${
                visible && !closing ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
        >
            <div className={`bg-zinc-900 text-zinc-100 rounded-xl shadow-2xl p-8 max-w-md w-full border border-zinc-800 relative transition-all duration-200 ${
                visible && !closing ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            }`}>
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-zinc-400 hover:text-red-500 transition-colors"
                    aria-label="Cerrar"
                >
                    <X className="w-6 h-6" />
                </button>
                <div className="flex items-center justify-center mb-4">
                    <AlertTriangle className="text-red-600 w-10 h-10 mr-2" />
                    <h2 className="text-2xl font-semibold text-red-500">Mensaje</h2>
                </div>
                <p className="mb-8 text-zinc-300 text-center">{message}</p>
                <button
                    onClick={handleClose}
                    className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-3 rounded-lg transition-colors"
                >
                    Cerrar
                </button>
            </div>
        </div>
    );
};

export default ContactModal;
