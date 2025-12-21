import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from './christmasLights.module.css';

function ChristmasLights() {
    const [visible, setVisible] = useState(
        typeof window !== "undefined" && localStorage.getItem("page_theme") === "reyes-christmas"
    );

    useEffect(() => {
        const checkTheme = () => {
            setVisible(localStorage.getItem("page_theme") === "reyes-christmas");
        };

        const onStorage = (e: StorageEvent) => {
            if (e.key === "page_theme") checkTheme();
        };
        window.addEventListener("storage", onStorage);

        const interval = setInterval(checkTheme, 300);

        return () => {
            window.removeEventListener("storage", onStorage);
            clearInterval(interval);
        };
    }, []);

    return (
        <AnimatePresence>
            {visible && (
                <motion.ul
                    className={styles.lightrope}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {Array.from({ length: 42 }).map((_, i) => (
                        <li key={i}></li>
                    ))}
                </motion.ul>
            )}
        </AnimatePresence>
    );
}

export default ChristmasLights;