import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, FileText, Home } from 'lucide-react';
import Turnstile from "react-turnstile";

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

import { Helmet } from 'react-helmet-async';

// Hero sections
import HeroQuoteForm from './HeroSections/HeroQuoteForm';
import HeroQuoteSummary from './HeroSections/HeroQuoteSummary';
import HeroQuoteSuccess from './HeroSections/HeroQuoteSuccess';

const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || "";

const QuoteProject: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileError, setTurnstileError] = useState<string | null>(null);
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
    // Validate Turnstile before submission
    if (!turnstileToken) {
      setTurnstileError("Debes completar el captcha.");
      return;
    }
    setTurnstileError(null);

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
      await submitQuote({
        ...quoteData,
        turnstile_token: turnstileToken, // send token
      });
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

  useEffect(() => {
    if (isSubmitted && success && quoteResponse) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [isSubmitted, success, quoteResponse]);

  // Success screen if submitted
  if (isSubmitted && success && quoteResponse) {
    const formattedResponse = formatQuoteResponse(quoteResponse);

    return (
      <div>
        <HeroQuoteSuccess />
        <div className="container mx-auto px-4 max-w-7xl py-12">
          <div className="bg-black p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold text-white mb-6">Detalles de tu Cotización</h2>

            {formattedResponse && (
              <div className="text-left bg-zinc-900 p-6 rounded-lg mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white">
                  <div>
                    <strong className="text-green-400">Número de Cotización:</strong>
                    <p>{formattedResponse.quoteNumber}</p>
                  </div>
                  <div>
                    <strong className="text-green-400">Nombre del Cliente:</strong>
                    <p>{formattedResponse.customerName}</p>
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
                <li>• Nos pondremos en contacto contigo en <strong>un plazo de 24-48 horas</strong></li>
                <li>• Te enviaremos una propuesta personalizada</li>
                <li>• Podremos agendar una reunión para discutir los detalles</li>
              </ul>
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-4">
              <button
                type="button"
                onClick={handleStartOver}
                className="bg-reyes hover:bg-reyes-dark text-white px-6 py-3 rounded transition-colors flex items-center gap-2 font-semibold"
              >
                <FileText size={18} />
                Crear Nueva Cotización
              </button>
              <button
                type="button"
                onClick={() => window.location.href = '/'}
                className="bg-zinc-700 hover:bg-zinc-800 text-white px-6 py-3 rounded transition-colors flex items-center gap-2 font-semibold"
              >
                <Home size={18} />
                Volver al Inicio
              </button>
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
        <HeroQuoteSummary userName={userName} />
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

        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
            <div className="flex justify-center mb-8 md:mb-0">
              <img
                src="/img/quote-project/thanks.png"
                alt="Imagen de agradecimiento"
                className="w-40 h-40 object-contain mx-auto hover:scale-105 transition-transform pointer-events-none"
              />
            </div>
            <div>
              <h4 className="text-lg text-reyes-light mb-2">¡No te preocupes por los detalles!</h4>
              <h2 className="text-4xl mb-4 text-white">¿Listo para enviar?</h2>
              <p className="text-lg text-gray-200">
                Gracias por tomar tu tiempo en nuestro cotizador. Con esta información proporcionada, nos haremos idea de lo que necesitas, y si más adelante quieres ajustar algo, ¡siempre podremos conversarlo y adaptarlo juntos!
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center mb-4 mt-8">
          <Turnstile
            sitekey={TURNSTILE_SITE_KEY}
            onSuccess={token => {
              setTurnstileToken(token);
              setTurnstileError(null);
            }}
            onError={() => setTurnstileError("Error al cargar el captcha.")}
            onExpire={() => setTurnstileToken(null)}
            theme="dark"
          />
        </div>
        {turnstileError && (
          <div className="bg-reyes-dark text-white p-2 rounded mb-4 mx-auto max-w-3xl text-center">
            <span>{turnstileError}</span>
          </div>
        )}

        <div className="flex justify-center mt-4 mb-8 gap-4">
          <button
            type="button"
            onClick={() => setShowSummary(false)}
            disabled={isLoading}
            className="bg-zinc-700 hover:bg-zinc-800 text-white px-6 py-3 rounded transition-colors flex items-center gap-2 font-semibold"
          >
            <ArrowLeft size={18} />
            Editar
          </button>

          <button
            type="button"
            onClick={handleSubmitQuote}
            disabled={isLoading || !turnstileToken}
            className="bg-reyes hover:bg-reyes-dark text-white px-6 py-3 rounded transition-colors flex items-center gap-2 font-semibold"
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
          <div className="bg-reyes-dark text-white p-4 rounded mb-4 mx-auto max-w-3xl">
            <p className="font-bold">Error al enviar la cotización:</p>
            <p>{error}</p>
          </div>
        )}

      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Cotiza tu proyecto | Reyes&Friends</title>
        <meta
          name="description"
          content="Cotiza tu proyecto dinámicamente con Reyes&Friends"
        />
        <meta property="og:title" content="Cotiza tu proyecto | Reyes&Friends" />
        <meta property="og:description" content="Cotiza tu proyecto dinámicamente con Reyes&Friends" />
        <meta property="og:image" content="/img/open-graph-images/quote-project.png" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Cotiza tu proyecto | Reyes&Friends" />
        <meta name="twitter:description" content="Cotiza tu proyecto dinámicamente con Reyes&Friends" />
        <meta name="twitter:image" content="/img/open-graph-images/quote-project.png" />
      </Helmet>

      <div>
        <HeroQuoteForm />
        <section className="py-16 max-w-7xl mx-auto px-4">
          <div className="mb-12">
            <div className="relative mb-2 mt-2">

              <div className="relative mb-12">
                <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-reyes-dark -z-0"></div>
                <h2 className="text-3xl text-center text-reyes-light relative z-10">
                  <span className="bg-zinc-900 px-4 relative z-10 text-white">Cotizador de proyectos</span>
                </h2>
              </div>

              <div className="flex justify-between text-sm text-gray-400 ">
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
                  className="h-2 bg-reyes rounded transition-all duration-300"
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
                  className="bg-reyes hover:bg-reyes-dark text-white px-6 py-3 rounded transition-colors flex items-center gap-2 font-semibold"
                >
                  <ArrowLeft size={18} />
                  Anterior
                </button>
              )}

              {currentStep < totalSteps - 1 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-reyes hover:bg-reyes-dark text-white px-6 py-3 rounded transition-colors flex items-center gap-2 font-semibold"
                >
                  Siguiente
                  <ArrowRight size={18} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleShowSummary}
                  className="bg-reyes hover:bg-reyes-dark text-white px-6 py-3 rounded transition-colors flex items-center gap-2 font-semibold"
                >
                  <FileText size={18} />
                  Resumen
                </button>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default QuoteProject;