import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, FileText } from 'lucide-react';

import PhaseOne from './phases/phaseOne/phaseOne';
import PhaseTwo from './phases/phaseTwo/phaseTwo';
import PhaseThree from './phases/phaseThree/phaseThree';
import PhaseFour from './phases/phaseFour/phaseFour';
import PhaseFive from './phases/phaseFive/phaseFive';
import ResumeProject from './resume/resumeProject';

import { useServiceList } from '../../hooks/services/useServiceList';
import { useSubmitQuote } from '../../hooks/quote/useSubmitQuote';
import { buildQuoteRequestData, validateQuoteData, formatQuoteResponse } from '../../helpers/quoteHelpers';

import { usePhaseOneValidate } from './phases/phaseOne/usePhaseOneValidate';
import { usePhaseTwoValidate } from './phases/phaseTwo/usePhaseTwoValidate';
import { usePhaseThreeValidate } from './phases/phaseThree/usePhaseThreeValidate';
import { usePhaseFourValidate } from './phases/phaseFour/usePhaseFourValidate';
import { usePhaseFiveValidate } from './phases/phaseFive/usePhaseFiveValidate';

const QuoteProject: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const totalSteps = 5;

  const serviceList = useServiceList();
  const { submitQuote, isLoading, error, success, quoteResponse, resetState } = useSubmitQuote();

  const phaseOne = usePhaseOneValidate();
  const phaseTwo = usePhaseTwoValidate();
  const phaseThree = usePhaseThreeValidate();
  const phaseFour = usePhaseFourValidate();
  const phaseFive = usePhaseFiveValidate();

  const progressPercent = Math.round(((currentStep + 1) / totalSteps) * 100);

  const steps = [
    <PhaseOne key="step-1" {...phaseOne} />,
    <PhaseTwo key="step-2" {...phaseTwo} />,
    <PhaseThree key="step-3" {...phaseThree} serviceList={serviceList} />,
    <PhaseFour key="step-4" {...phaseFour} />,
    <PhaseFive key="step-5" {...phaseFive} />,
  ];

  const handleNext = () => {
    if (currentStep === 0 && !phaseOne.validate()) return;
    if (currentStep === 1 && !phaseTwo.validate()) return;
    if (currentStep === 2 && !phaseThree.validate()) return;
    if (currentStep === 3 && !phaseFour.validate()) return;

    setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1));
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleShowSummary = () => {
    const isValid =
      phaseOne.validate() &&
      phaseTwo.validate() &&
      phaseThree.validate() &&
      phaseFour.validate() &&
      phaseFive.validate();

    if (!isValid) return;

    setShowSummary(true);
  };

  const handleSubmitQuote = async () => {
    try {
      // Build quotep  request data from all phases
      const quoteData = buildQuoteRequestData(
        phaseOne.values,
        phaseTwo.values,
        phaseThree.values,
        phaseFour.values,
        phaseFive.values
      );

      // Validate all before submission
      const validationErrors = validateQuoteData(quoteData);
      if (validationErrors.length > 0) {
        alert('Por favor completa todos los campos requeridos:\n' + validationErrors.join('\n'));
        return;
      }

      // Send quote request
      await submitQuote(quoteData);
      setIsSubmitted(true);
      
    } catch (err) {
      console.error('Error al enviar la cotización:', err);
    }
  };

  // Reset all and redirect home
  const handleStartOver = () => {
    setCurrentStep(0);
    setShowSummary(false);
    setIsSubmitted(false);
    resetState();
  };

  // Success screen if submitted
  if (isSubmitted && success && quoteResponse) {
    const formattedResponse = formatQuoteResponse(quoteResponse);

    return (
      <div>
        <section className="bg-cover bg-center relative min-h-[700px] flex items-center">
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
          <div className="container mx-auto px-4 py-24 relative z-10 flex flex-col items-center justify-center text-center flex-1">
            <div className="max-w-3xl text-white mx-auto">
              <img
                src="/img/logo/crown_white.svg"
                className="w-32 h-32 object-contain mx-auto mb-6"
                alt="reyes&friends_crown"
              />
              <h1 className="text-4xl md:text-5xl font-bold mb-6 border-b-4 border-red-500 pb-4 inline-block">
                ¡Cotización Enviada Exitosamente!
              </h1>
              <p className="text-xl mb-8 text-red-100">
                Gracias por confiar en nosotros. Hemos recibido tu solicitud y nos pondremos en contacto contigo muy pronto.
              </p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 max-w-3xl py-12">
          <div className="bg-black p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold text-white mb-6">Detalles de tu Cotización</h2>
            
            {formattedResponse && (
              <div className="text-left bg-zinc-900 p-6 rounded-lg mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white">
                  <div>
                    <strong className="text-green-400">Número de Cotización:</strong>
                    <p>{formattedResponse.quoteNumber}</p>
                  </div>
                  <div>
                    <strong className="text-green-400">Cliente:</strong>
                    <p>{formattedResponse.customerName}</p>
                  </div>
                  <div>
                    <strong className="text-green-400">Tipo de Proyecto:</strong>
                    <p>{formattedResponse.projectType}</p>
                  </div>
                  <div>
                    <strong className="text-green-400">Fecha de Envío:</strong>
                    <p>{formattedResponse.submittedAt}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-zinc-900 p-6 rounded-lg mb-6">
              <h3 className="text-lg font-bold text-white mb-4">¿Qué sigue?</h3>
              <ul className="text-gray-300 text-left space-y-2">
                <li>• Revisaremos tu solicitud en detalle</li>
                <li>• Nos pondremos en contacto contigo en un plazo de 24-48 horas</li>
                <li>• Te enviaremos una propuesta personalizada</li>
                <li>• Podremos agendar una reunión para discutir los detalles</li>
              </ul>
            </div>

            <div className="flex justify-center gap-4">
              <button
                type="button"
                onClick={handleStartOver}
                className="bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded transition-colors"
              >
                Crear Nueva Cotización
              </button>
              <button
                type="button"
                onClick={() => window.location.href = '/'}
                className="bg-zinc-700 hover:bg-zinc-800 text-white px-6 py-3 rounded transition-colors"
              >
                Volver al Inicio
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showSummary) {
    const finalData = {
      phaseOne: phaseOne.values,
      phaseTwo: phaseTwo.values,
      phaseThree: phaseThree.values,
      phaseFour: phaseFour.values,
      phaseFive: phaseFive.values,
    };

    const userName = `${finalData.phaseOne.firstName} ${finalData.phaseOne.lastName}`;

    return (
      <div>
        <section className="bg-cover bg-center relative min-h-[700px] flex items-center">
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
          <div className="container mx-auto px-4 py-24 relative z-10 flex flex-col items-center justify-center text-center flex-1">
            <div className="max-w-3xl text-white mx-auto">
              <img
                src="/img/logo/crown_white.svg"
                className="w-32 h-32 object-contain mx-auto mb-6"
                alt="reyes&friends_crown"
              />
              <h1 className="text-4xl md:text-5xl font-bold mb-6 border-b-4 border-red-500 pb-4 inline-block">
                De acuerdo, {userName}
              </h1>
              <p className="text-xl mb-8 text-red-100">
                Aquí tienes un resumen de la información que nos has proporcionado. Por favor, revísala y si todo está bien, envíanos el formulario.
              </p>
            </div>
          </div>
        </section>

        <motion.div
          key="resume-project"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3 }}
          className="mb-4"
        >
          <ResumeProject formData={finalData} />
        </motion.div>

        <div className="text-center my-8">
          <h2 className="text-3xl font-bold text-white">¿Listo para enviar? ¡No te preocupes por los detalles!</h2>
          <p className="text-lg text-gray-300">
            Esta información es solo una referencia inicial. Si más adelante quieres ajustar algo, ¡siempre podremos conversarlo y adaptarlo juntos!
          </p>
        </div>

        <div className="flex justify-center mt-8 mb-8 gap-4">
            <button
            type="button"
            onClick={() => setShowSummary(false)}
            disabled={isLoading}
            className="bg-zinc-700 hover:bg-zinc-800 disabled:bg-zinc-600 text-white px-6 py-3 rounded transition-colors flex items-center gap-2"
            >
            <ArrowLeft size={18} />
            Editar
            </button>

            <button
            type="button"
            onClick={handleSubmitQuote}
            disabled={isLoading}
            className="bg-red-700 hover:bg-red-800 disabled:bg-red-600 text-white px-6 py-3 rounded transition-colors flex items-center gap-2"
            >
            {isLoading ? (
              <>
              Enviando...
              </>
            ) : (
              <>
              <FileText size={18} />
              Enviar Cotización
              </>
            )}
            </button>
        </div>

        {error && (
          <div className="bg-red-600 text-white p-4 rounded mb-4 mx-auto max-w-3xl">
            <p className="font-bold">Error al enviar la cotización:</p>
            <p>{error}</p>
          </div>
        )}

      </div>
    );
  }

  return (
    <div>
      <section className="bg-cover bg-center relative min-h-[700px] flex items-center">
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
        <div className="container mx-auto px-4 py-24 relative z-10 flex flex-col items-center justify-center text-center flex-1">
          <div className="max-w-3xl text-white mx-auto">
            <img
              src="/img/logo/crown_white.svg"
              className="w-32 h-32 object-contain mx-auto mb-6"
              alt="reyes&friends_crown"
            />
            <h1 className="text-4xl md:text-5xl font-bold mb-6 border-b-4 border-red-500 pb-4 inline-block">
              Cotiza tu proyecto
            </h1>
            <p className="text-xl mb-8 text-red-100">
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
                  className={`w-full text-center ${i === currentStep ? 'text-white font-bold' : ''}`}
                >
                  Fase {i + 1}
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

        <div>
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
                className="bg-zinc-700 hover:bg-zinc-800 text-white px-6 py-3 rounded transition-colors flex items-center gap-2"
              >
                <ArrowLeft size={18} />
                Anterior
              </button>
            )}

            {currentStep < totalSteps - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                className="bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded transition-colors flex items-center gap-2"
              >
                Siguiente
                <ArrowRight size={18} />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleShowSummary}
                className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded transition-colors flex items-center gap-2"
              >
                <FileText size={18} />
                Resumen
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default QuoteProject;
