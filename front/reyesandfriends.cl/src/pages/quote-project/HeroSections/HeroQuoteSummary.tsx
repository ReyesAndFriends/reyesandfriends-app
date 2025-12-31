import React, { useEffect, useState } from 'react';
import { ClipboardCheck } from 'lucide-react';

interface HeroQuoteSummaryProps {
  userName: string;
}

const HeroQuoteSummary: React.FC<HeroQuoteSummaryProps> = ({ userName }) => {
  const [theme, setTheme] = useState<string>("reyes");
  useEffect(() => {
    const savedTheme = localStorage.getItem("page_theme");
    if (savedTheme) setTheme(savedTheme);
  }, []);
  const heroBackgroundImage =
    theme === "reyes-halloween"
      ? "/img/background/background-halloween.jpg"
      : theme === "reyes-christmas"
      ? "/img/background/background-christmas.jpg"
      : "/img/background/background-web.jpg";

  // Typewriter states for title
  const title = `De acuerdo, ${userName}`;
  const [displayedTitle, setDisplayedTitle] = useState(title[0]);
  const [titleCursorVisible, setTitleCursorVisible] = useState(true);

  useEffect(() => {
    let typingTimeout: NodeJS.Timeout;
    let cursorTimeout: NodeJS.Timeout;
    if (displayedTitle.length < title.length) {
      typingTimeout = setTimeout(() => {
        setDisplayedTitle(title.slice(0, displayedTitle.length + 1));
      }, 65);
    } else if (titleCursorVisible) {
      cursorTimeout = setTimeout(() => {
        setTitleCursorVisible(false);
      }, 1800);
    }
    return () => {
      clearTimeout(typingTimeout);
      clearTimeout(cursorTimeout);
    };
  }, [displayedTitle, title, titleCursorVisible]);

  return (
    <>
      <style>
        {`
          .typewriter-cursor-title {
            border-right: 2px solid #fff;
            margin-left: 0.25rem;
            animation: blink-cursor 0.7s steps(1) infinite;
          }
          @keyframes blink-cursor {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
        `}
      </style>
      <section className="bg-cover bg-center relative min-h-[700px] flex items-center">
        <div className="absolute inset-0 bg-hero-section z-10"></div>
        <div className="absolute inset-0">
          <img
            src={heroBackgroundImage}
            alt="Ilustración de fondo - Edificios"
            className="w-full h-full object-cover filter grayscale z-0"
            draggable={false}
            onContextMenu={e => e.preventDefault()}
          />
        </div>
        <div className="container mx-auto px-4 py-24 relative z-10 grid grid-cols-1 md:grid-cols-2 items-center gap-8">
          <div className="flex justify-center hidden md:block">
            <img
              src="/img/quote-project/quote-project.png"
              className="object-contain pointer-events-none"
              alt="Ilustración de cotización de proyecto"
            />
          </div>
          <div className="max-w-3xl text-white mx-auto md:mx-0 md:pl-12 lg:pl-24 flex flex-col items-center md:items-start">
            <div className="flex items-center w-full">
              <ClipboardCheck
                size={48}
                className={
                  theme === "reyes-halloween"
                    ? "text-orange-500 drop-shadow-lg"
                    : "text-reyes drop-shadow-lg"
                }
              />
              <h1 className="ml-4 text-4xl md:text-5xl text-white drop-shadow-lg tracking-tight font-semibold 3xl:text-6xl">
                {displayedTitle}
                {titleCursorVisible && (
                  <span className="typewriter-cursor-title">&nbsp;</span>
                )}
              </h1>
            </div>
            <p className="text-xl mb-8 text-white">
              Aquí tienes un resumen de la información que nos has proporcionado. Por favor, revísala y si todo está bien, envíanos el formulario.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroQuoteSummary;
