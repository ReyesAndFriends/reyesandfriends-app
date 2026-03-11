import React, { useEffect, useState } from "react";
import usePortfolio2025 from "../hooks/usePortfolio2025";

const VISIBLE_COUNT = 3;
const INTERVAL_MS = 5000;

const PortfolioCarousel: React.FC = () => {
    const items = usePortfolio2025();
    const [startIdx, setStartIdx] = useState(0);
    const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setStartIdx((prev) => (prev + 1) % items.length);
        }, INTERVAL_MS);
        return () => clearInterval(interval);
    }, [items.length]);

    const getVisibleItems = () => {
        const visible = [];
        for (let i = 0; i < VISIBLE_COUNT; i++) {
            visible.push(items[(startIdx + i) % items.length]);
        }
        return visible;
    };

    const goTo = (idx: number) => {
        setStartIdx(idx);
    };

    return (
        <div className="flex flex-col items-center w-full">
            <div className="flex gap-12 justify-center items-stretch w-full transition-all mb-6">
                {getVisibleItems().map((item, idx) => (
                    <div
                        key={idx}
                        className="bg-zinc-900 rounded shadow-lg overflow-hidden border border-zinc-800 flex-1 max-w-lg min-w-[320px] flex flex-col hover:border-reyes-light transition-all duration-200"
                        style={{ minHeight: 420 }}
                        onMouseEnter={() => setHoveredIdx(idx)}
                        onMouseLeave={() => setHoveredIdx(null)}
                    >
                        <div
                            style={{
                                position: "relative",
                                width: "100%",
                                paddingTop: "56.25%",
                                background: "#18181b",
                            }}
                        >
                            <img
                                src={item.imageUrl}
                                alt={item.title}
                                className="w-full h-full object-cover pointer-events-none"
                                loading="lazy"
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    height: "100%",
                                }}
                            />

                            {hoveredIdx === idx && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="absolute inset-0 bg-reyes-dark opacity-50" />
                                    <span className="relative text-white text-lg font-bold drop-shadow">
                                        {item.projectType}
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className="p-6 flex flex-col flex-1">
                            <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                            <p className="text-gray-300 mb-2">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex gap-2 justify-center">
                {items.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => goTo(idx)}
                        className={`w-4 h-4 rounded-full border-2 border-zinc-500 transition-all ${
                            idx === startIdx ? "bg-zinc-300 border-zinc-300" : "bg-zinc-700"
                        }`}
                        aria-label={`Ir al item ${idx + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default PortfolioCarousel;
