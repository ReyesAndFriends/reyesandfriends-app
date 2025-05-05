import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import PhaseOne from './phases/phaseOne/phaseOne';
import PhaseTwo from './phases/phaseTwo/phaseTwo';
import PhaseThree from './phases/phaseThree/phaseThree';
import PhaseFour from './phases/phaseFour';
import PhaseFive from './phases/phaseFive';

import { useServiceList } from '../../hooks/services/useServiceList';

import { usePhaseOneValidate } from './phases/phaseOne/usePhaseOneValidate';
import { usePhaseTwoValidate } from './phases/phaseTwo/usePhaseTwoValidate';
import { usePhaseThreeValidate } from './phases/phaseThree/usePhaseThreeValidate';

const QuoteProject: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 5;

  const serviceList  = useServiceList();

  const phaseOne = usePhaseOneValidate();
  const phaseTwo = usePhaseTwoValidate();
  const phaseThree = usePhaseThreeValidate();


  const progressPercent = Math.round(((currentStep + 1) / totalSteps) * 100);

  const steps = [
    <PhaseOne key="step-1" {...phaseOne} />,
    <PhaseTwo key="step-2" {...phaseTwo} />,
    <PhaseThree key="step-3" {...phaseThree} serviceList={serviceList} />,
    <PhaseFour key="step-4" />,
    <PhaseFive key="step-5" />,
  ];

  const handleNext = () => {
    if (currentStep === 0 && !phaseOne.validate()) return;
    if (currentStep === 1 && !phaseTwo.validate()) return;
    if (currentStep === 2 && !phaseThree.validate()) return;
  
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1));
  };
  

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = () => {
    if (!phaseOne.validate()) return;
    alert('Formulario enviado con éxito 🎉');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>

      <section className="relative py-48 bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-r from-[#891818] to-[#5A1410]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Cotiza tu proyecto</h1>
            <div className="w-auto h-1 bg-red-600 mx-auto mb-6"></div>
            <p className="text-xl mb-8 text-gray-300">
              Has tomado una gran decisión al elegirnos para tu proyecto!
              <br />
              Ahora cuéntanos más sobre lo que tienes en mente.
            </p>
          </div>
        </div>
      </section>


      <section className="py-16 max-w-4xl mx-auto px-4">

        <div className="mb-12">
          <div className="relative mb-2">
            <div className="flex justify-between text-sm text-gray-400 mb-1">
              {[...Array(totalSteps)].map((_, i) => (
                <div
                  key={i}
                  className={`w-full text-center ${
                    i === currentStep ? 'text-white font-bold' : ''
                  }`}
                >
                  Paso {i + 1}
                </div>
              ))}
            </div>
            <div className="w-full h-2 bg-zinc-700 rounded">
              <div
                className="h-2 bg-red-600 rounded transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>
        </div>


        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              {steps[currentStep]}
            </motion.div>
          </AnimatePresence>

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

            {currentStep < totalSteps - 1 ? (
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
