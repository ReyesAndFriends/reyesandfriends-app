import { Send, PhoneForwarded, ReceiptText, CodeXml, LaptopMinimalCheck } from "lucide-react";

const useHomeGetMethodologySteps = () => {
    return [
        {
            step: "1",
            title: "Solicitud",
            description: "Analizamos tu solicitud enviada por el formulario.",
            Icon: Send,
        },
        {
            step: "2",
            title: "Contacto",
            description: "Coordinamos una reunión para entender tus necesidades.",
            Icon: PhoneForwarded,
        },
        {
            step: "3",
            title: "Propuesta",
            description: "Te enviamos una propuesta con detalles del proyecto.",
            Icon: ReceiptText,
        },
        {
            step: "4",
            title: "Desarrollo",
            description: "Trabajamos en tu proyecto y te mantenemos informado.",
            Icon: CodeXml,
        },
        {
            step: "5",
            title: "Entrega",
            description: "Te entregamos el proyecto y ofrecemos soporte.",
            Icon: LaptopMinimalCheck,
        },
    ];
};

export default useHomeGetMethodologySteps;
