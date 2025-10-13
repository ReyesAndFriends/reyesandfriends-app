import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface MockupData {
    id: string;
    src: string;
    alt: string;
    className: string;
}

const AnimatedMockups: React.FC = () => {
    const mockups: MockupData[] = [
        {
            id: "laptop",
            src: "/img/home/desktop.png",
            alt: "Mockup laptop",
            className: "max-w-md md:max-w-lg lg:max-w-xl w-full h-auto"
        },
        {
            id: "mobile",
            src: "/img/home/mobile.png",
            alt: "Mockup móvil",
            className: "max-w-[200px] md:max-w-[250px] lg:max-w-[300px] w-full h-auto"
        },
        {
            id: "tablet",
            src: "/img/home/tablet.png",
            alt: "Mockup tablet",
            className: "max-w-xs md:max-w-sm lg:max-w-md w-full h-auto"
        }
    ];

    const [currentMockupIndex, setCurrentMockupIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentMockupIndex((prevIndex) => 
                (prevIndex + 1) % mockups.length
            );
        }, 3000);

        return () => clearInterval(interval);
    }, [mockups.length]);

    const variants = {
        enter: {
            opacity: 0,
            scale: 0.95
        },
        center: {
            opacity: 1,
            scale: 1
        },
        exit: {
            opacity: 0,
            scale: 0.95
        }
    };

    return (
        <div className="relative w-full h-full flex items-center justify-center min-h-[400px]">
            <AnimatePresence mode="wait" initial={false}>
                <motion.img
                    key={mockups[currentMockupIndex].id}
                    src={mockups[currentMockupIndex].src}
                    alt={mockups[currentMockupIndex].alt}
                    className={`${mockups[currentMockupIndex].className} drop-shadow-2xl`}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        duration: 0.6,
                        ease: "easeInOut"
                    }}
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                />
            </AnimatePresence>
        </div>
    );
};

export default AnimatedMockups;