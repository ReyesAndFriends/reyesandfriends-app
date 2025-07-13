import React, { useEffect, useState } from 'react';
import { AlertTriangle, X, LogOut } from 'lucide-react';

interface RouterContactModalProps {
    onConfirm: () => void;
    onCancel: () => void;
}

const RouterContactModal: React.FC<RouterContactModalProps> = ({ onConfirm, onCancel }) => {
    const [visible, setVisible] = useState(false);
    const [closing, setClosing] = useState(false);

    useEffect(() => {
        setVisible(true);
    }, []);

    const handleClose = (action: () => void) => {
        setClosing(true);
        setTimeout(() => {
            action();
        }, 200);
    };

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
                    onClick={() => handleClose(onCancel)}
                    className="absolute top-4 right-4 text-zinc-400 hover:text-red-500 transition-colors"
                    aria-label="Cerrar"
                >
                    <X className="w-6 h-6" />
                </button>
                <div className="flex items-center justify-center mb-4">
                    <AlertTriangle className="text-red-600 w-10 h-10 mr-2" />
                    <h2 className="text-2xl font-semibold text-red-500">Alerta</h2>
                </div>
                <p className="mb-8 text-zinc-300 text-center">
                    Estás dentro de una página de formulario.<br />
                    Si sales, tu información podría perderse.<br />
                    ¿Qué deseas hacer?
                </p>
                <div className="flex gap-4">
                    <button
                        onClick={() => handleClose(onConfirm)}
                        className="flex-1 flex items-center justify-center gap-2 bg-red-700 hover:bg-red-800 text-white px-5 py-3 rounded-lg transition-colors font-medium"
                    >
                        <LogOut className="w-5 h-5" />
                        Salir
                    </button>
                    <button
                        onClick={() => handleClose(onCancel)}
                        className="flex-1 flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 px-5 py-3 rounded-lg border border-zinc-700 transition-colors font-medium"
                    >
                        <X className="w-5 h-5 text-red-500" />
                        Mantenerme aquí
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RouterContactModal;