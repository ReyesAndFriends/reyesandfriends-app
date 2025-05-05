import React from 'react';

interface RouterContactModalProps {
    onConfirm: () => void;
    onCancel: () => void;
}

const RouterContactModal: React.FC<RouterContactModalProps> = ({ onConfirm, onCancel }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-zinc-800 text-white rounded-lg p-6 max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4 text-red-500">Alerta</h2>
                <p className="mb-6">
                    Estás dentro de una página de formulario. Si sales, tu información podría perderse. ¿Qué deseas hacer?
                </p>
                <div className="flex space-x-4">
                    <button
                        onClick={onCancel}
                        className="w-full bg-red-600 text-white font-bold py-2 rounded hover:bg-red-700 transition-colors"
                    >
                        Mantenerme en esta página
                    </button>
                    <button
                        onClick={onConfirm}
                        className="w-full bg-green-600 text-white font-bold py-2 rounded hover:bg-green-700 transition-colors"
                    >
                        Salir
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RouterContactModal;