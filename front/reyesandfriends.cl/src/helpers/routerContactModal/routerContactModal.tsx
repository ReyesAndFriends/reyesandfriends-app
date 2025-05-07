import React from 'react';

interface RouterContactModalProps {
    onConfirm: () => void;
    onCancel: () => void;
}

const RouterContactModal: React.FC<RouterContactModalProps> = ({ onConfirm, onCancel }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-zinc-800 text-white rounded-lg p-6 max-w-md w-full">
                <h2 className="text-2xl  mb-4 text-red-500 text-center">Alerta</h2>
                <p className="mb-6">
                    Estás dentro de una página de formulario. Si sales, tu información podría perderse. ¿Qué deseas hacer?
                </p>
                <div className="flex space-x-4">
                    <button
                        onClick={onCancel}
                        className="w-full bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded transition-colors"
                    >
                        Mantenerme en esta página
                    </button>
                    <button
                        onClick={onConfirm}
                        className="w-full bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded transition-colors"
                    >
                        Salir
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RouterContactModal;