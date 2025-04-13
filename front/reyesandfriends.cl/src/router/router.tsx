import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Layout from "../layouts/layout";
import Home from "../pages/home";

const AppRouter: React.FC = () => {
    
    const pageTransition = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.3 },
    };

    const AnimatedRoutes = () => {
        const location = useLocation();

        return (
            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<motion.div {...pageTransition}><Home /></motion.div>} />
                    <Route path="/services/web-development" element={<motion.div {...pageTransition}><div>Programación web</div></motion.div>} />
                    <Route path="/services/bussiness-software" element={<motion.div {...pageTransition}><div>Software empresarial</div></motion.div>} />
                    <Route path="/services/promotional-web" element={<motion.div {...pageTransition}><div>Páginas web promocionales</div></motion.div>} />
                    <Route path="/services/ecommerce-web" element={<motion.div {...pageTransition}><div>Páginas E-Commerce</div></motion.div>} />
                    <Route path="/services" element={<motion.div {...pageTransition}><div>Lista completa</div></motion.div>} />
                    <Route path="/about" element={<motion.div {...pageTransition}><div>Sobre nosotros</div></motion.div>} />
                    <Route path="/portfolio" element={<motion.div {...pageTransition}><div>Portafolio</div></motion.div>} />
                    <Route path="/contact" element={<motion.div {...pageTransition}><div>Contacto</div></motion.div>} />
                    <Route path="/quote-project" element={<motion.div {...pageTransition}><div>Cotizar proyecto</div></motion.div>} />
                </Routes>
            </AnimatePresence>
        );
    };

    return (
        <Router>
            <Layout>
                <AnimatedRoutes />
            </Layout>
        </Router>
    );
};

export default AppRouter;
