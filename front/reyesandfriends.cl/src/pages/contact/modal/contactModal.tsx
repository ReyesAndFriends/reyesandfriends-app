import React from "react";

interface ContactModalProps {
    message: string | null;
    onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ message, onClose }) => {
    if (!message) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-zinc-800 text-white rounded-lg p-6 max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4 text-red-500">Mensaje</h2>
                <p className="mb-6">{message}</p>
                <button
                    onClick={onClose}
                    className="w-full bg-red-600 text-white font-bold py-2 rounded hover:bg-red-700 transition-colors"
                >
                    Cerrar
                </button>
            </div>
        </div>
    );
};

export default ContactModal;
