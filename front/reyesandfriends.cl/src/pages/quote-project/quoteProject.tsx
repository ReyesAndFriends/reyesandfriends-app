import React from 'react';

import PhaseOne from './phases/phaseOne';
import PhaseTwo from './phases/phaseTwo';
import PhaseThree from './phases/phaseThree';
import PhaseFour from './phases/phaseFour';
import PhaseFive from './phases/phaseFive';

const QuoteProject: React.FC = () => {
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
                            Ahora es momento de que nos cuentes más sobre lo que tienes en mente. Cuéntanos qué necesitas y te enviaremos una cotización personalizada.
                        </p>
                  </div>
            </div>
        </section>

        <section className="py-16">
              <h2 className="text-3xl font-bold mb-12 text-center text-red-500 relative">
                        <span className="px-4 relative z-10 bg-zinc-900 text-white">Rellena este formulario</span>
                        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-red-600/50 -z-0"></div>
              </h2>

            <form action="" method="POST" >

              <PhaseOne />
              <PhaseTwo />
              <PhaseThree />
              <PhaseFour />
              <PhaseFive />

            </form>

        </section>
      </div>
  );
};

export default QuoteProject;