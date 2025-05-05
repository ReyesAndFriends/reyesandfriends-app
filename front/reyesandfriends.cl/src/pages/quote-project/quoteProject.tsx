import React, { useState, useRef } from 'react';

import PhaseOne from './phases/phaseOne/phaseOne';
import PhaseTwo from './phases/phaseTwo';
import PhaseThree from './phases/phaseThree';
import PhaseFour from './phases/phaseFour';
import PhaseFive from './phases/phaseFive';


import { usePhaseOneValidate } from './phases/phaseOne/usePhaseOneValidate';

const QuoteProject: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const phaseOne = usePhaseOneValidate();


  const steps = [
    <PhaseOne {...phaseOne} />,
    <PhaseTwo />,
    <PhaseThree />,
    <PhaseFour />,
    <PhaseFive />
  ];

  const handleNext = () => {
    if (currentStep === 0 && !phaseOne.validate()) return;


    setCurrentStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = () => {
    if (!phaseOne.validate()) return;

    alert("Formulario enviado!");
  };

  return (
    <div>
      <section className="relative py-48 bg-cover bg-center relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#891818] to-[#5A1410]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Cotiza tu proyecto
            </h1>
            <div className="w-auto h-1 bg-red-600 mx-auto mb-6"></div>
            <p className="text-xl mb-8 text-gray-300">
              Has tomado una gran decisión al elegirnos para tu proyecto!
              <br />
              Ahora cuéntanos más sobre lo que tienes en mente.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <h2 className="text-3xl font-bold mb-12 text-center text-red-500 relative">
          <span className="px-4 relative z-10 bg-zinc-900 text-white">
            Paso {currentStep + 1} de 5
          </span>
          <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-red-600/50 -z-0"></div>
        </h2>

        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          {steps[currentStep]}

          <div className="flex justify-center mt-8 gap-4">
            {currentStep > 0 && (
              <button
                type="button"
                onClick={handlePrev}
                className="bg-zinc-700 hover:bg-zinc-800 text-white px-6 py-3 rounded transition-colors"
              >
                Anterior
              </button>
            )}

            {currentStep < steps.length - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                className="bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded transition-colors"
              >
                Siguiente
              </button>
            ) : (
              <button
                type="submit"
                className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded transition-colors"
              >
                Enviar
              </button>
            )}
          </div>
        </form>
      </section>
    </div>
  );
};

export default QuoteProject;
