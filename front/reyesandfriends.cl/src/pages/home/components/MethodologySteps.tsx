import useHomeGetMethodologySteps from "../useHomeGetMethodologySteps";

export default function MethodologySteps() {

    const methodologySteps = useHomeGetMethodologySteps();

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {methodologySteps.map(({ step, title, description, Icon }, index) => (
                <div
                    key={index}
                    className="bg-black p-6 border-t-4 border-red-700 flex flex-col items-center rounded-lg shadow-md transition-transform hover:scale-105"
                >
                    <div className="w-12 h-12 bg-red-900/30 rounded-full flex items-center justify-center mb-3">
                        <Icon className="h-6 w-6 text-red-500" />
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-red-500 text-center">
                        {step}. {title}
                    </h3>
                    <p className="text-gray-300 text-center text-sm">{description}</p>
                </div>
            ))}
        </div>
    )

}